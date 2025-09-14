import { Note, Classe, Student } from "@prisma/client";
import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { INoteRepository } from "../../common/domain/repository/INoteRepository";
import { IStudentRepository } from "../../common/domain/repository/IStudentRepository";
import {
  FindDisciplineAverageQuery,
  FindClasseAverageQuery,
  FindStudentAverageQuery,
  FindSchoolAverageQuery,
  ClasseAverageDTO,
  SchoolAverageDTO,
  SubjectReportDTO,
  StudentDetailsDTO,
  AttendanceDetailsDTO,
  NoteDetailsDTO,
} from "./AverageNoteCommand";
import { ISchoolRepository } from "../../common/domain/repository/ISchoolRepository";
import { IClasseRepository } from "../../common/domain/repository/IClasseRepository";
import { IDisciplineRepository } from "../../common/domain/repository/IDisciplineRepository";
import { IStudentAttendanceRepository } from "../../common/domain/repository/IStudentAttendanceRepository";
import { calculerMoyenneFinale } from "../schoolsvc/handler/ProcessParentData";

// A passing grade is assumed to be 10 or higher.
const PASSING_GRADE = 10;

// =========================================================================
//
// HELPER FUNCTIONS TO CALCULATE AVERAGES
//
// =========================================================================

/**
 * Calculates the weighted average of notes based on their coefficients.
 * @param notes The array of Note objects.
 * @returns The weighted average as a number, or null if no notes or total coefficient is 0.
 */
const calculateWeightedAverage = (notes: Note[]): number | null => {
  if (notes.length === 0) {
    return null;
  }

  const totalWeightedNote = notes.reduce((sum, note) => sum + note.note * note.coefficient, 0);
  const totalCoefficient = notes.reduce((sum, note) => sum + note.coefficient, 0);

  if (totalCoefficient === 0) {
    return null; // Avoid division by zero
  }

  return Math.round((totalWeightedNote / totalCoefficient) * 10000) / 10000;
};

/**
 * Calculates a simple average from an array of numbers.
 * @param averages The array of average values.
 * @returns The simple average as a number, or null if the array is empty.
 */
const calculateSimpleAverage = (averages: (number | null)[]): number | null => {
  const validAverages = averages.filter((avg) => avg !== null) as number[];
  if (validAverages.length === 0) {
    return null;
  }
  const total = validAverages.reduce((sum, avg) => sum + avg, 0);
  return total / validAverages.length;
};

// =========================================================================
//
// QUERY HANDLERS
//
// =========================================================================

/**
 * Handles the calculation of the weighted average note for a specific discipline.
 */
export class FindDisciplineAverageQueryHandler
  implements IQueryHandler<FindDisciplineAverageQuery, number | null>
{
  constructor(private noteRepository: INoteRepository) {}

  public async execute(query: FindDisciplineAverageQuery): Promise<number | null> {
    const notes = await this.noteRepository.findByDisciplineId(query.disciplineId, query.schoolId);
    console.log("notes1", notes);
    return calculerMoyenneFinale(notes);
  }
}

/**
 * Handles the calculation of the simple average of student averages for a specific class.
 */
export class FindClasseAverageQueryHandler
  implements IQueryHandler<FindClasseAverageQuery, ClasseAverageDTO | null>
{
  constructor(
    private noteRepository: INoteRepository,
    private studentRepository: IStudentRepository,
    private classeRepository: IClasseRepository,
    private disciplineRepository: IDisciplineRepository,
    private studentAttendanceRepository: IStudentAttendanceRepository
  ) {}

  public async execute(query: FindClasseAverageQuery): Promise<ClasseAverageDTO | null> {
    const classe = await this.classeRepository.findById(query.classeId, query.schoolId);
    if (!classe) {
      return null;
    }

    const students = await this.studentRepository.findStudentByClass(
      query.classeId,
      query.schoolId
    );
    const numberOfStudents = students.length;

    const studentsData: StudentDetailsDTO[] = [];
    let allStudentAverages: (number | null)[] = [];
    let passingStudentsCount = 0;

    for (const student of students) {
      const studentNotes = await this.noteRepository.findByStudentId(student.id, query.schoolId);
      const studentAttendance = await this.studentAttendanceRepository.findByStudentId(student.id);

      const studentAverage = calculerMoyenneFinale(studentNotes);
      allStudentAverages.push(studentAverage);

      if (studentAverage !== null && studentAverage >= PASSING_GRADE) {
        passingStudentsCount++;
      }

      // Group notes by discipline and calculate individual averages
      const notesByDiscipline = studentNotes.reduce((acc, note) => {
        if (!acc[note.disciplineId]) {
          acc[note.disciplineId] = [];
        }
        acc[note.disciplineId].push(note);
        return acc;
      }, {} as Record<string, Note[]>);

      const subjectAverages: Record<string, number> = {};
      const disciplines = await Promise.all(
        Object.keys(notesByDiscipline).map((disciplineId) =>
          this.disciplineRepository.findDisciplineById(disciplineId, query.schoolId)
        )
      );

      disciplines.forEach((discipline) => {
        if (discipline) {
          const notes = notesByDiscipline[discipline.id];
          const average = calculerMoyenneFinale(notes);
          if (average !== null) {
            subjectAverages[discipline.name] = parseFloat(average.toFixed(1));
          }
        }
      });

      const detailedNotes = await Promise.all(
        studentNotes.map(async (note) => {
          const discipline = await this.disciplineRepository.findDisciplineById(
            note.disciplineId,
            query.schoolId
          );
          return {
            devoir: note.devoir,
            subject: discipline?.name || "Unknown",
            grade: note.note,
            coefficient: note.coefficient,
            date: note.date.toISOString().split("T")[0],
            type: note.type,
            appreciation: note.appreciation,
          } as NoteDetailsDTO;
        })
      );

      const detailedAttendance = await Promise.all(
        studentAttendance.map(async (attendance) => {
          const discipline = await this.disciplineRepository.findDisciplineById(
            attendance.disciplineId,
            query.schoolId
          );
          return {
            date: attendance.date.toISOString().split("T")[0],
            type: attendance.type,
            course: discipline?.name || "Unknown",
          } as AttendanceDetailsDTO;
        })
      );

      studentsData.push({
        id: student.id,
        firstName: `${student.prenom}`,
        lastName: `${student.nom}`,
        grades: detailedNotes,
        attendance: detailedAttendance,
        subjectAverages: subjectAverages,
        generalAverage: studentAverage,
        classe: `${classe.getNiveau()} ${classe.getNom()}`,
      });
    }

    const classAverage = calculateSimpleAverage(allStudentAverages);
    const successRate = (passingStudentsCount / numberOfStudents) * 100;

    // Get all notes for the class to calculate subject averages
    const allClassNotes = await this.noteRepository.findByClasseId(query.classeId, query.schoolId);

    // Group all class notes by discipline
    const classNotesByDiscipline = allClassNotes.reduce((acc, note) => {
      if (!acc[note.disciplineId]) {
        acc[note.disciplineId] = [];
      }
      acc[note.disciplineId].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    const subjectReports: SubjectReportDTO[] = [];
    const disciplineIds = Object.keys(classNotesByDiscipline);

    // Calculate the weighted average for each discipline based on all class notes
    for (const disciplineId of disciplineIds) {
      const notes = classNotesByDiscipline[disciplineId];
      const discipline = await this.disciplineRepository.findDisciplineById(
        disciplineId,
        query.schoolId
      );
      const average = calculerMoyenneFinale(notes);

      if (discipline && average !== null) {
        subjectReports.push({
          subject: discipline.name,
          average: average.toFixed(1),
        });
      }
    }

    return {
      classe: [classe.getNiveau(), classe.getNom()].join(" "),
      students: numberOfStudents,
      average: classAverage?.toFixed(1) ?? null,
      successRate: `${successRate.toFixed(0)}%`,
      studentsData: studentsData,
      subjectReports: subjectReports,
    };
  }
}

/**
 * Handles the calculation of the weighted average note for a specific student.
 */
export class FindStudentAverageQueryHandler
  implements IQueryHandler<FindStudentAverageQuery, number | null>
{
  constructor(private noteRepository: INoteRepository) {}

  public async execute(query: FindStudentAverageQuery): Promise<number | null> {
    const notes = await this.noteRepository.findByStudentId(query.studentId, query.schoolId);
    return calculerMoyenneFinale(notes);
  }
}

/**
 * Handles the calculation of the simple average of class averages for an entire school.
 */
export class FindSchoolAverageQueryHandler
  implements IQueryHandler<FindSchoolAverageQuery, SchoolAverageDTO | null>
{
  constructor(
    private noteRepository: INoteRepository,
    private schoolRepository: ISchoolRepository,
    private studentRepository: IStudentRepository,
    private disciplineRepository: IDisciplineRepository
  ) {}

  public async execute(query: FindSchoolAverageQuery): Promise<SchoolAverageDTO | null> {
    const classes = await this.schoolRepository.findClassesBySchool(query.schoolId);
    if (!classes || classes.length === 0) {
      return {
        schoolAverage: null,
        schoolSuccessRate: "0%",
        disciplinesCount: 0,
        classAverages: [],
        subjectReports: [],
      };
    }

    const allStudents = await this.studentRepository.findStudentBySchool(query.schoolId);
    const totalStudents = allStudents.length;

    const allNotes = await this.noteRepository.findBySchoolId(query.schoolId);
    const uniqueDisciplines = new Set(allNotes.map((note) => note.disciplineId));
    const disciplinesCount = uniqueDisciplines.size;

    const studentAverages = await Promise.all(
      allStudents.map(async (student) => {
        const studentNotes = await this.noteRepository.findByStudentId(student.id, query.schoolId);
        return calculerMoyenneFinale(studentNotes);
      })
    );
    const passingStudents = studentAverages.filter(
      (avg) => avg !== null && avg >= PASSING_GRADE
    ).length;
    const schoolSuccessRate = (passingStudents / totalStudents) * 100;

    // Calculate average for each discipline
    const subjectAverages: SubjectReportDTO[] = [];
    const disciplinePromises = Array.from(uniqueDisciplines).map(async (disciplineId) => {
      const notesForDiscipline = allNotes.filter((note) => note.disciplineId === disciplineId);
      const discipline = await this.disciplineRepository.findDisciplineById(
        disciplineId,
        query.schoolId
      );
      if (discipline) {
        const average = calculerMoyenneFinale(notesForDiscipline);
        subjectAverages.push({
          subject: discipline.name,
          average: average?.toFixed(1) ?? null,
        });
      }
    });

    await Promise.all(disciplinePromises);

    const classAverages = await Promise.all(
      classes.map(async (classe) => {
        const students = await this.studentRepository.findStudentByClass(classe.id, query.schoolId);
        const numberOfStudents = students.length;

        const studentAverages = await Promise.all(
          students.map(async (student) => {
            const studentNotes = await this.noteRepository.findByStudentId(
              student.id,
              query.schoolId
            );
            return calculerMoyenneFinale(studentNotes);
          })
        );
        const classAverage = calculateSimpleAverage(studentAverages);
        const passingClassStudents = studentAverages.filter(
          (avg) => avg !== null && avg >= PASSING_GRADE
        ).length;
        const successRate = (passingClassStudents / numberOfStudents) * 100;

        return {
          classeId: classe.id,
          classe: `${classe.niveau} ${classe.nom}`,
          students: numberOfStudents,
          average: classAverage?.toFixed(1) ?? null,
          successRate: `${successRate.toFixed(0)}%`,
          studentsData: [],
          subjectReports: [],
        } as ClasseAverageDTO;
      })
    );

    const schoolAverage = calculateSimpleAverage(
      classAverages.map((ca) => (ca.average ? parseFloat(ca.average) : null))
    );

    return {
      schoolAverage: schoolAverage?.toFixed(1) ?? null,
      schoolSuccessRate: `${schoolSuccessRate.toFixed(0)}%`,
      disciplinesCount,
      classAverages: classAverages,
      subjectReports: subjectAverages,
    };
  }
}

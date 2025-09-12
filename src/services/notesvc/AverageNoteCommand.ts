// =========================================================================
//
// QUERY DTOs (DATA TRANSFER OBJECTS)
//
// =========================================================================

export interface NoteDetailsDTO {
  devoir: boolean;
  subject: string;
  grade: number;
  coefficient: number;
  date: string;
  type: string;
  appreciation: string | null;
}

export interface AttendanceDetailsDTO {
  date: string;
  type: string;
  course: string;
}

export interface SubjectReportDTO {
  subject: string;
  average: string | null;
}

export interface StudentDetailsDTO {
  id: string;
  firstName: string;
  lastName: string;
  classe: string;
  grades: NoteDetailsDTO[];
  attendance: AttendanceDetailsDTO[];
  subjectAverages: { [key: string]: number };
  generalAverage: number | null;
}

export interface ClasseAverageDTO {
  classe: string;
  students: number;
  average: string | null;
  successRate: string | null;
  studentsData: StudentDetailsDTO[];
  subjectReports: SubjectReportDTO[];
}

export interface SubjectReportDTO {
  subject: string;
  average: string | null;
}

export interface SchoolAverageDTO {
  schoolAverage: string | null;
  schoolSuccessRate: string | null;
  disciplinesCount: number;
  classAverages: ClasseAverageDTO[];
  subjectReports: SubjectReportDTO[];
}

/**
 * Query to find the average note for a specific discipline.
 */
export class FindDisciplineAverageQuery {
  constructor(public readonly disciplineId: string, public readonly schoolId: string) {}
}

/**
 * Query to find the detailed average note for a specific class.
 */
export class FindClasseAverageQuery {
  constructor(public readonly classeId: string, public readonly schoolId: string) {}
}

/**
 * Query to find the average note for a specific student.
 */
export class FindStudentAverageQuery {
  constructor(public readonly studentId: string, public readonly schoolId: string) {}
}

/**
 * Query to find the detailed average note for an entire school.
 */
export class FindSchoolAverageQuery {
  constructor(public readonly schoolId: string) {}
}

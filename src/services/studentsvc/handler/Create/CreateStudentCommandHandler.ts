import { IStudentRepository } from "../../../../common/domain/repository/IStudentRepository";
import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { Student } from "../../../../common/domain/entities/Student";
import { CreateStudentCommand } from "./CreateStudentCommand";

export class CreateStudentCommandHandler implements ICommandHandler<CreateStudentCommand, Student> {
  constructor(private studentRepository: IStudentRepository) {}

  execute(command: CreateStudentCommand): Promise<Student> {
    const student: Student = Student.createStudent(
      command.nom,
      command.prenom,
      command.dateOfBirth,
      0,
      0,
      0,
      command.classe,
      command.schoolId
    );
    return this.studentRepository.create(student);
  }
}

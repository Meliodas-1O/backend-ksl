import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IStudentRepository } from "../../../../common/domain/repository/IStudentRepository";
import { UpdateStudentCommand } from "./UpdateStudentCommand";
import { Student } from "../../../../common/domain/entities/Student";
import { UserNotFoundError } from "../../../../common/application/dto/UserNotFoundError";

export class UpdateStudentCommandHandler implements ICommandHandler<UpdateStudentCommand, Student> {
  constructor(private repository: IStudentRepository) {}

  async execute(command: UpdateStudentCommand): Promise<Student> {
    const existingStudent = await this.repository.findStudentById(command.id);

    if (!existingStudent) {
      throw new UserNotFoundError(`Student with ID : ${command.id}  not found`);
    }
    const commandStudent = command.student;
    const student = Student.updateStudent(
      commandStudent.nom,
      commandStudent.prenom,
      new Date(commandStudent.dateOfBirth),
      existingStudent.classe,
      existingStudent.schoolId
    );

    student.classe = command.student.classeId ?? "";
    student.parentId = command.student.parentId ?? "";
    return this.repository.update(command.id, student);
  }
}

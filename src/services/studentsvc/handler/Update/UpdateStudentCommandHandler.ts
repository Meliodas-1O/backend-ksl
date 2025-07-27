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
      throw new UserNotFoundError("Student not found");
    }
    const commandStudent = command.student;
    const student = Student.updateStudent(
      commandStudent.nom,
      commandStudent.prenom,
      new Date(commandStudent.dateOfBirth),
      commandStudent.abscence,
      commandStudent.retards,
      commandStudent.moyenne,
      existingStudent.classe,
      existingStudent.schoolId
    );
    //const student : Student = Student.createStudent(command.)
    return this.repository.update(command.id, student);
  }
}

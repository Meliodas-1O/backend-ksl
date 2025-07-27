import { UpdateStudentRequest } from "../../../../services/studentsvc/models/Update/UpdateStudentRequest";

export class UpdateStudentCommand {
  constructor(public id: string, public student: UpdateStudentRequest) {}
}

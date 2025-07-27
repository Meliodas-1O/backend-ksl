import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IStudentRepository } from "../../../../common/domain/repository/IStudentRepository";
import { DeleteStudentCommand } from "./DeleteStudentCommand";

export class DeleteStudentCommandHandler implements ICommandHandler<DeleteStudentCommand, void> {
  constructor(private repository: IStudentRepository) {}

  async execute(command: DeleteStudentCommand): Promise<void> {
    return this.repository.delete(command.id);
  }
}

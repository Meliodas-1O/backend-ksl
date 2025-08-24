import { ICommandHandler } from "../../../../common/domain/contracts/ICommandHandler";
import { IUserRepository } from "../../../../common/domain/repository/IUserRepository";
import { DeleteUserCommand } from "./DeleteUserCommand";

export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
  constructor(private userRepository: IUserRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    return this.userRepository.delete(command.userId);
  }
}

import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { IMessageRepository } from "../../common/domain/repository/IMessageRepository";
import { UpdateMessageStatusCommand } from "./Commands";

export class UpdateMessageStatusCommandHandler
  implements ICommandHandler<UpdateMessageStatusCommand, boolean>
{
  constructor(private messageRepository: IMessageRepository) {}

  async execute(command: UpdateMessageStatusCommand): Promise<boolean> {
    const { messsageId, schoolId } = command;

    return this.messageRepository.updateMessageStatus(messsageId, schoolId);
  }
}

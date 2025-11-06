import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";
import { INotificationRepository } from "../../common/domain/repository/INotificationRepository";
import { UpdateNotificationStatusCommand } from "./Commands";

export class UpdateNotificationStatusCommandHandler
  implements ICommandHandler<UpdateNotificationStatusCommand, boolean>
{
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(command: UpdateNotificationStatusCommand): Promise<boolean> {
    const { messsageId, schoolId } = command;

    return this.notificationRepository.updateNotificationStatus(
      messsageId,
      schoolId
    );
  }
}

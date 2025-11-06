import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { INotificationRepository } from "../../common/domain/repository/INotificationRepository";
import { GetNotificationsQuery } from "./Queries";

export class GetNotificationsQueryHandler
  implements IQueryHandler<GetNotificationsQuery, any[] | null>
{
  constructor(private readonly repository: INotificationRepository) {}

  async execute(query: GetNotificationsQuery): Promise<any[] | null> {
    return this.repository.getAllNotifications(query.userId, query.schoolId);
  }
}

import { IQueryHandler } from "../../common/domain/contracts/IQueryHandler";
import { IMessageRepository } from "../../common/domain/repository/IMessageRepository";
import { GetAllMessagesQuery } from "./Queries";

export class GetAllMessagesQueryHandler
  implements IQueryHandler<GetAllMessagesQuery, any[] | null>
{
  constructor(private readonly repository: IMessageRepository) {}

  async execute(query: GetAllMessagesQuery): Promise<any[] | null> {
    return this.repository.findAllConversation(query.userId, query.schoolId);
  }
}

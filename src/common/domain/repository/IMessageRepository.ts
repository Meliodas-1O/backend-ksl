export interface IMessageRepository {
  findAllConversation(userId: string, schoolId: string): Promise<any[]>;
}

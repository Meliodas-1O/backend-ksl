export interface IMessageRepository {
  findAllConversation(userId: string, schoolId: string): Promise<any[]>;
  updateMessageStatus(messageId: string, schoolId: string): Promise<boolean>;
}

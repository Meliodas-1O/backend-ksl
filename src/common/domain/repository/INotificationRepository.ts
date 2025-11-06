export interface INotificationRepository {
  getAllNotifications(userId: string, schoolId: string): Promise<any[]>;

  updateNotificationStatus(
    notificationId: string,
    schoolId: string
  ): Promise<boolean>;
}

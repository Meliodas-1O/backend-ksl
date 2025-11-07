import { PrismaClient } from "@prisma/client";
import { INotificationRepository } from "../../domain/repository/INotificationRepository";

const prisma = new PrismaClient(); // Prisma instance

export const NotificationPrismaRepository: INotificationRepository = {
  getAllNotifications: async function (userId: string, schoolId: string): Promise<any[]> {
    const roles = await prisma.userRole.findMany({
      where: { userId: userId },
      include: {
        role: {
          select: { name: true },
        },
      },
    });
    const receiverTypes = roles.map((ur) => ur.role.name);
    receiverTypes.push("ALL");
    return await prisma.notification.findMany({
      where: {
        schoolId: schoolId,
        receiverType: { in: receiverTypes },
      },
      orderBy: { time: "desc" },
    });
  },

  updateNotificationStatus: async function (
    notificationId: string,
    schoolId: string
  ): Promise<boolean> {
    await prisma.notification.updateMany({
      where: { id: notificationId, schoolId: schoolId },
      data: { opened: true },
    });
    return true;
  },
};

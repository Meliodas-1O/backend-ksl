import { PrismaClient } from "@prisma/client";
import { IMessageRepository } from "../../domain/repository/IMessageRepository";

const prisma = new PrismaClient(); // Prisma instance

export const messagePrismaRepository: IMessageRepository = {
  findAllConversation: async function (userId: string, schoolId: string): Promise<any[]> {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const messages = await prisma.message.findMany({
      where: {
        sentAt: {
          gte: sixMonthsAgo,
        },
        schoolId: schoolId,
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: {
        sentAt: "desc",
      },
      include: {
        sender: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            userRoles: {
              select: {
                role: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            userRoles: {
              select: {
                role: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const result = messages.map((msg) => {
      return {
        ...msg,
        sender: {
          ...msg.sender,
          userRoles: [...new Set(msg.sender.userRoles.map((ur) => ur.role.name))],
        },
        receiver: {
          ...msg.receiver,
          userRoles: [...new Set(msg.receiver.userRoles.map((ur) => ur.role.name))],
        },
      };
    });
    return result;
  },
};

import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { authenticateSocket } from "./authenticateSocket";
import * as crypto from "crypto";
import { encoder } from "../common/infrastructure/security/Base64MessageEncoder";

const prisma = new PrismaClient();

export let io: Server;

export const initSocketServer = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket: Socket) => {
    const user = socket.data.user || null;
    const userId = socket.data.user?.userId || "unknown";
    console.log(`User connected: ${userId}`);

    socket.join(userId); // user joins their personal room

    socket.on("send_message", async (data) => {
      const { receiverId, text } = data;

      //   Save to DB
      const message = await prisma.message.create({
        data: {
          content: encoder.encode(text),
          read: false,
          receiverId,
          schoolId: user.schoolId,
          senderId: userId,
        },
      });

      // Emit to receiver and sender
      io.to(receiverId).emit("receive_message", message);
      console.log(`Message received from : ${userId} to ${receiverId}`);
      socket.emit("message_sent", message);
    });

    socket.on("send_notification", async (data) => {
      let { receiverId, text } = data;
      console.log("kkkk", data);
      console.log("receiverId", receiverId);
      console.log("userId", userId);
      receiverId = receiverId ?? userId;
      //   Save to DB
      const notification = await prisma.notification.create({
        data: {
          urgent: false,
          opened: false,
          receiverId: receiverId ?? userId,
          schoolId: user.schoolId,
          content: text,
          senderId: userId,
          receiverType: "ALL",
          type: "Contrôle absence",
        },
      });

      // Emit to receiver and sender
      io.to(receiverId).emit("receive_notification", notification);
      console.log(`Notification received from : ${userId} to ${receiverId}`);
      socket.emit("notification_sent", notification);
    });

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${userId}, socket Id: ${socket.id}, Reason: ${reason}`);
    });
  });
};

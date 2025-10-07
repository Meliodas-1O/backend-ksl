import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { authenticateSocket } from "./authenticateSocket";
import { messageEncoderSingleton } from "../common/infrastructure/security/MessageEnocder";
import * as crypto from "crypto";
import {
  Base64MessageEncoder,
  encoder,
} from "../common/infrastructure/security/Base64MessageEncoder";

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
  const key = crypto.randomBytes(32); // 256-bit key for AES-256

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

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${userId}, socket Id: ${socket.id}, Reason: ${reason}`);
    });
  });
};

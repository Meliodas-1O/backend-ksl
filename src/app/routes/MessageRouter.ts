import express from "express";
import { authenticateToken } from "../middlewares/AuthenticateToken";
import { MessageController } from "../controllers/MessageController";

const messageRouter = express.Router();

messageRouter.get(
  "/:schoolId/messages/:userId",
  authenticateToken,
  MessageController.getAllMessages
);

messageRouter.put(
  "/:schoolId/messages/updateStatus",
  authenticateToken,
  MessageController.updateMessageStatus
);

export default messageRouter;

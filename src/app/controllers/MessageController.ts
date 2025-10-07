import { RequestHandler } from "express";
import { mediator } from "../../common/mediator/Mediator";
import { GetAllMessagesQuery } from "../../services/messagesvc/Queries";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { UpdateMessageStatusCommand } from "../../services/messagesvc/Commands";

const getAllMessages: RequestHandler = async (req, res) => {
  try {
    const query = new GetAllMessagesQuery(req.params.userId, req.params.schoolId);
    const result: any[] | null = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error(`Get messages of user with Id : ${req.params.userId}`, error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateMessageStatus: RequestHandler = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) {
      res
        .status(StatusCode.BAD_REQUEST)
        .json({ reason: "messageId is required and should not be null or empty" });
      return;
    }
    const query = new UpdateMessageStatusCommand(messageId, req.params.schoolId);
    const result: boolean = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error(`Update message with ID : ${req.body.messageId}`, error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const MessageController = {
  getAllMessages,
  updateMessageStatus,
};

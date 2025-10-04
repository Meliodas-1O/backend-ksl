import { RequestHandler } from "express";
import { mediator } from "../../common/mediator/Mediator";
import { GetAllMessagesQuery } from "../../services/messagesvc/Queries";
import { StatusCode } from "../../common/application/dto/StatusCode";

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

export const MessageController = {
  getAllMessages,
};

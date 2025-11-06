import { RequestHandler } from "express";
import { GetNotificationsQuery } from "../../services/notificationsvc/Queries";
import { mediator } from "../../common/mediator/Mediator";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { UpdateNotificationStatusCommand } from "../../services/notificationsvc/Commands";

const getAllNotifications: RequestHandler = async (req, res) => {
  try {
    const query = new GetNotificationsQuery(
      req.params.userId,
      req.params.schoolId
    );
    const result: any[] | null = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error(
      `Get notifications of user with Id : ${req.params.userId}`,
      error
    );
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const updateNotificationStatus: RequestHandler = async (req, res) => {
  try {
    const { notificationId, schoolId } = req.params;
    const command = new UpdateNotificationStatusCommand(
      notificationId,
      schoolId
    );
    const result: boolean = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error(
      `Update notification with ID : ${req.params.notificationId}`,
      error
    );
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

export const NotificationController = {
  getAllNotifications,
  updateNotificationStatus,
};

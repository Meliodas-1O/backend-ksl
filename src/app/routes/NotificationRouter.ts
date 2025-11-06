import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const notificationRouter = Router();

notificationRouter.get(
  "/:schoolId/users/:userId/notifications",
  NotificationController.getAllNotifications
);

notificationRouter.put(
  "/:schoolId/notifications/:notificationId/status",
  NotificationController.updateNotificationStatus
);

export default notificationRouter;

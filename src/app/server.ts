import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { config } from "dotenv";
import express from "express";
import { registerHandlers } from "../common/mediator/registerMediator";
import adminRouter from "./routes/AdminRouter";
import authRouter from "./routes/AuthRouter";
import noteAverageRouter from "./routes/AverageNoteRouter";
import classeRouter from "./routes/ClasseRouter";
import coursRouter from "./routes/CoursRouter";
import disciplineRouter from "./routes/DisciplineRouter";
import evaluationRouter from "./routes/EvaluationRouter";
import noteRouter from "./routes/NoteRouter";
import schoolRouter from "./routes/SchoolRouter";
import studentAttendanceRouter from "./routes/StudentAttendanceRouter";
import studentRouter from "./routes/StudentRouter";
import userRouter from "./routes/UserRouter";
import { initSocketServer } from "../socket";
import messageRouter from "./routes/MessageRouter";
import emargementRouter from "./routes/EmargementRouter";
import notificationRouter from "./routes/NotificationRouter";

config();

registerHandlers();
const allowedOrigins = [
  "https://seekids.net",
  "https://test.seekids.net",
  "https://dakar-leaders-school.seekids.net",
  "https://le-refuge-des-petits.seekids.net",
  "http://localhost:8080",
  "http://localhost:8081",
  // add other known client origins here
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests like Postman

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
const server = http.createServer(app); // 👈 Create HTTP server (for socket.io)

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/schools", schoolRouter);
app.use("/api/schools", studentRouter);
app.use("/api/schools", classeRouter);
app.use("/api/schools", disciplineRouter);
app.use("/api/schools", coursRouter);
app.use("/api/schools", userRouter);
app.use("/api/schools", studentAttendanceRouter);
app.use("/api/schools", noteRouter);
app.use("/api/schools", noteAverageRouter);
app.use("/api/schools", evaluationRouter);
app.use("/api/schools", messageRouter);
app.use("/api/schools", notificationRouter);
app.use("/api/schools", emargementRouter);
app.use("/api/admin-actions", adminRouter);

// ✅ Simple hello route
app.get("/", (req, res) => {
  res.status(201).send("Hello");
});

const port = Number(process.env.PORT) || 3000;
initSocketServer(server);
server.listen(port, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${port}`)
);

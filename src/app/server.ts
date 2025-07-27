import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { RegisterCommandHandler } from "../services/authentication/handler/register/RegisterCommandHandler";
import { IUserRepository } from "../common/domain/repository/IUserRepository";
import { IPasswordHasher } from "../common/domain/contracts/IPasswordHasher";
import { mediator } from "../common/mediator/Mediator";
import { RegisterCommand } from "../services/authentication/handler/register/RegisterCommand";
import authRouter from "./routes/AuthRouter";
import { LoginCommand } from "../services/authentication/handler/login/LoginCommand";
import { LoginCommandHandler } from "../services/authentication/handler/login/LoginCommandHandler";
import { IJwtService } from "../common/domain/contracts/IJwtService";
import { ResetPasswordCommand } from "../services/authentication/handler/resetPassword/ResetPasswordCommand";
import { ResetPasswordCommandHandler } from "../services/authentication/handler/resetPassword/ResetPasswordCommandHandler";
import { userPrismaRepository } from "../common/infrastructure/repositories/UserPrismaRepository";
import { jwtService } from "../common/infrastructure/security/JwtService";
import { passwordHasher } from "../common/infrastructure/security/PasswordHasher";
import studentRouter from "./routes/StudentRouter";
import { CreateStudentCommand } from "../services/studentsvc/handler/Create/CreateStudentCommand";
import { IStudentRepository } from "../common/domain/repository/IStudentRepository";
import { studentPrismaRepository } from "../common/infrastructure/repositories/StudentPrismaRepository";
import { CreateStudentCommandHandler } from "../services/studentsvc/handler/Create/CreateStudentCommandHandler";
import { DeleteStudentCommand } from "../services/studentsvc/handler/Delete/DeleteStudentCommand";
import { DeleteStudentCommandHandler } from "../services/studentsvc/handler/Delete/DeleteStudentCommandHandler";
import { GetStudentsBySchoolQuery } from "../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQuery";
import { GetStudentsBySchoolQueryHandler } from "../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQueryHandler";
import { UpdateStudentCommand } from "../services/studentsvc/handler/Update/UpdateStudentCommand";
import { UpdateStudentCommandHandler } from "../services/studentsvc/handler/Update/UpdateStudentCommandHandler";
import schoolRouter from "./routes/SchoolRouter";
import { GetStudentsByIdQuery } from "../services/studentsvc/handler/Read/ById/GetStudentsByIdQuery";
import { GetStudentsByIdQueryHandler } from "../services/studentsvc/handler/Read/ById/GetStudentsByIdQueryHandler";
config();

// #region Dependance injection

// Add repositories
const userRepository: IUserRepository = userPrismaRepository;
const studentRepository: IStudentRepository = studentPrismaRepository;

// Add services
const pwdHasher: IPasswordHasher = passwordHasher;
const jwtSvc: IJwtService = jwtService;

// RegisterHandler
mediator.register<RegisterCommand>(
  "RegisterCommand",
  new RegisterCommandHandler(userRepository, pwdHasher)
);

// LoginHandler
mediator.register<LoginCommand>(
  "LoginCommand",
  new LoginCommandHandler(userRepository, pwdHasher, jwtSvc)
);

// LoginHandler
mediator.register<ResetPasswordCommand>(
  "ResetPasswordCommand",
  new ResetPasswordCommandHandler(userRepository, pwdHasher)
);

// Create student handler
mediator.register<CreateStudentCommand>(
  "CreateStudentCommand",
  new CreateStudentCommandHandler(studentPrismaRepository)
);

mediator.register<UpdateStudentCommand>(
  "UpdateStudentCommand",
  new UpdateStudentCommandHandler(studentPrismaRepository)
);

mediator.register<DeleteStudentCommand>(
  "DeleteStudentCommand",
  new DeleteStudentCommandHandler(studentPrismaRepository)
);

mediator.register<GetStudentsByIdQuery>(
  "GetStudentsByIdQuery",
  new GetStudentsByIdQueryHandler(studentPrismaRepository)
);

mediator.register<GetStudentsBySchoolQuery>(
  "GetStudentsBySchoolQuery",
  new GetStudentsBySchoolQueryHandler(studentPrismaRepository)
);

// #endregion

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter); // ✅ Plug the router
app.use("/api/students", studentRouter);
app.use("/api/schools", schoolRouter);
// ✅ Simple hello route
app.get("/", (req, res) => {
  res.status(201).send("Hello");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const RegisterCommandHandler_1 = require("../services/authentication/handler/register/RegisterCommandHandler");
const Mediator_1 = require("../common/mediator/Mediator");
const AuthRouter_1 = __importDefault(require("./routes/AuthRouter"));
const LoginCommandHandler_1 = require("../services/authentication/handler/login/LoginCommandHandler");
const ResetPasswordCommandHandler_1 = require("../services/authentication/handler/resetPassword/ResetPasswordCommandHandler");
const UserPrismaRepository_1 = require("../common/infrastructure/repositories/UserPrismaRepository");
const JwtService_1 = require("../common/infrastructure/security/JwtService");
const PasswordHasher_1 = require("../common/infrastructure/security/PasswordHasher");
const StudentRouter_1 = __importDefault(require("./routes/StudentRouter"));
const StudentPrismaRepository_1 = require("../common/infrastructure/repositories/StudentPrismaRepository");
const CreateStudentCommandHandler_1 = require("../services/studentsvc/handler/Create/CreateStudentCommandHandler");
const DeleteStudentCommandHandler_1 = require("../services/studentsvc/handler/Delete/DeleteStudentCommandHandler");
const GetStudentsBySchoolQueryHandler_1 = require("../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQueryHandler");
const UpdateStudentCommandHandler_1 = require("../services/studentsvc/handler/Update/UpdateStudentCommandHandler");
const SchoolRouter_1 = __importDefault(require("./routes/SchoolRouter"));
const GetStudentsByIdQueryHandler_1 = require("../services/studentsvc/handler/Read/ById/GetStudentsByIdQueryHandler");
const SchoolPrismaRepository_1 = require("../common/infrastructure/repositories/SchoolPrismaRepository");
const CreateSchoolCommandHandler_1 = require("../services/schoolsvc/handler/CreateSchool/CreateSchoolCommandHandler");
const DeleteSchoolCommandHandler_1 = require("../services/schoolsvc/handler/DeleteSchool/DeleteSchoolCommandHandler");
const GetSchoolIdQueryHandler_1 = require("../services/schoolsvc/handler/GetSchoolById/GetSchoolIdQueryHandler");
const GetAllSchoolsQueryHandler_1 = require("../services/schoolsvc/handler/GetSchools/GetAllSchoolsQueryHandler");
const GetAdminsBySchoolQueryHandler_1 = require("../services/schoolsvc/handler/getAdmins/GetAdminsBySchoolQueryHandler");
const GetClassesBySchoolQueryHandler_1 = require("../services/schoolsvc/handler/getClass/GetClassesBySchoolQueryHandler");
const GetTeachersBySchoolQueryHandler_1 = require("../services/schoolsvc/handler/getTeachers/GetTeachersBySchoolQueryHandler");
const GetParentsBySchoolQueryHandler_1 = require("../services/schoolsvc/handler/getParents/GetParentsBySchoolQueryHandler");
const ClasseRouter_1 = __importDefault(require("./routes/ClasseRouter"));
const Commands_1 = require("../services/classesvc/handler/Commands");
const ClassePrismaRepository_1 = require("../common/infrastructure/repositories/ClassePrismaRepository");
const CommandHandler_1 = require("../services/classesvc/handler/CommandHandler");
const CoursPrismaRepository_1 = require("../common/infrastructure/repositories/CoursPrismaRepository");
const CommandHandler_2 = require("../services/courssvc/CommandHandler");
const Commands_2 = require("../services/courssvc/Commands");
const DeleteUserCommandHandler_1 = require("../services/authentication/handler/delete/DeleteUserCommandHandler");
const SchoolQueryHandler_1 = require("../services/schoolsvc/handler/SchoolQueryHandler");
const DisciplinePrismaRepository_1 = require("../common/infrastructure/repositories/DisciplinePrismaRepository");
const DisciplineRouter_1 = __importDefault(require("./routes/DisciplineRouter"));
const CommandHandlers_1 = require("../services/usersvc/handlers/CommandHandlers");
const Commands_3 = require("../services/usersvc/handlers/Commands");
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
(0, dotenv_1.config)();
// #region Dependance injection
// Add repositories
const userRepository = UserPrismaRepository_1.userPrismaRepository;
const studentRepository = StudentPrismaRepository_1.studentPrismaRepository;
const schoolRepository = SchoolPrismaRepository_1.schoolPrismaRepository;
const classRepository = ClassePrismaRepository_1.classePrismaRepository;
const coursRepository = CoursPrismaRepository_1.coursPrismaRepository;
const disciplineRepository = DisciplinePrismaRepository_1.disciplinePrismaRepository;
// Add services
const pwdHasher = PasswordHasher_1.passwordHasher;
const jwtSvc = JwtService_1.jwtService;
// RegisterHandler
Mediator_1.mediator.register("RegisterCommand", new RegisterCommandHandler_1.RegisterCommandHandler(userRepository, pwdHasher));
// LoginHandler
Mediator_1.mediator.register("LoginCommand", new LoginCommandHandler_1.LoginCommandHandler(userRepository, pwdHasher, jwtSvc));
// LoginHandler
Mediator_1.mediator.register("ResetPasswordCommand", new ResetPasswordCommandHandler_1.ResetPasswordCommandHandler(userRepository, pwdHasher));
Mediator_1.mediator.register("DeleteUserCommand", new DeleteUserCommandHandler_1.DeleteUserCommandHandler(userRepository));
// Create student handler
Mediator_1.mediator.register("CreateStudentCommand", new CreateStudentCommandHandler_1.CreateStudentCommandHandler(studentRepository));
Mediator_1.mediator.register("UpdateStudentCommand", new UpdateStudentCommandHandler_1.UpdateStudentCommandHandler(studentRepository));
Mediator_1.mediator.register("DeleteStudentCommand", new DeleteStudentCommandHandler_1.DeleteStudentCommandHandler(studentRepository));
Mediator_1.mediator.register("GetStudentsByIdQuery", new GetStudentsByIdQueryHandler_1.GetStudentsByIdQueryHandler(studentRepository));
Mediator_1.mediator.register("GetStudentsBySchoolQuery", new GetStudentsBySchoolQueryHandler_1.GetStudentsBySchoolQueryHandler(studentRepository));
// ---------------------------------------------
// Register School Handlers
// ---------------------------------------------
// Commands
Mediator_1.mediator.register("CreateSchoolCommand", new CreateSchoolCommandHandler_1.CreateSchoolCommandHandler(schoolRepository));
Mediator_1.mediator.register("DeleteSchoolCommand", new DeleteSchoolCommandHandler_1.DeleteSchoolCommandHandler(schoolRepository));
// Queries
Mediator_1.mediator.register("GetSchoolByIdQuery", new GetSchoolIdQueryHandler_1.GetSchoolByIdQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetAllSchoolsQuery", new GetAllSchoolsQueryHandler_1.GetAllSchoolsQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetTeachersBySchoolQuery", new GetTeachersBySchoolQueryHandler_1.GetTeachersBySchoolQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetParentsBySchoolQuery", new GetParentsBySchoolQueryHandler_1.GetParentsBySchoolQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetAdminsBySchoolQuery", new GetAdminsBySchoolQueryHandler_1.GetAdminsBySchoolQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetClassesBySchoolQuery", new GetClassesBySchoolQueryHandler_1.GetClassesBySchoolQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetStudentByIdQuery", new SchoolQueryHandler_1.GetStudentByIdQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetTeacherByIdQuery", new SchoolQueryHandler_1.GetTeacherByIdQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetParentByIdQuery", new SchoolQueryHandler_1.GetParentByIdQueryHandler(schoolRepository));
Mediator_1.mediator.register("GetOneClasseByIdQuery", new SchoolQueryHandler_1.GetOneClasseByIdQueryHandler(schoolRepository));
// ---------------------------------------------
// Register Classe Command Handlers (Mutations)
// ---------------------------------------------
Mediator_1.mediator.register(Commands_1.CreateClasseCommand.name, new CommandHandler_1.CreateClasseCommandHandler(classRepository));
Mediator_1.mediator.register(Commands_1.UpdateClasseCommand.name, new CommandHandler_1.UpdateClasseCommandHandler(classRepository));
Mediator_1.mediator.register(Commands_1.DeleteClasseCommand.name, new CommandHandler_1.DeleteClasseCommandHandler(classRepository));
Mediator_1.mediator.register(Commands_1.AssignProfesseurToClasseCommand.name, new CommandHandler_1.AssignProfesseurToClasseCommandHandler(classRepository));
Mediator_1.mediator.register(Commands_1.AssignMatiereToClasseCommand.name, new CommandHandler_1.AssignMatiereToClasseCommandHandler(classRepository));
// ---------------------------------------------
// Register Classe Query Handlers (Reads)
// ---------------------------------------------
Mediator_1.mediator.register(Commands_1.GetAllClassesQuery.name, new CommandHandler_1.GetAllClassesQueryHandler(classRepository));
Mediator_1.mediator.register(Commands_1.GetClasseByIdQuery.name, new CommandHandler_1.GetClasseByIdQueryHandler(classRepository));
Mediator_1.mediator.register(Commands_1.GetStudentsInClasseQuery.name, new CommandHandler_1.GetStudentsInClasseQueryHandler(classRepository));
Mediator_1.mediator.register(Commands_1.GetProfessorsInClasseQuery.name, new CommandHandler_1.GetProfessorsInClasseQueryHandler(classRepository));
Mediator_1.mediator.register(Commands_1.GetParentsInClasseQuery.name, new CommandHandler_1.GetParentsInClasseQueryHandler(classRepository));
Mediator_1.mediator.register(Commands_1.GetDisciplinesInClasseQuery.name, new CommandHandler_1.GetDisciplinesInClasseQueryHandler(classRepository));
// ---------------------------------------------
// Register Cours Command Handlers (Mutations)
// ---------------------------------------------
Mediator_1.mediator.register(Commands_2.CreateCoursCommand.name, new CommandHandler_2.CreateCoursCommandHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.UpdateCoursCommand.name, new CommandHandler_2.UpdateCoursCommandHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.DeleteCoursCommand.name, new CommandHandler_2.DeleteCoursCommandHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.AssignProfesseurToCoursCommand.name, new CommandHandler_2.AssignProfesseurToCoursCommandHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.AssignMatiereToCoursCommand.name, new CommandHandler_2.AssignMatiereToCoursCommandHandler(coursRepository));
// ---------------------------------------------
// Register Cours Query Handlers (Reads)
// ---------------------------------------------
Mediator_1.mediator.register(Commands_2.GetAllCoursQuery.name, new CommandHandler_2.GetAllCoursQueryHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.GetCoursByIdQuery.name, new CommandHandler_2.GetCoursByIdQueryHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.GetCoursByProfesseurQuery.name, new CommandHandler_2.GetCoursByProfesseurQueryHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.GetCoursByClasseQuery.name, new CommandHandler_2.GetCoursByClasseQueryHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.GetCoursByDayQuery.name, new CommandHandler_2.GetCoursByDayQueryHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.GetCoursByWeekQuery.name, new CommandHandler_2.GetCoursByWeekQueryHandler(coursRepository));
Mediator_1.mediator.register(Commands_2.GetAllDisciplinesQuery.name, new CommandHandler_2.GetAllDisciplinesQueryHandler(disciplineRepository));
Mediator_1.mediator.register(Commands_2.GetDisciplineByIdQuery.name, new CommandHandler_2.GetDisciplineByIdQueryHandler(disciplineRepository));
// Register UpdateParentFromAdminCommandHandler
Mediator_1.mediator.register(Commands_3.UpdateParentFromAdminQuery.name, new CommandHandlers_1.UpdateParentFromAdminCommandHandler(userRepository));
// Register UpdateTeacherFromAdminCommandHandler
Mediator_1.mediator.register(Commands_3.UpdateTeacherFromAdminQuery.name, new CommandHandlers_1.UpdateTeacherFromAdminCommandHandler(userRepository));
// Register UpdateSelfTeacherCommandHandler
Mediator_1.mediator.register(Commands_3.UpdateSelfTeacherQuery.name, new CommandHandlers_1.UpdateSelfTeacherCommandHandler(userRepository));
// Register UpdateSelfParentCommandHandler
Mediator_1.mediator.register(Commands_3.UpdateSelfParentQuery.name, new CommandHandlers_1.UpdateSelfParentCommandHandler(userRepository));
// #endregion
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", AuthRouter_1.default);
app.use("/api/schools", SchoolRouter_1.default);
app.use("/api/students", StudentRouter_1.default);
app.use("/api/schools", ClasseRouter_1.default);
app.use("/api/schools", DisciplineRouter_1.default);
app.use("/api/schools", UserRouter_1.default);
// ✅ Simple hello route
app.get("/", (req, res) => {
    res.status(201).send("Hello");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

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
import { schoolPrismaRepository } from "../common/infrastructure/repositories/SchoolPrismaRepository";
import { GetSchoolByIdQuery } from "../services/schoolsvc/handler/GetSchoolById/GetSchoolByIdQuery";
import { GetSchoolByIdQueryHandler } from "../services/schoolsvc/handler/GetSchoolById/GetSchoolIdQueryHandler";
import { GetAllSchoolsQuery } from "../services/schoolsvc/handler/GetSchools/GetAllSchoolsQuery";
import { GetAllSchoolsQueryHandler } from "../services/schoolsvc/handler/GetSchools/GetAllSchoolsQueryHandler";
import { GetTeachersBySchoolQuery } from "../services/schoolsvc/handler/getTeachers/GetTeachersBySchoolQuery";
import { GetAdminsBySchoolQuery } from "../services/schoolsvc/handler/getAdmins/GetAdminsBySchoolQuery";
import { GetAdminsBySchoolQueryHandler } from "../services/schoolsvc/handler/getAdmins/GetAdminsBySchoolQueryHandler";
import { GetClassesBySchoolQuery } from "../services/schoolsvc/handler/getClass/GetClassesBySchoolQuery";
import { GetClassesBySchoolQueryHandler } from "../services/schoolsvc/handler/getClass/GetClassesBySchoolQueryHandler";
import { GetParentsBySchoolQuery } from "../services/schoolsvc/handler/getParents/GetParentsBySchoolQuery";
import { GetTeachersBySchoolQueryHandler } from "../services/schoolsvc/handler/getTeachers/GetTeachersBySchoolQueryHandler";
import { GetParentsBySchoolQueryHandler } from "../services/schoolsvc/handler/getParents/GetParentsBySchoolQueryHandler";
import { ISchoolRepository } from "../common/domain/repository/ISchoolRepository";
import classeRouter from "./routes/ClasseRouter";
import {
  AssignMatiereToClasseCommand,
  AssignProfesseurToClasseCommand,
  CreateClasseCommand,
  DeleteClasseCommand,
  GetAllClassesQuery,
  GetClasseByIdQuery,
  GetDisciplinesInClasseQuery,
  GetParentsInClasseQuery,
  GetProfessorsInClasseQuery,
  GetStudentsInClasseQuery,
  RevokeProfesseurToClasseCommand,
  UpdateClasseCommand,
} from "../services/classesvc/handler/Commands";
import { IClasseRepository } from "../common/domain/repository/IClasseRepository";
import { classePrismaRepository } from "../common/infrastructure/repositories/ClassePrismaRepository";
import {
  CreateClasseCommandHandler,
  UpdateClasseCommandHandler,
  DeleteClasseCommandHandler,
  GetAllClassesQueryHandler,
  GetClasseByIdQueryHandler,
  GetStudentsInClasseQueryHandler,
  GetProfessorsInClasseQueryHandler,
  GetParentsInClasseQueryHandler,
  GetDisciplinesInClasseQueryHandler,
  AssignMatiereToClasseCommandHandler,
  AssignProfesseurToClasseCommandHandler,
  RevokeProfesseurToClasseCommandHandler,
} from "../services/classesvc/handler/CommandHandler";
import { ICoursRepository } from "../common/domain/repository/ICoursRepository";
import { coursPrismaRepository } from "../common/infrastructure/repositories/CoursPrismaRepository";
import {
  AssignDisciplinesToTeacherCommandHandler,
  AssignMatiereToCoursCommandHandler,
  AssignProfesseurToCoursCommandHandler,
  CreateCoursCommandHandler,
  DeleteCoursCommandHandler,
  GetAllCoursQueryHandler,
  GetAllDisciplinesQueryHandler,
  GetCoursByClasseQueryHandler,
  GetCoursByDayQueryHandler,
  GetCoursByIdQueryHandler,
  GetCoursByProfesseurQueryHandler,
  GetCoursByWeekQueryHandler,
  GetDisciplineByIdQueryHandler,
  RevokeDisciplinesFromTeacherCommandHandler,
  UpdateCoursCommandHandler,
} from "../services/courssvc/CommandHandler";
import {
  AssignDisciplinesToTeacherCommand,
  AssignMatiereToCoursCommand,
  AssignProfesseurToCoursCommand,
  CreateCoursCommand,
  DeleteCoursCommand,
  GetAllCoursQuery,
  GetAllDisciplinesQuery,
  GetCoursByClasseQuery,
  GetCoursByDayQuery,
  GetCoursByIdQuery,
  GetCoursByProfesseurQuery,
  GetCoursByWeekQuery,
  GetDisciplineByIdQuery,
  RevokeDisciplinesFromTeacherCommand,
  UpdateCoursCommand,
} from "../services/courssvc/Commands";
import { DeleteUserCommand } from "../services/authentication/handler/delete/DeleteUserCommand";
import { DeleteUserCommandHandler } from "../services/authentication/handler/delete/DeleteUserCommandHandler";
import {
  GetStudentByIdQuery,
  GetTeacherByIdQuery,
  GetParentByIdQuery,
  GetOneClasseByIdQuery,
} from "../services/schoolsvc/handler/SchoolQueries";
import {
  GetStudentByIdQueryHandler,
  GetTeacherByIdQueryHandler,
  GetParentByIdQueryHandler,
  GetOneClasseByIdQueryHandler,
} from "../services/schoolsvc/handler/SchoolQueryHandler";
import { IDisciplineRepository } from "../common/domain/repository/IDisciplineRepository";
import { disciplinePrismaRepository } from "../common/infrastructure/repositories/DisciplinePrismaRepository";
import disciplineRouter from "./routes/DisciplineRouter";
import {
  UpdateParentFromAdminCommandHandler,
  UpdateTeacherFromAdminCommandHandler,
  UpdateSelfTeacherCommandHandler,
  UpdateSelfParentCommandHandler,
} from "../services/usersvc/handlers/CommandHandlers";
import {
  UpdateParentFromAdminQuery,
  UpdateTeacherFromAdminQuery,
  UpdateSelfTeacherQuery,
  UpdateSelfParentQuery,
} from "../services/usersvc/handlers/Commands";
import userRouter from "./routes/UserRouter";
import { IAdminRepository } from "../common/domain/repository/IAdminRepository";
import { adminPrismaRepository } from "../common/infrastructure/repositories/AdminPrismaRepository";
import {
  CreateAdminCommandHandler,
  DeleteAdminCommandHandler,
  AssignRoleToUserCommandHandler,
  RemoveRoleFromUserCommandHandler,
  GetAllRolesQueryHandler,
  CreateRoleCommandHandler,
  CreateSchoolCommandHandler,
  DeleteSchoolCommandHandler,
  CreateDisciplineCommandHandler,
  GetDisciplinesQueryHandler,
  DeleteDisciplineCommandHandler,
  UpdateDisciplineCommandHandler,
} from "../services/adminsvc/CommandHandler";
import {
  CreateAdminCommand,
  DeleteAdminCommand,
  AssignRoleToUserCommand,
  RemoveRoleFromUserCommand,
  GetAllRolesQuery,
  CreateRoleCommand,
  CreateSchoolCommand,
  DeleteSchoolCommand,
  CreateDisciplineCommand,
  GetDisciplinesQuery,
  DeleteDisciplineCommand,
  UpdateDisciplineCommand,
} from "../services/adminsvc/Commands";
import adminRouter from "./routes/AdminRouter";
import cookieParser from "cookie-parser";
import { RefreshTokenQuery } from "../services/authentication/handler/refresh/RefreshTokenQuery";
import { RefreshTokenQueryHandler } from "../services/authentication/handler/refresh/RefreshTokenQueryHandler";
import coursRouter from "./routes/CoursRouter";
import { UpdateSchoolQuery } from "../services/schoolsvc/handler/UpdateSchool/UpdateSchoolQuery";
import { UpdateSchoolQueryHandler } from "../services/schoolsvc/handler/UpdateSchool/UpdateSchoolQueryHandler";
import studentAttendanceRouter from "./routes/StudentAttendanceRouter";
import { studentAttendancePrismaRepository } from "../common/infrastructure/repositories/StudentAttendancePrismaRepository";
import {
  CreateStudentAttendanceCommandHandler,
  UpdateStudentAttendanceCommandHandler,
  DeleteStudentAttendanceCommandHandler,
  FindStudentAttendanceByIdQueryHandler,
  FindStudentAttendanceByStudentIdQueryHandler,
  FindStudentAttendanceByDisciplineIdQueryHandler,
  FindStudentAttendanceByTypeQueryHandler,
} from "../services/studentsvc/handler/Attendances/StudentAttendanceCommandHandlers";
import {
  CreateStudentAttendanceCommand,
  UpdateStudentAttendanceCommand,
  DeleteStudentAttendanceCommand,
  FindStudentAttendanceByIdQuery,
  FindStudentAttendanceByStudentIdQuery,
  FindStudentAttendanceByDisciplineIdQuery,
  FindStudentAttendanceByTypeQuery,
} from "../services/studentsvc/handler/Attendances/StudentAttendanceCommandsAndQueries";
import {
  CreateNoteCommandHandler,
  UpdateNoteCommandHandler,
  DeleteNoteCommandHandler,
  FindNoteByIdQueryHandler,
  FindNotesByStudentIdQueryHandler,
  FindNotesByClasseIdQueryHandler,
  FindNotesByDisciplineIdQueryHandler,
  FindNotesByTeacherIdQueryHandler,
  FindNotesBySchoolIdQueryHandler,
} from "../services/notesvc/NoteCommandHandler";
import {
  CreateNoteCommand,
  UpdateNoteCommand,
  DeleteNoteCommand,
  FindNoteByIdQuery,
  FindNotesByStudentIdQuery,
  FindNotesByClasseIdQuery,
  FindNotesByDisciplineIdQuery,
  FindNotesByTeacherIdQuery,
  FindNotesBySchoolIdQuery,
} from "../services/notesvc/NoteCommands";
import { IStudentAttendanceRepository } from "../common/domain/repository/IStudentAttendanceRepository";
import { INoteRepository } from "../common/domain/repository/INoteRepository";
import { NotePrismaRepository } from "../common/infrastructure/repositories/NotePrismaRepository";
import noteRouter from "./routes/NoteRouter";
import {
  FindClasseAverageQuery,
  FindDisciplineAverageQuery,
  FindSchoolAverageQuery,
  FindStudentAverageQuery,
} from "../services/notesvc/AverageNoteCommand";
import {
  FindClasseAverageQueryHandler,
  FindDisciplineAverageQueryHandler,
  FindSchoolAverageQueryHandler,
  FindStudentAverageQueryHandler,
} from "../services/notesvc/AverageNoteCommandHandler";
import noteAverageRouter from "./routes/AverageNoteRouter";
import evaluationRouter from "./routes/EvaluationRouter";
import { evaluationPrismaRepository } from "../common/infrastructure/repositories/EvaluationPrismaRepository";
import {
  CreateEvaluationCommand,
  UpdateEvaluationCommand,
  DeleteEvaluationCommand,
  GetAllEvaluationsQuery,
  GetEvaluationByIdQuery,
  GetEvaluationsByClasseQuery,
  GetEvaluationsByTeacherQuery,
} from "../services/evaluationsvc/Command";
import {
  CreateEvaluationCommandHandler,
  UpdateEvaluationCommandHandler,
  DeleteEvaluationCommandHandler,
  GetAllEvaluationsQueryHandler,
  GetEvaluationByIdQueryHandler,
  GetEvaluationsByClasseQueryHandler,
  GetEvaluationsByTeacherQueryHandler,
} from "../services/evaluationsvc/CommandHandlers";
import { GetAllVisitsQuery } from "../services/visitsvc/GetAllVisitsQuery";
import { GetAllVisitsQueryHandler } from "../services/visitsvc/GetAllVisitsQueryHandler";
import { IVisitorRepository } from "../common/domain/repository/IVisitorRepository";
import { visitorPrismaRepository } from "../common/infrastructure/repositories/VisitorPrismaRepository";

config();

// #region Dependance injection

// Add repositories
const userRepository: IUserRepository = userPrismaRepository;
const studentRepository: IStudentRepository = studentPrismaRepository;
const schoolRepository: ISchoolRepository = schoolPrismaRepository;
const classRepository: IClasseRepository = classePrismaRepository;
const coursRepository: ICoursRepository = coursPrismaRepository;
const disciplineRepository: IDisciplineRepository = disciplinePrismaRepository;
const adminRepository: IAdminRepository = adminPrismaRepository;
const studentAttendanceRepository: IStudentAttendanceRepository = studentAttendancePrismaRepository;
const noteRepository: INoteRepository = NotePrismaRepository;
const visitRepository: IVisitorRepository = visitorPrismaRepository;
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

mediator.register<DeleteUserCommand>(
  "DeleteUserCommand",
  new DeleteUserCommandHandler(userRepository)
);

mediator.register<RefreshTokenQuery>(
  RefreshTokenQuery.name,
  new RefreshTokenQueryHandler(userRepository, jwtSvc)
);

// Create student handler
mediator.register<CreateStudentCommand>(
  "CreateStudentCommand",
  new CreateStudentCommandHandler(studentRepository)
);

mediator.register<UpdateStudentCommand>(
  "UpdateStudentCommand",
  new UpdateStudentCommandHandler(studentRepository)
);

mediator.register<DeleteStudentCommand>(
  "DeleteStudentCommand",
  new DeleteStudentCommandHandler(studentRepository)
);

mediator.register<GetStudentsByIdQuery>(
  "GetStudentsByIdQuery",
  new GetStudentsByIdQueryHandler(studentRepository)
);

mediator.register<GetStudentsBySchoolQuery>(
  "GetStudentsBySchoolQuery",
  new GetStudentsBySchoolQueryHandler(studentRepository)
);

// ---------------------------------------------
// Register School Handlers
// ---------------------------------------------
// Commands
mediator.register<UpdateSchoolQuery>(
  UpdateSchoolQuery.name,
  new UpdateSchoolQueryHandler(schoolRepository)
);
// Queries
mediator.register<GetSchoolByIdQuery>(
  "GetSchoolByIdQuery",
  new GetSchoolByIdQueryHandler(schoolRepository)
);
mediator.register<GetAllSchoolsQuery>(
  "GetAllSchoolsQuery",
  new GetAllSchoolsQueryHandler(schoolRepository)
);
mediator.register<GetTeachersBySchoolQuery>(
  "GetTeachersBySchoolQuery",
  new GetTeachersBySchoolQueryHandler(schoolRepository)
);
mediator.register<GetParentsBySchoolQuery>(
  "GetParentsBySchoolQuery",
  new GetParentsBySchoolQueryHandler(schoolRepository)
);
mediator.register<GetAdminsBySchoolQuery>(
  "GetAdminsBySchoolQuery",
  new GetAdminsBySchoolQueryHandler(schoolRepository)
);
mediator.register<GetClassesBySchoolQuery>(
  "GetClassesBySchoolQuery",
  new GetClassesBySchoolQueryHandler(schoolRepository)
);

mediator.register<GetStudentByIdQuery>(
  "GetStudentByIdQuery",
  new GetStudentByIdQueryHandler(schoolRepository)
);

mediator.register<GetTeacherByIdQuery>(
  "GetTeacherByIdQuery",
  new GetTeacherByIdQueryHandler(schoolRepository)
);

mediator.register<GetParentByIdQuery>(
  "GetParentByIdQuery",
  new GetParentByIdQueryHandler(schoolRepository)
);

mediator.register<GetOneClasseByIdQuery>(
  "GetOneClasseByIdQuery",
  new GetOneClasseByIdQueryHandler(schoolRepository)
);
// ---------------------------------------------
// Register Classe Command Handlers (Mutations)
// ---------------------------------------------

mediator.register<CreateClasseCommand>(
  CreateClasseCommand.name,
  new CreateClasseCommandHandler(classRepository)
);

mediator.register<UpdateClasseCommand>(
  UpdateClasseCommand.name,
  new UpdateClasseCommandHandler(classRepository)
);

mediator.register<DeleteClasseCommand>(
  DeleteClasseCommand.name,
  new DeleteClasseCommandHandler(classRepository)
);

mediator.register<AssignProfesseurToClasseCommand>(
  AssignProfesseurToClasseCommand.name,
  new AssignProfesseurToClasseCommandHandler(classRepository)
);

mediator.register<RevokeProfesseurToClasseCommand>(
  RevokeProfesseurToClasseCommand.name,
  new RevokeProfesseurToClasseCommandHandler(classRepository)
);

mediator.register<AssignMatiereToClasseCommand>(
  AssignMatiereToClasseCommand.name,
  new AssignMatiereToClasseCommandHandler(classRepository)
);
// ---------------------------------------------
// Register Classe Query Handlers (Reads)
// ---------------------------------------------

mediator.register<GetAllClassesQuery>(
  GetAllClassesQuery.name,
  new GetAllClassesQueryHandler(classRepository)
);

mediator.register<GetClasseByIdQuery>(
  GetClasseByIdQuery.name,
  new GetClasseByIdQueryHandler(classRepository)
);

mediator.register<GetStudentsInClasseQuery>(
  GetStudentsInClasseQuery.name,
  new GetStudentsInClasseQueryHandler(classRepository)
);

mediator.register<GetProfessorsInClasseQuery>(
  GetProfessorsInClasseQuery.name,
  new GetProfessorsInClasseQueryHandler(classRepository)
);

mediator.register<GetParentsInClasseQuery>(
  GetParentsInClasseQuery.name,
  new GetParentsInClasseQueryHandler(classRepository)
);

mediator.register<GetDisciplinesInClasseQuery>(
  GetDisciplinesInClasseQuery.name,
  new GetDisciplinesInClasseQueryHandler(classRepository)
);

// ---------------------------------------------
// Register Cours Command Handlers (Mutations)
// ---------------------------------------------

mediator.register<CreateCoursCommand>(
  CreateCoursCommand.name,
  new CreateCoursCommandHandler(coursRepository)
);

mediator.register<UpdateCoursCommand>(
  UpdateCoursCommand.name,
  new UpdateCoursCommandHandler(coursRepository)
);

mediator.register<DeleteCoursCommand>(
  DeleteCoursCommand.name,
  new DeleteCoursCommandHandler(coursRepository)
);

mediator.register<AssignProfesseurToCoursCommand>(
  AssignProfesseurToCoursCommand.name,
  new AssignProfesseurToCoursCommandHandler(coursRepository)
);

mediator.register<AssignMatiereToCoursCommand>(
  AssignMatiereToCoursCommand.name,
  new AssignMatiereToCoursCommandHandler(coursRepository)
);

// ---------------------------------------------
// Register Cours Query Handlers (Reads)
// ---------------------------------------------

mediator.register<GetAllCoursQuery>(
  GetAllCoursQuery.name,
  new GetAllCoursQueryHandler(coursRepository)
);

mediator.register<GetCoursByIdQuery>(
  GetCoursByIdQuery.name,
  new GetCoursByIdQueryHandler(coursRepository)
);

mediator.register<GetCoursByProfesseurQuery>(
  GetCoursByProfesseurQuery.name,
  new GetCoursByProfesseurQueryHandler(coursRepository)
);

mediator.register<GetCoursByClasseQuery>(
  GetCoursByClasseQuery.name,
  new GetCoursByClasseQueryHandler(coursRepository)
);

mediator.register<GetCoursByDayQuery>(
  GetCoursByDayQuery.name,
  new GetCoursByDayQueryHandler(coursRepository)
);

mediator.register<GetCoursByWeekQuery>(
  GetCoursByWeekQuery.name,
  new GetCoursByWeekQueryHandler(coursRepository)
);

mediator.register<GetAllDisciplinesQuery>(
  GetAllDisciplinesQuery.name,
  new GetAllDisciplinesQueryHandler(disciplineRepository)
);

mediator.register<GetDisciplineByIdQuery>(
  GetDisciplineByIdQuery.name,
  new GetDisciplineByIdQueryHandler(disciplineRepository)
);
mediator.register<AssignDisciplinesToTeacherCommand>(
  AssignDisciplinesToTeacherCommand.name,
  new AssignDisciplinesToTeacherCommandHandler(disciplineRepository)
);

mediator.register<RevokeDisciplinesFromTeacherCommand>(
  RevokeDisciplinesFromTeacherCommand.name,
  new RevokeDisciplinesFromTeacherCommandHandler(disciplineRepository)
);
// Register UpdateParentFromAdminCommandHandler
mediator.register<UpdateParentFromAdminQuery>(
  UpdateParentFromAdminQuery.name,
  new UpdateParentFromAdminCommandHandler(userRepository)
);

// Register UpdateTeacherFromAdminCommandHandler
mediator.register<UpdateTeacherFromAdminQuery>(
  UpdateTeacherFromAdminQuery.name,
  new UpdateTeacherFromAdminCommandHandler(userRepository)
);

// Register UpdateSelfTeacherCommandHandler
mediator.register<UpdateSelfTeacherQuery>(
  UpdateSelfTeacherQuery.name,
  new UpdateSelfTeacherCommandHandler(userRepository)
);

// Register UpdateSelfParentCommandHandler
mediator.register<UpdateSelfParentQuery>(
  UpdateSelfParentQuery.name,
  new UpdateSelfParentCommandHandler(userRepository)
);

// ---------------------------------------------
// Register Admin action Command Handlers (Mutations)
// ---------------------------------------------
mediator.register<CreateSchoolCommand>(
  CreateSchoolCommand.name,
  new CreateSchoolCommandHandler(adminRepository)
);

mediator.register<DeleteSchoolCommand>(
  DeleteSchoolCommand.name,
  new DeleteSchoolCommandHandler(adminRepository)
);

mediator.register<CreateAdminCommand>(
  CreateAdminCommand.name,
  new CreateAdminCommandHandler(adminRepository, passwordHasher)
);
mediator.register<DeleteAdminCommand>(
  DeleteAdminCommand.name,
  new DeleteAdminCommandHandler(adminRepository)
);
mediator.register<AssignRoleToUserCommand>(
  AssignRoleToUserCommand.name,
  new AssignRoleToUserCommandHandler(adminRepository)
);
mediator.register<RemoveRoleFromUserCommand>(
  RemoveRoleFromUserCommand.name,
  new RemoveRoleFromUserCommandHandler(adminRepository)
);
mediator.register<GetAllRolesQuery>(
  GetAllRolesQuery.name,
  new GetAllRolesQueryHandler(adminRepository)
);

mediator.register<CreateRoleCommand>(
  CreateRoleCommand.name,
  new CreateRoleCommandHandler(adminRepository)
);

mediator.register<CreateDisciplineCommand>(
  CreateDisciplineCommand.name,
  new CreateDisciplineCommandHandler(adminRepository)
);

mediator.register<GetDisciplinesQuery>(
  GetDisciplinesQuery.name,
  new GetDisciplinesQueryHandler(adminRepository)
);

mediator.register<UpdateDisciplineCommand>(
  UpdateDisciplineCommand.name,
  new UpdateDisciplineCommandHandler(adminRepository)
);

mediator.register<DeleteDisciplineCommand>(
  DeleteDisciplineCommand.name,
  new DeleteDisciplineCommandHandler(adminRepository)
);

mediator.register<GetAllVisitsQuery>(
  GetAllVisitsQuery.name,
  new GetAllVisitsQueryHandler(visitRepository)
);

// ---------------------------------------------
// Register StudentAttendance Command Handlers
// ---------------------------------------------
mediator.register<CreateStudentAttendanceCommand>(
  CreateStudentAttendanceCommand.name,
  new CreateStudentAttendanceCommandHandler(studentAttendanceRepository, studentRepository)
);
mediator.register<UpdateStudentAttendanceCommand>(
  UpdateStudentAttendanceCommand.name,
  new UpdateStudentAttendanceCommandHandler(studentAttendanceRepository, studentRepository)
);
mediator.register<DeleteStudentAttendanceCommand>(
  DeleteStudentAttendanceCommand.name,
  new DeleteStudentAttendanceCommandHandler(studentAttendanceRepository)
);

// ---------------------------------------------
// Register StudentAttendance Query Handlers
// ---------------------------------------------
mediator.register<FindStudentAttendanceByIdQuery>(
  FindStudentAttendanceByIdQuery.name,
  new FindStudentAttendanceByIdQueryHandler(studentAttendanceRepository)
);
mediator.register<FindStudentAttendanceByStudentIdQuery>(
  FindStudentAttendanceByStudentIdQuery.name,
  new FindStudentAttendanceByStudentIdQueryHandler(studentAttendanceRepository)
);
mediator.register<FindStudentAttendanceByDisciplineIdQuery>(
  FindStudentAttendanceByDisciplineIdQuery.name,
  new FindStudentAttendanceByDisciplineIdQueryHandler(studentAttendanceRepository)
);
mediator.register<FindStudentAttendanceByTypeQuery>(
  FindStudentAttendanceByTypeQuery.name,
  new FindStudentAttendanceByTypeQueryHandler(studentAttendanceRepository)
);

// ---------------------------------------------
// Register Note Command Handlers (Mutations)
// ---------------------------------------------
mediator.register<CreateNoteCommand>(
  CreateNoteCommand.name,
  new CreateNoteCommandHandler(
    noteRepository,
    studentRepository,
    disciplineRepository,
    classRepository
  )
);

mediator.register<UpdateNoteCommand>(
  UpdateNoteCommand.name,
  new UpdateNoteCommandHandler(
    noteRepository,
    studentRepository,
    disciplineRepository,
    classRepository
  )
);

mediator.register<DeleteNoteCommand>(
  DeleteNoteCommand.name,
  new DeleteNoteCommandHandler(noteRepository)
);

// ---------------------------------------------
// Register Note Query Handlers (Queries)
// ---------------------------------------------
mediator.register<FindNoteByIdQuery>(
  FindNoteByIdQuery.name,
  new FindNoteByIdQueryHandler(noteRepository)
);

mediator.register<FindNotesByStudentIdQuery>(
  FindNotesByStudentIdQuery.name,
  new FindNotesByStudentIdQueryHandler(noteRepository)
);

mediator.register<FindNotesByClasseIdQuery>(
  FindNotesByClasseIdQuery.name,
  new FindNotesByClasseIdQueryHandler(noteRepository)
);

mediator.register<FindNotesByDisciplineIdQuery>(
  FindNotesByDisciplineIdQuery.name,
  new FindNotesByDisciplineIdQueryHandler(noteRepository)
);

mediator.register<FindNotesByTeacherIdQuery>(
  FindNotesByTeacherIdQuery.name,
  new FindNotesByTeacherIdQueryHandler(noteRepository)
);

mediator.register<FindNotesBySchoolIdQuery>(
  FindNotesBySchoolIdQuery.name,
  new FindNotesBySchoolIdQueryHandler(noteRepository)
);

// ---------------------------------------------
// Register Note Average Query Handlers
// ---------------------------------------------

mediator.register<FindDisciplineAverageQuery>(
  FindDisciplineAverageQuery.name,
  new FindDisciplineAverageQueryHandler(noteRepository)
);

mediator.register<FindClasseAverageQuery>(
  FindClasseAverageQuery.name,
  new FindClasseAverageQueryHandler(
    noteRepository,
    studentRepository,
    classRepository,
    disciplineRepository,
    studentAttendanceRepository
  )
);

mediator.register<FindStudentAverageQuery>(
  FindStudentAverageQuery.name,
  new FindStudentAverageQueryHandler(noteRepository)
);

mediator.register<FindSchoolAverageQuery>(
  FindSchoolAverageQuery.name,
  new FindSchoolAverageQueryHandler(
    noteRepository,
    schoolRepository,
    studentRepository,
    disciplineRepository
  )
);

// ---------------------------------------------
// Register Evaluation Handlers
// ---------------------------------------------

mediator.register<CreateEvaluationCommand>(
  CreateEvaluationCommand.name,
  new CreateEvaluationCommandHandler(evaluationPrismaRepository, userRepository)
);

mediator.register<UpdateEvaluationCommand>(
  UpdateEvaluationCommand.name,
  new UpdateEvaluationCommandHandler(evaluationPrismaRepository)
);

mediator.register<DeleteEvaluationCommand>(
  DeleteEvaluationCommand.name,
  new DeleteEvaluationCommandHandler(evaluationPrismaRepository)
);

mediator.register<GetAllEvaluationsQuery>(
  GetAllEvaluationsQuery.name,
  new GetAllEvaluationsQueryHandler(evaluationPrismaRepository)
);

mediator.register<GetEvaluationByIdQuery>(
  GetEvaluationByIdQuery.name,
  new GetEvaluationByIdQueryHandler(evaluationPrismaRepository)
);

mediator.register<GetEvaluationsByClasseQuery>(
  GetEvaluationsByClasseQuery.name,
  new GetEvaluationsByClasseQueryHandler(evaluationPrismaRepository)
);

mediator.register<GetEvaluationsByTeacherQuery>(
  GetEvaluationsByTeacherQuery.name,
  new GetEvaluationsByTeacherQueryHandler(evaluationPrismaRepository)
);

// #endregion

const allowedOrigins = [
  "https://seekids.net",
  "https://test.seekids.net",
  "https://dakar-leaders-school.seekids.net",
  "http://localhost:8080",
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
app.use("/api/admin-actions", adminRouter);

// ✅ Simple hello route
app.get("/", (req, res) => {
  res.status(201).send("Hello");
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => console.log(`🚀 Server running on port ${port}`));

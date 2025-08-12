import { School } from "../../common/domain/entities/School";
import { mediator } from "../../common/mediator/Mediator";
import { RequestHandler } from "express";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { ValidationError } from "../../common/application/dto/ValidationError";
import { NotFoundError } from "../../common/application/dto/NotFoundError";
import { GetStudentsBySchoolQuery } from "../../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQuery";
import { GetTeachersBySchoolQuery } from "../../services/schoolsvc/handler/getTeachers/GetTeachersBySchoolQuery";
import { GetParentsBySchoolQuery } from "../../services/schoolsvc/handler/getParents/GetParentsBySchoolQuery";
import { GetAdminsBySchoolQuery } from "../../services/schoolsvc/handler/getAdmins/GetAdminsBySchoolQuery";
import { GetClassesBySchoolQuery } from "../../services/schoolsvc/handler/getClass/GetClassesBySchoolQuery";
import { AppUser } from "../../common/domain/entities/AppUser";
import { CreateSchoolCommand } from "../../services/schoolsvc/handler/CreateSchool/CreateSchoolCommand";
import { GetAllSchoolsQuery } from "../../services/schoolsvc/handler/GetSchools/GetAllSchoolsQuery";
import { GetSchoolByIdQuery } from "../../services/schoolsvc/handler/GetSchoolById/GetSchoolByIdQuery";
import { DeleteSchoolCommand } from "../../services/schoolsvc/handler/DeleteSchool/DeleteSchoolCommand";

// ---------------------------------------------
// Command Handlers (Mutations)
// ---------------------------------------------

const createSchool: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const command = new CreateSchoolCommand(name);
    const result: School = await mediator.send(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Create school error:", error);
    if (error instanceof ValidationError) {
      res.status(StatusCode.BAD_REQUEST).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const deleteSchool: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const command = new DeleteSchoolCommand(id);
    await mediator.send(command);
    res.status(StatusCode.SUCCESS).json({ message: "School deleted successfully." });
  } catch (error: any) {
    console.error("Delete school error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Query Handlers (Reads)
// ---------------------------------------------

const getSchoolById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const query = new GetSchoolByIdQuery(id);
    const result: School = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get school by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const getAllSchools: RequestHandler = async (req, res) => {
  try {
    const query = new GetAllSchoolsQuery();
    const result: School[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get all schools error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const findStudentsBySchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const query = new GetStudentsBySchoolQuery(schoolId);
    const result = await mediator.send(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Get by school error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findTeachersBySchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const query = new GetTeachersBySchoolQuery(schoolId);
    const result: AppUser[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find teachers error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const findParentsBySchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;

    const query = new GetParentsBySchoolQuery(schoolId);
    const result: AppUser[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find parents error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const findAdminsBySchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const query = new GetAdminsBySchoolQuery(schoolId);
    const result: AppUser[] = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find admins error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const findClassesBySchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const query = new GetClassesBySchoolQuery(schoolId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Find classes error:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const SchoolController = {
  createSchool,
  deleteSchool,
  getSchoolById,
  getAllSchools,
  findStudentsBySchool,
  findTeachersBySchool,
  findParentsBySchool,
  findAdminsBySchool,
  findClassesBySchool,
};

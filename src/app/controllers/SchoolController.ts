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
import { GetAllSchoolsQuery } from "../../services/schoolsvc/handler/GetSchools/GetAllSchoolsQuery";
import { GetSchoolByIdQuery } from "../../services/schoolsvc/handler/GetSchoolById/GetSchoolByIdQuery";
import {
  GetStudentByIdQuery,
  GetTeacherByIdQuery,
  GetParentByIdQuery,
  GetOneClasseByIdQuery,
} from "../../services/schoolsvc/handler/SchoolQueries";
import { SchoolUpdateRequest } from "../../services/schoolsvc/models/SchoolUpdateRequest";
import { UpdateSchoolQuery } from "../../services/schoolsvc/handler/UpdateSchool/UpdateSchoolQuery";
import { UpdateSchoolReportCounterCommand } from "../../services/schoolsvc/handler/UpdateCounters/UpdateSchoolReportCounterCommand";
import { UpdateStudentReportCounterCommand } from "../../services/schoolsvc/handler/UpdateCounters/UpdateStudentReportCounterCommand";

const updateSchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { name, email, telephone, adresse, siteWeb } = req.body;
    const updateSchool: SchoolUpdateRequest = {
      adresse,
      email,
      name,
      siteWeb,
      telephone,
    };
    const command = new UpdateSchoolQuery(schoolId, updateSchool);
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: err.message });
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
    const { schoolId } = req.params;
    const query = new GetSchoolByIdQuery(schoolId);
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

// ---------------------------------------------
// Get One Student
// ---------------------------------------------
const getStudentById: RequestHandler = async (req, res) => {
  try {
    const { schoolId, studentId } = req.params;
    const query = new GetStudentByIdQuery(studentId, schoolId);
    const result = await mediator.send(query);

    if (!result) {
      throw new NotFoundError(`Student with ID ${studentId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get student by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Get One Teacher
// ---------------------------------------------
const getTeacherById: RequestHandler = async (req, res) => {
  try {
    const { schoolId, teacherId } = req.params;
    const query = new GetTeacherByIdQuery(teacherId, schoolId);
    const result = await mediator.send(query);

    if (!result) {
      throw new NotFoundError(`Teacher with ID ${teacherId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get teacher by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Get One Parent
// ---------------------------------------------
const getParentById: RequestHandler = async (req, res) => {
  try {
    const { schoolId, parentId } = req.params;
    const query = new GetParentByIdQuery(parentId, schoolId);
    const result = await mediator.send(query);

    if (!result) {
      throw new NotFoundError(`Parent with ID ${parentId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get parent by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Get One Classe
// ---------------------------------------------
const getClasseById: RequestHandler = async (req, res) => {
  try {
    const { schoolId, classId } = req.params;
    const query = new GetOneClasseByIdQuery(classId, schoolId);
    const result = await mediator.send(query);

    if (!result) {
      throw new NotFoundError(`Classe with ID ${classId} not found.`);
    }

    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get classe by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Update School report generated counter
// ---------------------------------------------
const UpdateSchoolReportGeneratedCounter: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const query = new UpdateSchoolReportCounterCommand(schoolId);
    await mediator.send(query);

    res.status(StatusCode.SUCCESS).json(true);
  } catch (error: any) {
    console.error("Get classe by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

// ---------------------------------------------
// Update Student report generated counter
// ---------------------------------------------
const UpdateStudentReportGeneratedCounter: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const query = new UpdateStudentReportCounterCommand(schoolId);
    await mediator.send(query);

    res.status(StatusCode.SUCCESS).json(true);
  } catch (error: any) {
    console.error("Get classe by ID error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const SchoolController = {
  updateSchool,
  getSchoolById,
  getAllSchools,
  findStudentsBySchool,
  findTeachersBySchool,
  findParentsBySchool,
  findAdminsBySchool,
  findClassesBySchool,
  getStudentById,
  getTeacherById,
  getParentById,
  getClasseById,
  UpdateSchoolReportGeneratedCounter,
  UpdateStudentReportGeneratedCounter,
};

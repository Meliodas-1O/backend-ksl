import { mediator } from "../../common/mediator/Mediator";
import { RequestHandler } from "express";
import { CreateStudentCommand } from "../../services/studentsvc/handler/Create/CreateStudentCommand";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { UpdateStudentCommand } from "../../services/studentsvc/handler/Update/UpdateStudentCommand";
import { DeleteStudentCommand } from "../../services/studentsvc/handler/Delete/DeleteStudentCommand";
import { GetStudentsBySchoolQuery } from "../../services/studentsvc/handler/Read/BySchoolId/GetStudentsBySchoolQuery";
import { GetStudentsByIdQuery } from "../../services/studentsvc/handler/Read/ById/GetStudentsByIdQuery";
import { validateStudentData } from "../../services/studentsvc/models/Update/UpdateStudentRequest";

export const createStudent: RequestHandler = async (req, res) => {
  try {
    const { nom, prenom, dateOfBirth, schoolId, classe } = req.body;
    if (isNaN(Date.parse(dateOfBirth))) {
      res.status(400).json({ message: "Invalid date format. Use ISO 8601." });
      return;
    }
    const dob = new Date(dateOfBirth);
    const command = new CreateStudentCommand(nom, prenom, dob, schoolId, classe);
    const result: string = await mediator.send<CreateStudentCommand, any>(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error) {
    console.error("Login error:", error);
  }
};

const updateStudentById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const error = validateStudentData(data);

    if (error) {
      res.status(error.statusCode).json(error.statusCode);
      return;
    }
    const command = new UpdateStudentCommand(id, data);
    const updated = await mediator.send(command);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStudentById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const command = new DeleteStudentCommand(id);
    await mediator.send(command);
    res.status(204).send();
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStudentById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const query = new GetStudentsByIdQuery(id);
    const result = await mediator.send(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Get by class error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStudentsBySchool: RequestHandler = async (req, res) => {
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

export const StudentController = {
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getStudentsBySchool,
};

import { RequestHandler } from "express";
import { mediator } from "../../common/mediator/Mediator";
import { StatusCode } from "../../common/application/dto/StatusCode";
import {
  CreateStudentAttendanceCommand,
  UpdateStudentAttendanceCommand,
  DeleteStudentAttendanceCommand,
  FindStudentAttendanceByIdQuery,
  FindStudentAttendanceByStudentIdQuery,
  FindStudentAttendanceByDisciplineIdQuery,
  FindStudentAttendanceByTypeQuery,
} from "../../services/studentsvc/handler/Attendances/StudentAttendanceCommandsAndQueries";

const createStudentAttendance: RequestHandler = async (req, res) => {
  try {
    const { studentId, disciplineId, type, date } = req.body;
    const command = new CreateStudentAttendanceCommand(
      studentId,
      disciplineId,
      type,
      new Date(date)
    );
    const result = await mediator.send(command);
    res.status(StatusCode.CREATED).json(result);
  } catch (error: any) {
    console.error("Create student attendance error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const updateStudentAttendance: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const command = new UpdateStudentAttendanceCommand(id, data);
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update student attendance error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const deleteStudentAttendance: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const command = new DeleteStudentAttendanceCommand(id);
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Delete student attendance error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const getStudentAttendanceById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const query = new FindStudentAttendanceByIdQuery(id);
    const result = await mediator.send(query);
    if (result) {
      res.status(StatusCode.SUCCESS).json(result);
    } else {
      res
        .status(StatusCode.NOT_FOUND)
        .json({ reason: "Attendance record not found." });
    }
  } catch (error: any) {
    console.error("Get attendance by ID error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const getStudentAttendanceByStudentId: RequestHandler = async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = new FindStudentAttendanceByStudentIdQuery(studentId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get attendance by student ID error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const getStudentAttendanceByDisciplineId: RequestHandler = async (req, res) => {
  try {
    const { disciplineId } = req.params;
    const query = new FindStudentAttendanceByDisciplineIdQuery(disciplineId);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get attendance by discipline ID error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

const getStudentAttendanceByType: RequestHandler = async (req, res) => {
  try {
    const { type } = req.params;
    const query = new FindStudentAttendanceByTypeQuery(type);
    const result = await mediator.send(query);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Get attendance by type error:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ reason: "Internal server error." });
  }
};

export const StudentAttendanceController = {
  createStudentAttendance,
  updateStudentAttendance,
  deleteStudentAttendance,
  getStudentAttendanceById,
  getStudentAttendanceByStudentId,
  getStudentAttendanceByDisciplineId,
  getStudentAttendanceByType,
};

import {
  UpdateParentFromAdminQuery,
  UpdateSelfParentQuery,
  UpdateSelfTeacherQuery,
  UpdateTeacherFromAdminQuery,
} from "../../services/usersvc/handlers/Commands";
import { NotFoundError } from "../../common/application/dto/NotFoundError";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";
import { RequestHandler } from "express";

const updateParentFromAdmin: RequestHandler = async (req, res) => {
  try {
    const { nom, prenom, email, telephone } = req.body;
    const command = new UpdateParentFromAdminQuery(
      req.params.parentId,
      nom,
      prenom,
      email,
      telephone,
      req.params.schoolId
    );
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update parent error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateTeacherFromAdmin: RequestHandler = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, classes } = req.body;
    const command = new UpdateTeacherFromAdminQuery(
      req.params.teacherId,
      nom,
      prenom,
      email,
      telephone,
      classes,
      req.params.schoolId
    );
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update teacher error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateSelfTeacher: RequestHandler = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, biographie, adresse } = req.body;
    const command = new UpdateSelfTeacherQuery(
      req.params.teacherId,
      nom,
      prenom,
      email,
      telephone,
      adresse,
      biographie,
      req.params.schoolId
    );
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update teacher error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

const updateSelfParent: RequestHandler = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, profession, adresse } = req.body;
    const command = new UpdateSelfParentQuery(
      req.params.parentId,
      nom,
      prenom,
      email,
      telephone,
      profession,
      adresse,
      req.params.schoolId
    );
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Update parent error:", error);
    if (error instanceof NotFoundError) {
      res.status(StatusCode.NOT_FOUND).json({ reason: error.message });
      return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const UserController = {
  updateParentFromAdmin,
  updateSelfParent,
  updateTeacherFromAdmin,
  updateSelfTeacher,
};

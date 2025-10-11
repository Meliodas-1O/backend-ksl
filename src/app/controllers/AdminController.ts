import { RequestHandler } from "express";
import { mediator } from "../../common/mediator/Mediator";
import {
  CreateRoleCommand,
  GetAllRolesQuery,
  CreateSchoolCommand,
  DeleteSchoolCommand,
  CreateAdminCommand,
  DeleteAdminCommand,
  AssignRoleToUserCommand,
  RemoveRoleFromUserCommand,
  CreateDisciplineCommand,
  GetDisciplinesQuery,
  DeleteDisciplineCommand,
  UpdateDisciplineCommand,
  AdminResetPasswordCommand,
} from "../../services/adminsvc/Commands";
import { StatusCode } from "../../common/application/dto/StatusCode";

const adminResetPassword: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { schoolId } = req.params;
    if (!(email && password && schoolId)) {
      res
        .status(400)
        .json({ message: "the following fields are required : email, password, schoolId" });
      return;
    }
    if (typeof password !== "string" || password.length < 6) {
      res.status(400).json({
        reason: "The password should be of type string and at least 6 characters.",
        statusCode: StatusCode.NOT_FOUND,
      });
      return;
    }
    const command = new AdminResetPasswordCommand(email, password, schoolId);
    const result = await mediator.send<AdminResetPasswordCommand, boolean>(command);
    if (result) {
      res.status(201).json(result);
      return;
    }
    res.status(404).json({
      reason: "User not found. Please check the schoolId and the email.",
      statusCode: StatusCode.NOT_FOUND,
    });
  } catch (error: any) {
    console.error("Create Role error:", error);
    res.status(500).json({
      reason: error.message,
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    });
  }
};

const createRole: RequestHandler = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      res.status(400).json({ message: "Role name is required" });
      return;
    }
    const command = new CreateRoleCommand(role);
    const result = await mediator.send<CreateRoleCommand, any>(command);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create Role error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRoles: RequestHandler = async (req, res) => {
  try {
    const query = new GetAllRolesQuery();
    const result = await mediator.send<GetAllRolesQuery, any[]>(query);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Get All Roles error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createSchool: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "School name is required" });
      return;
    }
    const command = new CreateSchoolCommand(name);
    const result = await mediator.send<CreateSchoolCommand, any>(command);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create School error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSchool: RequestHandler = async (req, res) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) {
      res.status(400).json({ message: "School ID is required" });
      return;
    }
    const command = new DeleteSchoolCommand(schoolId);
    await mediator.send<DeleteSchoolCommand, void>(command);
    res.status(204).send();
  } catch (error: any) {
    console.error("Delete School error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAdmin: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, password, schoolId } = req.body;
    if (!firstName || !lastName || !email || !password || !schoolId) {
      res.status(400).json({
        message: "All fields are required : firstName, lastName, email, password, schoolId",
      });
      return;
    }
    const command = new CreateAdminCommand(firstName, lastName, email, password, schoolId);
    const result = await mediator.send<CreateAdminCommand, any>(command);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create Admin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAdmin: RequestHandler = async (req, res) => {
  try {
    const { adminId, schoolId } = req.params;
    if (!adminId || !schoolId) {
      res.status(400).json({ message: "Admin ID and School ID are required" });
      return;
    }
    const command = new DeleteAdminCommand(adminId, schoolId);
    await mediator.send<DeleteAdminCommand, void>(command);
    res.status(204).send();
  } catch (error: any) {
    console.error("Delete Admin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const assignRoleToUser: RequestHandler = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      res.status(400).json({ message: "User ID and Role ID are required" });
      return;
    }
    const command = new AssignRoleToUserCommand(userId, roleId);
    const result = await mediator.send<AssignRoleToUserCommand, any>(command);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Assign Role to User error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeRoleFromUser: RequestHandler = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      res.status(400).json({ message: "User ID and Role ID are required" });
      return;
    }
    const command = new RemoveRoleFromUserCommand(userId, roleId);
    const result = await mediator.send<RemoveRoleFromUserCommand, any>(command);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Remove Role from User error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createDiscipline: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Discipline name is required" });
      return;
    }
    const command = new CreateDisciplineCommand(name);
    const result = await mediator.send<CreateDisciplineCommand, any>(command);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create Discipline error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDisciplines: RequestHandler = async (req, res) => {
  try {
    const command = new GetDisciplinesQuery();
    const result = await mediator.send<GetDisciplinesQuery, any>(command);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Create Discipline error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDiscipline: RequestHandler = async (req, res) => {
  try {
    const { disciplineId } = req.params;
    if (!disciplineId) {
      res.status(400).json({ message: "Discipline ID is required" });
      return;
    }
    const command = new DeleteDisciplineCommand(disciplineId);
    await mediator.send<DeleteDisciplineCommand, void>(command);
    res.status(204).send();
  } catch (error: any) {
    console.error("Delete Discipline error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDiscipline: RequestHandler = async (req, res) => {
  try {
    const { disciplineId } = req.params;
    const { name } = req.body;
    if (!disciplineId || !name) {
      res.status(400).json({ message: "Discipline ID and name are required" });
      return;
    }
    const command = new UpdateDisciplineCommand(disciplineId, name);
    const result = await mediator.send<UpdateDisciplineCommand, any>(command);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Update Discipline error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AdminController = {
  adminResetPassword,
  createRole,
  getAllRoles,
  createSchool,
  deleteSchool,
  createAdmin,
  deleteAdmin,
  assignRoleToUser,
  removeRoleFromUser,
  createDiscipline,
  getDisciplines,
  deleteDiscipline,
  updateDiscipline,
};

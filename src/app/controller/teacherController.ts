// app/controllers/TeacherController.ts
import {
  createTeacher,
  updateTeacher,
  getTeacher,
  deleteTeacher,
  addClassToTeacher,
} from "../bootstrap";
import { Request, Response } from "express";

export const TeacherController = {
  async create(req: Request, res: Response) {
    const createdTeacher = await createTeacher.execute(req.body);
    res.status(201).send(`Created ! Id : ${createdTeacher}`);
  },

  async update(req: Request, res: Response) {
    await updateTeacher.execute(req.params.id, req.body);
    res.send("Updated");
  },

  async get(req: Request, res: Response) {
    const data = await getTeacher.execute(req.params.id);
    res.send(data);
  },

  async delete(req: Request, res: Response) {
    await deleteTeacher.execute(req.params.id);
    res.send("Deleted");
  },

  async addClass(req: Request, res: Response) {
    await addClassToTeacher.execute(req.params.id, req.body.classId);
    res.send("Class added");
  },
};

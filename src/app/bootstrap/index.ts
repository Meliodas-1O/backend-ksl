import { AddClassToTeacher } from "../../application/use-cases/professor/AssignTeacher";
import { CreateTeacher } from "../../application/use-cases/professor/CreateTeacher";
import { DeleteTeacher } from "../../application/use-cases/professor/DeleteTeacher";
import { GetTeacher } from "../../application/use-cases/professor/GetTeacher";
import { UpdateTeacher } from "../../application/use-cases/professor/UpdateTeacher";
import { InMemoryTeacherRepository } from "../../infrastructure/database/InMemoryTeacherRepository";

const repo = new InMemoryTeacherRepository();

export const createTeacher = new CreateTeacher(repo);
export const updateTeacher = new UpdateTeacher(repo);
export const getTeacher = new GetTeacher(repo);
export const deleteTeacher = new DeleteTeacher(repo);
export const addClassToTeacher = new AddClassToTeacher(repo);

import { Evaluation } from "@prisma/client";
import { IUpdateEvaluationDTO } from "../../common/domain/entities/Evaluation";

// ------- QUERIES

export class GetAllEvaluationsQuery {
  constructor(public readonly schoolId: string) {}
}

export class GetEvaluationByIdQuery {
  constructor(public readonly evaluationId: string, public readonly schoolId: string) {}
}

export class GetEvaluationsByClasseQuery {
  constructor(public readonly classeId: string, public readonly schoolId: string) {}
}

export class GetEvaluationsByTeacherQuery {
  constructor(public readonly professeurId: string, public readonly schoolId: string) {}
}

// ----- COMMANDS

export class CreateEvaluationCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly date: Date,
    public readonly classeId: string,
    public readonly professeurId: string,
    public readonly disciplineId: string,
    public readonly schoolId: string
  ) {}
}

export class UpdateEvaluationCommand {
  constructor(
    public readonly evaluationId: string,
    public readonly schoolId: string,
    public readonly data: IUpdateEvaluationDTO
  ) {}
}

export class DeleteEvaluationCommand {
  constructor(public readonly evaluationId: string, public readonly schoolId: string) {}
}

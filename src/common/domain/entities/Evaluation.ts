export interface ICreateEvaluationDTO {
  title: string;
  description: string;
  date: Date;
  classeId: string;
  schoolId: string;
  professeurId: string;
  disciplineId: string;
}

export interface IUpdateEvaluationDTO {
  title: string;
  description: string;
  date: Date;
}

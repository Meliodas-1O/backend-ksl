export interface IDisciplineRepository {
  findAllDisplines(schoolId: string): Promise<any[]>;
  findDisciplineById(id: string, schoolId: string): Promise<any>;
  assignDisciplineToTeacher(teacherId: string, discipleIds: string[]);
  revokeDisciplineToTeacher(teacherId: string, disciplineIds: string[]);
}

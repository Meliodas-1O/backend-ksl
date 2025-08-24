export interface IDisciplineRepository {
  findAllDisplines(schoolId: string): Promise<any[]>;
  findDisciplineById(id: string, schoolId: string): Promise<any>;
}

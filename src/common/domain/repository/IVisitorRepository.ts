export interface IVisitorRepository {
  createVisit(userId: string | null, schoolId: string, roles: string, type: string): Promise<any>;
  getAllVisits(): Promise<any>;
  deleteOldVisits(): Promise<any>;
}

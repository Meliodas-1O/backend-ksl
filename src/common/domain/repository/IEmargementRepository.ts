export interface IEmargementRepository {
  createEmargement(emargement: any): Promise<any>;
  getAllEmargements(schoolId: string): Promise<any[]>;
  getEmargementById(emargementId: string, schoolId): Promise<any | null>;
  getEmargementByUserId(professeurId: string, schoolId): Promise<any[]>;
  updateEmargementById(emargement: any, emargementId: string, schoolId: string): Promise<void>;
  deleteEmargementById(emargementId: string, schoolId: string): Promise<void>;
}

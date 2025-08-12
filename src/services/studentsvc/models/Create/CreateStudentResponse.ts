export interface CreateStudentResponse {
  id: string;
  schoolId: string | null;
  nom: string;
  prenom: string;
  abscence: number;
  retards: number;
  moyenne: number;
  parentId: string | null;
}

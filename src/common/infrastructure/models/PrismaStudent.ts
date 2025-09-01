export interface PrismaStudent {
  id: string;
  schoolId: string | null;
  nom: string;
  prenom: string;
  createdAt: Date;
  dateOfBirth: Date;
  abscence: number;
  retards: number;
  moyenne: number;
  parentId: string;
  parent: {
    id: string;
    nom: string;
    prenom: string;
  };
  classe: {
    nom: string;
    niveau: string;
  };
}

export function MapPrismaStudentToDomain(prismaStudent: any): any {
  const studentDto: any = {
    id: prismaStudent.id,
    schoolId: prismaStudent.schoolId,
    nom: prismaStudent.nom,
    prenom: prismaStudent.prenom,
    abscence: prismaStudent.abscence,
    retards: prismaStudent.retards,
    moyenne: prismaStudent.moyenne,
    classe: {
      nom: prismaStudent.classe.nom,
      niveau: prismaStudent.classe.niveau,
    },
  };
  if (prismaStudent.parentId) {
    studentDto.parent = {
      id: prismaStudent.parentId,
      nom: prismaStudent.parent.nom,
      prenom: prismaStudent.parent.prenom,
    };
  }
  return studentDto;
}

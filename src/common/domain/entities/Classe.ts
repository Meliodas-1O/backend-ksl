import { Entity } from "../contracts/Entity";

export class Classe extends Entity {
  private niveau: string;
  private nom: string;
  private schoolId: string;

  private constructor(niveau: string, nom: string, schoolId: string) {
    super();
    this.niveau = niveau;
    this.nom = nom;
    this.schoolId = schoolId;
  }

  public static createClasse(niveau: string, nom: string, schoolId: string): Classe {
    return new Classe(niveau, nom, schoolId);
  }

  public getNiveau(): string {
    return this.niveau;
  }

  public getNom(): string {
    return this.nom;
  }

  public getSchoolId(): string {
    return this.schoolId;
  }
}

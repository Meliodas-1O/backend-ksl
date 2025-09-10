import { Entity } from "../contracts/Entity";

export class Student extends Entity {
  private nom: string;
  private prenom: string;
  private dateOfBirth: Date;
  public schoolId: string;
  public classe: string;
  public parentId: string | null = null;

  private constructor(nom: string, prenom: string, date: Date, classe: string, schoolId: string) {
    super();
    this.nom = nom;
    this.prenom = prenom;
    this.dateOfBirth = date;
    (this.classe = classe), (this.schoolId = schoolId);
  }

  public static createStudent(
    nom: string,
    prenom: string,
    date: Date,
    classe: string,
    schoolId: string
  ): Student {
    return new Student(nom, prenom, date, classe, schoolId);
  }

  public static updateStudent(
    nom: string,
    prenom: string,
    date: Date,
    classe: string,
    schoolId: string
  ) {
    return this.createStudent(nom, prenom, date, classe, schoolId);
  }

  public getNom(): string {
    return this.nom;
  }

  public getPrenom(): string {
    return this.prenom;
  }

  public getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  public setNom(nom: string): void {
    this.nom = nom;
  }

  public setPrenom(prenom: string): void {
    this.prenom = prenom;
  }

  public setDateOfBirth(date: Date): void {
    this.dateOfBirth = date;
  }
}

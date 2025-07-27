import { Entity } from "../contracts/Entity";

export class Student extends Entity {
  private nom: string;
  private prenom: string;
  private dateOfBirth: Date;
  private abscence: number;
  private retards: number;
  private moyenne: number;
  public schoolId: string;
  public classe: string;

  private constructor(
    nom: string,
    prenom: string,
    date: Date,
    abscence: number,
    retards: number,
    moyenne: number,
    classe: string,
    schoolId: string
  ) {
    super();
    this.nom = nom;
    this.prenom = prenom;
    this.dateOfBirth = date;
    this.abscence = abscence;
    this.retards = retards;
    this.moyenne = moyenne;
    (this.classe = classe), (this.schoolId = schoolId);
  }

  public static createStudent(
    nom: string,
    prenom: string,
    date: Date,
    abscence: number,
    retards: number,
    moyenne: number,
    classe: string,
    schoolId: string
  ): Student {
    return new Student(nom, prenom, date, abscence, retards, moyenne, classe, schoolId);
  }

  public static updateStudent(
    nom: string,
    prenom: string,
    date: Date,
    abscence: number,
    retards: number,
    moyenne: number,
    classe: string,
    schoolId: string
  ) {
    return this.createStudent(nom, prenom, date, abscence, retards, moyenne, classe, schoolId);
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

  public getAbscence(): number {
    return this.abscence;
  }

  public getRetards(): number {
    return this.retards;
  }

  public getMoyenne(): number {
    return this.moyenne;
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

  public setAbscence(abscence: number): void {
    this.abscence = abscence;
  }

  public setRetards(retards: number): void {
    this.retards = retards;
  }

  public setMoyenne(moyenne: number): void {
    this.moyenne = moyenne;
  }
}

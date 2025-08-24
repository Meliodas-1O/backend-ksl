import { Entity } from "../contracts/Entity";
import { AppUser } from "./AppUser";
import { Classe } from "./Classe";
import { Discipline } from "./Discipline";

export class Cours extends Entity {
  private jour: string;
  private heure: string;
  private disciplineId: string;
  private professeurId: string;
  private classeId: string;
  private schoolId: string;

  public discipline?: any; // Add discipline parameter
  public professeur?: any; // Add professeur parameter
  public classe?: any; // Add classe parameter

  // Private constructor to enforce use of factory method
  private constructor(
    jour: string,
    heure: string,
    disciplineId: string,
    professeurId: string,
    classeId: string,
    schoolId: string
  ) {
    super(); // Assuming the base Entity has an id field
    this.jour = jour;
    this.heure = heure;
    this.disciplineId = disciplineId;
    this.professeurId = professeurId;
    this.classeId = classeId;
    this.schoolId = schoolId;
  }

  // Factory method to create a new Cours instance
  public static createCours(
    jour: string,
    heure: string,
    disciplineId: string,
    professeurId: string,
    classeId: string,
    schoolId: string
  ): Cours {
    return new Cours(jour, heure, disciplineId, professeurId, classeId, schoolId);
  }

  // Factory method to create a new Cours instance
  public static MapToDomain(
    jour: string,
    heure: string,
    disciplineId: string,
    professeurId: string,
    classeId: string,
    schoolId: string,
    id: string,
    discipline: any, // Add discipline parameter
    professeur: any, // Add professeur parameter
    classe: any // Add classe parameter
  ): Cours {
    const cours: Cours = new Cours(jour, heure, disciplineId, professeurId, classeId, schoolId);
    cours.setId(id);
    cours.discipline = discipline; // Set discipline
    cours.professeur = professeur; // Set professeur
    cours.classe = classe; // Set classe
    return cours;
  }
  // Getters for the private fields
  public getJour(): string {
    return this.jour;
  }

  public getHeure(): string {
    return this.heure;
  }

  public getDisciplineId(): string {
    return this.disciplineId;
  }

  public getProfesseurId(): string {
    return this.professeurId;
  }

  public getClasseId(): string {
    return this.classeId;
  }

  public getSchoolId(): string {
    return this.schoolId;
  }
}

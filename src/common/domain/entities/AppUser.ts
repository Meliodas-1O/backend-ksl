import { Role } from "../../application/dto/Role";
import { Entity } from "../contracts/Entity";
import { ValidationError } from "../../application/dto/ValidationError";
import { StudentDtoCreation } from "../../../common/application/dto/studentDto/StudentDtoCreation";

export class AppUser extends Entity {
  private email: string;
  private password: string;
  private roles: Role[];
  private schoolId: string;

  private nom: string;
  private prenom: string;
  private telephone: string | null;
  private profession: string | null;
  private biographie: string | null;
  private children: StudentDtoCreation[] = [];
  public disciplineIds: string[] = [];

  // PRIVATE base constructor
  private constructor(
    email: string,
    password: string,
    roles: Role[],
    schoolId: string,
    nom: string,
    prenom: string,
    telephone: string | null,
    profession: string | null,
    biographie: string | null,
    children: StudentDtoCreation[]
  ) {
    super();
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.schoolId = schoolId;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.profession = profession;
    this.biographie = biographie;
    this.children = children;
  }

  // ✅ Static creation methods

  public static createBaseUser(
    email: string,
    password: string,
    roles: Role[],
    schoolId: string,
    nom: string,
    prenom: string,
    telephone: string | null,
    profession: string | null,
    biographie: string | null,
    children: StudentDtoCreation[] | null
  ): AppUser {
    const errors: string[] = [];

    if (!this.isValidEmail(email)) errors.push("Invalid email.");
    if (!this.isValidPassword(password)) errors.push("Password must be at least 6 characters.");
    if (!this.isValidNom(nom)) errors.push("Invalid last name.");
    if (!this.isValidPrenom(prenom)) errors.push("Invalid first name.");
    if (!Array.isArray(roles) || !roles.every(this.isValidRole)) errors.push("Invalid roles.");
    if (!schoolId) errors.push("School ID is required.");

    if (errors.length > 0) throw new ValidationError(errors);

    return new AppUser(
      email,
      password,
      roles,
      schoolId,
      nom,
      prenom,
      telephone,
      profession,
      biographie,
      children ?? []
    );
  }

  // Optional: domain-level validators
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  private static isValidPassword(password: string): boolean {
    return typeof password === "string" && password.length >= 6;
  }

  private static isValidRole(role: Role): boolean {
    return Object.values(Role).includes(role);
  }

  private static isValidPrenom(password: string): boolean {
    return typeof password === "string" && password.length >= 1;
  }

  private static isValidNom(password: string): boolean {
    return typeof password === "string" && password.length >= 1;
  }

  // Getters for new fields
  public getNom(): string {
    return this.nom;
  }

  public getPrenom(): string {
    return this.prenom;
  }

  public getTelephone(): string | null {
    return this.telephone;
  }

  public getProfession(): string | null {
    return this.profession;
  }

  // Optional: expose getters
  public getEmail(): string {
    return this.email;
  }

  public getRoles(): Role[] {
    return this.roles;
  }

  public getSchoolId(): string {
    return this.schoolId;
  }

  public getPassword(): string {
    return this.password;
  }
  public getBiographie(): string | null {
    return this.biographie;
  }

  public getChildren(): StudentDtoCreation[] {
    return this.children;
  }
}

import { Entity } from "../contracts/Entity";

export class Discipline extends Entity {
  private nom: string;

  private constructor(_nom: string) {
    super();
    this.nom = _nom;
  }

  public getNom(): string {
    return this.nom;
  }
}

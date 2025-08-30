import { Entity } from "../contracts/Entity";

export class School extends Entity {
  private name: string;

  private constructor(_name: string) {
    super();
    this.name = _name;
  }

  public static createSchool(name: string): School {
    return new School(name);
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

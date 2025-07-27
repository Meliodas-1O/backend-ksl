export abstract class Entity {
  id?: string;
  createdAt?: Date;

  public setId(id: string): void {
    this.id = id;
  }
}

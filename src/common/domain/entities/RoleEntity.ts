export class RoleEntity {
  public id?: string;
  constructor(public name: string) {}

  public static createRole(name: string): RoleEntity {
    return new RoleEntity(name);
  }
}

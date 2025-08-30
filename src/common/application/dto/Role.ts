export enum Role {
  ADMIN,
  TEACHER,
  PARENT,
  SURVEILLANT,
}
export function isValidRole(value: unknown): boolean {
  const validRoles = Object.values(Role).filter((v) => typeof v === "number");
  return typeof value === "number" && validRoles.includes(value);
}

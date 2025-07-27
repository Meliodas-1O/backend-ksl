export enum Role {
  ADMIN,
  TEACHER,
  PARENT,
}
export function isValidRole(value: unknown): boolean {
  const validRoles = Object.values(Role).filter((v) => typeof v === "number");
  return typeof value === "number" && validRoles.includes(value);
}

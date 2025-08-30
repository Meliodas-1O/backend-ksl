export class Admin {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private schoolId: string;
  public id?: string;

  private constructor(
    _firstName: string,
    _lastName: string,
    _email: string,
    _password: string,
    _schoolId: string
  ) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.password = _password;
    this.schoolId = _schoolId;
  }
  public static createAdmin(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    schoolId: string
  ): Admin {
    return new Admin(firstName, lastName, email, password, schoolId);
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public getSchoolId(): string {
    return this.schoolId;
  }
  public setSchoolId(schoolId: string): void {
    this.schoolId = schoolId;
  }
}

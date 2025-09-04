export class UpdateParentFromAdminQuery {
  constructor(
    public parentId: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public telephone: string,
    public schoolId: string
  ) {}
}

export class UpdateTeacherFromAdminQuery {
  constructor(
    public profId: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public telephone: string,
    public classes: string[],
    public schoolId: string
  ) {}
}

export class UpdateSelfTeacherQuery {
  constructor(
    public profId: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public telephone: string,
    public adresse: string,
    public biographie: string,
    public schoolId: string
  ) {}
}

export class UpdateSelfParentQuery {
  constructor(
    public parentId: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public telephone: string,
    public profession: string,
    public adresse: string,
    public schoolId: string
  ) {}
}

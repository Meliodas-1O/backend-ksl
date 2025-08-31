import { SchoolUpdateRequest } from "../../models/SchoolUpdateRequest";

export class UpdateSchoolQuery {
  public constructor(public schoolId: string, public school: SchoolUpdateRequest) {}
}

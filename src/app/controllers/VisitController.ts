import { RequestHandler } from "express";
import { GetAllVisitsQuery } from "../../services/visitsvc/GetAllVisitsQuery";
import { StatusCode } from "../../common/application/dto/StatusCode";
import { mediator } from "../../common/mediator/Mediator";

const GetAllVisitors: RequestHandler = async (req, res) => {
  try {
    const command = new GetAllVisitsQuery();
    const result = await mediator.send(command);
    res.status(StatusCode.SUCCESS).json(result);
  } catch (error: any) {
    console.error("Error while retrieving Visits : ", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ reason: "Internal server error." });
  }
};

export const VisitController = {
  GetAllVisitors,
};

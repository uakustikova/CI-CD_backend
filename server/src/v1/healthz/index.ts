import { Request, Response } from "express";
import { DBService } from "../../app";
import { DBStatus } from "../../services/database";
import { successResponse } from "../response/success";
import { errorResponse } from "../response/error";
import { responseType } from "./type";

const healthz = (_: Request, res: Response) => {
  if (DBService.dbStatus === DBStatus.Started) {
    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: [
        {
          random: (Math.random() + 1).toString(36).substring(7),
          environment: process.env.ENVIRONMENT,
        },
      ],
    });
    return;
  }

  errorResponse({
    res,
    type: responseType,
    statusCode: 400,
    data: [
      {
        random: (Math.random() + 1).toString(36).substring(7),
        environment: process.env.ENVIRONMENT,
      },
    ],
  });
};

export default healthz;
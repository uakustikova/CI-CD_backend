import { Request, Response } from "express";
import { existsSync, mkdirSync, rmSync } from "fs";
import { DBService } from "../../app";
import {
  ABSOLUTE_USER_UPLOADS_IMAGE_PATH,
  ABSOLUTE_TEMPORARY_IMAGE_PATH,
} from "../../config/uploadPaths";
import { errorResponse } from "../response/error";
import { successResponse } from "../response/success";
import { responseType } from "./type";

export const reset = async (_: Request, res: Response) => {
  try{
    if (existsSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH)) {
      rmSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, { recursive: true, force: true });
      mkdirSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, { recursive: true });
    }
    if (existsSync(ABSOLUTE_TEMPORARY_IMAGE_PATH)) {
      rmSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, { recursive: true, force: true });
      mkdirSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, { recursive: true });
    }

    await DBService.dropDB();
    await DBService.syncDB();
    // seeds need to come last
    await DBService.seedDB();

    successResponse({
      res,
      type: responseType,
      statusCode: 200
    });
  } catch (err) {
    console.error(err);
    errorResponse({ res, type: responseType })
  }
};
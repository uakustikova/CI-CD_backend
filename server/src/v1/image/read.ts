import { Request, Response } from "express";
import { Image } from '../../models';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { responseType } from './type';

export const read = async (_: Request, res: Response) => {
  try {
    const images = await Image.findAll();

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: images,
    });
    return;
  } catch(err) {
    errorResponse({
      res,
      type: responseType
    })
    return;
  }
};

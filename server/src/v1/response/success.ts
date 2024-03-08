import { Response } from "express"
import { ResponseTypes } from "./types";

export interface SuccessResponseProps {
  res: Response,
  type: ResponseTypes,
  statusCode?: number,
  data?: Array<any>,
  message?: string,
};

export const successResponse = ({
  res,
  type,
  statusCode,
  data,
  message,
}: SuccessResponseProps) => {
  let successMessage = message;

  if (!message) {
    switch(statusCode) {
      case 201:
        successMessage = 'Created';
        break;
      default:
      case 200:
        successMessage = 'OK';
        break;
    }
  }

  res.status(statusCode || 200).json({
    error: null,
    type,
    message: successMessage,
    data: data || null,
  });
};

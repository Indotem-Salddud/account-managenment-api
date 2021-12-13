import express from 'express';
import { ResponseHandler } from '../../models/types/gen/responseHandler';

/**
 * ! Manage response and send it to the client
 * * whitehatdevv - 2021/12/12
 * @param handler {ResponseHandler}
 * @param res {Response}
 */
export const _handleResponse = (
  handler: ResponseHandler,
  res: express.Response
) => {
  res
    .json({
      message: handler.message,
      data: handler.data,
    })
    .status(handler.statusCode);
};

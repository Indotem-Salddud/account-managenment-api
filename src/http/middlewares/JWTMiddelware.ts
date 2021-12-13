import express from 'express';
import * as jwt from 'jsonwebtoken';
import {_handleResponse} from '../common/common';

export module JWTMiddelware {
    /**
     * ! Main actor to verify a token for granted access
     * * whitehatdevv - 2021/12/13
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
  export const _verify = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token: string = req.headers.authorization.split(' ')[1];
    // check token
    if (!token) {
      _handleResponse(
        {
          statusCode: 401,
          message: 'Authorization header is not received',
        },
        res
      );
    }

    // validate token
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, value) => {
      if (err) {
        _handleResponse(
          {
            statusCode: 403,
            message: 'Error validating the token',
          },
          res
        );
      }
      next();
    });
  };
}

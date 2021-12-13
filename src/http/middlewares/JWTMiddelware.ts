import express from 'express';
import * as jwt from 'jsonwebtoken';
import {_handleResponse} from '../common/common';

export module JWTMiddelware {
  export const _verify = (req: express.Request, res: express.Response) => {
    const token: string = req.headers.authorization;
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

    jwt.verify

  };
}

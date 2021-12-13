import express from 'express';
import * as jwt from 'jsonwebtoken';
import {Token} from '../../models/types/Token';
import {_handleResponse} from '../common/HandleResponse';
import {TokenPayload} from '../../models/types/gen/tokenPayload';

// global computation exp time
const _expMax = Math.floor(Date.now() / 1000) + 60 * 60 * 2;

export module JWTMiddelware {
  /**
   * ! Main actor to decode the token and get payload
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   * @returns TokenPayload
   */
  export const _decode = (
    req: express.Request,
    res: express.Response
  ): TokenPayload => {
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
    // get payload
    const payload = jwt.decode(token, {complete: true});
    return {
      accountID: payload.payload.accountID,
      role: payload.payload.role,
    };
  };

  /**
   * ! Main actor to sign a JWT Token
   * * whitehatdevv - 2021/12/13
   * * Token valid for 2 hours
   * TODO: Pending validation of token expiration
   * @param accountID {string}
   * @param role {string}
   * @return token {string}
   */
  export const _signIn = (accountID: string, role: string): Token => {
    return {
      expiration: _expMax,
      token: jwt.sign(
        {
          exp: _expMax,
          payload: {
            accountID: accountID,
            role: role,
          },
        },
        process.env.JWT_PRIVATE_KEY
      ),
      type: 'Bearer',
    };
  };

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
      if (err || Date.now() / 1000 > value.exp) {
        _handleResponse(
          {
            statusCode: 403,
            message: 'Token provided is not valid',
          },
          res
        );
      }
      next();
    });
  };
}

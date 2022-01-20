import express from 'express';
import * as jwt from 'jsonwebtoken';
import {Token} from '../../models/types/model.token';
import {s} from '../common/common.responseHandler';
import {refreshTokenPayload, TokenPayload} from '../../models/types/gen/gen.token';
import {PermissionRoles} from '../../models/types/gen/gen.permissions';

// global computation exp time
const _refreshTokenExpirationDays = 7;
const _expMax = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
const _expRefreshToken = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * _refreshTokenExpirationDays;

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
      s(
        401,
        {
          message: 'Authorization header is not received',
        },
        res
      );
    }
    // get payload
    const payload = jwt.decode(token, {complete: true});
    return {
      customerID: payload.payload.customerID,
      role: payload.payload.role,
    };
  };

  /**
   * ! Main actor to sign a JWT Token
   * * whitehatdevv - 2021/12/13
   * * Token valid for 2 hours
   * TODO: Pending validation of token expiration
   * @param customerID {string}
   * @return token {string}
   */
  export const _signIn = (customerID: string): Token => {
    return {
      expiration: _expMax,
      token: jwt.sign(
        {
          exp: _expMax,
          payload: {
            customerID: customerID,
            role: PermissionRoles.USER,
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
      s(
        401,
        {
          message: 'Authorization header is not received',
        },
        res
      );
    }

    // validate token
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, value) => {
      if (err || Date.now() / 1000 > value.exp) {
        s(
          401,
          {
            message: 'Token provided is not valid',
          },
          res
        );
      }
      req.user = {
        customerID: value.payload.customerID,
        role: value.payload.role,
      };
      next();
    });
  };

  /**
   * ! Grant new JWT based in refresh token payload
   * * DanBaDo - 2022/01/15
   * @param refresToken {refreshTokenPayload}
   * @returns token {string}
   */
  export const _refresh = (refresToken: refreshTokenPayload) => {
    const { customerID, role } =  refresToken;
    return {
      expiration: _expMax,
      token: jwt.sign(
        {
          exp: _expMax,
          payload: {customerID, role},
        },
        process.env.JWT_PRIVATE_KEY
      ),
      refreshToken: refresToken,
      type: 'Bearer',
    };
  }
}

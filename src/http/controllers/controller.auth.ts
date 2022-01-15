import {AuthActions} from '../actions/actions.auth';
import {s} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import * as jwt from 'jsonwebtoken';
import { error } from '../common/common.handlerGenerator';
import { AuthEndpoints } from '../common/Base/Base.AuthEndpoints';

// * Global properties
const _microservice = 'Auth';
const _version = 'v1.0.0';
const _date = Date.now();

export module AuthController {
  /**
   * ! Controller action to perform a login
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _login = async (req, res) => {
    const {username, password} = req.body;
    //TODO: VALIDATE FIELDS
    AuthActions.login(
      username,
      password,
      (err?: string, ctrl: boolean = false, id?: string) => {
        if (err || !ctrl) {
          s(
            500,
            {
              message: err,
            },
            res
          );
        }
        // prepare JWT
        const token = JWTMiddelware._signIn(id);
        s(
          200,
          {
            message: 'Login sucesfully',
          },
          res
        );
      }
    );
  };

  /**
   * ! Create new authentication tokens for valid refres tokens
   * * DanBaDo - 2022/01/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _refresh = async (req, res) => {
    const refreshTokenString: string =  req.headers.authorization.split(' ')[1];
    try {
      const  refresTokeData = jwt.decode(refreshTokenString,{complete: true});
      s(
        200,
        JWTMiddelware._refresh({ 
          customerID: refresTokeData.payload.customerID,
          role: refresTokeData.payload.role,
          tokenExp: refresTokeData.payload.tokenExp
        }),
        res
      )
    } catch (err) {
      s(
        500,
        error(
          [
            {
              message: "app_auth_refresh_error_building_token",
              code: "4681930a-9abc-42bc-b983-41692a4e8410",
              date: _date
            }
          ],
          {
            endpoint: AuthEndpoints.Refresh,
            microservice: _microservice,
            version: _version
          }
        ),
        res
      )
    }

  };
  /**
   * ! Update password by customer ID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
   export const _updatePassword = async (req, res) => {
    const {customerID} = req.user;
    //TODO: VALIDATE DATA
    const {password} = req.body;
    AuthActions.updatePassword(password, customerID, err => {
      if (err) {
        s(
          500,
          {
            message: 'Password cannot be updated',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Password was updated sucessfully',
        },
        res
      );
    });
  };
}

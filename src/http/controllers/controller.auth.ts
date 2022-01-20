import {AuthActions} from '../actions/actions.auth';
import {s} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import * as jwt from 'jsonwebtoken';
import { AuthEndpoints } from '../common/Base/Base.AuthEndpoints';
import { error,success } from '../common/common.handlerGenerator';
import { TranslatorKeys,TranslatorKeysUUID} from '../common/Base/Base.TranslatorKeys';

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
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppAuthLoginBadRequest,
                  code: TranslatorKeysUUID.AppAuthLoginBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: AuthEndpoints.Login,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppAuthLoginInternalServerError,
                  code: TranslatorKeysUUID.AppAuthLoginInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: AuthEndpoints.Login,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            503,
            error(
              [
                {
                  message: TranslatorKeys.AppAuthLoginServiceUnavailable ,
                  code: TranslatorKeysUUID.AppAuthLoginServiceUnavailable ,
                  date: _date
                }
              ],
              {
                endpoint: AuthEndpoints.Login,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
        }
        // prepare JWT
        const token = JWTMiddelware._signIn(id);
        s(
          200,
          success(
          {
            message: TranslatorKeys.AppAuthLoginLoginSuccessfully ,
            code: TranslatorKeysUUID.AppAuthLoginLoginSuccessfully ,         
          },
          ),
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
    AuthActions.updatePassword(password, customerID, (err?: string) => {
      if (err) {
          s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppAuthPasswordBadRequest,
                  code: TranslatorKeysUUID.AppAuthPasswordBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: AuthEndpoints.Login,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
        s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppAuthPasswordUnauthorized,
                  code: TranslatorKeysUUID.AppAuthPasswordUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: AuthEndpoints.Login,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
        s(
          500,
          error(
            [
              {
                message: TranslatorKeys.AppAuthPasswordInternalServerError ,
                code: TranslatorKeysUUID.AppAuthPasswordInternalServerError ,
                date: _date
              }
            ],
            {
              endpoint: AuthEndpoints.Login,
              microservice: _microservice,
              version: _version
            }
          ),
          res
        );
      }
       s(
          200,
          success(
          {
            message: TranslatorKeys.AppAuthPasswordUpdatedSuccessfully ,
            code: TranslatorKeysUUID.AppAuthPasswordUpdatedSuccessfully ,         
          },
          ),
          res
        );
    });
  };
}

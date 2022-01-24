import {AuthActions} from '../actions/actions.auth';
import {s} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import { AuthEndpoints } from '../common/Base/Base.AuthEndpoints';
import { error,success } from '../common/common.handlerGenerator';
import { TranslatorKeys,TranslatorKeysUUID} from '../common/Base/Base.TranslatorKeys';
import { refreshTokenPayload, tokenPurpouses } from '../../models/types/gen/gen.token';

// * Global properties
const _microservice = 'Auth';
const _version = 'v1.0.0';
const _date = Date.now();
const _now = Math.floor(_date/1000);

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
   * ! Provides new refresh token
   * * DanBaDo - 2022/01/20
   * @param req {Request}
   * @param res {Response}
   */
  export const _provideRefreshToken = (req, res) => {
    const {customerID} = req.user;
    AuthActions.insertNewRefreshToken(
      customerID,
      (err?: string, tokenID?: string, tokenExp?: number) => {
        if (err) {
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppAuthRefreshBadRequest,
                  code: TranslatorKeysUUID.AppAuthRefreshBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: AuthEndpoints.Refresh,
                microservice: _microservice,
                version: _version,
              }
            ),
            res
          );
        }

        const token: refreshTokenPayload = {
          tokenID,
          purpouse: tokenPurpouses.refres,
          role: req.user.role,
          tokenExp
        }
        s(
          200,
          JWTMiddelware._signToken(token),
          res
        );
      }
    )
  }
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
  /**
   * ! Perform a login if a valid refresh token is provided
   * * DanBaDo - 2022/01/21
   * @param req {Request}
   *  @body {
   *    @param refreshToken: {string}
   *  }
   * @param res {Response}
   */
  export const _loginByRefreshToken = async (req, res) => {
    const refreshToken: string = req.body.refreshToken;
    const tokenPayload =  JWTMiddelware._decodeRefresh(refreshToken);
    const {
      tokenID,
      purpouse,
      tokenExp,
      role
    } = tokenPayload;
    // Verify not expirated and purpouse is refresh
    if (
      purpouse !== tokenPurpouses.refres
        ||
      tokenExp < _now 
    ) {
      s(
        401,
        error(
          [
            {
              message: TranslatorKeys.AppAuthRefreshBadRequest,
              code: TranslatorKeysUUID.AppAuthRefreshBadRequest,
              date: _date
            }
          ],
          {
            microservice: _microservice,
            endpoint: AuthEndpoints.Refresh,
            version: _version
          },
        ),
        res
      );
    }
    // Search for active refresh token
    // TODO: Run SQL query and do verifications
    AuthActions.getRefreshToken(tokenID, (err, tokens: string[])=>{
      if (err || tokens.length < 1) {
        s(
          401,
          error(
            [
              {
                message: TranslatorKeys.AppAuthRefreshBadRequest,
                code: TranslatorKeysUUID.AppAuthRefreshBadRequest,
                date: _date
              }
            ],
            {
              microservice: _microservice,
              endpoint: AuthEndpoints.Refresh,
              version: _version
            },
          ),
          res
        );
      }
      const customerID = tokens[0];
      // Grant JWT
      s(
        200,
        JWTMiddelware._signIn(customerID),
        res
      );
    });

  };
}

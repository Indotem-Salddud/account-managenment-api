import {AuthActions} from '../actions/actions.auth';
import { AuthEndpoints } from '../common/Base/Base.AuthEndpoints';
import {s} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import { error } from '../common/common.handlerGenerator';

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
            error(
              [
                {
                  message: "app_auth_login_post_internal_server_error",
                  code: "90fcdcb0-c8ca-4a95-a586-4178292a59cd",
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
          {
            message: 'app_auth_login_post_login_sucesfully',
          },
          res
        );
      }
    );
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
          error(
            [
              {
                message: "app_auth_password_put_internal_server_error",
                code: "0a3adaec-9f5d-4f13-aed6-fc94ce79dfd9",
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
        {
          message: 'app_auth_password_put_updated_sucessfully',
        },
        res
      );
    });
  };
}

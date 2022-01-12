import {AuthActions} from '../actions/actions.auth';
import {s} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';

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

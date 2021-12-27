import {CustomerActions} from '../actions/actions.customers';
import {_handleResponse} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import {
    ac,
    PermissionActions,
  } from '../../models/types/gen/gen.permissions';

/**
   * ! Controller action to perform a login
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
 export const _login = async (req, res) => {
    const {username, password} = req.body;
    //TODO: VALIDATE FIELDS
    CustomerActions.login(
      username,
      password,
      (err?: string, ctrl: boolean = false, id?: string) => {
        if (err || !ctrl) {
          _handleResponse({statusCode: 500, message: err}, res);
        }
        // prepare JWT
        const token = JWTMiddelware._signIn(id);
        _handleResponse(
          {statusCode: 200, message: 'Login sucesfully', data: token},
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
    const permissions = ac
      .can(req.user.role)
      .updateOwn(PermissionActions.CUSTOMER);
    if (permissions.granted) {
      const {customerID} = req.user;
      //TODO: VALIDATE DATA
      const {password} = req.body;
      CustomerActions.updatePassword(password, customerID, err => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Password cannot be updated'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Password was updated sucessfully'},
          res
        );
      });
    } else {
      _handleResponse(
        {statusCode: 401, message: 'You do not have right access permissions'},
        res
      );
    }
  };
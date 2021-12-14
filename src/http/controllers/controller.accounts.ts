import express from 'express';
import {TinyAccount} from '../../models/types/model.account';
import {AccountActions} from '../actions/actions.accounts';
import {_handleResponse} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import {
  ac,
  PermissionActions,
  PermissionRoles,
} from '../../models/types/gen/gen.permissions';

export module AccountsController {
  /**
   * ! Controller function to get account by their ID
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   */
  export const _getById = async (
    req: express.Request,
    res: express.Response
  ) => {
    // validate permissions
    const permissions = ac
      .can(req.user.role)
      .readOwn(PermissionActions.ACCOUNT);
    if (permissions.granted) {
      const {accountID} =
        req.user.role == PermissionRoles.USER ? req.user : req.params;
      if (!accountID) {
        _handleResponse(
          {statusCode: 400, message: 'Data provided is not valid'},
          res
        );
      }
      // call to action
      AccountActions.findById(accountID, (err?: string, data?: TinyAccount) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Server response cannot be processed'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Account data received', data: data},
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

  /**
   * ! Controller function to all account staff
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   */
  export const _getAll = async (req, res) => {
    // permissions
    const permissions = ac
      .can(req.user.role)
      .readAny(PermissionActions.ACCOUNT);
    if (permissions.granted) {
      // call to action
      AccountActions.findAll((err?: string, data?: TinyAccount) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Server response cannot be processed'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Account data received', data: data},
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

  /**
   * ! Controller action to perform a login
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _login = async (req, res) => {
    const {username, password} = req.body;
    //TODO: VALIDATE FIELDS
    AccountActions.login(
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
   * ! Delete account data by ID
   * * whitehatdevv - 2021/12/14
   * TODO: Delete in cascade all relaionships associated
   * @param req {Request}
   * @param res {Response}
   */
  export const _deleteAccount = async (req, res) => {
    const permissions = ac
      .can(req.user.role)
      .deleteOwn(PermissionActions.ACCOUNT);
    if (permissions.granted) {
      const {accountID} =
        req.user.role == PermissionRoles.USER ? req.user : req.params;
      if (!accountID) {
        _handleResponse(
          {statusCode: 400, message: 'Account ID not provided'},
          res
        );
      }
      // call to action
      AccountActions.deleteAccount(accountID, (err: string = null) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Account cannot be deleted'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Account was delete sucessfully'},
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

  /**
   * ! Update account status by accountID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateStatus = async (req, res) => {
    const permissions = ac
      .can(req.user.role)
      .updateOwn(PermissionActions.ACCOUNT);
    if (permissions.granted) {
      const {accountID} =
        req.user.role == PermissionRoles.USER ? req.user : req.params;
      const {status} = req.body;
      // TODO: VALIDATE ACOUNT STATUS
      if (!accountID) {
        _handleResponse(
          {statusCode: 400, message: 'Account ID not provided'},
          res
        );
      }
      // call to action
      AccountActions.updateStatus(accountID, status, (err: string = null) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Account cannot be updated'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Account status was updated sucessfully'},
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
}
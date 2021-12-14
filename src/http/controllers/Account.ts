import express from 'express';
import {TinyAccount} from '../../models/types/Account';
import {AccountActions} from '../actions/account';
import {_handleResponse} from '../common/HandleResponse';
import {JWTMiddelware} from '../middlewares/JWTMiddelware';

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
    const {accountID} = req.params;
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
  };

  /**
   * ! Controller function to all account staff
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   */
  export const _getAll = async (req, res) => {
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
    const {accountID} = req.params;
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
  };

  /**
   * ! Update account status by accountID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateStatus = async (req, res) => {
    const {accountID} = req.params;
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
  };
}

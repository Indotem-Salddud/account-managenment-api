import express from 'express';
import {TinyAccount} from '../../models/types/Account';
import {AccountActions} from '../actions/account';
import {_handleResponse} from '../common/common';

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
}

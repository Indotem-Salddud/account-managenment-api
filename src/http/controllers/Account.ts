import express from 'express';
import {TinyAccount} from '../../models/types/Account';
import {AccountActions} from '../actions/account';

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
      //TODO: Response
    }
    // call to action
    AccountActions.findById(accountID, (err?: string, data?: TinyAccount) => {
      if (err) {
        //TODO: Response
      }
      // TODO: Response with data
    });
  };
}

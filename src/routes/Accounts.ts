import express from 'express';
import {AccountsController} from '../http/controllers/Account';

export const AccountsRoute = (app: express.Application) => {
  /**
   * * Get account by ID endpoint
   * @param acccountID {Number}
   * @protected Admin or User with accountID
   */
  app.get(`/:accountID`, [], AccountsController._getById);
};

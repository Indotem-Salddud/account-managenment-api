import express from 'express';
import {AccountsController} from '../http/controllers/Account';

export const AccountsRoute = (app: express.Application) => {
  /**
   * * Get account by ID endpoint
   * @param acccountID {Number}
   * @protected Admin or User with accountID
   */
  app.get(`/:accountID`, [], AccountsController._getById);
  /**
   * * Get all account staff
   * @protected Admin
   */
  app.get(`/`, [], AccountsController._getAll);
  /**
   * * Login
   */
  app.post('/login', AccountsController._login);
  /**
   * * Delete account by ID
   * @param accountID {Number}
   * @protected Admin
   */
  app.delete('/:accountID', [], AccountsController._deleteAccount);
};

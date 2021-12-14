import express from 'express';
import {AccountsController} from '../http/controllers/controller.accounts';

export const AccountsRoute = (app: express.Application) => {
  /**
   * * Get account by ID endpoint
   * @param acccountID {Number}
   * @protected Admin or User with accountID
   */
  app.get(`/:accountID`, AccountsController._getById);
  /**
   * * Get all account staff
   * @protected Admin
   */
  app.get(`/`, AccountsController._getAll);
  /**
   * * Login
   * @body {
   *  @param username: {string}
   *  @param password: {string}
   * }
   */
  app.post('/login', AccountsController._login);
  /**
   * * Delete account by ID
   * @param accountID {Number}
   * @protected Admin
   */
  app.delete('/:accountID', AccountsController._deleteAccount);
  /**
   * * Update account status by ID
   * @param accountID {Number}
   * @protected Admin
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch('/status/:accountID', AccountsController._updateStatus);
};
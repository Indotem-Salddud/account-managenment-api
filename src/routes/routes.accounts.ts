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
   * @protected Admin or User with Account ID
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch('/status/:accountID', AccountsController._updateStatus);
  /**
   * * Update account data by ID
   * @param accountID {Number}
   * @protected Admin or User with Account ID
   * @body {
   *  @param name? {string}
   *  @param email? {string}
   *  @param phone? {string}
   *  @param direction? {direction}
   * }
   */
  app.put('/:accountID', AccountsController._updateById);
  /**
   * * Update account password
   * @protected Only Account with ID provided by Token
   * @body {
   *  @param password {string} 
   * }
   */
  app.put('/password', AccountsController._updatePassword);
};

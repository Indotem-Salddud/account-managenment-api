import express from 'express';
import {AccountsController} from '../http/controllers/controller.accounts';
import { PermissionActions } from '../models/types/gen/gen.permissions';
import { AccessControlMiddelware } from '../http/middlewares/middelware.access.validation';

const _resource = PermissionActions.ACCOUNT;

export const AccountsRoute = (app: express.Application) => {
  /**
   * * Get account by ID endpoint
   * @param acccountID {Number}
   * @protected Admin or User with accountID
   */
  app.get(`/:accountID`, [AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  })], AccountsController._getById);
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
  /**
   * * Get dependants for a account
   * @protected Admin or User with Account ID
   * @param accountID
   */
  app.put('/:accountID/dependents', AccountsController._getDependents);
};

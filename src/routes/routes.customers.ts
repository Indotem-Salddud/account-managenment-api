import express from 'express';
import {customersController} from '../http/controllers/controller.customers';
import { PermissionActions } from '../models/types/gen/gen.permissions';
import { AccessControlMiddelware } from '../http/middlewares/middelware.access.validation';

const _resource = PermissionActions.customer;

export const customersRoute = (app: express.Application) => {
  /**
   * * Get customer by ID endpoint
   * @param acccountID {Number}
   * @protected Admin or User with customerID
   */
  app.get(`/:customerID`, [AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  })], customersController._getById);
  /**
   * * Get all customer staff
   * @protected Admin
   */
  app.get(`/`, customersController._getAll);
  /**
   * * Login
   * @body {
   *  @param username: {string}
   *  @param password: {string}
   * }
   */
  app.post('/login', customersController._login);
  /**
   * * Delete customer by ID
   * @param customerID {Number}
   * @protected Admin
   */
  app.delete('/:customerID', customersController._deletecustomer);
  /**
   * * Update customer status by ID
   * @param customerID {Number}
   * @protected Admin or User with customer ID
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch('/status/:customerID', customersController._updateStatus);
  /**
   * * Update customer data by ID
   * @param customerID {Number}
   * @protected Admin or User with customer ID
   * @body {
   *  @param name? {string}
   *  @param email? {string}
   *  @param phone? {string}
   *  @param direction? {direction}
   * }
   */
  app.put('/:customerID', customersController._updateById);
  /**
   * * Update customer password
   * @protected Only customer with ID provided by Token
   * @body {
   *  @param password {string} 
   * }
   */
  app.put('/password', customersController._updatePassword);
};

import express from 'express';
import {CustomersController} from '../http/controllers/controller.customers';
import { PermissionActions } from '../models/types/gen/gen.permissions';
import { AccessControlMiddelware } from '../http/middlewares/middelware.access.validation';

const _resource = PermissionActions.CUSTOMER;

export const CustomersRoute = (app: express.Application) => {
  /**
   * * Get customer by ID endpoint
   * @param acccountID {Number}
   * @protected Admin or User with customerID
   */
  app.get(`/:customerID`, [AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  })], CustomersController._getById);
  /**
   * * Get all customer staff
   * @protected Admin
   */
  app.get(`/`, CustomersController._getAll);
  /**
   * * Login
   * @body {
   *  @param username: {string}
   *  @param password: {string}
   * }
   */
  app.post('/login', CustomersController._login);
  /**
   * * Delete customer by ID
   * @param customerID {Number}
   * @protected Admin
   */
  app.delete('/:customerID', CustomersController._deleteCustomer);
  /**
   * * Update customer status by ID
   * @param customerID {Number}
   * @protected Admin or User with customer ID
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch('/status/:customerID', CustomersController._updateStatus);
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
  app.put('/:customerID', CustomersController._updateById);
  /**
   * * Update customer password
   * @protected Only customer with ID provided by Token
   * @body {
   *  @param password {string} 
   * }
   */
  app.put('/password', CustomersController._updatePassword);
};

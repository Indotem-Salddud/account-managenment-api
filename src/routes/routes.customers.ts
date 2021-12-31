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
  app.get(`/`, AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_resource)
  }), CustomersController._getAll);
  /**
   * * Delete customer by ID
   * @param customerID {Number}
   * @protected Admin
   */
  app.delete('/:customerID', AccessControlMiddelware._grantAccess((query) => {
    return query.deleteAny(_resource)
  }), CustomersController._deleteCustomer);
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

};

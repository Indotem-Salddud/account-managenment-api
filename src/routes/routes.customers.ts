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
  app.get(`/customers/:customerID`, [AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_resource);
  })], CustomersController._getById);
  /**
   * * Get own customer account
   * @param acccountID {Number}
   * @protected Logged customer
   */
    app.get(`/myAccount/`, [AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  })], CustomersController._getOwnCustomerAccount);
  /**
   * * Get all customer staff
   * @protected Admin
   */
  app.get(`/allCustomers/`, AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_resource)
  }), CustomersController._getAll);
  /**
   * * Delete customer by ID
   * @param customerID {Number}
   * @protected Admin
   */
  app.delete('/customers/:customerID', AccessControlMiddelware._grantAccess((query) => {
    return query.deleteAny(_resource)
  }), CustomersController._deleteCustomer);
  /**
   * * Update own customer status
   * @param customerID {Number}
   * @protected Logged customer
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch('/myStatus/', AccessControlMiddelware._grantAccess((query) => {
    return query.updateOwn(_resource)
  }), CustomersController._updateStatus);

  /**
   * * Update customer status by ID
   * @param customerID {Number}
   * @protected Admin
   * @body {
   *  @param status {Number}
   * }
   */
   app.patch('/status/:customerID', AccessControlMiddelware._grantAccess((query) => {
    return query.updateAny(_resource)
  }), CustomersController._updateStatus);
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
  app.put('/customers/:customerID', AccessControlMiddelware._grantAccess((query) => {
    return query.updateOwn(_resource)
  }), CustomersController._updateById);
  /**
   * * Update own customer data
   * @protected Logged user
   * @body {
   *  @param name? {string}
   *  @param email? {string}
   *  @param phone? {string}
   *  @param direction? {direction}
   * }
   */
  app.put('/myAccount/', AccessControlMiddelware._grantAccess((query) => {
    return query.updateOwn(_resource)
  }), CustomersController._updateOwnCustomerAccount);
};

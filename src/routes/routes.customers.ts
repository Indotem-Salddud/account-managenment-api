import express from 'express';
import {CustomersController} from '../http/controllers/controller.customers';
import {PermissionActions} from '../models/types/gen/gen.permissions';
import {AccessControlMiddelware} from '../http/middlewares/middelware.access.validation';
import {CustomerEndpoints} from '../http/common/Base/Base.CustomerEndpoint';
import {JWTMiddelware} from '../http/middlewares/middelware.jwt';

// * Global variables
const _resource = PermissionActions.CUSTOMER;

export const CustomersRoute = (app: express.Application) => {
  /**
   * * Get customer by ID
   * @param acccountID {Number}
   * @protected Admin or User with customerID
   */
  app.get(
    CustomerEndpoints.GetCustomerById,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.readAny(_resource);
      }),
    ],
    CustomersController._getById
  );
  /**
   * * Get own customer account
   * @param acccountID {Number}
   * @protected Logged customer
   */
  app.get(
    CustomerEndpoints.GetOwnCustomerData,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.readOwn(_resource);
      }),
    ],
    CustomersController._getOwnCustomerAccount
  );
  /**
   * * Get all customer staff
   * @protected Admin
   */
  app.get(
    CustomerEndpoints.GetAllCustomersData,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.readAny(_resource);
      }),
    ],
    CustomersController._getAll
  );
  /**
   * * Delete customer by ID
   * @param customerID {Number}
   * @protected Admin
   */
  app.delete(
    CustomerEndpoints.DeleteCustomerById,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.deleteAny(_resource);
      }),
    ],
    CustomersController._deleteCustomer
  );
  /**
   * * Update own customer status
   * @param customerID {Number}
   * @protected Logged customer
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch(
    CustomerEndpoints.UpdateOwnCustomerStatus,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.updateOwn(_resource);
      }),
    ],
    CustomersController._updateOwnStatus
  );

  /**
   * * Update customer status by ID
   * @param customerID {Number}
   * @protected Admin
   * @body {
   *  @param status {Number}
   * }
   */
  app.patch(
    CustomerEndpoints.UpdateCustomerStatusById,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.updateAny(_resource);
      }),
    ],
    CustomersController._updateStatusById
  );
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
  app.put(
    CustomerEndpoints.UpdateCustomerDataById,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.updateOwn(_resource);
      }),
    ],
    CustomersController._updateById
  );
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
  app.put(
    CustomerEndpoints.UpdateOwnCustomerData,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.updateOwn(_resource);
      }),
    ],
    CustomersController._updateOwnCustomerAccount
  );

  /**
   * * Get customer profile
   * @protected Logged user
   */
  app.get(
    CustomerEndpoints.GetOwnCustomerProfile,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.readOwn(_resource);
      }),
    ],
    CustomersController._profile
  );
};

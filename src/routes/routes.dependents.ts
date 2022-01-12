import express from 'express';
import {DependentsController} from '../http/controllers/controller.dependents';
import { PermissionActions } from '../models/types/gen/gen.permissions';
import { AccessControlMiddelware } from '../http/middlewares/middelware.access.validation';
import { DependentsEndpoints } from '../http/common/Base/Base.DependentsEndpoints';

// * Global variables
const _dependent = PermissionActions.DEPENDENTS;
const _customer = PermissionActions.CUSTOMER;

export const DependentsRoute = (app: express.Application) => {

  /**
   * * Create new owned dependent
   * @protected Logged customer
   */
   app.post(DependentsEndpoints.GetOwnedDependents, AccessControlMiddelware._grantAccess((query) => {
    return query.createOwn(_dependent);
  }),DependentsController._newOwnedDependent)
  
  /**
   * * Create new dependent for one or many customer
   * @protected Admin
   */
   app.post(DependentsEndpoints.CreateNewDependent, AccessControlMiddelware._grantAccess((query) => {
    return query.createAny(_dependent);
  }),DependentsController._newDependentForCustomer)
  
  /**
   * * Get owned dependents
   * @protected Logged customer
   */
   app.get(DependentsEndpoints.GetOwnedDependents, AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_dependent);
  }), DependentsController._getMyDependents);

  /**
   * * Get dependents for a customer
   * @protected Admin or User with Customer ID
   * @param customerID
   */
   app.get(DependentsEndpoints.GetDependentsCustomer, AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_dependent);
  }), DependentsController._getAllCustomerDependents);

  /**
   * * Get owned dependent for a ID
   * @protected Logged customer
   * @param dependentID
   */
  app.get(DependentsEndpoints.GetOwnedDependentById, AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_dependent);
  }),DependentsController._getMyDependentById)

  /**
   * * Get dependent by ID
   * @protected Admin
   * @param dependentID
   */
  app.get(DependentsEndpoints.GetDependentById, AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_dependent);
  }),DependentsController._getDependentById);

  /**
   * * Delete dependent by ID
   * @param dependentID {Number}
   * @protected Admin
   */
     app.delete(DependentsEndpoints.DeleteDependentById, AccessControlMiddelware._grantAccess((query) => {
      return query.deleteAny(_dependent)
    }), DependentsController._deleteDependent);

  /**
   * * Delete own dependent by ID
   * @param dependentID {Number}
   * @protected Logged customer
   */
       app.delete(DependentsEndpoints.DeleteOwnDependentsById, AccessControlMiddelware._grantAccess((query) => {
        return query.deleteOwn(_dependent)
      }), DependentsController._deleteDependent);


  /**Update own dependent data by ID
   * @param dependentID {Number}
   * @protected Logged customer
   * @body {
   *  @param name? {string}
   *  @param phone? {string}
   *  @param direction? {direction}
   * }
   */
  app.put(DependentsEndpoints.DeleteOwnDependentsDataById, AccessControlMiddelware._grantAccess((query) => {
    return query.updateOwn(_dependent)
  }), DependentsController._updateDependentById);

  /**Update dependent data by ID
   * @param dependentID {Number}
   * @protected Admin
   * @body {
   *  @param name? {string}
   *  @param phone? {string}
   *  @param direction? {direction}
   * }
   */
   app.put(DependentsEndpoints.UpdateDependentDataById, AccessControlMiddelware._grantAccess((query) => {
    return query.updateAny(_dependent)
  }), DependentsController._updateDependentById);

  /**
   * * Update dependent status by ID
   * @param dependentID {Number}
   * @protected Admin
   * @body {
   *  @param status {Number}
   * }
   */
   app.patch(DependentsEndpoints.UpdateDependentStatusById, AccessControlMiddelware._grantAccess((query) => {
    return query.updateAny(_dependent)
  }), DependentsController._updateDependentStatus);

  /**
   * * Update dependent status by ID
   * @param customerID {Number}
   * @param dependentID {Number}
   * @protected Admin
   * @body {
   *  @param status {Number}
   * }
   */
   app.patch(DependentsEndpoints.UpdateOwnDependentStatusById, AccessControlMiddelware._grantAccess((query) => {
    return query.updateOwn(_dependent)
  }), DependentsController._updateOwnDependentStatus);

  /**
   * * Get customer owner by dependent ID
   * @protected Admin
   * @param dependentID
   */
   app.get(DependentsEndpoints.GetCustomerOwnerByDependentId, AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_customer);
  }),DependentsController._getOwnersByDependentId);

};
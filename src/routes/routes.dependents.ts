import express from 'express';
import {DependentsController} from '../http/controllers/controller.dependents';
import { PermissionActions } from '../models/types/gen/gen.permissions';
import { AccessControlMiddelware } from '../http/middlewares/middelware.access.validation';

const _resource = PermissionActions.CUSTOMER;

export const DependentsRoute = (app: express.Application) => {

  /**
   * * Create new owned dependent
   * @protected Logged customer
   */
   app.post('/my-dependents/', AccessControlMiddelware._grantAccess((query) => {
    return query.createOwn(_resource);
  }),DependentsController._newOwnedDependent)
  
  /**
   * * Create new dependent for a customer
   * @protected Admin
   */
   app.post('/dependents/', AccessControlMiddelware._grantAccess((query) => {
    return query.createAny(_resource);
  }),DependentsController._newDependentForCustomer)
  
  /**
   * * Get owned dependents
   * @protected Logged customer
   */
   app.get('/all-my-dependents/', AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  }), DependentsController._getDependents);

  /**
   * * Get dependents for a customer
   * @protected Admin or User with Customer ID
   * @param customerID
   */
   app.get('/dependents-for/:customerID', AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_resource);
  }), DependentsController._getDependents);

  /**
   * * Get owned dependent for a ID
   * @protected Logged customer
   * @param dependentID
   */
  app.get('my-dependents/:dependentID/', AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  }),DependentsController._getMyDependentById)

  /**
   * * Get dependent by ID
   * @protected Admin
   * @param dependentID
   */
  app.get('/dependent/:dependentID/', AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_resource);
  }),DependentsController._getDependentById);

  /**
   * * Delete dependent by ID
   * @param dependentID {Number}
   * @protected Admin
   */
     app.delete('/dependents/:dependentID', AccessControlMiddelware._grantAccess((query) => {
      return query.readAny(_resource)
    }), DependentsController._deleteDependent);


};
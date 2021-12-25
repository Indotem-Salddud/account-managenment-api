import express from 'express';
import {DependentsController} from '../http/controllers/controller.dependents';
import { PermissionActions } from '../models/types/gen/gen.permissions';
import { AccessControlMiddelware } from '../http/middlewares/middelware.access.validation';

const _resource = PermissionActions.ACCOUNT;

export const DependentsRoute = (app: express.Application) => {

  /**
   * * Get dependents for a account
   * @protected Admin or User with Account ID
   * @param accountID
   */
  app.get('/dependentsFor/:accountID', AccessControlMiddelware._grantAccess((query) => {
    return query.readAny(_resource);
  }), DependentsController._getDependents);

  /**
   * * Get owned dependent for a ID
   * @protected Logged account
   * @param dependentID
   */
  app.get('myDependents/:dependentID/', AccessControlMiddelware._grantAccess((query) => {
    return query.readOwn(_resource);
  }),DependentsController._getMyDependentById)
  
};

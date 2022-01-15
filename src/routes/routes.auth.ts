import express from 'express';
import {AuthController} from '../http/controllers/controller.auth';
import {PermissionActions} from '../models/types/gen/gen.permissions';
import {AccessControlMiddelware} from '../http/middlewares/middelware.access.validation';
import {AuthEndpoints} from '../http/common/Base/Base.AuthEndpoints';
import {JWTMiddelware} from '../http/middlewares/middelware.jwt';

// * Global variables
const _resource = PermissionActions.CUSTOMER;

export const CustomersRoute = (app: express.Application) => {
  /**
   * * Login
   * @body {
   *  @param username: {string}
   *  @param password: {string}
   * }
   */
  app.post(AuthEndpoints.Login, AuthController._login);
  /**
   * * Update customer password
   * @protected Only customer with ID provided by Token
   * @body {
   *  @param password {string}
   * }
   */
  app.put(
    AuthEndpoints.UpdatePassword,
    [
      JWTMiddelware._verify,
      AccessControlMiddelware._grantAccess(query => {
        return query.updateOwn(_resource);
      }),
    ],
    AuthController._updatePassword
  );
};

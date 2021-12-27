import express from 'express';
import {AuthController} from '../http/controllers/controller.auth';


export const CustomersRoute = (app: express.Application) => {

/**
   * * Login
   * @body {
   *  @param username: {string}
   *  @param password: {string}
   * }
   */
  app.post('/login', AuthController._login);
   /**
   * * Update customer password
   * @protected Only customer with ID provided by Token
   * @body {
   *  @param password {string} 
   * }
   */
    app.put('/password', AuthController._updatePassword);
   };
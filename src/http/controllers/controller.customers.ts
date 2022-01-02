import express from 'express';
import {
  TinyCustomer,
  UpdateCustomerModel,
} from '../../models/types/model.customer';
import {CustomerActions} from '../actions/actions.customers';
import {_handleResponse} from '../common/common.responseHandler';
import {JWTMiddelware} from '../middlewares/middelware.jwt';
import {
  ac,
  PermissionActions,
  PermissionRoles,
} from '../../models/types/gen/gen.permissions';
import { DependentsActions } from '../actions/actions.dependents';

export module CustomersController {
  /**
   * ! Controller function to get customer by their ID
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   */
  export const _getById = async (
    req: express.Request,
    res: express.Response
  ) => {
    const {customerID} = req.params;
      if (!customerID) {
        _handleResponse(
          {statusCode: 400, message: 'Data provided is not valid'},
          res
        );
      }
      // call to action
      CustomerActions.findById(customerID, (err?: string, data?: TinyCustomer) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Server response cannot be processed'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Customer data received', data: data},
          res
        );
      });
  };

  /**
   * ! Controller function to all customer staff
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   */
  export const _getAll = async (req, res) => {
    // permissions
    const permissions = ac
      .can(req.user.role)
      .readAny(PermissionActions.CUSTOMER);
    if (permissions.granted) {
      // call to action
      CustomerActions.findAll((err?: string, data?: TinyCustomer) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Server response cannot be processed'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Customer data received', data: data},
          res
        );
      });
    } else {
      _handleResponse(
        {statusCode: 401, message: 'You do not have right access permissions'},
        res
      );
    }
  };


  /**
   * ! Delete customer data by ID
   * * whitehatdevv - 2021/12/14
   * TODO: Delete in cascade all relaionships associated
   * @param req {Request}
   * @param res {Response}
   */
  export const _deleteCustomer = async (req, res) => {
    const permissions = ac
      .can(req.user.role)
      .deleteOwn(PermissionActions.CUSTOMER);
    if (permissions.granted) {
      const {customerID} =
        req.user.role == PermissionRoles.USER ? req.user : req.params;
      if (!customerID) {
        _handleResponse(
          {statusCode: 400, message: 'Customer ID not provided'},
          res
        );
      }
      // call to action
      CustomerActions.deleteCustomer(customerID, (err: string = null) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Customer cannot be deleted'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Customer was delete sucessfully'},
          res
        );
      });
    } else {
      _handleResponse(
        {statusCode: 401, message: 'You do not have right access permissions'},
        res
      );
    }
  };

  /**
   * ! Update customer status by customerID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateStatus = async (req, res) => {
      const {customerID} = req.user;
      const {status} = req.body;
      // TODO: VALIDATE ACOUNT STATUS
      if (!customerID) {
        _handleResponse(
          {statusCode: 400, message: 'Customer ID not provided'},
          res
        );
      }
      // call to action
      CustomerActions.updateStatus(customerID, status, (err: string = null) => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Customer status cannot be updated'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Customer status was updated sucessfully'},
          res
        );
      });
  };

  /**
   * ! Update customer data by customerID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateById = async (req, res) => {
      const {customerID} = req.user;
      if (!customerID) {
        _handleResponse(
          {statusCode: 400, message: 'Customer ID not provided'},
          res
        );
      }

      //TODO: VALIDATE FIELDS
      const data: UpdateCustomerModel = req.body;
      // call to action
      CustomerActions.updateData(data, customerID, err => {
        if (err) {
          _handleResponse(
            {statusCode: 500, message: 'Customer data cannot be updated'},
            res
          );
        }
        _handleResponse(
          {statusCode: 200, message: 'Customer data was updated sucessfully'},
          res
        );
      });
  };

  /**
   * ! Insert new customer
   * * DanBaDo 2022/01/02
   * @param req {Request}
   * @param res {Response}
   */
  export const _newCustomer = async (
      req: express.Request,
      res: express.Response
    ) => {
    // get customer data
    const { name, username, email, phone, direction, password } = req.body;
    // call to action
    CustomerActions.insertNewCustomer(
      name,
      username,
      email,
      phone,
      direction,
      password,
      (err?: string, data?: TinyCustomer) => {
        if (err) {
          _handleResponse(
            { statusCode: 500, message: 'Server response cannot be processed' },
            res
          );
        }
        _handleResponse(
          { statusCode: 200, message: 'Customer created', data: data },
          res
        );
      }
    );
  };
}

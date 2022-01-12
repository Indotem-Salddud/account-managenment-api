import express from 'express';
import {
  TinyCustomer,
  UpdateCustomerModel,
} from '../../models/types/model.customer';
import {CustomerActions} from '../actions/actions.customers';
import { CustomerEndpoints } from '../common/Base/Base.CustomerEndpoint';
import {s} from '../common/common.responseHandler';

// * Global properties
const _microservice = 'Customers';
const _version = 'v1.0.0';
const _date = Date.now();

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
      s(
        400,
        {
          message: 'Data provided is not valid',
        },
        res
      );
    }
    // call to action
    CustomerActions.findById(
      customerID,
      (err?: string, data?: TinyCustomer) => {
        if (err) {
          s(
            500,
            {
              message: 'Server response cannot be processed',
            },
            res
          );
        }
        s(
          200,
          {
            message: 'Customer data received',
            data: data,
          },
          res
        );
      }
    );
  };
  /**
   * ! Controller function to get own customer account
   * * DanBaDo - 2022/01/06 👑🎁👑🎁👑
   * @param req {Request}
   * @param res {Response}
   */
  export const _getOwnCustomerAccount = async (
    req: express.Request,
    res: express.Response
  ) => {
    const {customerID} = req.user;
    // call to action
    CustomerActions.findById(
      customerID,
      (err?: string, data?: TinyCustomer) => {
        if (err) {
          s(
            500,
            {
              message: 'Server response cannot be processed',
            },
            res
          );
        }
        s(
          200,
          {
            message: 'Customer data received',
            data: data,
          },
          res
        );
      }
    );
  };

  /**
   * ! Controller function to all customer staff
   * * whitehatdevv - 2021/12/13
   * @param req {Request}
   * @param res {Response}
   */
  export const _getAll = async (req, res) => {
    CustomerActions.findAll((err?: string, data?: TinyCustomer) => {
      if (err) {
        s(
          500,
          {
            message: 'Server response cannot be processed',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer data received',
          data: data,
        },
        res
      );
    });
  };

  /**
   * ! Delete customer data by ID
   * * whitehatdevv - 2021/12/14
   * TODO: Delete in cascade all relaionships associated
   * @param req {Request}
   * @param res {Response}
   */
  export const _deleteCustomer = async (req, res) => {
    const {customerID} = req.params;
    if (!customerID) {
      s(
        400,
        {
          message: 'Customer ID not provided',
        },
        res
      );
    }
    // call to action
    CustomerActions.deleteCustomer(customerID, (err: string = null) => {
      if (err) {
        s(
          500,
          {
            message: 'Customer cannot be deleted',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer was delete sucessfully',
        },
        res
      );
    });
  };

  /**
   * ! Update customer status by customerID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateStatusById = async (req, res) => {
    const {customerID} = req.params;
    const {status} = req.body;
    // TODO: VALIDATE ACOUNT STATUS
    if (!customerID) {
      s(
        400,
        {
          message: 'Customer ID not provided',
        },
        res
      );
    }
    // call to action
    CustomerActions.updateStatus(customerID, status, (err: string = null) => {
      if (err) {
        s(
          500,
          {
            message: 'Customer status cannot be updated',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer status was updated sucessfully',
        },
        res
      );
    });
  };

  /**
   * ! Update customer status by customerID
   * * whitehatdevv - 2021/12/14
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateOwnStatus = async (req, res) => {
    const {customerID} = req.user;
    const {status} = req.body;
    // TODO: VALIDATE ACOUNT STATUS
    // call to action
    CustomerActions.updateStatus(customerID, status, (err: string = null) => {
      if (err) {
        s(
          500,
          {
            message: 'Customer status cannot be updated',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer status was updated sucessfully',
        },
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
    const {customerID} = req.params;
    if (!customerID) {
      s(
        400,
        {
          message: 'Customer ID not provided',
        },
        res
      );
    }
    //TODO: VALIDATE FIELDS
    const data: UpdateCustomerModel = req.body;
    // call to action
    CustomerActions.updateData(data, customerID, err => {
      if (err) {
        s(
          500,
          {
            message: 'Customer data cannot be updated',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer data was updated sucessfully',
        },
        res
      );
    });
  };

  /**
   * ! Update own customer account data
   * * DanBaDo - 2022/01/06 🐫🎁🐫🎁🐫🎁
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateOwnCustomerAccount = async (req, res) => {
    const {customerID} = req.user;
    //TODO: VALIDATE FIELDS
    const data: UpdateCustomerModel = req.body;
    // call to action
    CustomerActions.updateData(data, customerID, err => {
      if (err) {
        s(
          500,
          {
            message: 'Customer data cannot be updated',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer data was updated sucessfully',
        },
        res
      );
    });
  };

  /**
   * ! Get customer data profile by customer ID
   * * Alcazar87 - 2022/01/10
   * TODO: isOnboarding
   * @param req {Request}
   * @param res {Response}
   */
  export const _profile = async (req, res) => {
    const {customerID} = req.user;
    CustomerActions.profile(customerID, err => {
      if (err) {
        s(
          500,
          {
            message: 'Server response cannot be processed',
          },
          res
        );
      }
      s(
        200,
        {
          message: 'Customer data received',
        },
        res
      );
    });
  };
}

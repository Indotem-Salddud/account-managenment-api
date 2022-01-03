import * as bcrypt from 'bcryptjs';
import {Direction} from '../../models/types/gen/gen.direction';
import {
  CustomerDTO,
  TinyCustomer,
  UpdateCustomerModel,
  _tableName,
} from '../../models/types/model.customer';
import { db } from '../core/core.db';
import { SQLQueryResponse, SQLRunner } from '../core/build/core.build.runner.sql';
import { SQLInsertResponse } from '../../models/types/gen/gen.SQLResponse';

// * SQL Runner to perform MYSQL Requests
const _runner = new SQLRunner(db, _tableName);

export module CustomerActions {
  /**
   * ! Get customer data by customer ID
   * * whitehatdevv - 2021/12/12
   * @param customerID {Number}
   * @param callback {Function}
   */
  export const findById = (customerID: string, callback: Function) => {
    const queryString = `SELECT * FROM @table WHERE id=${customerID}`;
    _runner.run(queryString, (res) => {
      if (res.err) {
        callback(res.err);
      }
      const row = res.data[0];
      const direction: Direction = JSON.parse(row.direction);
      const customer: TinyCustomer = {
        id: customerID,
        name: row.name,
        username: row.username,
        email: row.email,
        phone: row.phone,
        direction: direction,
      };
      callback(null, customer);
    });
  };

  /**
   * ! Get all customers data storage in DB
   * * whitehatdevv - 2021/12/12
   * @param callback {Function}
   */
  export const findAll = (callback: Function) => {
    const queryString = `SELECT * FROM @table`;
    _runner.run(queryString, (res: SQLQueryResponse<Array<CustomerDTO>>)=>{
      if (res.err) {
        callback(res.err);
      }
      callback(
        null,
        res.data.map(item => {
          const direction: Direction = JSON.parse(item.direction);
          return {
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            phone: item.phone,
            direction: direction,
          };
        })
      );
    });
  };

  /**
   * ! Method to delete acount by ID
   * * whitehatdevv - 2021/12/14
   * @param customerID {string}
   * @param callback {Function}
   */
  export const deleteCustomer = (customerID: string, callback: Function) => {
    const queryString = `DELETE FROM @table WHERE id=${customerID}`;
    _runner.run(queryString, (res)=>{
      if (res.err) {
        callback(res.err)
      }
      callback();
    });
  };

  /**
   * ! Update customer status by customer ID
   * * whitehatdevv - 2021/12/14
   * @param customerID {string}
   * @param status {string}
   * @param callback {string}
   */
  export const updateStatus = (
    customerID: string,
    status: number,
    callback: Function
  ) => {
    const queryString = `UPDATE @table SET status=${status} WHERE id=${customerID}`;
    _runner.run(queryString,(res)=>{
      if (res.err) {
        callback(res.err);
      }
      callback()
    });
  };

  /**
   * ! Update customer data by ID
   * * whitehatdevv - 2021/12/14
   * @param updatedData {UpdateCustomerModel}
   * @param customerID {string}
   * @param callback {Function}
   */
  export const updateData = (
    updatedData: UpdateCustomerModel,
    customerID: string,
    callback: Function
  ) => {
    const queryString = `
      UPDATE @table
      SET
        name=IsNULL(@name, ${updatedData.name}),
        email=IsNULL(@email, ${updatedData.email}),
        phone=IsNULL(@phone, ${updatedData.phone}),
        direction=IsNULL(@direction, ${updatedData.direction})
      WHERE id=${customerID}
    `;
    _runner.run(queryString, (res) => {
      if (res.err) {
        callback(res.err)
      }
      callback()
    });
  };
}

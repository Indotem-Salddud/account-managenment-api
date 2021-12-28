import {Direction} from '../../models/types/gen/gen.direction';
import {
  TinyCustomer,
  UpdateCustomerModel,
  _tableName,
} from '../../models/types/model.customer';
import { db } from '../core/core.db';
import { SQLRunner } from '../core/build/core.build.runner.sql';

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
    const queryString = `SELECT * FROM ${_tableName} WHERE id=${customerID}`;
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
    const queryString = `SELECT * FROM ${_tableName}`;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      }
      callback(
        null,
        result.map(item => {
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
    const queryString = `DELETE FROM ${_tableName} WHERE id=?`;
    db.query(queryString, [customerID], err => {
      if (err) {
        callback(err);
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
    const queryString = `UPDATE ${_tableName} SET status=? WHERE id=?`;
    db.query(queryString, [status, customerID], err => {
      if (err) {
        callback(err);
      }
      callback();
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
    const queryString = `UPDATE ${_tableName} SET name=IsNULL(@name, ?), email=IsNULL(@email, ?), phone=IsNULL(@phone, ?), direction=IsNULL(@direction, ?) WHERE id=?`;
    db.query(
      queryString,
      [
        updatedData.name,
        updatedData.email,
        updatedData.phone,
        JSON.stringify(updatedData.direction),
        customerID,
      ],
      err => {
        if (err) {
          callback(err);
        }
        callback(null);
      }
    );
  };
}

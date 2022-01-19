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
import { _dependentTableName } from '../../models/types/model.dependent';
import { _customerDependentRealtionshipTableName } from '../../models/types/model.customerDependentRelationship';
import { SQLInsertResponse } from '../../models/types/gen/gen.SQLResponse';

// * SQL Runner to perform MYSQL Requests
const _runner = new SQLRunner(db, _tableName);
const _relationshipRunner = new SQLRunner(db, _customerDependentRealtionshipTableName);

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
   * ! Method to delete customer AND HIS RELATIONS, by customer ID
   * * whitehatdevv - 2021/12/14
   * @param customerID {string}
   * @param callback {Function}
   */
  export const deleteCustomer = (customerID: string, callback: Function) => {
    const queryString = `
    DELETE
      ${_tableName}
      @table,
    FROM ${_tableName}
    INNER JOIN @table
      ON ${_tableName}.id = @table.customerID
    WHERE id=${customerID}
    `;
    _relationshipRunner.run(queryString, (res)=>{
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
  /**
   * ! Get customer data profile by customer ID
   * * Alcazar87 - 2022/01/10
   * TODO isOnBoarding
   * @param customerID {Number}
   * @param callback {Function}
   */
  export const profile = (customerID: string, callback: Function) => {
    const queryString = `SELECT name FROM @table WHERE id=${customerID}`;
    _runner.run(queryString, (res) => {
      if (res.err) {
        callback(res.err);
      }
      
      callback(null, res.data);
    });
  };

  /**
   * ! Insert new customer
   * * Alcazar87 - 2021/01/18
   * @param name {string}
   * @param username {string}
   * @param email {string}
   * @param phone {string}
   * @param direction {string}
   * @param password {string}
   * @param callback {Function}
   */
  export const newCustomer = (
    name: string,
    username: string,
    email: string,
    phone: string,
    direction: string,
    password: string,
    callback: Function
  ) => {
    bcrypt
      .hash(password, 10)
      .then(hash => {
    const queryString = `
      INSERT
      INTO @table (name,username,email,phone, direction,password=${hash})
      VALUES (${name},${username},${email}, ${phone}, ${direction},${hash})
    `;
    _runner.run( queryString, (res: SQLQueryResponse<SQLInsertResponse>) => {
      if (res.err) {
        callback(res.err)
      }
      callback(
        null,
        {
          id: res.data.insertId,
          name,
          username,
          email,
          phone,
          direction,
          password,
          status: 1,
          // TODO: what to do for providing new dependent date
        }
      )
    })
    });
  };
}

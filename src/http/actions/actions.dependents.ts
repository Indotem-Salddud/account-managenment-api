import {Direction} from '../../models/types/gen/gen.direction';
import {
  _tableName,
} from '../../models/types/model.customer';
import {
  _dependentTableName,
  Dependent,
  DependentDTO,
} from '../../models/types/model.dependent';
import {
  _customerDependentRealtionshipTableName
} from '../../models/types/model.customerDependentRelationship';
import {db} from '../core/core.db';
import { SQLQueryResponse, SQLRunner } from '../core/build/core.build.runner.sql';
import { SQLInsertResponse } from '../../models/types/gen/gen.SQLResponse';

// * SQL Runners to perform MYSQL Requests
const _dependentsRunner = new SQLRunner(db, _dependentTableName);
const _relationshipRunner = new SQLRunner(db, _customerDependentRealtionshipTableName);

export module DependentsActions {
  /**
   * ! Get all dependents for a customer by customer id
   * * DanBaDo - 2021/12/19
   * @param customerID {string}
   * @param callback {Function}
   */
  export const findAllCustomerDependents = (
    customerID: string,
    callback: Function
  ) => {
    const queryString = `
      SELECT *
      FROM ${_dependentTableName}
      INNER JOIN @table 
        ON ${_dependentTableName}.id = @table.dependentID
      INNER JOIN ${_tableName}
        ON @table.customerID = ${_tableName}.id
      WHERE @table.id = ${customerID}
    `;
    _relationshipRunner.run(queryString, (res: SQLQueryResponse<Array<DependentDTO>>)=>{
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
            phone: item.phone,
            direction: direction,
            status: item.status,
            date: item.date,
          };
        })
      );
    });
  };
  /**
   * ! Get one customer owned dependent by id
   * * DanBaDo - 2021/12/25 ✨🎄✨
   * @param customerID {string}
   * @param dependentID {string}
   * @param callback {Function}
   */
  export const findDependentByOwnerAndID = (
    customerID: string,
    dependentID: string,
    callback: Function
  ) => {
    const queryString = `
    SELECT *
    FROM ${_dependentTableName}
    INNER JOIN @table 
      ON ${_dependentTableName}.id = @table.dependentID
    INNER JOIN ${_tableName}
      ON @table.customerID = ${_tableName}.id
    WHERE @table.id = ${customerID}
  `;
  _relationshipRunner.run(queryString, (res) => {
      if (res.err) {
        callback(res.err)
      }
      const row = res.data[0];
      const direction: Direction = JSON.parse(row.direction);
      const dependent: Dependent = {
        id: row.id,
        name: row.name,
        phone: row.phone,
        direction: direction,
        status: row.status,
        date: row.date,
      };
      callback(null, dependent);
    });
  };
  /**
   * ! Insert new dependent and relationship
   * * DanBaDo - 2021/12/27 
   * @param customerID {string}
   * @param name {string}
   * @param phone {string}
   * @param direction {string}
   * @param callback {Function}
   */
  export const insertNewDependent = (
    customerID: string,
    name: string,
    phone: string,
    direction: string,
    callback: Function
  ) => {
    const dependentQueryString = `
      INSERT
      INTO @table (name, phone, direction)
      VALUES (${name}, ${phone}, ${direction})
    `;
    // insert dependent
    _dependentsRunner.run(dependentQueryString, (res) => {
      if (res.err) {
        callback(res.err)
      } else {
        // insert relation
        const row = res.data[0];
        const newDependentId = row.id;
        const relationQueryString = `
          INSERT
          INTO @table (customerID, dependentID)
          VALUES (${customerID}, ${newDependentId})
        `;
        _relationshipRunner.run(relationQueryString, (res) => {
          // if fail inserting relationship, remove new dependent
          if (res.err) {
            const removeNewDependentQueryString = `
              DELETE
              FROM @table
              WHERE id = ${newDependentId}
            `;
            _dependentsRunner.run(removeNewDependentQueryString, (res) => {
              if (res.err) {
                callback(res.err)
              }
            })
            callback(res.err)
          }
          // return new dependent
          callback(
            null,
            {
              id: newDependentId,
              name,
              phone,
              direction,
              status: 1,
              // TODO: what to do for providing new dependent date
            }
          );
        });
      }
    });
  }

  /**
   * ! Insert new dependent
   * * DanBaDo - 2021/12/29
   * @param name {string}
   * @param phone {string}
   * @param direction {string}
   * @param callback {Function}
   */
  export const newDependent = (
    name: string,
    phone: string,
    direction: string,
    callback: Function
  ) => {
    const queryString = `
      INSERT
      INTO @table (name, phone, direction)
      VALUES (${name}, ${phone}, ${direction})
    `;
    //TODO: Unify Carlos & Daniel interfaces
    _dependentsRunner.run( queryString, (res: SQLQueryResponse<SQLInsertResponse>) => {
      if (res.err) {
        callback(res.err)
      }
      callback(
        null,
        {
          id: res.data.insertId,
          name,
          phone,
          direction,
          status: 1,
          // TODO: what to do for providing new dependent date
        }
      )
    });
  };

  /**
   * ! Link dependent to customer
   * * DanBaDo - 2021/12/29
   * @param dependentId {string}
   * @param customerId {string}
   * @param callback {Function}
   */
  export const linkDependentToCustomer = (
    dependentId: string,
    customerId: string,
    callback: Function
  ) => {
    const queryString = `
      INSERT
      INTO @table (customerID, dependentID)
      VALUES (${customerId}, ${dependentId})
    `;
    _relationshipRunner.run(queryString, (res) => {
      if (res.err) {
        callback(res.err)
      }
      callback()
    });
  };
}
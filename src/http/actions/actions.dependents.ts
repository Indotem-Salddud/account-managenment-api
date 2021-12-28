import {Direction} from '../../models/types/gen/gen.direction';
import {
  TinyCustomer,
  UpdateCustomerModel,
  _tableName,
} from '../../models/types/model.customer';
import {
  _dependentTableName,
} from '../../models/types/model.dependent';
import {
  _customerDependentRealtionshipTableName
} from '../../models/types/model.customerDependentRelationship';
import * as bcrypt from 'bcryptjs';
import {db} from '../core/core.db';

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
      INNER JOIN ${_customerDependentRealtionshipTableName} 
        ON ${_dependentTableName}.id = ${_customerDependentRealtionshipTableName}.dependentID
      INNER JOIN ${_tableName}
        ON ${_customerDependentRealtionshipTableName}.customerID = ${_tableName}.id
      WHERE ${_tableName}.id = ${customerID}
    `;
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
      INNER JOIN ${_customerDependentRealtionshipTableName} 
        ON ${_dependentTableName}.id = ${_customerDependentRealtionshipTableName}.dependentID
      INNER JOIN ${_tableName}
        ON ${_customerDependentRealtionshipTableName}.customerID = ${_tableName}.id
      WHERE ${_tableName}.id = ${customerID} and ${_dependentTableName}.id = ${dependentID}
    `;
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
      INTO ${_dependentTableName} (name, phone, direction)
      VALUES (${name}, ${phone}, ${direction})
    `;
    // insert dependent
    db.query(dependentQueryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        // insert relation
        const newDependentId = result.insertId;
        const relationQueryString = `
          INSERT
          INTO ${_customerDependentRealtionshipTableName} (customerID, dependentID)
          VALUES (${customerID}, ${newDependentId})
        `;
        db.query(relationQueryString, (err) => {
          // if fail inserting relationship, remove new dependent
          if (err) {
            const removeNewDependentQueryString = `
              DELETE
              FROM ${_dependentTableName}
              WHERE id = ${newDependentId}
            `;
            db.query(removeNewDependentQueryString, (err) => {
              if (err) {
                callback(err);
              }
            })
            callback(err);
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
}
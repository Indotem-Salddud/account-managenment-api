import {Direction} from '../../models/types/gen/gen.direction';
import {
  TinyAccount,
  UpdateAccountModel,
  _tableName,
} from '../../models/types/model.account';
import {
  _dependentTableName,
} from '../../models/types/model.dependent';
import {
  _accountDependentRealtionshipTableName
} from '../../models/types/model.accountDependentRelationship';
import * as bcrypt from 'bcryptjs';
import {db} from '../core/core.db';

export module DependentsActions {
  /**
   * ! Get all dependents for a account by account id
   * * DanBaDo - 2021/12/19
   * @param accountID {string}
   * @param callback {Function}
   */
  export const findAllAccountDependents = (
    accountID: string,
    callback: Function
  ) => {
    const queryString = `
      SELECT *
      FROM ${_dependentTableName}
      INNER JOIN ${_accountDependentRealtionshipTableName} 
        ON ${_dependentTableName}.id = ${_accountDependentRealtionshipTableName}.dependentID
      INNER JOIN ${_tableName}
        ON ${_accountDependentRealtionshipTableName}.accountID = ${_tableName}.id
      WHERE ${_tableName}.id = ${accountID}
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
   * ! Get one account owned dependent by id
   * * DanBaDo - 2021/12/25 ✨🎄✨
   * @param accountID {string}
   * @param dependentID {string}
   * @param callback {Function}
   */
  export const findDependantByOwnerAndID = (
    accountID: string,
    dependentID: string,
    callback: Function
  ) => {
    const queryString = `
      SELECT *
      FROM ${_dependentTableName}
      INNER JOIN ${_accountDependentRealtionshipTableName} 
        ON ${_dependentTableName}.id = ${_accountDependentRealtionshipTableName}.dependentID
      INNER JOIN ${_tableName}
        ON ${_accountDependentRealtionshipTableName}.accountID = ${_tableName}.id
      WHERE ${_tableName}.id = ${accountID} and ${_dependentTableName}.id = ${dependentID}
    `;
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      }
      callback(
        null,
        result
      );
    });
  };
  /**
   * ! Insert new dependent and relationship
   * * DanBaDo - 2021/12/27 
   * @param accountID {string}
   * @param name {string}
   * @param phone {string}
   * @param direction {string}
   * @param callback {Function}
   */
  export const insertNewDependent = (
    accountID: string,
    name: string,
    phone: string,
    direction: string,
    callback: Function
  ) => {
    // TODO: data validation & sanitization
    const dependentQueryString = `
      INSER
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
          INTO ${_accountDependentRealtionshipTableName} (accountID, dependentID)
          VALUES (${accountID}, ${newDependentId})
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
          return {
            id: newDependentId,
            name,
            phone,
            direction,
            status: 1,
            // TODO: what to do for providing new dependent date
          }
        });
      }
    });
  }
}
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
  export const findOneAccountOwnedDependantById = (
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
}
import {TinyAccount, _tableName} from '../../models/types/Account';
import {db} from '../core/db';

export module AccountActions {
  /**
   * ! Get account data by account ID
   * * whitehatdevv - 2021/12/12
   * @param accountID {Number}
   * @param callback {Function}
   */
  export const findById = (accountID: string, callback: Function) => {
    const queryString = `SELECT * FROM ${_tableName} WHERE id=?`;
    db.query(queryString, [accountID], (err, result) => {
      if (err) {
        callback(err);
      }
      const row = result[0];
      const account: TinyAccount = {
        id: accountID,
        name: row.name,
        username: row.username,
        email: row.email,
        phone: row.phone,
      };
      callback(null, account);
    });
  };

  /**
   * ! Get all accounts data storage in DB
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
          return {
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            phone: item.phone,
          };
        })
      );
    });
  };
}
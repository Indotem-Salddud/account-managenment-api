import {Direction} from '../../models/types/gen/gen.direction';
import {
  TinyAccount,
  UpdateAccountModel,
  _tableName,
} from '../../models/types/model.account';
import * as bcrypt from 'bcryptjs';
import {db} from '../core/core.db';
import {JWTMiddelware} from '../middlewares/middelware.jwt';

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
      const direction: Direction = JSON.parse(row.direction);
      const account: TinyAccount = {
        id: accountID,
        name: row.name,
        username: row.username,
        email: row.email,
        phone: row.phone,
        direction: direction,
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
   * ! Perform a login comparing password and status of account
   * * whitehatdevv - 2021/12/14
   * @param username {string}
   * @param password {string}
   * @param callback {Function}
   */
  export const login = (
    username: string,
    password: string,
    callback: Function
  ) => {
    const queryString = `SELECT id, password, status FROM ${_tableName} WHERE email=? OR username=?`;
    db.query(queryString, [username, username], (err, result) => {
      if (err) {
        callback(err);
      }
      const {id, status, accountPassword} = result[0];
      if (status == 1) {
        // check password
        bcrypt.compare(password, accountPassword, (err, ctrl) => {
          if (err) {
            callback(err);
          }
          if (ctrl) {
            callback(null, true, id);
          }
          callback('The password was wrong');
        });
      }
      callback('Account was disabled');
    });
  };

  /**
   * ! Method to delete acount by ID
   * * whitehatdevv - 2021/12/14
   * @param accountID {string}
   * @param callback {Function}
   */
  export const deleteAccount = (accountID: string, callback: Function) => {
    const queryString = `DELETE FROM ${_tableName} WHERE id=?`;
    db.query(queryString, [accountID], err => {
      if (err) {
        callback(err);
      }
      callback();
    });
  };

  /**
   * ! Update account status by account ID
   * * whitehatdevv - 2021/12/14
   * @param accountID {string}
   * @param status {string}
   * @param callback {string}
   */
  export const updateStatus = (
    accountID: string,
    status: number,
    callback: Function
  ) => {
    const queryString = `UPDATE ${_tableName} SET status=? WHERE id=?`;
    db.query(queryString, [status, accountID], err => {
      if (err) {
        callback(err);
      }
      callback();
    });
  };

  /**
   * ! Update account data by ID
   * * whitehatdevv - 2021/12/14
   * @param updatedData {UpdateAccountModel}
   * @param accountID {string}
   * @param callback {Function}
   */
  export const updateData = (
    updatedData: UpdateAccountModel,
    accountID: string,
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
        accountID,
      ],
      err => {
        if (err) { callback(err) }
        callback(null);
      }
    );
  };
}

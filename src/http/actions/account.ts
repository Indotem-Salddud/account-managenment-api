import {Direction} from '../../models/types/gen/direction';
import {TinyAccount, _tableName} from '../../models/types/Account';
import * as bcrypt from 'bcryptjs';
import {db} from '../core/db';
import { JWTMiddelware } from '../middlewares/JWTMiddelware';

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
        street: direction.street,
        number: direction.number,
        additionalInformation: direction.additionalInformation,
        city: direction.city,
        postalCode: direction.postalCode,
        country: direction.country,
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
            street: direction.street,
            number: direction.number,
            additionalInformation: direction.additionalInformation,
            city: direction.city,
            postalCode: direction.postalCode,
            country: direction.country,
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
}

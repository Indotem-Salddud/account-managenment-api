import {db} from '../core/core.db';
import * as bcrypt from 'bcryptjs';
import {
    _tableName,
  } from '../../models/types/model.customer';


export module AuthActions {
    
/**
   * ! Perform a login comparing password and status of customer
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
      const {id, status, customerPassword} = result[0];
      if (status == 1) {
        // check password
        bcrypt.compare(password, customerPassword, (err, ctrl) => {
          if (err) {
            callback(err);
          }
          if (ctrl) {
            callback(null, true, id);
          }
          callback('The password was wrong');
        });
      }
      callback('Customer was disabled');
    });
  };


/**
   * ! Update customer password by ID
   * * whitehatdevv - 2021/12/14
   * @param password {string}
   * @param customerID {string}
   * @param callback {Function}
   */
 export const updatePassword = (
    password: string,
    customerID: string,
    callback: Function
  ) => {
    // hash password
    bcrypt
      .hash(password, 10)
      .then(hash => {
        const queryString = `UPDATE ${_tableName} SET password=? WHERE id=?`;
        db.query(queryString, [hash, customerID], err => {
          if (err) {
            callback(err);
          }
          callback(null);
        });
      })
      .catch(err => {
        callback(err);
      });
  };
}
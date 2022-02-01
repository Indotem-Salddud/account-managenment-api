import {db} from '../core/core.db';
import * as bcrypt from 'bcryptjs';
import {
    _tableName,
  } from '../../models/types/model.customer';
import { SQLQueryResponse, SQLRunner } from '../core/build/core.build.runner.sql';

// * SQL Runner to perform MYSQL Requests
const _runner = new SQLRunner(db, _tableName);

const _expDaysRefreshToken = 2
const _expMaxRefreshToken = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * _expDaysRefreshToken;

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
    const queryString = `SELECT id, password, status FROM @table WHERE email=${username} OR username=${username}`;
    _runner.run(queryString, (res) => {
      if (res.err) {
        callback(res.err);
      }
      const {id, status, customerPassword} = res.data[0];
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
        const queryString = `UPDATE @table SET password=${hash} WHERE id=${customerID}`;
        _runner.run(queryString, (res) => {
          if (res.err) {
            callback(res.err);
          }
          callback(null);
        });
      })
      .catch(err => {
        callback(err);
      });
  };
}
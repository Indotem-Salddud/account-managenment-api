import { Account, _tableName } from "../Account";
import { db } from "../../../http/core/db";

/**
 * ! Get account data by account ID
 * * whitehatdevv - 2021/12/12
 * @param accountID {Number}
 * @param callback {Function}
 */
export const findById = (accountID: number, callback: Function) => {

    const queryString = `SELECT * FROM ${_tableName} WHERE id=?`;
    db.query(queryString, [accountID], (err, result) => {
        if (err) { callback(err) }
        const row = result[0];
        const account: Account = {
            id: accountID,
            name: row.name,
            username: row.username,
            email: row.email,
            phone: row.phone
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


};  
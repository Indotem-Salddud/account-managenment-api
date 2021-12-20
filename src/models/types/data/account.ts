import { Account, _tableName } from "../Account";
import { db } from "../../../http/core/db";

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
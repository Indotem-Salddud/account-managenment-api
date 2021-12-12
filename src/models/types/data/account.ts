import { Account, _tableName } from "../Account";

export const findById = (id: number, callback: Function) => {

    const queryString = `
        SELECT 
            *
        FROM 
            ${_tableName}
        WHERE
            id="${id}"
    `;

    // make server call

    // prepare response json

    // call callback

};
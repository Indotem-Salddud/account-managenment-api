import mysql from 'mysql';

interface SQLQueryResponse<T> {
    err?: string;
    data?: T;
};

type SQLResponse<T> = (res: SQLQueryResponse<T>) => void;

interface SQLNeededInjections {
    _tableName: string;
    _db: mysql.Connection;
}

interface SQLQueryMethods extends SQLNeededInjections {
    findAll<T>(get?: object) : SQLResponse<T>;
    findBy<T>(get?: object, where?: object) : SQLResponse<T>;
    save<T>(val: T) : SQLResponse<T>;
    update<T>(where?: object, data?: T) : SQLResponse<T>;
    deleteAll<T>(): SQLResponse<T>;
    delete<T>(where?: object) : SQLResponse<T>;
};

/**
 * ! Use for create SQL queries dinamically
 * * whitehatdevv - 2021/12/21
 */
class SQLQuery {

    // * Properties
    _tableName: string;
    _db: mysql.Connection;

    // * Inits
    constructor(tableName: string, db: mysql.Connection) {
        this._tableName = tableName;
    }

    // * Methods


}
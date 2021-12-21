interface SQLQueryResponse<T> {
    err?: string;
    data?: T;
}

type SQLResponse<T> = (res: SQLQueryResponse<T>) => void;

interface SQLQueryMethods {
    _tableName: string;
    findAll<T>() : SQLResponse<T>;
    findBy<T>(where?: object) : SQLResponse<T>;
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

    // * Inits
    constructor(tableName: string) {
        this._tableName = tableName;
    }

    // * Methods



}
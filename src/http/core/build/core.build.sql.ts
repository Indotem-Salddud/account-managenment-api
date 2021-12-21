interface SQLQueryMethods {
    _tableName: string;
    findAll<T>() : T;
}

/**
 * ! Use for create SQL queries dinamically
 * * whitehatdevv - 2021/12/21
 */
class SQLQuery {

    /**
     * ! SINGLETON
     * * Unique access to this resource
     */
    static shared = new SQLQuery();

    // * Properties
    _tableName: string;

    // * Inits
    constructor(tableName: string) {
        this._tableName = tableName;
    }

    // * Methods



}
import mysql from 'mysql';
import {db} from '../core.db';

// * Interface used for query runner callback
interface SQLQueryResponse<T> {
  err?: string;
  data?: T;
}

// * Used for make a callback with no return
type SQLResponse<T> = (res: SQLQueryResponse<T>) => void;

interface SQLNeededInjections {
  // * Table name to run all the staff needed
  _tableName: string;
}

interface SQLRunnerProtocol extends SQLNeededInjections {
  // * It will be used to inject the DB connection Pool
  _db: mysql.Connection;
  /**
   * ! Query runner allow us to run query in sql
   * * whitehatdevv - 2021/12/21
   * @param query {string}
   * @param params {any}
   * @param callback {SQLResponse<T>}
   */
  run<T>(query: string, params: any, callback: SQLResponse<T>);
}

class SQLRunner implements SQLRunnerProtocol {
  // * Properties
  _db: mysql.Connection;
  _tableName: string;

  // * Inits
  constructor(_db: mysql.Connection, _tableName: string) {
    this._db = _db;
    this._tableName = _tableName;
  }

  // * Methods
  run<T>(query: string, params: any, callback: SQLResponse<T>) {
    // replace query concurrency to set table name
    const final = query.replace('@table', this._tableName);
    db.query(final, params, (err, data) => {
      callback({
        err: String(err),
        data: data,
      });
    });
  }
}

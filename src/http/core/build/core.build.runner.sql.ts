import mysql from 'mysql';
import {db} from '../core.db';

interface SQLQueryResponse<T> {
  err?: string;
  data?: T;
}

type SQLResponse<T> = (res: SQLQueryResponse<T>) => void;

interface SQLNeededInjections {
  _tableName: string;
}

interface SQLRunnerProtocol extends SQLNeededInjections {
  _db: mysql.Connection;
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
    db.query(query, params, (err, data) => {
      callback({
        err: String(err),
        data: data,
      });
    });
  }
}

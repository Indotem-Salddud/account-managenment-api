interface SQLQueryConstructorMethods {
  findAll(get?: [string]): string;
  findBy(where: object, get?: [string]): string;
  save<T>(val: T): string;
  update<T>(where?: object, data?: T): string;
  deleteAll(): string;
  delete(where?: object): string;
}

const _basicSQLCodes = {
    table: '@table',
    columns: '@column',
    condition: '@condition'
};

const _basicSQLStructure = {
    select: 'SELECT @columns FROM @table WHERE @condition',
    insert: 'INSERT INTO @table VALUES @columns',
    update: 'UPDATE @table SET @columns',
    delete: 'DELETE FROM @table WHERE @condition'
};

/**
 * ! Use for create SQL queries dinamically
 * * whitehatdevv - 2021/12/21
 */
class SQLQueryConstructor implements SQLQueryConstructorMethods {

  // * Singleton
  static shared = new SQLQueryConstructor();

  // * Methods
  findAll(get?: [string]): string {
      return "";
  }

  findBy(where: object, get?: [string]): string {
    return "";
  }

  save<T>(val: T): string {
    return '';
  }

  update<T>(where?: object, data?: T): string {
    return '';
  }

  deleteAll(): string {
    return '';
  }

  delete(where?: object): string {
    return '';
  }
}

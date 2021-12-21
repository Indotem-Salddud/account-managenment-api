interface SQLQueryConstructorMethods {
  findAll(get?: [string]): SQLConstructorMiddleType;
  findBy(where: object, get?: [string]): SQLConstructorMiddleType;
  save<T>(val: T): SQLConstructorMiddleType;
  update<T>(where?: object, data?: T): SQLConstructorMiddleType;
  deleteAll(): SQLConstructorMiddleType;
  delete(where?: object): SQLConstructorMiddleType;
}

type SQLConstructorMiddleType = () => string;

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
  findAll(get?: [string]): SQLConstructorMiddleType {
    return () => {
        return "";
    }
  }

  findBy(where: object, get?: [string]): SQLConstructorMiddleType {
    return () => {
        return "";
    }
  }

  save<T>(val: T): SQLConstructorMiddleType {
    return () => {
        return "";
    }
  }

  update<T>(where?: object, data?: T): SQLConstructorMiddleType {
    return () => {
        return "";
    }
  }

  deleteAll(): SQLConstructorMiddleType {
    return () => {
        return "";
    }
  }

  delete(where?: object): SQLConstructorMiddleType {
    return () => {
        return "";
    }
  }
}

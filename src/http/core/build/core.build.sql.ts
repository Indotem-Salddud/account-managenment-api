interface SQLQueryConstructorMethods {
  findBy(get?: [string], where?: object): SQLConstructorMiddleType;
  save<T>(val: T): SQLConstructorMiddleType;
  update<T>(where?: object, data?: T): SQLConstructorMiddleType;
  deleteAll(): SQLConstructorMiddleType;
  delete(where?: object): SQLConstructorMiddleType;
}

type SQLConstructorMiddleType = () => string;

const _basicSQLCodes = {
  table: '@table',
  columns: '@column',
  condition: '@condition',
};

const _basicSQLStructure = {
  select: 'SELECT @columns FROM @table @condition',
  insert: 'INSERT INTO @table VALUES @columns',
  update: 'UPDATE @table SET @columns',
  delete: 'DELETE FROM @table @condition',
};

/**
 * ! Use for create SQL queries dinamically
 * * whitehatdevv - 2021/12/21
 */
class SQLQueryConstructor
  extends SQLQueryConstructorHelper
  implements SQLQueryConstructorMethods
{
  // * Singleton
  static shared = new SQLQueryConstructor();

  // * Methods
  findBy(get?: [string], where?: object): SQLConstructorMiddleType {
    return () => {
      let basic = _basicSQLStructure.select;
      // set getter
      super._getter(basic, get);
      // set where
      super._where(basic, where);
      return basic;
    };
  }

  save<T>(val: T): SQLConstructorMiddleType {
    return () => {
      return '';
    };
  }

  update<T>(where?: object, data?: T): SQLConstructorMiddleType {
    return () => {
      return '';
    };
  }

  deleteAll(): SQLConstructorMiddleType {
    return () => {
      return '';
    };
  }

  delete(where?: object): SQLConstructorMiddleType {
    return () => {
      return '';
    };
  }
}

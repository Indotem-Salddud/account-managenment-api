// * Interface with methods needed to perform a query constructor
interface SQLQueryConstructorProtocol {
  findBy(get?: [string], where?: object): SQLConstructorMiddleType;
  save(val: object): SQLConstructorMiddleType;
  update(data: object, where?: object): SQLConstructorMiddleType;
  deleteBy(where?: object): SQLConstructorMiddleType;
}

// * Typealias to return a callback with query string
type SQLConstructorMiddleType = () => string;

/**
 * ! Enum case to basic query structure
 * * whitehatdevv - 2021/12/21
 */
enum _basicSQLStructure {
  select = 'SELECT @columns FROM @table @condition',
  insert = 'INSERT INTO @table VALUES @values',
  update = 'UPDATE @table SET @values',
  delete = 'DELETE FROM @table @condition',
}

/**
 * ! Use for create SQL queries dinamically
 * * whitehatdevv - 2021/12/21
 */
class SQLQueryConstructor
  extends SQLQueryConstructorHelper
  implements SQLQueryConstructorProtocol
{
  // * Singleton
  static shared = new SQLQueryConstructor();

  // * Methods
  findBy(get?: [string], where?: object): SQLConstructorMiddleType {
    return () => {
      let basic = _basicSQLStructure.select;
      // set columns
      super._setterArray(_basicSQLCodes.columns, basic, get);
      // set condition
      super._setterObject(_basicSQLCodes.condition, basic, where);
      return basic;
    };
  }

  save(val: object): SQLConstructorMiddleType {
    return () => {
      let basic = _basicSQLStructure.insert;
      // set values
      super._setterObject(_basicSQLCodes.values, basic, val);
      return basic;
    };
  }

  update(data: object, where?: object): SQLConstructorMiddleType {
    return () => {
      let basic = _basicSQLStructure.update;
      // set data
      super._setterObject(_basicSQLCodes.values, basic, data);
      // set conditions
      super._setterObject(_basicSQLCodes.condition, basic, where);
      return basic;
    };
  }

  deleteBy(where?: object): SQLConstructorMiddleType {
    return () => {
      let basic = _basicSQLStructure.delete;
      // set conditions
      super._setterObject(_basicSQLCodes.condition, basic, where);
      return basic;
    };
  }
}

// * Interface to set data inside a property
interface SQLQueryConstructorHelperProtocol {
  _setterArray(prop: _basicSQLCodes, base: string, d?: [string]): void;
  _setterObject(prop: _basicSQLCodes, base: string, d?: object): void;
}

// * Enum with code SQL code to match the constructor
enum _basicSQLCodes {
    table = "@table",
    columns =  "@column",
    condition = "@condition",
    values = "@values"
}

/**
 * ! Helper to use for data formatting
 * * whitehatdevv - 2021/12/21
 */
class SQLQueryConstructorHelper implements SQLQueryConstructorHelperProtocol {
  // * Methods

  /**
   * ! Set getter and configure the replacement
   * * whitehatdevv - 2021/12/21
   * @param base {string} inout
   * @param get {[string]?}
   */
   _setterArray(prop: _basicSQLCodes, base: string, d?: [string]): void {
    base.replace(
      prop,
      !d
        ? d.reduce((acc = '', val) =>
            acc.length == 0 ? `${val}` : `${acc}, ${val}`
          )
        : '*'
    );
  }

  /**
   * ! Handle where and actue according to the values
   * * whitehatdevv - 2021/12/21
   * @param base {string} inout
   * @param where {object}
   */
   _setterObject(prop: _basicSQLCodes, base: string, d?: object): void {
    base.replace(
      prop,
      !d
        ? 'WHERE' +
            Object.keys(d).reduce((acc = '', val) =>
              acc.length == 0 ? `${val}=${d[val]}` : `${acc}, ${val}=${d[val]}`
            )
        : ''
    );
  }
}

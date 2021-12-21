interface SQLQueryConstructorHelperProtocol {
  _setterArray(prop: _basicSQLCodes, base: string, get?: [string]): void;
  _setterObject(prop: _basicSQLCodes, base: string, where?: object): void;
}

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
   _setterArray(prop: _basicSQLCodes, base: string, get?: [string]): void {
    base.replace(
      prop,
      !get
        ? get.reduce((acc = '', val) =>
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
   _setterObject(prop: _basicSQLCodes, base: string, where?: object): void {
    base.replace(
      prop,
      !where
        ? 'WHERE' +
            Object.keys(where).reduce((acc = '', val) =>
              acc.length == 0 ? `${val}=${where}` : `${acc}, ${val}=${where}`
            )
        : ''
    );
  }
}

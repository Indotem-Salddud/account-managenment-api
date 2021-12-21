interface SQLQueryConstructorHelperProtocol {
  _getter(base: string, get?: [string]): void;
  _where(base: string, where?: object): void;
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
  _getter(base: string, get?: [string]): void {
    base.replace(
      _basicSQLCodes.columns,
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
  _where(base: string, where?: object): void {
    base.replace(
      _basicSQLCodes.condition,
      !where
        ? 'WHERE' +
            Object.keys(where).reduce((acc = '', val) =>
              acc.length == 0 ? `${val}=${where}` : `${acc}, ${val}=${where}`
            )
        : ''
    );
  }
}

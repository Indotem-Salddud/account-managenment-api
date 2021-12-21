interface SQLQueryConstructorMethods {
  _tableName: string;
  findAll(get?: [string]): string;
  findBy(where: object, get?: [string]): string;
  save<T>(val: T): string;
  update<T>(where?: object, data?: T): string;
  deleteAll(): string;
  delete(where?: object): string;
}

/**
 * ! Use for create SQL queries dinamically
 * * whitehatdevv - 2021/12/21
 */
class SQLQueryConstructor implements SQLQueryConstructorMethods {
  // * Properties
  _tableName = '@table';

  // * Singleton
  static shared = new SQLQueryConstructor();

  // * Methods

  private getter(get: [string]): string {
    const columns = get.reduce((acc, val) => (acc += `${val}#`));
    columns.slice(0, columns.length - 2);
    columns.replace('#', ',');
    return columns;
  }

  findAll(get?: [string]): string {
    const query = `SELECT * FROM ${this._tableName}`;
    if (!get) {
      const getter = this.getter(get);
      query.replace('*', getter);
    }
    return query;
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

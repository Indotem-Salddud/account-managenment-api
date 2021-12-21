interface SQLQueryConstructorMethods {
  _tableName: string;
  findAll(get?: [string]): string;
  findBy(get?: [string], where?: object): string;
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
  findAll(get?: [string]): string {
    return "";
  }

  findBy(get?: [string], where?: object): string {
    return "";
  }

  save<T>(val: T): string {
    return "";
  } 

  update<T>(where?: object, data?: T): string {
      return "";
  }  

  deleteAll(): string {
    return "";
  }

  delete(where?: object): string {
    return "";
  } 

}

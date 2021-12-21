interface SQLQueryConstructorMethods {
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
class SQLQueryConstructor {
  // * Singleton
  static shared = new SQLQueryConstructor();
}

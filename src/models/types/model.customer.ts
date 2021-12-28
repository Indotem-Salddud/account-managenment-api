import {Identificable} from './gen/gen.identificable';
import {Direction} from './gen/gen.direction';

export const _tableName = 'Customers';
export interface TinyCustomer extends Identificable {
  name: string;
  username: string;
  email: string;
  phone: string;
  direction: Direction;
}

/**
 * ! This interface is using for update customer data
 * * whitehatdevv - 2021/12/14
 */
export interface UpdateCustomerModel {
  name?: string;
  email?: string;
  phone?: string;
  direction?: Direction;
}

export interface CustomerDTO {
  id?: Number;
  name?: string;
  username: string;
  email: string;
  phone: string;
  direction: string;
  password: string;
  status: Number;
  date: number;
}
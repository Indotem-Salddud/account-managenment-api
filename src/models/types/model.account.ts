import {Identificable} from './gen/gen.identificable';
import {Direction} from './gen/gen.direction';

export const _tableName = 'Accounts';
export interface TinyAccount extends Identificable {
  name: string;
  username: string;
  email: string;
  phone: string;
  direction: Direction;
}

/**
 * ! This interface is using for update account data
 * * whitehatdevv - 2021/12/14
 */
export interface UpdateAccountModel {
  name?: string;
  email?: string;
  phone?: string;
  direction?: Direction;
}
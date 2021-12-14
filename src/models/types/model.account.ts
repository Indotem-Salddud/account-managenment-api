import {Identificable} from './gen/gen.identificable';
import {Direction} from './gen/gen.direction';

export const _tableName = 'Accounts';
export interface TinyAccount extends Identificable, Direction {
  name: string;
  username: string;
  email: string;
  phone: string;
}

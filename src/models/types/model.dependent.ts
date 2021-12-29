import {Identificable} from './gen/gen.identificable';
import {Direction} from './gen/gen.direction';

export const _dependentTableName = 'Dependents';

export interface Dependent extends Identificable {
  name: string;
  phone: string;
  direction: Direction;
  status: number;
  date: Date;
}

/**
 * ! Interface used for link new dependent to multiple customers
 * * DanBaDo - 2021/12/29
 */
export interface newDependentForCustomerDTO {
  customersIds: Array<string>;
  dependent: DependentDTO;
}

export interface DependentDTO {
  id?: Number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  direction?: string;
  status?: Number;
  date?: number;
}
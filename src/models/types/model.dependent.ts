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
 * ! Interface used new dependent
 * * DanBaDo - 2021/12/29
 */
export interface newDependentDTO {
  name: string;
  phone?: string;
  direction?: string;
}

/**
 * ! Interface used for link new dependent to multiple customers
 * * DanBaDo - 2021/12/29
 */
export interface newDependentForCustomerDTO {
  customersIds: Array<string>;
  dependent: newDependentDTO;
}
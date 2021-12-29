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

export interface newDependentDTO {
  name: string;
  phone?: string;
  direction?: string;
}

export interface newDependentForCustomerDTO {
  customersIds: Array<string>;
  dependent: newDependentDTO;
}
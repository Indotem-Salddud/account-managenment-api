import {Identificable} from './gen/gen.identificable';
import {Direction} from './gen/gen.direction';

export const _depdendentTableName = 'Dependents';
export interface Dependent extends Identificable {
  name: string;
  phone: string;
  direction: Direction;
  status: number;
  date: Date;
}
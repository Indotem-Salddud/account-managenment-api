import { DebbugerEnvironments } from '../../../http/common/Debug/Environments';
import {TokenPayload} from '../gen/gen.token';

/**
 * ! Used for set property user
 * * whitehatdevv - 2021/12/14
 */
declare global {
  export namespace Express {
    export interface Request {
      user?: TokenPayload;
    }
  }
  // set debugger
  export const Environment = DebbugerEnvironments.debugger;
}

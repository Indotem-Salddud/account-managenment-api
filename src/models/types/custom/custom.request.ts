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
}

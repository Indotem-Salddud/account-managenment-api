import {DebuggerProtocol} from './DebuggerProtocol';

/**
 * ! Module debugger to show logs in cosole
 * * whitehatdevv - 2021/12/13
 */
export class Debugger implements DebuggerProtocol {
  /**
   * ! Debugger to show log in console
   * * whitehatdevv - 2021/12/13
   * @param environment {DebbugerEnvironments}
   * @param type {DebuggerTypes}
   * @param log {string}
   */
  _printLog = (
    environment: DebbugerEnvironments,
    type: DebuggerTypes,
    log: string
  ) => {
    switch (environment) {
      case DebbugerEnvironments.debugger:
        this._manageLogType(type, log);
        break;
      case DebbugerEnvironments.production:
        console.log(
          '----- PRODUCTION: Log cannot be printed due to protection level'
        );
        break;
      case DebbugerEnvironments.testing:
        this._manageLogType(type, log);
        break;
    }
  };

  /**
   * ! Main actor to manage debugger types
   * * whitehatdevv - 2021/12/13
   * @param type {DebuggerTypes}
   * @param log {string}
   */
  _manageLogType = (type: DebuggerTypes, log: string) => {
    switch (type) {
      case DebuggerTypes.alert:
        console.warn(`----- WARNING: ${log}`);
        break;
      case DebuggerTypes.debug:
        console.log(`----- DEBUG: ${log}`);
        break;
      case DebuggerTypes.alert:
        console.error(`----- ALERT: ${log}`);
        break;
    }
  };
}

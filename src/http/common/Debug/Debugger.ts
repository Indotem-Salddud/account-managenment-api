import { DebuggerProtocol } from "./DebuggerProtocol";

/**
 * ! Module debugger to show logs in cosole
 * * whitehatdevv - 2021/12/13
 */
export class Debuuger implements DebuggerProtocol {
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
  ) => {};
}

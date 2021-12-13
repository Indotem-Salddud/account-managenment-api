/**
 * ! Debugger protocol to conform test
 * * whitehatdevv - 2021/12/13s
 */
export interface DebuggerProtocol {
  _printLog(
    environment: DebbugerEnvironments,
    type: DebuggerTypes,
    log: string
  ): any;
}

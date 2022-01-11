import { DebbugerEnvironments } from "./Environments";
import { DebuggerTypes } from "./DebuggerTypes";

/**
 * ! Debugger protocol to conform test
 * TODO: Implement test
 * * whitehatdevv - 2021/12/13s
 */
export interface DebuggerProtocol {
  _printLog(
    environment: DebbugerEnvironments,
    type: DebuggerTypes,
    log: string
  ): any;
  _manageLogType(
    type: DebuggerTypes, 
    log: string
  ): any;
}

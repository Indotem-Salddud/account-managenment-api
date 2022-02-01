import { App } from "./server";
import { Debugger } from './http/common/Debug/Debugger.js';
import { DebuggerTypes } from "./http/common/Debug/DebuggerTypes";

App.listen(App.get('PORT'), () => {
  Debugger.shared._printLog(Environment, DebuggerTypes.debug, `Starting app at: ${App.get('PORT')}`);
});

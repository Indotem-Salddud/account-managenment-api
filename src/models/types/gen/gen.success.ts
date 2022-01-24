/**
 * ! Success handling interface
 * * Alcazar87 - 2022/01/20
 */

 export interface SuccessHandler {
     // * An array of errors. Unique error is allowed
    success: SuccessHandlerBody;

 }

// * Internal interface to set the body of the interface
export interface SuccessHandlerBody {
    // * Key of the error located in EXCEL file
    message: string;
    // * UUID code to set the error
    code: string;
}
/**
 * ! Error handling interface
 * * whitehatdevv - 2022/01/12
 */

 export interface ErrorHandler {
     // * An array of errors. Unique error is allowed
    errors: ErrorHandlerBody[];
    // * All basic information related to the BEND
    metadata: ErrorHandlerMetadata;
}

// * Internal interface to set the body of the interface
export interface ErrorHandlerBody {
    // * Key of the error located in EXCEL file
    message: string;
    // * UUID code to set the error
    code: string;
    // * DATETIME ISO to get the error timestamp
    date: Number;
}

// * Internal interface for error handling metadata
export interface ErrorHandlerMetadata {
    // * Endpoint where error was detected
    endpoint: string;
    // * Microservice which contains the error
    mircroservice: string;
    // * Version of the microservice
    version: string;
}
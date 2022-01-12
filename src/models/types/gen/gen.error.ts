/**
 * ! Error handling interface
 * * whitehatdevv - 2022/01/12
 */

 export interface ErrorHandler {
    errors: ErrorHandlerBody[];
    metadata: ErrorHandlerMetadata;
}

// * Internal interface to set the body of the interface
interface ErrorHandlerBody {
    message: string;
    code: string;
    date: Number;
}

// * Internal interface for error handling metadata
interface ErrorHandlerMetadata {
    endpoint: string;
    mircroservice: string;
    version: string;
}
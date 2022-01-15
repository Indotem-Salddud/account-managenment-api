import { ErrorHandler, ErrorHandlerMetadata, ErrorHandlerBody } from "../../models/types/gen/gen.error";

/**
 * ! Error handler generator
 * * whitehatdevv - 2021/01/12
 */
export function error(errors: ErrorHandlerBody[], metadata: ErrorHandlerMetadata) : ErrorHandler {
    return {
        errors: errors,
        metadata: metadata
    };
}
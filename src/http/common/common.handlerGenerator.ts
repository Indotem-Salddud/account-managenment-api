import { ErrorHandler, ErrorHandlerMetadata, ErrorHandlerBody } from "../../models/types/gen/gen.error";
import {SuccessHandler,SuccessHandlerBody } from "../../models/types/gen/gen.success";

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

/**
 * ! Success handler generator
 * * Alcazar87 - 2021/01/20
 */
export function success(success: SuccessHandlerBody) : SuccessHandler {
    return {
        success: success
    };
}
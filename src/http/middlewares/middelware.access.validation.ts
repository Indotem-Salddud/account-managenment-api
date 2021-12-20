import { Query, Permission } from 'accesscontrol';
import express from 'express';
import { ac } from '../../models/types/gen/gen.permissions';
import { _handleResponse } from '../common/common.responseHandler';

export module AccessControlMiddelware {

    /**
     * ! Create a validator using Lambda functions
     * * whitehatdevv - 2021/12/20
     * @param f lambda(query: Query) => Permission
     * @returns {MiddelwareObject}
     */
    export const _grantAccess = (f: (query: Query) => Permission) => {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // make a lambda function to run a validation
            const permission = f(ac.can(req.user.role));
            if (!permission.granted) {
                _handleResponse(
                    {statusCode: 500, message: 'Server response cannot be processed'},
                    res
                  );
            }
            next();
        };
    }

};
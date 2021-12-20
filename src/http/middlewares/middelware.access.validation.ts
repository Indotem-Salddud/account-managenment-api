import { Query, Permission } from 'accesscontrol';
import express from 'express';
import { ac } from '../../models/types/gen/gen.permissions';
import { _handleResponse } from '../common/common.responseHandler';

export module AccessControlMiddelware {

    export const _grantAccess = (resource: string, f: (query: Query, resource: string) => Permission) => {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // make a lambda function to run a validation
            const permission = f(ac.can(req.user.role), resource);
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
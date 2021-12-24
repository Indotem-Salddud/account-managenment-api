import {DependentsActions} from '../actions/actions.dependents';
import {_handleResponse} from '../common/common.responseHandler';
import {
  ac,
  PermissionActions,
  PermissionRoles,
} from '../../models/types/gen/gen.permissions';
import { Dependent } from '../../models/types/model.dependent';

export module DependentsController {
    /**
     * ! Get all dependents for a account by account id
     * * DanBaDo - 2021/12/19
     * @param req {Request}
     * @param res {Response}
     */
    export const _getDependents = async (req, res) => {
        // validate permissions
        const requestOwn = req.user.accountID === req.params.accountID;
        const permissionsGranted =
            requestOwn ?
                ac.can(req.user.role).readOwn(PermissionActions.ACCOUNT)
                :
                ac.can(req.user.role).readAny(PermissionActions.ACCOUNT)
            ;
        if (permissionsGranted) {
            const { accountID } =
                req.user.role == PermissionRoles.USER ? req.user : req.params;
            if (!accountID) {
                _handleResponse(
                    { statusCode: 400, message: 'Data provided is not valid' },
                    res
                );
            }
            // call to action
            DependentsActions.findAllAccountDependents(accountID, (err?: string, data?: Dependent[]) => {
                if (err) {
                    _handleResponse(
                        { statusCode: 500, message: 'Server response cannot be processed' },
                        res
                    );
                }
                _handleResponse(
                    { statusCode: 200, message: 'Dependents data received', data: data },
                    res
                );
            });
        } else {
            _handleResponse(
                { statusCode: 401, message: 'You do not have right access permissions' },
                res
            );
        }
    };
}
  
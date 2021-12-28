import {DependentsActions} from '../actions/actions.dependents';
import {_handleResponse} from '../common/common.responseHandler';
import { PermissionRoles} from '../../models/types/gen/gen.permissions';
import { Dependent } from '../../models/types/model.dependent';

export module DependentsController {
    /**
     * ! Get all dependents for a customer by customer id
     * * DanBaDo - 2021/12/19
     * @param req {Request}
     * @param res {Response}
     */
    export const _getDependents = async (req, res) => {
        const { customerID } =
            req.user.role == PermissionRoles.USER ? req.user : req.params;
        if (!customerID) {
            _handleResponse(
                { statusCode: 400, message: 'Data provided is not valid' },
                res
            );
        }
        // call to action
        // TODO: Add 204 for empty dependents list and 404 for customer not found
        DependentsActions.findAllCustomerDependents(customerID, (err?: string, data?: Dependent[]) => {
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
    }
    /**
     * ! Get one owned dependant by id
     * * DanBaDo - 2021/12/25 ✨🎄✨
     * @param req {Request}
     * @param res {Response}
     */
    export const _getMyDependentById = async (req, res) => {
        const { customerID } = req.user;
        const { dependentID } = req.params;
        // call to action
        if (dependentID) {
            // TODO: Add 404 for dependant not found
            DependentsActions.findDependentByOwnerAndID(customerID, dependentID, (err?: string, data?: Dependent) => {
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
                { statusCode: 400, message: 'A dependent id is needed.'},
                res
            );
        }
    }

    /**
     * ! Create new dependet for a customer
     * * DanBaDo - 2021-12-27
     * @param req {Request}
     * @param res {Response}
     */
    export const _newOwnedDependent = async (req, res) => {
        const { customerID } = req.user;
        // get dependent data
        const {name, phone, direction} = req.body;
        // call to action
        // TODO: Add 404 for dependant not found
        DependentsActions.insertNewDependent(customerID, name, phone, direction, (err?: string, data?: Dependent) => {
            if (err) {
                _handleResponse(
                    { statusCode: 500, message: 'Server response cannot be processed' },
                    res
                );
            }
            _handleResponse(
                { statusCode: 200, message: 'Dependent created', data: data },
                res
            );
        });
    }
}
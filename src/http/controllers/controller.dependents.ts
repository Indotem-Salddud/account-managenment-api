import { DependentsActions } from '../actions/actions.dependents';
import { _handleResponse } from '../common/common.responseHandler';
import {
    PermissionRoles, ac,
    PermissionActions
} from '../../models/types/gen/gen.permissions';
import { Dependent, newDependentForCustomerDTO, UpdateDependentModel } from '../../models/types/model.dependent';

export module DependentsController {
    /**
     * ! Get all owned dependents
     * * DanBaDo - 2021/12/19
     * @param req {Request}
     * @param res {Response}
     */
    export const _getMyDependents = async (req, res) => {
        const { customerID } = req.user;
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
 * ! Get all dependents for a customer
 * * DanBaDo - 2022/1/1
 * @param req {Request}
 * @param res {Response}
 */
    export const _getAllCustomerDependents = async (req, res) => {
        const { customerID } = req.params;
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
                { statusCode: 400, message: 'A dependent id is needed.' },
                res
            );
        }
    }

    /**
     * ! Owner create new dependent
     * * DanBaDo - 2021-12-27
     * @param req {Request}
     * @param res {Response}
     */
    export const _newOwnedDependent = async (req, res) => {
        const { customerID } = req.user;
        // get dependent data
        const { name, phone, direction } = req.body;
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

    /**
     * ! Create new dependet for a customer
     * * DanBaDo - 2021-12-29
     * @param req {Request}
     * @param res {Response}
     */
    export const _newDependentForCustomer = async (req, res) => {
        const data: newDependentForCustomerDTO = req.body;
        const customers = data.customersIds;
        const dependent = data.dependent;
        DependentsActions.newDependent(
            dependent.name,
            dependent.phone,
            dependent.direction,
            (err: string, newDependent: Dependent) => {
                if (err) {
                    _handleResponse(
                        { statusCode: 500, message: 'Server response cannot be processed' },
                        res
                    )
                }
                customers.forEach(
                    (customerId) => {
                        DependentsActions.linkDependentToCustomer(
                            newDependent.id,
                            customerId,
                            (err: string) => {
                                if (err) {
                                    _handleResponse(
                                        {
                                            statusCode: 206,
                                            message: "Fail linking dependent to one or more customers",
                                            data: {
                                                id: newDependent.id,
                                                name: dependent.name,
                                                phone: dependent.phone,
                                                direction: dependent.direction,
                                                status: "Fail linking dependent to one or more customers"
                                            }
                                        },
                                        res
                                    );
                                }
                            }
                        );
                    }
                );
                _handleResponse(
                    {
                        statusCode: 201,
                        message: "Dependent data saved and linked to owners",
                        data: {
                            id: newDependent.id,
                            name: dependent.name,
                            phone: dependent.phone,
                            direction: dependent.direction,
                            status: "Dependent data saved and linked to owners"
                        }
                    },
                    res
                );
            }

        );
    };

    /**
     * ! Get dependet by id
     * * DanBaDo - 2021-12-29
     * @param req {Request}
     * @param res {Response}
     */
    export const _getDependentById = async (req, res) => {
        const { dependentID } = req.params;
        DependentsActions.getDependentById(
            dependentID,
            (err: string, data: Dependent) => {
                if (err) {
                    _handleResponse(
                        { statusCode: 500, message: 'Server response cannot be processed' },
                        res
                    );
                }
                _handleResponse(
                    { statusCode: 200, message: 'Dependent data downloaded', data },
                    res
                );
            }
        )
    };

    /**
  * ! Delete customer data by ID
  * * Alcazar87 - 2021/12/29
  * @param req {Request}
  * @param res {Response}
  */
    export const _deleteDependent = async (req, res) => {
        const { customerID } = req.user;
        const { dependentID } = req.params;
        if (!dependentID) {
            _handleResponse(
                { statusCode: 400, message: 'Dependent ID not provided' },
                res
            );
        }
        // call to action
        DependentsActions.deleteRelationshipUponDependent(customerID, dependentID, (err: string = null) => {
            if (err) {
                _handleResponse(
                    { statusCode: 500, message: 'Dependent relationship cannot be deleted' },
                    res
                );
            }
            //Delete dependent
            DependentsActions.deleteDependent(customerID, dependentID, (err: string = null) => {
                if (err) {
                    _handleResponse(
                        { statusCode: 500, message: 'Dependent cannot be deleted' },
                        res
                    );
                }
            }
            );
            _handleResponse(
                { statusCode: 200, message: 'Dependent was delete sucessfully' },
                res
            );
        });

    };

    /**
   * ! Update dependent data by dependentID
   * * Alcazar87 - 2022/01/03
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateDependentById = async (req, res) => {
    const { customerID } = req.user;
    const {dependentID} = req.params;
    if (!dependentID) {
      _handleResponse(
        {statusCode: 400, message: 'Dependent ID not provided'},
        res
      );
    }

    //TODO: VALIDATE FIELDS
    const data: UpdateDependentModel = req.body;
    // call to action
    DependentsActions.updateDependentData(data, dependentID,customerID, err => {
      if (err) {
        _handleResponse(
          {statusCode: 500, message: 'Dependent data cannot be updated'},
          res
        );
      }
      _handleResponse(
        {statusCode: 200, message: 'Dependent data was updated sucessfully'},
        res
      );
    });
};

/**
   * ! Update dependent status by dependentID
   * * Alcazar87 - 2022/01/04
   * @param req {Request}
   * @param res {Response}
   */
 export const _updateDependentStatus = async (req, res) => {
    const {dependentID} = req.params;
    const {status} = req.body;
    // TODO: VALIDATE ACOUNT STATUS
    if (!dependentID) {
      _handleResponse(
        {statusCode: 400, message: 'Dependent ID not provided'},
        res
      );
    }
    // call to action
    DependentsActions.updateDependentStatus(dependentID, status, (err: string = null) => {
      if (err) {
        _handleResponse(
          {statusCode: 500, message: 'Dependent status cannot be updated'},
          res
        );
      }
      _handleResponse(
        {statusCode: 200, message: 'Dependent status was updated sucessfully'},
        res
      );
    });
};

/**
   * ! Update dependent status by dependentID
   * * Alcazar87 - 2022/01/04
   * @param req {Request}
   * @param res {Response}
   */
 export const _updateOwnDependentStatus = async (req, res) => {
    const {customerID} = req.user;
    const {dependentID} = req.params;
    const {status} = req.body;
    // TODO: VALIDATE ACOUNT STATUS
    if (!dependentID) {
      _handleResponse(
        {statusCode: 400, message: 'Dependent ID not provided'},
        res
      );
    }
    // call to action
    DependentsActions.updateOwnDependentStatus(customerID,dependentID, status, (err: string = null) => {
      if (err) {
        _handleResponse(
          {statusCode: 500, message: 'Dependent status cannot be updated'},
          res
        );
      }
      _handleResponse(
        {statusCode: 200, message: 'Dependent status was updated sucessfully'},
        res
      );
    });
};

 


}
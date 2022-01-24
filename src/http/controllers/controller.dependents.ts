import {DependentsActions} from '../actions/actions.dependents';
import {s} from '../common/common.responseHandler';
import {
  Dependent,
  newDependentForCustomerDTO,
  UpdateDependentModel,
} from '../../models/types/model.dependent';
import { DependentsEndpoints } from '../common/Base/Base.DependentsEndpoints';
import { error,success } from '../common/common.handlerGenerator';
import { TranslatorKeys,TranslatorKeysUUID} from '../common/Base/Base.TranslatorKeys';

// * Global properties
const _microservice = 'Dependents';
const _version = 'v1.0.0';
const _date = Date.now();

export module DependentsController {
  /**
   * ! Get all owned dependents
   * * DanBaDo - 2021/12/19
   * @param req {Request}
   * @param res {Response}
   */
  export const _getMyDependents = async (req, res) => {
    const {customerID} = req.user;
    if (!customerID) {
    s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsBadRequest,
                  code: TranslatorKeysUUID.AppDependentsMydependentsBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
        res
      );
    }
    // call to action
    // TODO: Add 204 for empty dependents list and 404 for customer not found
    DependentsActions.findAllCustomerDependents(
      customerID,
      (err?: string, data?: Dependent[]) => {
        if (err) {
         s(
            204,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsNoContent,
                  code: TranslatorKeysUUID.AppDependentsMydependentsNoContent,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsUnauthorized,
                  code: TranslatorKeysUUID.AppDependentsMydependentsUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsInternalServerError,
                  code: TranslatorKeysUUID.AppDependentsMydependentsInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
            }
      s(
        200,
        {
          message: 'Dependents data received',
          data: data,
        },
        res
      );
    });
  };
  /**
   * ! Get all dependents for a customer
   * * DanBaDo - 2022/1/1
   * @param req {Request}
   * @param res {Response}
   */
  export const _getAllCustomerDependents = async (req, res) => {
    const {customerID} = req.params;
    if (!customerID) {
    s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsForAccountIDBadRequest,
                  code: TranslatorKeysUUID.AppDependentsDependentsForAccountIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentsCustomer,
                microservice: _microservice,
                version: _version
              }
            ),
        res
      );
    }
    // call to action
    DependentsActions.findAllCustomerDependents(
      customerID,
      (err?: string, data?: Dependent[]) => {
        if (err) {
              s(
            204,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsForAccountIDNoContent,
                  code: TranslatorKeysUUID.AppDependentsDependentsForAccountIDNoContent,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentsCustomer,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsForAccountIDUnauthorized,
                  code: TranslatorKeysUUID.AppDependentsDependentsForAccountIDUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentsCustomer,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            404,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsForAccountIDNotFound,
                  code: TranslatorKeysUUID.AppDependentsDependentsForAccountIDNotFound,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentsCustomer,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsForAccountIDInternalServerError,
                  code: TranslatorKeysUUID.AppDependentsDependentsForAccountIDInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentsCustomer,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
            }
      s(
        200,
        {
          message: 'Dependents data received',
          data: data,
        },
        res
      );
    });
  };
  /**
   * ! Get one owned dependant by id
   * * DanBaDo - 2021/12/25 ✨🎄✨
   * @param req {Request}
   * @param res {Response}
   */
  export const _getMyDependentById = async (req, res) => {
    const {customerID} = req.user;
    const {dependentID} = req.params;
     if (!dependentID) {
    s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsDependentIDBadRequest,
                  code: TranslatorKeysUUID.AppDependentsMydependentsDependentIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetOwnedDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
        res
      );
    }
       // call to action
      DependentsActions.findDependentByOwnerAndID(
        customerID,
        dependentID,
        (err?: string, data?: Dependent) => {
         if (err) {
          s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsDependentIDUnauthorized,
                  code: TranslatorKeysUUID.AppDependentsMydependentsDependentIDUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetOwnedDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            404,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsDependentIDNotFound,
                  code: TranslatorKeysUUID.AppDependentsMydependentsDependentIDNotFound,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetOwnedDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsDependentIDInternalServerError,
                  code: TranslatorKeysUUID.AppDependentsMydependentsDependentIDInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetOwnedDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
            }
      s(
        200,
        {
          message: 'Dependent data received',
          data: data,
        },
        res
      );
    });
  };

  /**
   * ! Owner create new dependent
   * * DanBaDo - 2021-12-27
   * @param req {Request}
   * @param res {Response}
   */
  export const _newOwnedDependent = async (req, res) => {
    const {customerID} = req.user;
    // get dependent data
    const {name, phone, direction} = req.body;
    // call to action
    DependentsActions.insertNewDependent(
      customerID,
      name,
      phone,
      direction,
      (err?: string, data?: Dependent) => {
        if (err) {
           s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsBadRequest,
                  code: TranslatorKeysUUID.AppDependentsMydependentsBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsUnauthorized,
                  code: TranslatorKeysUUID.AppDependentsMydependentsUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsMydependentsInternalServerError,
                  code: TranslatorKeysUUID.AppDependentsMydependentsInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.CreateOwnedDependent,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
            }
      s(
        201,
          success(
          {
            message: TranslatorKeys.AppDependentsMydependentsSuccessfullyB,
            code: TranslatorKeysUUID.AppDependentsMydependentsSuccessfullyB       
          },
          ),
        res
      );
    });
  };

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
          s(
            500,
            {
              message: 'Server response cannot be processed',
            },
            res
          );
        }
        customers.forEach(customerId => {
          DependentsActions.linkDependentToCustomer(
            newDependent.id,
            customerId,
            (err: string) => {
              if (err) {
                s(
                  206,
                  {
                    message: 'Fail linking dependent to one or more customers',
                    data: {
                      id: newDependent.id,
                      name: dependent.name,
                      phone: dependent.phone,
                      direction: dependent.direction,
                      status: 'Fail linking dependent to one or more customers',
                    },
                  },
                  res
                );
              }
            }
          );
        });
        s(
          201,
          {
            message: 'Dependent data saved and linked to owners',
            data: {
              id: newDependent.id,
              name: dependent.name,
              phone: dependent.phone,
              direction: dependent.direction,
              status: 'Dependent data saved and linked to owners',
            },
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
    const {dependentID} = req.params;
    DependentsActions.getDependentById(
      dependentID,
      (err: string, data: Dependent) => {
        if (err) {
          s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDBadRequest,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDUnauthorized,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            404,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDNotFound,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDNotFound,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDInternalServerError,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.GetDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
            }
      s(
        200,
        {
          message: 'Dependent data received',
          data: data,
        },
        res
      );
    });
  };

  /**
   * ! Delete dependent data by ID
   * * Alcazar87 - 2021/12/29
   * @param req {Request}
   * @param res {Response}
   */
  export const _deleteDependent = async (req, res) => {
    const {customerID} = req.user;
    const {dependentID} = req.params;
    if (!dependentID) {
          s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDBadRequest,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.DeleteDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          )};
    // call to action
    DependentsActions.deleteRelationshipUponDependent(
      customerID,
      dependentID,
      (err: string = null) => {
        if (err) {
          s(
            401,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDUnauthorized,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDUnauthorized,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.DeleteDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            404,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDNotFound,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDNotFound,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.DeleteDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
          s(
            500,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDInternalServerError,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDInternalServerError,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.DeleteDependentById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          );
            }
        //Delete dependent
        DependentsActions.deleteDependent(
          customerID,
          dependentID,
          (err: string = null) => {
            if (err) {
              s(
                  401,
                  error(
                    [
                      {
                        message: TranslatorKeys.AppDependentsDependentsDependentIDUnauthorized,
                        code: TranslatorKeysUUID.AppDependentsDependentsDependentIDUnauthorized,
                        date: _date
                      }
                    ],
                    {
                      endpoint: DependentsEndpoints.DeleteDependentById,
                      microservice: _microservice,
                      version: _version
                    }
                  ),
                  res
                );
              s(
                404,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependentsDependentIDNotFound,
                      code: TranslatorKeysUUID.AppDependentsDependentsDependentIDNotFound,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.DeleteDependentById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
              s(
                500,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependentsDependentIDInternalServerError,
                      code: TranslatorKeysUUID.AppDependentsDependentsDependentIDInternalServerError,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.DeleteDependentById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
                }
            s(
              200,
              success(
              {
                message: TranslatorKeys.AppDependentsDependentsDependentIDSuccessfullyA,
                code: TranslatorKeysUUID.AppDependentsDependentsDependentIDSuccessfullyA
              },
              ),
              res
            );
          });
        })
        };

  /**
   * ! Update dependent data by dependentID
   * * Alcazar87 - 2022/01/03
   * @param req {Request}
   * @param res {Response}
   */
  export const _updateDependentById = async (req, res) => {
    const {customerID} = req.user;
    const {dependentID} = req.params;
    if (!dependentID) {
      s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsDependentsDependentIDBadRequest,
                  code: TranslatorKeysUUID.AppDependentsDependentsDependentIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.UpdateDependentDataById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          )};

    //TODO: VALIDATE FIELDS
    const data: UpdateDependentModel = req.body;
    // call to action
    DependentsActions.updateDependentData(
      data,
      dependentID,
      customerID,
      err => {
        if (err) {
              s(
                  400,
                  error(
                    [
                      {
                        message: TranslatorKeys.AppDependentsDependentsDependentIDBadRequest,
                        code: TranslatorKeysUUID.AppDependentsDependentsDependentIDBadRequest,
                        date: _date
                      }
                    ],
                    {
                      endpoint: DependentsEndpoints.UpdateDependentDataById,
                      microservice: _microservice,
                      version: _version
                    }
                  ),
                  res
                );
              s(
                  401,
                  error(
                    [
                      {
                        message: TranslatorKeys.AppDependentsDependentsDependentIDUnauthorized,
                        code: TranslatorKeysUUID.AppDependentsDependentsDependentIDUnauthorized,
                        date: _date
                      }
                    ],
                    {
                      endpoint: DependentsEndpoints.UpdateDependentDataById,
                      microservice: _microservice,
                      version: _version
                    }
                  ),
                  res
                );
              s(
                404,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependentsDependentIDNotFound,
                      code: TranslatorKeysUUID.AppDependentsDependentsDependentIDNotFound,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.UpdateDependentDataById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
              s(
                500,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependentsDependentIDInternalServerError,
                      code: TranslatorKeysUUID.AppDependentsDependentsDependentIDInternalServerError,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.UpdateDependentDataById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
                }
            s(
              200,
              success(
              {
                message: TranslatorKeys.AppDependentsDependentsDependentIDSuccessfullyB,
                code: TranslatorKeysUUID.AppDependentsDependentsDependentIDSuccessfullyB
              },
              ),
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
       s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppDependentsStatusDependentIDBadRequest,
                  code: TranslatorKeysUUID.AppDependentsStatusDependentIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.UpdateDependentStatusById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          )};
    // call to action
    DependentsActions.updateDependentStatus(
      dependentID,
      status,
      (err: string = null) => {
        if (err) {
           s(
                  401,
                  error(
                    [
                      {
                        message: TranslatorKeys.AppDependentsStatusDependentIDUnauthorized,
                        code: TranslatorKeysUUID.AppDependentsStatusDependentIDUnauthorized,
                        date: _date
                      }
                    ],
                    {
                      endpoint: DependentsEndpoints.UpdateDependentStatusById,
                      microservice: _microservice,
                      version: _version
                    }
                  ),
                  res
                );
              s(
                404,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsStatusDependentIDNotFound,
                      code: TranslatorKeysUUID.AppDependentsStatusDependentIDNotFound,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.UpdateDependentStatusById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
              s(
                500,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsStatusDependentIDInternalServerError,
                      code: TranslatorKeysUUID.AppDependentsStatusDependentIDInternalServerError,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.UpdateDependentStatusById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
                }
            s(
              200,
              success(
              {
                message: TranslatorKeys.AppDependentsStatusDependentIDSuccessfully,
                code: TranslatorKeysUUID.AppDependentsStatusDependentIDSuccessfully
              },
              ),
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
       s(
            400,
            error(
              [
                {
                  message: TranslatorKeys.AppCustomersMystatusDependentIDBadRequest,
                  code: TranslatorKeysUUID.AppCustomersMystatusDependentIDBadRequest,
                  date: _date
                }
              ],
              {
                endpoint: DependentsEndpoints.UpdateOwnDependentStatusById,
                microservice: _microservice,
                version: _version
              }
            ),
            res
          )};
    // call to action
    DependentsActions.updateOwnDependentStatus(
      customerID,
      dependentID,
      status,
      (err: string = null) => {
        if (err) {
          s(
                  401,
                  error(
                    [
                      {
                        message: TranslatorKeys.AppCustomersMystatusDependentIDUnauthorized,
                        code: TranslatorKeysUUID.AppCustomersMystatusDependentIDUnauthorized,
                        date: _date
                      }
                    ],
                    {
                      endpoint: DependentsEndpoints.UpdateOwnDependentStatusById,
                      microservice: _microservice,
                      version: _version
                    }
                  ),
                  res
                );
              s(
                404,
                error(
                  [
                    {
                      message: TranslatorKeys.AppCustomersMystatusDependentIDNotFound,
                      code: TranslatorKeysUUID.AppCustomersMystatusDependentIDNotFound,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.UpdateOwnDependentStatusById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
              s(
                500,
                error(
                  [
                    {
                      message: TranslatorKeys.AppCustomersMystatusDependentIDInternalServerError,
                      code: TranslatorKeysUUID.AppCustomersMystatusDependentIDInternalServerError,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.UpdateOwnDependentStatusById,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
                }
            s(
              200,
              success(
              {
                message: TranslatorKeys.AppCustomersMystatusDependentIDSuccessfully,
                code: TranslatorKeysUUID.AppCustomersMystatusDependentIDSuccessfully
              },
              ),
              res
            );
          });
        };
  /**
   * ! Get owner by dependet id
   * * DanBaDo - 2022-01-06 🧦👔
   * @param req {Request}
   * @param res {Response}
   */
  export const _getOwnersByDependentId = async (req, res) => {
    const {dependentID} = req.params;
    DependentsActions.getOwnersByDependentId(
      dependentID,
      (err: string, data: Dependent) => {
        if (err) {
              s(
                400,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependetsOwnersDependentIDBadRequest,
                      code: TranslatorKeysUUID.AppDependentsDependetsOwnersDependentIDBadRequest,
                      date: _date
                    }
                    ],
                    {
                    endpoint: DependentsEndpoints.GetCustomerOwnerByDependentId,
                    microservice: _microservice,
                    version: _version
                    }
                  ),
                  res
                );
              s(
                404,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependetsOwnersDependentIDNotFound,
                      code: TranslatorKeysUUID.AppDependentsDependetsOwnersDependentIDNotFound,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.GetCustomerOwnerByDependentId,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
              s(
                500,
                error(
                  [
                    {
                      message: TranslatorKeys.AppDependentsDependetsOwnersDependentIDInternalServerError,
                      code: TranslatorKeysUUID.AppDependentsDependetsOwnersDependentIDInternalServerError,
                      date: _date
                    }
                  ],
                  {
                    endpoint: DependentsEndpoints.GetCustomerOwnerByDependentId,
                    microservice: _microservice,
                    version: _version
                  }
                ),
                res
              );
                }
              s(
                200,
                {
                  message: 'Customer data received',
                  data: data,
                },
                res
              );
          });
        };
}

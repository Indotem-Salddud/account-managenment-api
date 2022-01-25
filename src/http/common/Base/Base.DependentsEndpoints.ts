/**
 * ! Dependents endpoints available in the server
 * * whitehatdevv - 2021/01/12
 */
export enum DependentsEndpoints {
  CreateOwnedDependent = '/my-dependents/',
  CreateNewDependent = '/dependents/',
  GetOwnedDependents = '/my-dependents/',
  GetDependentsCustomer = '/dependents-for/:customerID',
  GetOwnedDependentById = 'my-dependents/:dependentID/',
  GetDependentById = '/dependents/:dependentID/',
  DeleteDependentById = '/dependents/:dependentID',
  DeleteOwnDependentsById = '/my-dependents/:dependentID',
  DeleteOwnDependentsDataById = '/my-dependents/:dependentID',
  UpdateDependentDataById = '/dependents/:dependentID',
  UpdateDependentStatusById = '/status/:dependentID',
  UpdateOwnDependentStatusById = '/my-status/:dependentID',
  GetCustomerOwnerByDependentId = '/dependent-owners/:depedentID/',
  GetDependentsSoleForCustomerID = '/dependent-sole-for/:customerID/'
}

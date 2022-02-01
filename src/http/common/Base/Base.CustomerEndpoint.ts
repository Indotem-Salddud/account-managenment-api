/**
 * ! All customer dependents
 * * whitehatdevv - 2022/01/12
 */
export enum CustomerEndpoints {
    GetCustomerById = `/customers/:customerID`,
    GetOwnCustomerData = `/my-account/`,
    GetAllCustomersData = `/customers/`,
    DeleteCustomerById = '/customers/:customerID',
    UpdateOwnCustomerStatus = '/my-status/',
    UpdateCustomerStatusById = '/status/:customerID',
    UpdateCustomerDataById = '/customers/:customerID',
    UpdateOwnCustomerData = '/my-account/',
    GetOwnCustomerProfile = `/my-account/profile/`
}
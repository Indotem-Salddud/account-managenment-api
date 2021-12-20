import { Identificable } from "../library/identificable";

export const _tableName = "Accounts";
export interface Account extends Identificable { 
    name: string;
    username: string;
    email: string;
    phone: string;
}
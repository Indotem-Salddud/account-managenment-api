import { Identificable } from "./Identificable";

export const _tableName = "Accounts";
export interface TinyAccount extends Identificable { 
    name: string;
    username: string;
    email: string;
    phone: string;
}
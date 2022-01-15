import { PermissionRoles } from "./gen.permissions";

/**
 * ! Token Payload to save user data
 * * whitehatdevv - 2021/12/14
 */
export interface TokenPayload {
  customerID: string;
  role: PermissionRoles;
}

export interface refreshTokenPayload {
  customerID: string;
  role: PermissionRoles;
  tokenExp: number;
}
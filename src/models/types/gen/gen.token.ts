import { PermissionRoles } from "./gen.permissions";

export enum tokenPurpouses {
  refres = "refresh",
  auth = "auth",
}

/**
 * ! Token Payload to save user data
 * * whitehatdevv - 2021/12/14
 */
export interface TokenPayload {
  customerID: string;
  role: PermissionRoles;
}

export interface refreshTokenPayload {
  purpouse: tokenPurpouses;
  customerID: string;
  role: PermissionRoles;
  tokenExp: number;
}
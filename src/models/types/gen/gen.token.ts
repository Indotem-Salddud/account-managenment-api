import { PermissionRoles } from "./gen.permissions";

/**
 * ! Token Payload to save user data
 * * whitehatdevv - 2021/12/14
 */
export interface TokenPayload {
  accountID: string;
  role: PermissionRoles;
}

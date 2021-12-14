import { PermissionRoles } from "./gen.permissions";

export interface TokenPayload {
  accountID: string;
  role: PermissionRoles;
}

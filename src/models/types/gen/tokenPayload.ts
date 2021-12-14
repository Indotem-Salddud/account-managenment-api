import { PermissionRoles } from "./permissions";

export interface TokenPayload {
  accountID: string;
  role: PermissionRoles;
}

import {AccessControl} from 'accesscontrol';

/**
 * ! Permission roles
 * * whitehatdevv - 2021/12/14
 */
export enum PermissionRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

/**
 * ! Permission actions
 * * whitehatdevv - 2021/12/14
 */
export enum PermissionActions {
  ACCOUNT = 'account',
}

/**
 * ! Define all API Granted access
 * * whitehatdevv - 2021/12/14
 */
const grantedObject = {
    USER: {
        ACCOUNT: {
            'update:own': ['*'],
            'read:own': ['*'],
            'delete:own': ['*']
        }
    }
};

export const ac = new AccessControl();
ac.lock().setGrants(grantedObject);


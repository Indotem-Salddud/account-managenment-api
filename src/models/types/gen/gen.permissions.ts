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
  DEPENDENTS = 'dependents'
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
            'delete:own': ['*'],
        },
    },
    ADMIN: {
      ACCOUNT: {
        'update:any': ['*'],
        'read:any': ['*'],
        'delete:any': ['*'],
      },
      DEPENDENTS: {
        'update:any': ['*'],
        'read:any': ['*'],
        'delete:any': ['*'],
      },
    }
};

export const ac = new AccessControl();
ac.lock().setGrants(grantedObject);


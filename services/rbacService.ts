
import { Role, Permission } from '../types';
import { ROLE_PERMISSIONS } from '../constants';

export const hasPermission = (userRole: Role, permission: Permission): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const hasAnyPermission = (userRole: Role, permissions: Permission[]): boolean => {
  return permissions.some(p => hasPermission(userRole, p));
};

export const hasAllPermissions = (userRole: Role, permissions: Permission[]): boolean => {
  return permissions.every(p => hasPermission(userRole, p));
};

export const isRole = (userRole: Role, targetRole: Role): boolean => {
  return userRole === targetRole;
};

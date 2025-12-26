
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types';

interface PermissionGuardProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permission, 
  children, 
  fallback = null 
}) => {
  const { can } = useAuth();
  
  if (!can(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGuard;

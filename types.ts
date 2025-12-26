
export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum Permission {
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  VIEW_USERS = 'VIEW_USERS',
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_REPORTS = 'VIEW_REPORTS',
  VIEW_SETTINGS = 'VIEW_SETTINGS',
  MANAGE_SETTINGS = 'MANAGE_SETTINGS'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export type Theme = 'light' | 'dark';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

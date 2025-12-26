
import { Role, Permission } from './types';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_SETTINGS,
    Permission.MANAGE_SETTINGS
  ],
  [Role.MANAGER]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_USERS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_SETTINGS
  ],
  [Role.USER]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_REPORTS
  ]
};

export const MOCK_USERS: any[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah@skynet.com',
    role: Role.ADMIN,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '2',
    name: 'John Miller',
    email: 'john@company.com',
    role: Role.MANAGER,
    avatar: 'https://picsum.photos/seed/john/100/100'
  },
  {
    id: '3',
    name: 'Alex Reed',
    email: 'alex@work.com',
    role: Role.USER,
    avatar: 'https://picsum.photos/seed/alex/100/100'
  }
];

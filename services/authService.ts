export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

const MOCK_ADMIN: AdminUser = {
  id: '1',
  email: 'admin@datum.org',
  name: 'Krishna',
  role: 'Gallery & Admin Lead',
  permissions: ['events:create', 'events:edit', 'events:delete', 'gallery:manage', 'users:view']
};

export const authService = {
  login: async (email: string, password: string): Promise<AdminUser | null> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_ADMIN.email && password === 'admin123') {
          localStorage.setItem('admin_token', 'mock_token_12345');
          localStorage.setItem('admin_user', JSON.stringify(MOCK_ADMIN));
          resolve(MOCK_ADMIN);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        resolve();
      }, 200);
    });
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('admin_token');
    return !!token;
  },

  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  hasPermission: (permission: string): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return user.permissions.includes(permission);
  }
};
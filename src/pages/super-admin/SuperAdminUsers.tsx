
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { UsersManagement } from '@/components/super-admin/users/UsersManagement';

const SuperAdminUsers = () => {
  return (
    <SuperAdminLayout>
      <UsersManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminUsers;

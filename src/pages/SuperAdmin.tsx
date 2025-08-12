
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Dashboard } from '@/components/super-admin/Dashboard';

const SuperAdmin = () => {
  return (
    <SuperAdminLayout>
      <Dashboard />
    </SuperAdminLayout>
  );
};

export default SuperAdmin;

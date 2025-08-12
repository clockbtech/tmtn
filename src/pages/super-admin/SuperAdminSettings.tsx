
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { SettingsManagement } from '@/components/super-admin/settings/SettingsManagement';

const SuperAdminSettings = () => {
  return (
    <SuperAdminLayout>
      <SettingsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminSettings;

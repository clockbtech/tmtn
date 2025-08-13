
import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { TermsOfServiceManagement } from '@/components/super-admin/terms-of-service/TermsOfServiceManagement';

const SuperAdminTermsOfService = () => {
  return (
    <SuperAdminLayout>
      <TermsOfServiceManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminTermsOfService;

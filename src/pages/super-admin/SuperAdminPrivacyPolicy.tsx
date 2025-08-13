
import React from 'react';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';
import { PrivacyPolicyManagement } from '../../components/super-admin/privacy-policy/PrivacyPolicyManagement';

const SuperAdminPrivacyPolicy = () => {
  return (
    <SuperAdminLayout>
      <PrivacyPolicyManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminPrivacyPolicy;


import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { FAQsManagement } from '@/components/super-admin/faqs/FAQsManagement';

const SuperAdminFAQs = () => {
  return (
    <SuperAdminLayout>
      <FAQsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminFAQs;

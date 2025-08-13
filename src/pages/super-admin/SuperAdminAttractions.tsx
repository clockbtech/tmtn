
import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { AttractionsManagement } from '@/components/super-admin/attractions/AttractionsManagement';

const SuperAdminAttractions = () => {
  return (
    <SuperAdminLayout>
      <AttractionsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminAttractions;

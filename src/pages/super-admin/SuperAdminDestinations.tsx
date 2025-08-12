
import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { DestinationsManagement } from '@/components/super-admin/destinations/DestinationsManagement';

const SuperAdminDestinations = () => {
  return (
    <SuperAdminLayout>
      <DestinationsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminDestinations;

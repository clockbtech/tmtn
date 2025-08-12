
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { TourGuidesManagement } from '@/components/super-admin/tour-guides/TourGuidesManagement';

const SuperAdminTourGuides = () => {
  return (
    <SuperAdminLayout>
      <TourGuidesManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminTourGuides;

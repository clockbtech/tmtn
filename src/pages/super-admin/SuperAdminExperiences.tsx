
import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { ExperiencesManagement } from '@/components/super-admin/experiences/ExperiencesManagement';

const SuperAdminExperiences = () => {
  return (
    <SuperAdminLayout>
      <ExperiencesManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminExperiences;

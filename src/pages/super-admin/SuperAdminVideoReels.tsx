
import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { VideoReelsManagement } from '@/components/super-admin/video-reels/VideoReelsManagement';

const SuperAdminVideoReels = () => {
  return (
    <SuperAdminLayout>
      <VideoReelsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminVideoReels;


import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { BlogsManagement } from '@/components/super-admin/blogs/BlogsManagement';

const SuperAdminBlogs = () => {
  return (
    <SuperAdminLayout>
      <BlogsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminBlogs;

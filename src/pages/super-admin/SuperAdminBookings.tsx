
import React from 'react';
import { SuperAdminLayout } from '@/components/super-admin/SuperAdminLayout';
import { BookingsManagement } from '@/components/super-admin/bookings/BookingsManagement';

const SuperAdminBookings = () => {
  return (
    <SuperAdminLayout>
      <BookingsManagement />
    </SuperAdminLayout>
  );
};

export default SuperAdminBookings;

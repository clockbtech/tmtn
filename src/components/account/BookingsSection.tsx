
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Download } from 'lucide-react';
import { generatePDFInvoice } from '../../utils/pdfInvoiceGenerator';

const BookingsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bookings = [
    {
      id: 'BK001',
      experience: 'Everest Base Camp Trek',
      date: '2024-03-15',
      status: 'Completed',
      total: 2499,
      location: 'Nepal'
    },
    {
      id: 'BK002',
      experience: 'Annapurna Circuit',
      date: '2024-04-10',
      status: 'Upcoming',
      total: 1899,
      location: 'Nepal'
    }
  ];

  const handleDownloadInvoice = (booking: any) => {
    const invoiceData = {
      bookingId: booking.id,
      experienceTitle: booking.experience,
      experienceLocation: booking.location,
      bookingDate: new Date().toLocaleDateString(),
      checkInDate: booking.date,
      checkOutDate: booking.date,
      guests: {
        adults: 2,
        children: 0,
        infants: 0
      },
      pricing: {
        basePrice: booking.total * 0.8,
        serviceFee: booking.total * 0.1,
        tax: booking.total * 0.1,
        total: booking.total
      },
      customerInfo: {
        name: 'Jayvion Simon',
        email: 'nannie.abernathy70@yahoo.com',
        phone: '365-374-4961',
        address: 'Sample Address'
      },
      passportInfo: {
        number: 'A12345678',
        country: 'United States',
        issueDate: '2020-01-01',
        expiryDate: '2030-01-01'
      }
    };

    generatePDFInvoice(invoiceData);
  };

  const filteredBookings = bookings.filter(booking =>
    booking.experience.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.experience}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>${booking.total}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadInvoice(booking)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export { BookingsSection };

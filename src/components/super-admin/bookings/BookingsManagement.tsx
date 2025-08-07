
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const bookings = [
  {
    id: 'BK001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    destination: 'Paris, France',
    experience: 'Romantic Paris Tour',
    bookingDate: '2024-01-15',
    travelDate: '2024-02-15',
    guests: 2,
    amount: 1200,
    status: 'confirmed',
    paymentStatus: 'paid',
    transactionId: 'TXN001',
  },
  {
    id: 'BK002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    destination: 'Bali, Indonesia',
    experience: 'Beach Paradise Package',
    bookingDate: '2024-01-14',
    travelDate: '2024-03-01',
    guests: 4,
    amount: 2800,
    status: 'pending',
    paymentStatus: 'pending',
    transactionId: 'TXN002',
  },
  {
    id: 'BK003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    destination: 'Swiss Alps',
    experience: 'Mountain Adventure',
    bookingDate: '2024-01-13',
    travelDate: '2024-01-25',
    guests: 1,
    amount: 1500,
    status: 'cancelled',
    paymentStatus: 'refunded',
    transactionId: 'TXN003',
  },
];

export const BookingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || booking.status === selectedStatus;
    const matchesPayment = selectedPaymentStatus === 'All' || booking.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { variant: 'default' as const, icon: CheckCircle },
      pending: { variant: 'secondary' as const, icon: Clock },
      cancelled: { variant: 'destructive' as const, icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const paymentConfig = {
      paid: { variant: 'default' as const, color: 'text-green-600' },
      pending: { variant: 'secondary' as const, color: 'text-yellow-600' },
      refunded: { variant: 'outline' as const, color: 'text-blue-600' },
    };
    
    const config = paymentConfig[paymentStatus as keyof typeof paymentConfig] || paymentConfig.pending;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </Badge>
    );
  };

  const BookingDetail = ({ booking }: { booking: any }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Booking Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">ID:</span> {booking.id}</p>
            <p><span className="font-medium">Booking Date:</span> {booking.bookingDate}</p>
            <p><span className="font-medium">Travel Date:</span> {booking.travelDate}</p>
            <p><span className="font-medium">Guests:</span> {booking.guests}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Customer Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {booking.customerName}</p>
            <p><span className="font-medium">Email:</span> {booking.customerEmail}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Experience Details</h4>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Destination:</span> {booking.destination}</p>
          <p><span className="font-medium">Experience:</span> {booking.experience}</p>
          <p><span className="font-medium">Amount:</span> ${booking.amount.toLocaleString()}</p>
          <p><span className="font-medium">Transaction ID:</span> {booking.transactionId}</p>
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button size="sm">Send Confirmation</Button>
        <Button variant="outline" size="sm">Download Invoice</Button>
        <Button variant="outline" size="sm">Contact Customer</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bookings & Transactions</h2>
          <p className="text-muted-foreground">Manage customer bookings and payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Payments
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,400</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Travelers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">Currently traveling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>
            View and manage all customer bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.customerName}</div>
                      <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.experience}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.travelDate}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell className="font-medium">${booking.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                          <DialogDescription>
                            Complete booking and transaction information
                          </DialogDescription>
                        </DialogHeader>
                        <BookingDetail booking={booking} />
                      </DialogContent>
                    </Dialog>
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


import jsPDF from 'jspdf';

interface InvoiceData {
  bookingId: string;
  experienceTitle: string;
  experienceLocation: string;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  pricing: {
    basePrice: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  passportInfo: {
    number: string;
    country: string;
    issueDate: string;
    expiryDate: string;
  };
}

export const generatePDFInvoice = (data: InvoiceData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  
  // Header
  pdf.setFontSize(20);
  pdf.setTextColor(40, 40, 40);
  pdf.text('BOOKING INVOICE', pageWidth / 2, 30, { align: 'center' });
  
  // Booking ID
  pdf.setFontSize(12);
  pdf.text(`Booking ID: ${data.bookingId}`, 20, 50);
  pdf.text(`Date: ${data.bookingDate}`, pageWidth - 80, 50);
  
  // Divider line
  pdf.setDrawColor(200, 200, 200);
  pdf.line(20, 60, pageWidth - 20, 60);
  
  // Experience Details
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Experience Details', 20, 80);
  
  pdf.setFontSize(10);
  pdf.text(`Title: ${data.experienceTitle}`, 20, 95);
  pdf.text(`Location: ${data.experienceLocation}`, 20, 105);
  pdf.text(`Check-in: ${data.checkInDate}`, 20, 115);
  pdf.text(`Check-out: ${data.checkOutDate}`, 20, 125);
  
  // Guest Information
  pdf.setFontSize(14);
  pdf.text('Guest Information', 20, 145);
  
  pdf.setFontSize(10);
  pdf.text(`Adults: ${data.guests.adults}`, 20, 160);
  pdf.text(`Children: ${data.guests.children}`, 20, 170);
  pdf.text(`Infants: ${data.guests.infants}`, 20, 180);
  
  // Customer Information
  pdf.setFontSize(14);
  pdf.text('Customer Information', 20, 200);
  
  pdf.setFontSize(10);
  pdf.text(`Name: ${data.customerInfo.name}`, 20, 215);
  pdf.text(`Email: ${data.customerInfo.email}`, 20, 225);
  pdf.text(`Phone: ${data.customerInfo.phone}`, 20, 235);
  pdf.text(`Address: ${data.customerInfo.address}`, 20, 245);
  
  // Passport Information
  pdf.setFontSize(14);
  pdf.text('Passport Information', 120, 200);
  
  pdf.setFontSize(10);
  pdf.text(`Number: ${data.passportInfo.number}`, 120, 215);
  pdf.text(`Country: ${data.passportInfo.country}`, 120, 225);
  pdf.text(`Issue Date: ${data.passportInfo.issueDate}`, 120, 235);
  pdf.text(`Expiry Date: ${data.passportInfo.expiryDate}`, 120, 245);
  
  // Pricing Summary
  pdf.setDrawColor(200, 200, 200);
  pdf.line(20, 260, pageWidth - 20, 260);
  
  pdf.setFontSize(14);
  pdf.text('Pricing Summary', 20, 275);
  
  pdf.setFontSize(10);
  pdf.text(`Base Price: $${data.pricing.basePrice.toFixed(2)}`, 20, 290);
  pdf.text(`Service Fee: $${data.pricing.serviceFee.toFixed(2)}`, 20, 300);
  pdf.text(`Tax: $${data.pricing.tax.toFixed(2)}`, 20, 310);
  
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text(`Total: $${data.pricing.total.toFixed(2)}`, 20, 325);
  
  // Footer
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text('Thank you for choosing our services!', pageWidth / 2, 350, { align: 'center' });
  
  // Save the PDF
  pdf.save(`invoice-${data.bookingId}.pdf`);
};


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
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Company Header
    pdf.setFillColor(18, 104, 148); // Nepal blue
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TAKE ME TO NEPAL', pageWidth / 2, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Your Gateway to the Himalayas', pageWidth / 2, 30, { align: 'center' });
    
    // Invoice Title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INVOICE', pageWidth / 2, 60, { align: 'center' });
    
    // Invoice Info Box
    pdf.setDrawColor(200, 200, 200);
    pdf.setFillColor(250, 250, 250);
    pdf.rect(20, 70, pageWidth - 40, 25, 'FD');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Invoice #: ${data.bookingId}`, 25, 80);
    pdf.text(`Date: ${data.bookingDate}`, 25, 88);
    pdf.text('Status: CONFIRMED', pageWidth - 25, 80, { align: 'right' });
    pdf.text(`Due Date: ${data.checkInDate}`, pageWidth - 25, 88, { align: 'right' });
    
    // Company Details Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(18, 104, 148);
    pdf.text('FROM:', 20, 110);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Take Me To Nepal Pvt. Ltd.', 20, 120);
    pdf.text('Thamel, Kathmandu, Nepal', 20, 127);
    pdf.text('Phone: +977-1-4441234', 20, 134);
    pdf.text('Email: info@takemetonepal.com', 20, 141);
    pdf.text('License: NTB-1234/075', 20, 148);
    
    // Customer Details Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(18, 104, 148);
    pdf.text('BILL TO:', pageWidth / 2 + 10, 110);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(data.customerInfo.name, pageWidth / 2 + 10, 120);
    pdf.text(data.customerInfo.email, pageWidth / 2 + 10, 127);
    pdf.text(data.customerInfo.phone, pageWidth / 2 + 10, 134);
    
    // Split address into multiple lines if too long
    const addressLines = pdf.splitTextToSize(data.customerInfo.address, 80);
    let addressY = 141;
    addressLines.forEach((line: string) => {
      pdf.text(line, pageWidth / 2 + 10, addressY);
      addressY += 7;
    });
    
    // Experience Details Section
    pdf.setDrawColor(18, 104, 148);
    pdf.setLineWidth(0.5);
    pdf.line(20, 165, pageWidth - 20, 165);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(18, 104, 148);
    pdf.text('EXPERIENCE DETAILS', 20, 180);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Title: ${data.experienceTitle}`, 20, 192);
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Location: ${data.experienceLocation}`, 20, 202);
    pdf.text(`Check-in Date: ${data.checkInDate}`, 20, 212);
    pdf.text(`Check-out Date: ${data.checkOutDate}`, 20, 222);
    
    // Guest Information
    pdf.text(`Guests: ${data.guests.adults} Adults`, 120, 192);
    if (data.guests.children > 0) {
      pdf.text(`${data.guests.children} Children`, 120, 202);
    }
    if (data.guests.infants > 0) {
      pdf.text(`${data.guests.infants} Infants`, 120, 212);
    }
    
    // Passport Information Section
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(18, 104, 148);
    pdf.text('PASSPORT INFORMATION', 20, 240);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Passport Number: ${data.passportInfo.number}`, 20, 252);
    pdf.text(`Country: ${data.passportInfo.country}`, 20, 262);
    pdf.text(`Issue Date: ${data.passportInfo.issueDate}`, 120, 252);
    pdf.text(`Expiry Date: ${data.passportInfo.expiryDate}`, 120, 262);
    
    // Pricing Table
    pdf.setDrawColor(18, 104, 148);
    pdf.line(20, 280, pageWidth - 20, 280);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(18, 104, 148);
    pdf.text('PRICING BREAKDOWN', 20, 295);
    
    // Table headers
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, 305, pageWidth - 40, 15, 'F');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Description', 25, 315);
    pdf.text('Amount', pageWidth - 25, 315, { align: 'right' });
    
    // Table rows
    pdf.setFont('helvetica', 'normal');
    let yPos = 330;
    
    pdf.text('Base Price', 25, yPos);
    pdf.text(`$${data.pricing.basePrice.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
    yPos += 12;
    
    pdf.text('Service Fee', 25, yPos);
    pdf.text(`$${data.pricing.serviceFee.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
    yPos += 12;
    
    pdf.text('Tax & Government Fees', 25, yPos);
    pdf.text(`$${data.pricing.tax.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
    yPos += 15;
    
    // Total
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos - 5, pageWidth - 20, yPos - 5);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(18, 104, 148);
    pdf.text('TOTAL AMOUNT', 25, yPos + 5);
    pdf.text(`$${data.pricing.total.toFixed(2)}`, pageWidth - 25, yPos + 5, { align: 'right' });
    
    // Terms and Conditions
    yPos += 25;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('TERMS & CONDITIONS:', 20, yPos);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    yPos += 10;
    
    const terms = [
      '• Payment must be completed before the experience date',
      '• Cancellation policy applies as per booking terms',
      '• Valid passport required for all international travelers',
      '• Weather conditions may affect outdoor activities'
    ];
    
    terms.forEach(term => {
      pdf.text(term, 20, yPos);
      yPos += 8;
    });
    
    // Footer
    pdf.setFillColor(18, 104, 148);
    pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Thank you for choosing Take Me To Nepal!', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Generate and download the PDF
    const fileName = `Invoice_${data.bookingId}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    console.log('PDF invoice generated successfully:', fileName);
    
  } catch (error) {
    console.error('Error generating PDF invoice:', error);
    throw new Error('Failed to generate PDF invoice');
  }
};

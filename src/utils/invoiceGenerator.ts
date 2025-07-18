
export const generateInvoice = (bookingDetails: any) => {
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice - TakeMeToNepal.com</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .invoice-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 3px solid #ff7d33; padding-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #ff7d33; }
        .company-info { text-align: right; color: #666; }
        .invoice-title { text-align: center; font-size: 36px; color: #333; margin: 30px 0; }
        .booking-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .detail-item { padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .total-section { background: #ff7d33; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
        .thank-you { text-align: center; margin: 30px 0; padding: 20px; background: #e8f5e8; border-radius: 8px; }
        .footer { text-align: center; margin-top: 40px; color: #666; font-size: 14px; }
        @media print { body { background: white; } .invoice-container { box-shadow: none; } }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div>
            <div class="logo">TAKEMETONEPAL.COM</div>
            <div style="color: #666; margin-top: 5px;">Your Gateway to Nepal</div>
          </div>
          <div class="company-info">
            <div><strong>TakeMeToNepal Pvt. Ltd.</strong></div>
            <div>Thamel, Kathmandu, Nepal</div>
            <div>Phone: +977-1-4425843</div>
            <div>Email: info@takemetonepal.com</div>
            <div>Website: www.takemetonepal.com</div>
          </div>
        </div>

        <div class="invoice-title">BOOKING CONFIRMATION</div>

        <div class="booking-info">
          <h3 style="margin-top: 0; color: #ff7d33;">Booking Details</h3>
          <div class="details-grid">
            <div>
              <div class="detail-item">
                <div class="detail-label">Booking Code:</div>
                <div class="detail-value">${bookingDetails.bookingCode}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Tour Package:</div>
                <div class="detail-value">${bookingDetails.title}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Guide:</div>
                <div class="detail-value">${bookingDetails.guide}</div>
              </div>
            </div>
            <div>
              <div class="detail-item">
                <div class="detail-label">Departure Date:</div>
                <div class="detail-value">${bookingDetails.departureDay}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Guests:</div>
                <div class="detail-value">${bookingDetails.guests}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Booking Date:</div>
                <div class="detail-value">${bookingDetails.bookingDay}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="total-section">
          <h2 style="margin: 0;">Total Amount Paid</h2>
          <div style="font-size: 32px; font-weight: bold;">${bookingDetails.total}</div>
          <div>Payment Method: ${bookingDetails.paymentMethod}</div>
        </div>

        <div class="thank-you">
          <h3 style="color: #28a745; margin-top: 0;">Thank You for Choosing TakeMeToNepal!</h3>
          <p>We are excited to be part of your Nepal adventure. Our team will contact you 48 hours before your departure with detailed instructions and final preparations.</p>
          <p><strong>Have questions?</strong> Contact us anytime at info@takemetonepal.com or +977-1-4425843</p>
        </div>

        <div class="footer">
          <p>This is a computer-generated invoice and does not require a signature.</p>
          <p>© 2025 TakeMeToNepal Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create and download the invoice
  const blob = new Blob([invoiceHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Invoice_${bookingDetails.bookingCode}_TakeMeToNepal.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactMap = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      {/* Google Map Embed */}
      <div className="h-64 md:h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14129.334577868636!2d85.31398695!3d27.7172453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Take Me To Nepal Office Location"
        />
      </div>
      
      {/* Contact Information */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Take Me To Nepal</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-nepal-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Office Address</h4>
              <p className="text-gray-600">
                Thamel, Kathmandu 44600<br />
                Bagmati Province, Nepal
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-nepal-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Phone Numbers</h4>
              <a 
                href="tel:+9779841234567" 
                className="text-nepal-primary hover:underline block"
              >
                +977 984-123-4567
              </a>
              <a 
                href="tel:+97714123456" 
                className="text-nepal-primary hover:underline block"
              >
                +977 1-412-3456
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-nepal-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Email Address</h4>
              <a 
                href="mailto:info@takemetonepal.com" 
                className="text-nepal-primary hover:underline"
              >
                info@takemetonepal.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-nepal-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Office Hours</h4>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;

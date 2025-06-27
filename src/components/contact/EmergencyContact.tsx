
import React from 'react';
import { Button } from '../ui/button';
import { Phone, AlertTriangle, Clock, MapPin } from 'lucide-react';

const EmergencyContact = () => {
  const handleEmergencyCall = () => {
    window.open('tel:+9779841234567', '_self');
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg p-8 text-white">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-8 h-8 text-yellow-300 mr-3" />
        <h3 className="text-2xl font-bold">Emergency Support</h3>
      </div>
      
      <p className="text-red-100 mb-6 text-lg">
        Need urgent assistance while traveling in Nepal? Our 24/7 emergency support team is here to help.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-300">Emergency Hotline</h4>
            <p className="text-red-100">+977 984-123-4567</p>
            <p className="text-sm text-red-200">Available 24/7</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-300">Emergency Services</h4>
            <p className="text-red-100">Police: 100</p>
            <p className="text-red-100">Medical: 102</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-red-500 pt-6">
        <h4 className="font-semibold text-yellow-300 mb-3">We Can Help With:</h4>
        <ul className="text-red-100 space-y-1 mb-6">
          <li>• Medical emergencies and evacuation</li>
          <li>• Lost passport or travel documents</li>
          <li>• Travel disruptions or weather delays</li>
          <li>• Communication with family/embassy</li>
          <li>• Emergency accommodation</li>
          <li>• Trekking emergencies and rescue coordination</li>
        </ul>
        
        <Button 
          onClick={handleEmergencyCall}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 text-lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Emergency Support Now
        </Button>
      </div>
    </div>
  );
};

export default EmergencyContact;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CreditCard, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

const PaymentSection = () => {
  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiryDate: '08/25',
      isDefault: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">
                    {method.type} ending in {method.last4}
                  </div>
                  <div className="text-sm text-gray-500">
                    Expires {method.expiryDate}
                    {method.isDefault && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-3 h-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <Card className="p-8 text-center">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
          <p className="text-gray-500 mb-4">Add a payment method to book experiences</p>
          <Button>Add Payment Method</Button>
        </Card>
      )}
    </div>
  );
};

export { PaymentSection };

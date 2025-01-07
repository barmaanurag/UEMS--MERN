import React, { useState } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { PaymentDetails } from '../types';

interface PaymentFormProps {
  examName: string;
  amount: number;
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentForm({ examName, amount, onBack, onComplete }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentDetails>({
    amount,
    examName,
    studentName: '',
    studentId: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    console.log('Processing payment:', formData);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-lg font-medium">Amount to Pay: ₹{amount}</p>
        <p className="text-gray-600">For: {examName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Name
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md"
            value={formData.studentName}
            onChange={e => setFormData({...formData, studentName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md"
            value={formData.studentId}
            onChange={e => setFormData({...formData, studentId: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded-md"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700"
          >
            <CreditCard className="w-5 h-5" />
            <span>Pay Now</span>
          </button>
        </div>
      </form>
    </div>
  );
}
export default PaymentForm;
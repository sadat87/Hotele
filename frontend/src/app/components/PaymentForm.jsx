'use client';

import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';

const PaymentForm = () => {
  const { setPaymentMethod, setPaymentDetails, currency } = useBookingStore();
  const [paymentType, setPaymentType] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData({ ...cardData, [name]: formattedValue });
    setPaymentDetails({ ...cardData, [name]: formattedValue });
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    setPaymentMethod(type);
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handlePaymentTypeChange('card')}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentType === 'card'
                ? 'border-[#E63946] bg-[#E63946]/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#E63946]" />
            <span className="text-sm font-medium">Credit Card</span>
          </button>
          <button
            onClick={() => handlePaymentTypeChange('paypal')}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentType === 'paypal'
                ? 'border-[#E63946] bg-[#E63946]/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="#0070BA">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.174 1.305 1.06 2.962.93 3.84l-.01.07v.07c-.076.76-.24 1.797-.93 2.688-.69.892-1.735 1.305-3.088 1.305h-2.153c-.524 0-.968.382-1.05.9l-1.12 7.106c-.076.46-.43.76-.84.76zm-1.46-13.99c.07-.58.43-.96.93-.96h3.98c1.17 0 2.23.32 3.08.95.85.64 1.48 1.56 1.81 2.74.17.59.25 1.22.25 1.87 0 .21-.01.42-.02.63-.09.76-.5 1.38-1.2 1.38h-2.14c-.26 0-.5.19-.55.45l-.77 4.9h-2.7l.4-2.57c.05-.3-.18-.58-.48-.58h-2.33c-.3 0-.54.28-.48.58l.77 4.9H4.58l1.04-6.58zm5.77 7.15h1.61c.24 0 .44.18.49.42l.77 4.92c.05.3-.18.58-.48.58h-1.61c-.24 0-.44-.18-.49-.42l-.77-4.92c-.05-.3.18-.58.48-.58z"/>
            </svg>
            <span className="text-sm font-medium">PayPal</span>
          </button>
        </div>
      </div>

      {/* Card Form */}
      {paymentType === 'card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="number"
                value={cardData.number}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                maxLength={19}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
            <input
              type="text"
              name="name"
              value={cardData.name}
              onChange={handleCardChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                placeholder="123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                maxLength={3}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* PayPal Form */}
      {paymentType === 'paypal' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
        >
          <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
          <button className="px-8 py-3 bg-[#0070BA] text-white font-semibold rounded-lg hover:bg-[#005EA6] transition-colors">
            Continue with PayPal
          </button>
        </motion.div>
      )}

      {/* Security Notice */}
      <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
        <Lock className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  );
};

export default PaymentForm;

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, User, CreditCard, FileText } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import PaymentForm from './PaymentForm';

const steps = [
  { id: 1, name: 'Guest Details', icon: User },
  { id: 2, name: 'Room Selection', icon: FileText },
  { id: 3, name: 'Payment', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: Check },
];

const BookingWorkflow = ({ room }) => {
  const {
    currentStep,
    guestDetails,
    setGuestDetails,
    setCurrentStep,
    setSelectedRoom,
    resetBooking,
  } = useBookingStore();

  const [formData, setFormData] = useState({
    firstName: guestDetails.firstName || '',
    lastName: guestDetails.lastName || '',
    email: guestDetails.email || '',
    phone: guestDetails.phone || '',
    specialRequests: guestDetails.specialRequests || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setGuestDetails({ [name]: value });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate guest details
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert('Please fill in all required fields');
        return;
      }
    }
    if (currentStep === 2 && room) {
      setSelectedRoom(room);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    resetBooking();
    // Redirect to confirmation or home
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted || isActive ? '#E63946' : '#E5E7EB',
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                >
                  <IconComponent className={`w-6 h-6 ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`} />
                </motion.div>
                <span className={`text-sm font-medium ${isActive ? 'text-[#E63946]' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-[#E63946]' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                placeholder="Any special requests or preferences..."
              />
            </div>
          </motion.div>
        )}

        {currentStep === 2 && room && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Room Selection</h2>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex gap-6">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.location}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{room.beds} {room.beds === 1 ? 'Bed' : 'Beds'}</span>
                    <span>•</span>
                    <span>{room.capacity} Guests</span>
                  </div>
                  <p className="text-2xl font-bold text-[#E63946]">${room.price} / night</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Payment Information</h2>
            <PaymentForm />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-8">
              Your reservation has been confirmed. A confirmation email has been sent to {formData.email}
            </p>
            <button
              onClick={handleComplete}
              className="px-8 py-3 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-[#d32f3d] transition-colors"
            >
              Return to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-[#d32f3d] transition-colors"
          >
            {currentStep === 3 ? 'Complete Booking' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingWorkflow;

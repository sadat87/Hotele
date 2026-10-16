import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  // Search filters
  checkIn: null,
  checkOut: null,
  guests: { adults: 2, children: 0 },
  location: '',
  currency: 'USD',
  language: 'en',
  
  // Selected room
  selectedRoom: null,
  
  // Booking steps
  currentStep: 1, // 1: Search, 2: Room Selection, 3: Guest Details, 4: Payment, 5: Confirmation
  
  // Guest details
  guestDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  },
  
  // Payment
  paymentMethod: null,
  paymentDetails: {},
  
  // Actions
  setSearchParams: (params) => set((state) => ({ ...state, ...params })),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setGuestDetails: (details) => set((state) => ({ 
    guestDetails: { ...state.guestDetails, ...details } 
  })),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setPaymentDetails: (details) => set({ paymentDetails: details }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setCurrency: (currency) => set({ currency }),
  setLanguage: (language) => set({ language }),
  resetBooking: () => set({
    checkIn: null,
    checkOut: null,
    guests: { adults: 2, children: 0 },
    location: '',
    selectedRoom: null,
    currentStep: 1,
    guestDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
    paymentMethod: null,
    paymentDetails: {},
  }),
}));

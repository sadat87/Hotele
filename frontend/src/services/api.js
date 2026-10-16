import apiClient from '@/lib/apiClient';

export const authApi = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (data) => apiClient.post('/auth/register', data),
  logout: (refreshToken) => apiClient.post('/auth/logout', { refreshToken }),
  getCurrentUser: () => apiClient.get('/auth/me'),
  refreshToken: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }),
};

export const hotelsApi = {
  getAll: (params) => apiClient.get('/hotels', { params }),
  getById: (id) => apiClient.get(`/hotels/${id}`),
  create: (data) => apiClient.post('/hotels', data),
  update: (id, data) => apiClient.patch(`/hotels/${id}`, data),
  getAnalytics: (id, params) => apiClient.get(`/hotels/${id}/analytics`, { params }),
  getOccupancyTrends: (id, params) => apiClient.get(`/hotels/${id}/occupancy-trends`, { params }),
};

export const roomsApi = {
  getByHotel: (hotelId, params) => apiClient.get(`/hotels/rooms/${hotelId}`, { params }),
  getById: (id) => apiClient.get(`/hotels/rooms/${id}/detail`),
  create: (data) => apiClient.post('/hotels/rooms', data),
  update: (id, data) => apiClient.patch(`/hotels/rooms/${id}`, data),
  delete: (id) => apiClient.delete(`/hotels/rooms/${id}`),
  getCalendar: (id, year, month) => apiClient.get(`/hotels/rooms/${id}/calendar`, { params: { year, month } }),
};

export const roomTypesApi = {
  getByHotel: (hotelId) => apiClient.get(`/hotels/types/${hotelId}`),
  create: (data) => apiClient.post('/hotels/types', data),
  update: (id, data) => apiClient.patch(`/hotels/types/${id}`, data),
};

export const bookingsApi = {
  checkAvailability: (roomId, checkInDate, checkOutDate) =>
    apiClient.get('/bookings/availability/check', {
      params: { roomId, checkInDate, checkOutDate },
    }),
  getAvailableRooms: (hotelId, checkInDate, checkOutDate, guests) =>
    apiClient.get('/bookings/available-rooms', {
      params: { hotelId, checkInDate, checkOutDate, guests },
    }),
  create: (data) => apiClient.post('/bookings', data),
  getMyBookings: (params) => apiClient.get('/bookings/my-bookings', { params }),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  update: (id, data) => apiClient.patch(`/bookings/${id}`, data),
  cancel: (id, reason) => apiClient.post(`/bookings/${id}/cancel`, { reason }),
};

export const paymentsApi = {
  createIntent: (bookingId, paymentMethod) =>
    apiClient.post('/payments/intent', { bookingId, paymentMethod }),
  confirm: (paymentId) => apiClient.post('/payments/confirm', { paymentId }),
  getMyPayments: () => apiClient.get('/payments'),
  getById: (id) => apiClient.get(`/payments/${id}`),
  refund: (id, amount, reason) => apiClient.post(`/payments/${id}/refund`, { amount, reason }),
  getReceipt: (id) => apiClient.get(`/payments/${id}/receipt`),
};

export const usersApi = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.patch('/users/profile', data),
  changePassword: (currentPassword, newPassword) =>
    apiClient.post('/users/change-password', { currentPassword, newPassword }),
  getAllUsers: (params) => apiClient.get('/users', { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  update: (id, data) => apiClient.patch(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
};

export const offersApi = {
  getAll: (params) => apiClient.get('/offers', { params }),
  getByCode: (code) => apiClient.get(`/offers/${code}`),
  create: (data) => apiClient.post('/offers', data),
  update: (id, data) => apiClient.patch(`/offers/${id}`, data),
  delete: (id) => apiClient.delete(`/offers/${id}`),
};

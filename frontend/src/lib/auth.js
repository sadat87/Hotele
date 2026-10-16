// Token management
export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken, refreshToken) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// User management
export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
};

// Auth API calls
export const loginUser = async (email, password) => {
  const { default: apiClient } = await import('./apiClient');
  const response = await apiClient.post('/auth/login', { email, password });
  const { user, accessToken, refreshToken } = response.data.data;
  setTokens(accessToken, refreshToken);
  setUser(user);
  return { user, accessToken, refreshToken };
};

export const registerUser = async (firstName, lastName, email, password, phone) => {
  const { default: apiClient } = await import('./apiClient');
  const response = await apiClient.post('/auth/register', {
    firstName,
    lastName,
    email,
    password,
    phone,
  });
  return response.data.data.user;
};

export const refreshAccessToken = async (refreshToken) => {
  const { default: apiClient } = await import('./apiClient');
  const response = await apiClient.post('/auth/refresh', { refreshToken });
  const { accessToken, user } = response.data.data;
  setTokens(accessToken, refreshToken);
  setUser(user);
  return { accessToken, user };
};

export const logoutUser = async () => {
  const { default: apiClient } = await import('./apiClient');
  const refreshToken = getRefreshToken();
  try {
    await apiClient.post('/auth/logout', { refreshToken });
  } catch (error) {
    console.error('Logout error:', error);
  }
  clearTokens();
};

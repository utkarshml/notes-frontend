// API Configuration
// Update this URL to match your backend server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Authentication endpoints
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
  RESEND_OTP: `${API_BASE_URL}/api/auth/resend-otp`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY_LOGIN_OTP: `${API_BASE_URL}/api/auth/verify-login-otp`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  USER_INFO : `${API_BASE_URL}/api/auth/me`,
  LOGOUT : `${API_BASE_URL}/api/auth/logout`,
  // Notes endpoints
  NOTES: `${API_BASE_URL}/api/notes`,
  CREATE_NOTE: `${API_BASE_URL}/api/notes/create`,
  PIN_NOTE: (id: string) => `${API_BASE_URL}/api/notes/${id}`,
  DELETE_NOTE: (id: string) => `${API_BASE_URL}/api/notes/${id}`,
} as const;

export { API_BASE_URL };
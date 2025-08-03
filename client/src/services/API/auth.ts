import { API } from "../config";

interface LoginCredentials {
  email: string;
  password: string;
}
interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

const login = async (credentials: LoginCredentials) => {
  const response = await API.post("/api/v1/auth/login", credentials);
  return response.data;
};

const register = async (credentials: RegisterCredentials) => {
  const response = await API.post("/api/v1/auth/register", credentials);
  return response.data.user;
};

const logout = async () => {
  const response = await API.post("/api/v1/auth/logout");
  return response;
};

const verifyEmail = async (verificationToken: string, email: string) => {
  const response = await API.post("/api/v1/auth/verify-email", {
    verificationToken,
    email,
  });
  return response.data;
};
const forgotPassword = async (email: string) => {
  const response = await API.post("/api/v1/auth/forgot-password", {
    email,
  });
  return response.data;
};

const resetPassword = async ({
  token,
  email,
  password,
}: {
  token: string;
  email: string;
  password: string;
}) => {
  const response = await API.post("/api/v1/auth/reset-password", {
    token,
    email,
    password,
  });
  return response.data;
};

export const authAPI = {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

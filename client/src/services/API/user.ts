import { API } from "../config";

const getCurrentUser = async () => {
  const response = await API.get("/api/v1/users/profile");
  return response.data.user;
};

const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await API.patch("/api/v1/users/changePassword", payload);
  return response.data.user;
};

export const userAPI = {
  getCurrentUser,
  changePassword,
};

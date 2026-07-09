import api from "@/api/axios";
import type {
  LoginDto,
  RegisterDto,
  LoginResponse,
  User,
} from "@/types/auth.types";

export const login = async (
  data: LoginDto
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const register = async (
  data: RegisterDto
) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/auth/profile");

  return response.data;
};
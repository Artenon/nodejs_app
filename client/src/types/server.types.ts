import { AuthStatus } from "../const";

export type DefaultResponse = {
  message: string,
  errors?: [],
};

export type LoginResponse = {
  message: string,
  token: string,
  userId: string,
  username: string,
};

export type AuthResponse = {
  message: AuthStatus,
};

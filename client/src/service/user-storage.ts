import { UserStorage } from "../types/auth.types";

const KEY_NAME = 'user-data';

export const getUser = (): UserStorage | null => {
  const userData = localStorage.getItem(KEY_NAME);
  return userData ? JSON.parse(userData) : null;
};

export const saveUser = (data: UserStorage): void => {
  localStorage.setItem(KEY_NAME, JSON.stringify(data));
};

export const removeUser = (): void => {
  localStorage.removeItem(KEY_NAME);
};

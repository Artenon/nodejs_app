import { ToastOptions } from 'react-toastify';

export enum NameSpace {
  AUTH = 'AUTH'
}

export enum APIRoute {
  Register = '/auth/register',
  Login = '/auth/login',
  Logout = '/auth/logout',
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register'
}

export const toastifyOptions: ToastOptions = {
  theme: 'dark',
  position: 'top-right',
  autoClose: 2500,
  toastId: 1,
};

export enum AuthStatus {
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized'
};

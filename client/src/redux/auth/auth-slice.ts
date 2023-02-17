import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { NameSpace, toastifyOptions, AuthStatus } from "../../const";
import { registerAction, loginAction, logoutAction, getAuthStatus } from "./api-actions";
import { saveUser, removeUser } from "../../service/user-storage";

const initialState: {
  isLoading: boolean;
  authStatus: AuthStatus
} = {
  isLoading: false,
  authStatus: AuthStatus.Unauthorized
};

export const authSlice = createSlice({
  name: NameSpace.AUTH,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message, toastifyOptions);
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authStatus = AuthStatus.Authorized;
        toast.success(action.payload.message, toastifyOptions);
        Reflect.deleteProperty(action.payload, 'message');
        saveUser(action.payload);
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Unauthorized;
        toast.warn(action.payload.message, toastifyOptions);
        removeUser();
      })
      .addCase(getAuthStatus.fulfilled, (state, action) => {
        state.authStatus = action.payload.message;
      });
  }
});

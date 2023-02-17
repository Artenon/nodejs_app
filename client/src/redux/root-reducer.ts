import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { NameSpace } from "../const";

export const rootReducer = combineReducers({
  [NameSpace.AUTH]: authSlice.reducer
});

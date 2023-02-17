import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState) => state.AUTH.authStatus;

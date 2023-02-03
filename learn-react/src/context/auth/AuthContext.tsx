import React, { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<IAuthContext>({
  authenticated: false,
  setAuthenticated: () => false
});

import React from "react";
import { useInterval } from "../../hooks/useInterval";
import usePrevious from "../../hooks/usePrevious";
import TokenObject from "../../libs/TokenObject";
import { AuthProviderProps } from "../../types";
import { authReducer, doRefresh } from "../../utils/reducers";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<AuthProviderProps> = ({
  defaultAuthenticated = false,
  onLogin,
  onLogout,
  authType,
  authName,
  cookieDomain,
  cookieSecure,
  refresh,
  children,
}) => {
  if (authType === "cookie") {
    if (!cookieDomain) {
      throw new Error(
        "authType 'cookie' " +
          "requires 'cookieDomain' and 'cookieSecure' " +
          "props in AuthProvider"
      );
    }
  }

  const refreshTokenName = refresh ? `${authName}_refresh` : null;

  const tokenObject = new TokenObject(
    authName,
    authType,
    refreshTokenName,
    cookieDomain,
    cookieSecure
  );

  const [authState, setAuthState] = React.useReducer(authReducer, {
    ...tokenObject.initialToken(),
    authenticated: defaultAuthenticated,
  });

  const previousAuthenticated = usePrevious(authState.authenticated);

  if (refresh) {
    useInterval(
      () => {
        refresh
          .refreshApiCallback({
            authToken: authState.auth?.token,
            authTokenExpireAt: authState.auth?.expiresAt,
            authUserState: authState.userState,
            refreshToken: authState.refresh?.token,
            refreshTokenExpiresAt: authState.refresh?.expiresAt,
          })
          .then((result) => {
            // IF the API call is successful then refresh the AUTH state
            if (result.isSuccess) {
              // store the new value using the state update
              setAuthState(doRefresh(result));
            }
          });
      },
    authState.isSignIn ? refresh.interval : null,
  );
  }

  React.useEffect(() => {
    if (!previousAuthenticated && authState.authenticated) {
      onLogin && onLogin();
    }
  }, [previousAuthenticated, authState.authenticated, onLogin]);

  React.useEffect(() => {
    if (previousAuthenticated && !authState.authenticated) {
      onLogout && onLogout();
    }
  }, [previousAuthenticated, authState.authenticated, onLogout]);

  React.useEffect(() => {
    tokenObject.syncTokens(authState);
  }, [authState]);
  
  const contextValue = React.useMemo(
    () => ({
      authState,
      setAuthState,
    }),
    [authState.authenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { refreshAccessToken } from "../services/axiosClient";
import { saveToken, removeToken } from "../utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        await refreshAccessToken(); // uses the cookie, saves a new access token
        setUser(await authService.getMe());
      } catch {
        removeToken(); // no valid session: stay logged out
      } finally {
        setLoading(false);
      }
    }
    restoreSession();

    const onForcedLogout = () => setUser(null);
    window.addEventListener("auth:logout", onForcedLogout);
    return () => window.removeEventListener("auth:logout", onForcedLogout);
  }, []);

  async function login(credentials) {
    const { accessToken, user } = await authService.login(credentials);
    saveToken(accessToken);
    setUser(user);
  }

  async function logout() {
    try {
      await authService.logout();
    } finally {
      removeToken();
      setUser(null);
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin,
    role: user ? (user.isAdmin ? "admin" : "user") : null,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
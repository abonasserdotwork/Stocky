import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { getToken, saveToken, removeToken } from "../utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs once when the app starts: if a token is saved, ask the server who we are
  useEffect(() => {
    async function restoreSession() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const me = await authService.getMe();
        setUser(me);
      } catch {
        removeToken(); // the saved token is no good
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(credentials) {
    const { token, user } = await authService.login(credentials);
    saveToken(token);
    setUser(user);
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  const value = {
    user,
    role: user?.role,
    isAuthenticated: !!user,
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
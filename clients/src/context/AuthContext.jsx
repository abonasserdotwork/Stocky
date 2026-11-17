import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authService from "../services/authService";
import { saveToken, removeToken } from "../utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restoreError, setRestoreError] = useState("");

  const restoreSession = useCallback(async () => {
    try {
      setUser(await authService.getMe());
    } catch (error) {
      if (error.response?.status === 401) {
        removeToken();
        setUser(null);
      } else {
        setRestoreError(
          "Couldn't verify your session. Check your connection and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const retrySession = useCallback(() => {
    setLoading(true);
    setRestoreError("");
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    void Promise.resolve().then(restoreSession);
    const onForcedLogout = () => {
      setUser(null);
      setRestoreError("");
    };
    window.addEventListener("auth:logout", onForcedLogout);
    return () => window.removeEventListener("auth:logout", onForcedLogout);
  }, [restoreSession]);

  async function login(credentials) {
    const { accessToken, user } = await authService.login(credentials);
    saveToken(accessToken);
    setUser(user);
    setRestoreError("");
  }

  async function logout() {
    try {
      await authService.logout();
    } finally {
      removeToken();
      setUser(null);
      setRestoreError("");
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin,
    role: user ? (user.isAdmin ? "admin" : "user") : null,
    loading,
    restoreError,
    login,
    logout,
    retrySession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
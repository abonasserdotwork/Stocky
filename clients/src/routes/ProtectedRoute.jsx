import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// <ProtectedRoute />            -> any logged-in user
// <ProtectedRoute adminOnly />  -> admins only (covers AdminRoute from the architecture file)
export default function ProtectedRoute({ adminOnly = false }) {
  const {
    isAuthenticated,
    isAdmin,
    loading,
    restoreError,
    retrySession,
  } = useAuth();
  const location = useLocation();

  if (loading) return <p className="p-6 text-sm text-muted">Loading...</p>;
  if (restoreError) {
    return (
      <main className="p-6" role="alert">
        <p className="mb-4 text-sm text-muted">{restoreError}</p>
        <button
          type="button"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
          onClick={retrySession}
        >
          Try again
        </button>
      </main>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/use-auth.ts";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/admin" replace />;

  return <Outlet />;
};

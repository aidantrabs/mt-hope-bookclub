import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/use-auth.ts";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

export const Login = () => {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) return <LoadingSpinner />;

  if (user) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("email is required.");
      return;
    }
    if (!password) {
      setError("password is required.");
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="font-serif text-2xl font-bold text-brown mb-6 text-center">admin login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">
            email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-sand bg-white text-brown focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-brown mb-1">
            password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-sand bg-white text-brown focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-terracotta text-white py-2.5 rounded-lg font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "signing in..." : "sign in"}
        </button>
      </form>
    </div>
  );
};

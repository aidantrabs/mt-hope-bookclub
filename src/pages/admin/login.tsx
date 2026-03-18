import { useState, useEffect, type FormEvent } from "react";
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

  useEffect(() => {
    if (!authLoading && user) navigate("/admin/dashboard", { replace: true });
  }, [authLoading, user, navigate]);

  if (authLoading || user) return <LoadingSpinner />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) { setError("email is required."); return; }
    if (!password) { setError("password is required."); return; }

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
    <div className="max-w-sm mx-auto px-5 py-24">
      <h1 className="text-2xl font-bold text-text-primary mb-8 text-center">admin login</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">{error}</div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-text-secondary mb-2">email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="you@example.com" autoComplete="email" />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs uppercase tracking-widest font-medium text-text-secondary mb-2">password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="••••••••" autoComplete="current-password" />
        </div>

        <button type="submit" disabled={submitting}
          className="w-full bg-accent text-white py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? "signing in..." : "sign in"}
        </button>
      </form>
    </div>
  );
};

import { FormEvent, useState } from 'react';
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Alert } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

const HARDCODED_EMAIL = 'ramesh.sahay@somany.in';
const HARDCODED_PASSWORD = 'Password@123';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/', { replace: true });
      return;
    }

    setError('Invalid email or password');
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_#DBEAFE,_#EFF6FF_30%,_#FFFFFF_60%)] px-4 py-10 md:p-6">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#BFDBFE] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[#93C5FD] opacity-20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-md items-center justify-center">
        <Card className="w-full border-[#DBEAFE] bg-white/95 shadow-2xl backdrop-blur">
          <div className="p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg shadow-blue-600/30">
                <ShieldCheck className="h-8 w-8" aria-hidden="true" />
              </div>
              <h1 className="mb-1 text-[24px] font-semibold text-[#111827]">Lead Discovery Dashboard</h1>
              <p className="text-sm text-[#6B7280]">Sign in to access your account</p>
            </div>

            {error && (
              <Alert className="mb-5 border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#374151]">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@somany.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 border-[#D1D5DB] bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#374151]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 border-[#D1D5DB] bg-white"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-[#2563EB] font-medium text-white shadow-lg shadow-blue-600/25 hover:bg-[#1D4ED8]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-7 border-t border-[#E5E7EB] pt-5">
              <p className="text-center text-xs text-[#6B7280]">Authorized access only. All activities are monitored.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

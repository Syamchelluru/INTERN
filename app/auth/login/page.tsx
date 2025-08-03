'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers';
import Image from 'next/image';
import { Mail, User } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTime, setResendTime] = useState(30);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && resendTime > 0) {
      timer = setTimeout(() => setResendTime((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTime, step]);

  const handleSendOTP = async () => {
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      toast.success('OTP sent to your email');
      setStep('otp');
      setResendTime(30);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'OTP verification failed');
      }

      login({ name, email, role: 'user' });
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="NighaTech Logo"
                width={72}
                height={72}
                className="rounded-full bg-white p-1 shadow-md"
              />
            </div>
            <CardTitle className="text-2xl mt-3 text-white font-semibold">
              NighaTech Login
            </CardTitle>
            <CardDescription className="text-white/70 text-sm">
              {step === 'details'
                ? 'Enter your details to receive OTP'
                : 'Enter the OTP sent to your email'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6 pt-0">
            {step === 'details' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white text-sm">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-300" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 py-2 text-sm h-9 rounded-full bg-white/70 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-300" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 py-2 text-sm h-9 rounded-full bg-white/70 focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full h-9 text-sm rounded-full"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-white text-sm">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-base tracking-widest py-2 h-9 rounded-full bg-white/70 focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className="w-full h-9 text-sm rounded-full"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setStep('details')}
                  className="w-full h-9 text-sm rounded-full border-white"
                >
                  Back to Details
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleSendOTP}
                  disabled={resendTime > 0 || isLoading}
                  className="w-full text-sm text-white/80 hover:underline"
                >
                  {resendTime > 0 ? `Resend OTP in ${resendTime}s` : 'Resend OTP'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

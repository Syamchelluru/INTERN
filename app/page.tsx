'use client';

import { useAuth } from '@/components/providers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { MapPin, Shield, Smartphone } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Animated blurred background bubbles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-indigo-500 opacity-20 rounded-full filter blur-3xl animate-ping" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="NighaTech Logo"
              width={64}
              height={64}
              className="rounded-full bg-white p-1 shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-sm">Nigha GPS Tracking</h1>
          <p className="text-lg mt-2 max-w-2xl mx-auto text-white/80">
            Real-time GPS tracking and intelligent device monitoring powered by NighaTech Global Pvt. Ltd.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-xl hover:scale-[1.02] transition-transform">
            <CardHeader className="text-center">
              <MapPin className="h-10 w-10 text-blue-300 mx-auto mb-2" />
              <CardTitle className="text-xl">Live GPS Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80 text-sm">
                Monitor all devices in real-time with location history, route playback, and smart geofencing.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-xl hover:scale-[1.02] transition-transform">
            <CardHeader className="text-center">
              <Shield className="h-10 w-10 text-green-300 mx-auto mb-2" />
              <CardTitle className="text-xl">Secure Login</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80 text-sm">
                OTP-based authentication ensures only verified users access the system securely.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-xl hover:scale-[1.02] transition-transform">
            <CardHeader className="text-center">
              <Smartphone className="h-10 w-10 text-purple-300 mx-auto mb-2" />
              <CardTitle className="text-xl">Smart Device Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80 text-sm">
                Easily register and manage GPS devices using QR codes or 16-digit unique codes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

{/* Buttons */}
<div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
  <Button
    size="lg"
    onClick={() => router.push('/auth/login')}
    className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-blue-500 hover:text-white transition-all px-8 py-5 rounded-xl w-full sm:w-auto"
  >
    User Login
  </Button>
  <Button
    size="lg"
    onClick={() => router.push('/auth/admin')}
    className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-purple-500 hover:text-white transition-all px-8 py-5 rounded-xl w-full sm:w-auto"
  >
    Admin Login
  </Button>
</div>


      </div>
    </div>
  );
}

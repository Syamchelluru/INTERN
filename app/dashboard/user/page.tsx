'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers';
import { MapPin, Smartphone, Activity, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map/map-component'), {
  ssr: false,
});

interface Device {
  id: string;
  name: string;
  isOnline: boolean;
  lastSeen: string;
  location: { lat: number; lng: number };
  assignedTo?: string;
}

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const mockDevices: Device[] = [
      {
        id: '1',
        name: 'Device Alpha',
        isOnline: true,
        lastSeen: new Date().toISOString(),
        location: { lat: 17.6868, lng: 83.2185 },
        assignedTo: user?.email,
      },
      {
        id: '2',
        name: 'Device Beta',
        isOnline: false,
        lastSeen: new Date(Date.now() - 300000).toISOString(),
        location: { lat: 16.5062, lng: 80.648 },
        assignedTo: user?.email,
      },
    ];
    setDevices(mockDevices);
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Welcome, {user?.name}
          </h1>

          {/* Device Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card className="bg-white shadow rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-700">Your Devices</CardTitle>
                <Smartphone className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{devices.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-700">Online Devices</CardTitle>
                <Activity className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {devices.filter((d) => d.isOnline).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Info and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Map Section */}
            <Card className="bg-white shadow rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-5 w-5" />
                  Device Locations
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Real-time locations of your devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 sm:h-96 w-full rounded-lg overflow-hidden">
                  <MapComponent devices={devices} />
                </div>
              </CardContent>
            </Card>

            {/* Device Status Section */}
            <Card className="bg-white shadow rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <Smartphone className="h-5 w-5" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white/90"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            device.isOnline ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <div>
                          <p className="font-medium text-gray-800">{device.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(device.lastSeen).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={device.isOnline ? 'default' : 'secondary'}
                        className="w-fit"
                      >
                        {device.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

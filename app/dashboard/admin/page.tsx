'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Smartphone, Activity, Eye } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    totalUsers: 0,
    activeAlerts: 0,
  });

  useEffect(() => {
    setStats({
      totalDevices: 24,
      onlineDevices: 17,
      totalUsers: 12,
      activeAlerts: 3,
    });
  }, []);

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500">System-wide stats overview</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-700">Total Devices</CardTitle>
                <Smartphone className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stats.totalDevices}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-700">Online Devices</CardTitle>
                <Activity className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stats.onlineDevices}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-700">Total Users</CardTitle>
                <Users className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-gray-700">Active Alerts</CardTitle>
                <Eye className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stats.activeAlerts}</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

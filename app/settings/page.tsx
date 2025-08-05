'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers';
import { Settings, Mail, Database, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user } = useAuth();

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.resend.com',
    smtpPort: '587',
    smtpUser: 'otp@nigha.tech',
    smtpPass: '********',
  });

  const [systemSettings, setSystemSettings] = useState({
    autoRefreshInterval: '5',
    maxDevicesPerUser: '10',
    dataRetentionDays: '30',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    deviceOfflineAlerts: true,
    loginNotifications: true,
    systemMaintenanceAlerts: true,
  });

  const handleSave = (type: string) => {
    toast.success(`${type} settings saved`);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row h-full min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">User Settings</h1>

          <div className="space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  User Profile
                </CardTitle>
                <CardDescription>Your account info</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={user?.name || ''} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={user?.email || ''} readOnly className="bg-gray-50" />
                  </div>
                </div>
                <div>
                  <Label>Role</Label>
                  <div>
                    <Badge variant="default">User</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>Configure email server</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="SMTP Host"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  />
                  <Input
                    placeholder="SMTP Port"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                  />
                  <Input
                    placeholder="SMTP Username"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                  />
                  <Input
                    placeholder="SMTP Password"
                    type="password"
                    value={emailSettings.smtpPass}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPass: e.target.value })}
                  />
                </div>
                <Button onClick={() => handleSave('Email')}>Save</Button>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>Customize system parameters</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Refresh Interval (s)</Label>
                  <Input
                    value={systemSettings.autoRefreshInterval}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, autoRefreshInterval: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Max Devices</Label>
                  <Input
                    value={systemSettings.maxDevicesPerUser}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, maxDevicesPerUser: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Data Retention (days)</Label>
                  <Input
                    value={systemSettings.dataRetentionDays}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, dataRetentionDays: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-full">
                  <Button onClick={() => handleSave('System')}>Save</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Device Offline Alerts</Label>
                    <Switch
                      checked={notificationSettings.deviceOfflineAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, deviceOfflineAlerts: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Login Notifications</Label>
                    <Switch
                      checked={notificationSettings.loginNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, loginNotifications: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Maintenance Alerts</Label>
                    <Switch
                      checked={notificationSettings.systemMaintenanceAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          systemMaintenanceAlerts: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('Notifications')}>Save</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

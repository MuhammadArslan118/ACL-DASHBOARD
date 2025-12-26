
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types';
import PermissionGuard from '../components/PermissionGuard';
import { 
  Save, 
  User, 
  Shield, 
  CheckCircle2, 
  Loader2, 
  Bell, 
  Key, 
  Monitor,
  Smartphone,
  Mail,
  Lock
} from 'lucide-react';

type SettingsTab = 'general' | 'account' | 'security' | 'notifications';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  
  // Profile State
  const [formData, setFormData] = useState({
    username: 'sarah_c',
    displayName: user?.name || 'Sarah Connor',
    email: user?.email || '',
    bio: 'Senior Security Architect at SkyNet. Passionate about AI safety and terminal-based interfaces.'
  });

  // Security State
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  
  // Notification State
  const [notifs, setNotifs] = useState({
    emailSummary: true,
    newLogins: true,
    weeklyReport: false,
    mentions: true
  });

  // UI Feedback State
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Public Profile
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Name</label>
                <input 
                  type="text" 
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
              <textarea 
                rows={3} 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white resize-none" 
              />
            </div>
          </section>
        );

      case 'account':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600" />
              Account Settings
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" 
                />
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Change Password</p>
                <div className="grid gap-4">
                  <input type="password" placeholder="Current Password" className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm" />
                  <input type="password" placeholder="New Password" className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </section>
        );

      case 'security':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              Advanced Security
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex-1 mr-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Require a verification code from your mobile device.</p>
              </div>
              <button 
                onClick={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ${
                  isTwoFactorEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isTwoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Active Sessions</p>
              <div className="space-y-2">
                {[
                  { device: 'MacBook Pro', location: 'San Francisco, US', active: true, icon: <Monitor /> },
                  { device: 'iPhone 13', location: 'San Francisco, US', active: false, icon: <Smartphone /> },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-400">{session.icon}</div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{session.device}</p>
                        <p className="text-xs text-slate-500">{session.location}</p>
                      </div>
                    </div>
                    {session.active ? (
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">Current Session</span>
                    ) : (
                      <button className="text-xs font-medium text-red-600 hover:underline">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'notifications':
        return (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm animate-in fade-in slide-in-from-right-2 duration-300">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              {[
                { label: 'Email Summaries', desc: 'Receive a daily email of your activity.', key: 'emailSummary' },
                { label: 'Security Alerts', desc: 'Get notified of new logins or security events.', key: 'newLogins' },
                { label: 'System Updates', desc: 'Stay informed about new platform features.', key: 'weeklyReport' },
                { label: 'Mentions', desc: 'Notify me when someone tags me.', key: 'mentions' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleNotif(item.key as keyof typeof notifs)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all ${
                      notifs[item.key as keyof typeof notifs] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${notifs[item.key as keyof typeof notifs] ? 'translate-x-5.5' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile and application preferences.</p>
        </div>
        
        {showSuccess && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl border border-green-100 dark:border-green-800 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Changes saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-1">
          {[
            { id: 'general', label: 'General', icon: <User className="w-4 h-4" /> },
            { id: 'account', label: 'Account', icon: <Mail className="w-4 h-4" /> },
            { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-3 space-y-6">
          {renderTabContent()}

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <PermissionGuard 
              permission={Permission.MANAGE_SETTINGS} 
              fallback={<div className="flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30 text-xs">Only admins can save system-level changes.</div>}
            >
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-xl transition-all font-semibold shadow-xl shadow-indigo-100 dark:shadow-none"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSaving ? 'Processing...' : 'Save All Changes'}
              </button>
            </PermissionGuard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

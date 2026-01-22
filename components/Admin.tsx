import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Calendar, 
  Users, 
  Activity, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Settings,
  LogOut,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Bell,
  Mail,
  Database,
  Server,
  HardDrive,
  Search,
  Grid,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  FileText,
  Image,
  Zap,
  Cpu,
  Users2,
  ServerCog,
  DatabaseBackup,
  ShieldCheck,
  Sun,
  Moon,
  MapPin,
  Clock,
  Upload,
  X,
  Save,
  Trash2,
  Edit
} from 'lucide-react';
import { authService, AdminUser } from '../services/authService';
import { eventService, Event } from '../services/eventService';
import { galleryService, GalleryImage } from '../services/galleryService';

interface AdminStat {
  id: string;
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  userRole: string;
  userAvatar: string;
  time: string;
  status: 'success' | 'error' | 'warning' | 'info';
  details?: string;
}

interface SystemAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface UserSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  loginTime: string;
  lastActivity: string;
  ipAddress: string;
  device: string;
  browser: string;
  location: string;
  active: boolean;
}

interface BackupRecord {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'in-progress';
  location: 'cloud' | 'local' | 'external';
}

interface Permission {
  id: string;
  name: string;
  description: string;
  granted: boolean;
  category: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ip: string;
  status: 'success' | 'failed';
}

interface EventFormData {
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  location: string;
  maxParticipants: string;
  imageUrl: string;
  isFeatured: boolean;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [activeSessions, setActiveSessions] = useState<UserSession[]>([]);
  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [gallerySearchTerm, setGallerySearchTerm] = useState('');
  const [gallerySelectedCategory, setGallerySelectedCategory] = useState('All');
  const [galleryCategories, setGalleryCategories] = useState<string[]>(['All']);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventData, setEventData] = useState<EventFormData>({
    title: '',
    date: '',
    time: '',
    category: 'Workshop',
    description: '',
    location: 'Remote',
    maxParticipants: '50',
    imageUrl: '',
    isFeatured: false
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const ADMIN_STATS: AdminStat[] = [
    { id: '1', label: 'Total Events', value: '247', change: '+12%', icon: Calendar, color: 'indigo', trend: 'up' },
    { id: '2', label: 'Active Users', value: '1,487', change: '+8%', icon: Users, color: 'emerald', trend: 'up' },
    { id: '3', label: 'Gallery Items', value: '2,156', change: '+23%', icon: Image, color: 'amber', trend: 'up' },
    { id: '4', label: 'Tasks Pending', value: '12', change: '-3', icon: AlertCircle, color: 'orange', trend: 'down' },
  ];

  const RECENT_ACTIVITIES: ActivityItem[] = [
    { id: '1', action: 'New event created', user: 'Sparsh Shukla', userRole: 'Research Head', userAvatar: 'SS', time: '2 minutes ago', status: 'success', details: 'Advanced LLM Workshop' },
    { id: '2', action: 'Image uploaded to gallery', user: 'Krishna', userRole: 'Admin', userAvatar: 'KK', time: '4 minutes ago', status: 'success', details: 'datathon-2024.jpg (4.2 MB)' },
    { id: '3', action: 'User registration failed', user: 'System', userRole: 'System', userAvatar: 'SYS', time: '15 minutes ago', status: 'error', details: 'Email verification timeout' },
    { id: '4', action: 'Event registration closed', user: 'Mayank', userRole: 'Events Lead', userAvatar: 'MS', time: '1 hour ago', status: 'success', details: 'Data Visualization Workshop' },
  ];

  const SYSTEM_ALERTS: SystemAlert[] = [
    { id: '1', type: 'warning', title: 'High Memory Usage', message: 'Memory usage at 85%', timestamp: '10 minutes ago', resolved: false },
    { id: '2', type: 'info', title: 'Scheduled Maintenance', message: 'System maintenance scheduled', timestamp: '2 hours ago', resolved: false },
    { id: '3', type: 'success', title: 'Backup Completed', message: 'Daily incremental backup completed', timestamp: '6 hours ago', resolved: true },
  ];

  const ACTIVE_SESSIONS: UserSession[] = [
    { id: '1', userId: 'U001', userName: 'Sparsh Shukla', userEmail: 'sparsh@datum.org', loginTime: '14:30', lastActivity: 'Just now', ipAddress: '192.168.1.45', device: 'MacBook Pro', browser: 'Chrome', location: 'Mumbai', active: true },
    { id: '2', userId: 'U002', userName: 'Krishna', userEmail: 'krishna@datum.org', loginTime: '14:15', lastActivity: '2 min ago', ipAddress: '192.168.1.102', device: 'Windows PC', browser: 'Firefox', location: 'Delhi', active: true },
    { id: '3', userId: 'U003', userName: 'Mayank', userEmail: 'mayank@datum.org', loginTime: '13:45', lastActivity: '15 min ago', ipAddress: '192.168.1.89', device: 'iPhone', browser: 'Safari', location: 'Bangalore', active: false },
  ];

  const BACKUP_RECORDS: BackupRecord[] = [
    { id: '1', name: 'full-backup-20240320', type: 'full', size: '2.4 GB', timestamp: '2024-03-20 02:00', status: 'completed', location: 'cloud' },
    { id: '2', name: 'incremental-20240319', type: 'incremental', size: '450 MB', timestamp: '2024-03-19 14:30', status: 'completed', location: 'local' },
    { id: '3', name: 'database-export', type: 'differential', size: '1.8 GB', timestamp: '2024-03-18 22:15', status: 'failed', location: 'external' },
  ];

  const AUDIT_LOGS: AuditLog[] = [
    { id: '1', timestamp: '14:30:25', user: 'admin@datum.org', action: 'LOGIN', resource: 'Auth System', details: 'Successful login from Chrome/Windows', ip: '192.168.1.102', status: 'success' },
    { id: '2', timestamp: '14:28:10', user: 'sparsh@datum.org', action: 'CREATE', resource: 'Events', details: 'Created event: Advanced ML Workshop', ip: '192.168.1.45', status: 'success' },
    { id: '3', timestamp: '14:25:42', user: 'unknown', action: 'LOGIN_ATTEMPT', resource: 'Auth System', details: 'Failed login attempt', ip: '203.0.113.99', status: 'failed' },
    { id: '4', timestamp: '14:20:15', user: 'krishna@datum.org', action: 'DELETE', resource: 'Gallery', details: 'Deleted image: old-banner.jpg', ip: '192.168.1.102', status: 'success' },
  ];

  const USER_PERMISSIONS: Permission[] = [
    { id: '1', name: 'events.create', description: 'Create new events', granted: true, category: 'Events' },
    { id: '2', name: 'events.edit', description: 'Edit existing events', granted: true, category: 'Events' },
    { id: '3', name: 'events.delete', description: 'Delete events', granted: true, category: 'Events' },
    { id: '4', name: 'gallery.upload', description: 'Upload to gallery', granted: true, category: 'Gallery' },
    { id: '5', name: 'gallery.delete', description: 'Delete gallery items', granted: true, category: 'Gallery' },
    { id: '6', name: 'users.manage', description: 'Manage users', granted: true, category: 'Users' },
    { id: '7', name: 'users.delete', description: 'Delete users', granted: false, category: 'Users' },
    { id: '8', name: 'system.settings', description: 'Modify system settings', granted: true, category: 'System' },
    { id: '9', name: 'analytics.view', description: 'View analytics', granted: true, category: 'Analytics' },
    { id: '10', name: 'backup.manage', description: 'Manage backups', granted: true, category: 'System' },
  ];

  const categories = ['Workshop', 'Project', 'Networking', 'Competition'];

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setCurrentUser(authService.getCurrentUser());
        setSystemAlerts(SYSTEM_ALERTS);
        setActiveSessions(ACTIVE_SESSIONS);
        setBackupRecords(BACKUP_RECORDS);
        setAuditLogs(AUDIT_LOGS);
        setPermissions(USER_PERMISSIONS);
        localStorage.setItem('admin_mode', 'true');
        loadGalleryImages();
        loadEvents();
      }
      setLoading(false);
    };
    
    checkAuth();
    
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    
    const inactivityTimer = setTimeout(() => {
      if (isAuthenticated) {
        handleLogout();
      }
    }, 30 * 60 * 1000);
    
    return () => clearTimeout(inactivityTimer);
  }, [isAuthenticated]);

  const loadGalleryImages = async () => {
    const imagesData = await galleryService.getAllImages();
    setGalleryImages(imagesData);
    const categoriesData = await galleryService.getCategories();
    setGalleryCategories(['All', ...categoriesData]);
  };

  const loadEvents = async () => {
    const eventsData = await eventService.getAllEvents();
    setEvents(eventsData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const user = await authService.login(loginEmail, loginPassword);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      if (rememberMe) {
        localStorage.setItem('remember_me', 'true');
      }
    } catch (error) {
      alert('Login failed: Invalid credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('admin_mode');
  };

  const handleTerminateSession = (sessionId: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const handleResolveAlert = (alertId: string) => {
    setSystemAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const handleTogglePermission = (permissionId: string) => {
    setPermissions(prev => prev.map(perm => 
      perm.id === permissionId ? { ...perm, granted: !perm.granted } : perm
    ));
  };

  const handleRunBackup = () => {
    const newBackup: BackupRecord = {
      id: Date.now().toString(),
      name: `backup-${new Date().toISOString().split('T')[0]}`,
      type: 'incremental',
      size: 'Calculating...',
      timestamp: new Date().toISOString(),
      status: 'in-progress',
      location: 'cloud'
    };
    
    setBackupRecords(prev => [newBackup, ...prev]);
    
    setTimeout(() => {
      setBackupRecords(prev => prev.map(b => 
        b.id === newBackup.id ? { ...b, status: 'completed', size: '1.2 GB' } : b
      ));
    }, 3000);
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleClearNotifications = () => {
    setNotifications(0);
  };

  const handleSystemRestart = () => {
    if (window.confirm('Restart system? All users will be logged out.')) {
      alert('System restart initiated.');
      setTimeout(() => {
        handleLogout();
      }, 60000);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await galleryService.deleteImage(id);
      loadGalleryImages();
    }
  };

  const handleUploadImage = async () => {
    if (!uploadedImage) return;
    
    const newImage: Omit<GalleryImage, 'id'> = {
      url: uploadedImage,
      title: `New Image ${new Date().toLocaleDateString()}`,
      category: 'Events',
      description: 'Uploaded via admin panel',
      uploadDate: new Date().toISOString().split('T')[0],
      tags: ['admin', 'upload'],
      uploadedBy: currentUser?.name || 'Admin'
    };
    
    await galleryService.uploadImage(newImage);
    loadGalleryImages();
    setUploadedImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredGalleryImages = galleryImages.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(gallerySearchTerm.toLowerCase()) ||
                         img.tags.some(tag => tag.toLowerCase().includes(gallerySearchTerm.toLowerCase()));
    const matchesCategory = gallerySelectedCategory === 'All' || img.category === gallerySelectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newEventData: Omit<Event, 'id'> = {
      title: eventData.title,
      date: `${eventData.date} • ${eventData.time}`,
      category: eventData.category as Event['category'],
      description: eventData.description,
      imageUrl: eventData.imageUrl || 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=800'
    };

    try {
      await eventService.createEvent(newEventData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      loadEvents();
      
      setTimeout(() => {
        setEventData({
          title: '',
          date: '',
          time: '',
          category: 'Workshop',
          description: '',
          location: 'Remote',
          maxParticipants: '50',
          imageUrl: '',
          isFeatured: false
        });
        setUploadedImage(null);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating event:', error);
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await eventService.deleteEvent(id);
      loadEvents();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-bold">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    DATUM ADMIN
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  Secure <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Admin Portal</span>
                </h1>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Admin Security</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Secure access control</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">System Monitoring</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Live metrics & alerts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg">
                      <Server className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Full Control</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Manage events, gallery, users</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {['KK', 'SS', 'MS', 'DT'].map((initial, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-black text-white ring-2 ring-white dark:ring-slate-900">
                          {initial}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">4 admins online</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Managing Datum platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Administrator Access</h2>
                  <p className="text-slate-600 dark:text-slate-400">Restricted to authorized personnel</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="admin@datum.org"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium backdrop-blur-sm"
                        required
                        autoComplete="username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="admin123"
                        className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium backdrop-blur-sm"
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        onClick={() => {
                          const input = document.querySelector('input[type="password"]') as HTMLInputElement;
                          input.type = input.type === 'password' ? 'text' : 'password';
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Remember this device</span>
                    </label>
                    
                    <button type="button" className="text-sm text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                    >
                      {isLoggingIn ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          ACCESS ADMIN PORTAL
                        </>
                      )}
                    </button>
                    
                    <div className="mt-6 text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        By continuing, you agree to our Security Policy and Terms of Service
                      </p>
                    </div>
                  </div>
                </form>
                
                <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 font-black tracking-widest uppercase">
                      Unauthorized access is prohibited
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <>
      {systemAlerts.filter(a => !a.resolved).length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/20 rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-300">
                  {systemAlerts.filter(a => !a.resolved).length} active system alert(s)
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Requires immediate attention
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors">
              View All
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ADMIN_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-500/10`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-rose-600" />
                  ) : null}
                  <span className={`text-xs font-black ${stat.trend === 'up' ? 'text-emerald-600' : stat.trend === 'down' ? 'text-rose-600' : 'text-slate-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Recent Activities</h2>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-black text-white">
                    {activity.userAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{activity.user}</p>
                      <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-full">
                        {activity.userRole}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{activity.action}</p>
                    {activity.details && (
                      <p className="text-xs text-slate-500 dark:text-slate-500 truncate">{activity.details}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 dark:text-slate-600">{activity.time}</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    activity.status === 'error' ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                    activity.status === 'warning' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    {activity.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                     activity.status === 'error' ? <XCircle className="w-4 h-4" /> :
                     activity.status === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                     <CheckCircle className="w-4 h-4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Active Sessions</h2>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-full">
                {activeSessions.filter(s => s.active).length} active
              </span>
            </div>
            
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-black text-white">
                        {session.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{session.userName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{session.userEmail}</p>
                      </div>
                    </div>
                    {session.active && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Live</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-500 dark:text-slate-500">Device</p>
                      <p className="font-medium text-slate-700 dark:text-slate-300 truncate">{session.device}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-500">Location</p>
                      <p className="font-medium text-slate-700 dark:text-slate-300 truncate">{session.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-500">Last: {session.lastActivity}</span>
                    {session.active && (
                      <button
                        onClick={() => handleTerminateSession(session.id)}
                        className="px-3 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                      >
                        Terminate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAddEvent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add New Event</h2>
          <p className="text-slate-500 dark:text-slate-400">Create and publish new events</p>
        </div>
        <button 
          onClick={() => setActiveTab('events')}
          className="px-4 py-2 text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← Back to Events
        </button>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-3xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                Event created successfully!
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                The event has been added to the calendar.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleEventSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                placeholder="e.g., Advanced ML Workshop with Industry Experts"
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                required
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                Event Description
              </label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                placeholder="Describe the event in detail..."
                rows={6}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                required
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                Date & Time
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setEventData(prev => ({ ...prev, category }))}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      eventData.category === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium appearance-none"
                >
                  <option value="Remote">Remote / Virtual</option>
                  <option value="Campus Lab A">Campus Lab A</option>
                  <option value="Campus Lab B">Campus Lab B</option>
                  <option value="Auditorium">Main Auditorium</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">Featured Event</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Highlight on homepage</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={eventData.isFeatured}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">
                Event Image
              </label>
              {uploadedImage ? (
                <div className="relative">
                  <img src={uploadedImage} alt="Preview" className="w-full h-48 object-cover rounded-2xl mb-4" />
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImage(null);
                      setEventData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-slate-400 mb-3" />
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Upload Image</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-bold">All events are reviewed before publishing</p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="px-8 py-3.5 text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    PUBLISH EVENT
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Events Management</h2>
          <p className="text-slate-500 dark:text-slate-400">View, edit, and manage all events</p>
        </div>
        <button 
          onClick={() => setActiveTab('add-event')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
        >
          Add New Event
        </button>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <img src={event.imageUrl} alt={event.title} className="w-24 h-24 object-cover rounded-2xl" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{event.title}</h3>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
                    {event.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{event.date}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500 line-clamp-2">{event.description}</p>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl transition-colors">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-4 py-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gallery Management</h2>
          <p className="text-slate-500 dark:text-slate-400">Upload and manage gallery images</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={gallerySearchTerm}
              onChange={(e) => setGallerySearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <button 
            onClick={handleUploadImage}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {galleryCategories.map((category) => (
          <button
            key={category}
            onClick={() => setGallerySelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              gallerySelectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredGalleryImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGalleryImages.map((image) => (
            <div key={image.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  onClick={() => setSelectedGalleryImage(image)}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">{image.title}</h3>
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
                    {image.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{image.uploadDate}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedGalleryImage(image)}
                    className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="px-3 py-1.5 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-bold">No images found</p>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">System Settings</h2>
          <p className="text-slate-500 dark:text-slate-400">Configure system preferences and permissions</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            General Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Toggle dark/light theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={handleToggleDarkMode}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Advanced Mode</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Show advanced options</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAdvanced}
                  onChange={(e) => setShowAdvanced(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            User Permissions
          </h3>
          
          <div className="space-y-3">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{permission.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">{permission.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permission.granted}
                    onChange={() => handleTogglePermission(permission.id)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Danger Zone
        </h3>
        
        <div className="space-y-4">
          <button
            onClick={handleRunBackup}
            className="w-full p-4 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/20 rounded-2xl text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <DatabaseBackup className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-300">Manual Backup</p>
                <p className="text-sm text-amber-600 dark:text-amber-400">Create immediate system backup</p>
              </div>
            </div>
            <DatabaseBackup className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:animate-pulse" />
          </button>
          
          <button
            onClick={handleSystemRestart}
            className="w-full p-4 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 rounded-2xl text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <ServerCog className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <div>
                <p className="font-bold text-rose-800 dark:text-rose-300">System Restart</p>
                <p className="text-sm text-rose-600 dark:text-rose-400">Restart all services (users will be logged out)</p>
              </div>
            </div>
            <ServerCog className="w-5 h-5 text-rose-600 dark:text-rose-400 group-hover:animate-spin" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Security & Audit Logs</h2>
          <p className="text-slate-500 dark:text-slate-400">Monitor system security and audit trails</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent Audit Logs
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-l-4 border-indigo-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-white">{log.user}</span>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    log.status === 'success' 
                      ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300'
                  }`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">{log.action} - {log.resource}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">{log.details}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-600">
                  <span>{log.timestamp}</span>
                  <span>IP: {log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <DatabaseBackup className="w-5 h-5" />
            Backup Records
          </h3>
          
          <div className="space-y-3">
            {backupRecords.map((backup) => (
              <div key={backup.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">{backup.name}</span>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    backup.status === 'completed' 
                      ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                      : backup.status === 'failed'
                      ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300'
                      : 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300'
                  }`}>
                    {backup.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Type: {backup.type}</span>
                  <span className="text-slate-600 dark:text-slate-400">{backup.size}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                  <span>{backup.timestamp}</span>
                  <span>Location: {backup.location}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleRunBackup}
            className="w-full mt-6 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <DatabaseBackup className="w-5 h-5" />
            Run New Backup
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="text-center py-20">
      <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Users Management</h3>
      <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
    </div>
  );

  const renderAnalytics = () => (
    <div className="text-center py-20">
      <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Analytics Dashboard</h3>
      <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
    </div>
  );

  const renderSystem = () => (
    <div className="text-center py-20">
      <Server className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">System Status</h3>
      <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex">
        {/* Sidebar Only - No Top Navigation */}
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen`}>
          <nav className="p-4 space-y-1">
            <div className="flex items-center gap-3 mb-6 p-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-black text-slate-900 dark:text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-widest">
                    DATUM CONTROL
                  </p>
                </div>
              )}
            </div>
            
            {[
              { id: 'overview', label: 'Overview', icon: Grid, color: 'indigo' },
              { id: 'events', label: 'Events', icon: Calendar, color: 'emerald' },
              { id: 'gallery', label: 'Gallery', icon: Image, color: 'amber' },
              { id: 'users', label: 'Users', icon: Users2, color: 'blue' },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'purple' },
              { id: 'system', label: 'System', icon: Server, color: 'rose' },
              { id: 'security', label: 'Security', icon: ShieldCheck, color: 'green' },
              { id: 'settings', label: 'Settings', icon: Settings, color: 'slate' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? `bg-${item.color}-50 dark:bg-${item.color}-500/10 text-${item.color}-600 dark:text-${item.color}-400 font-bold`
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
            
            {!sidebarCollapsed && (
              <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="px-4 text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  <button onClick={() => setActiveTab('events')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                    <Plus className="w-4 h-4" />
                    <span>Add Event</span>
                  </button>
                  <button onClick={() => setActiveTab('gallery')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                    <Image className="w-4 h-4" />
                    <span>View Gallery</span>
                  </button>
                  <button onClick={handleRunBackup} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                    <DatabaseBackup className="w-4 h-4" />
                    <span>Run Backup</span>
                  </button>
                </div>
              </div>
            )}
            
            <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between p-2">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
                
                {!sidebarCollapsed && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleDarkMode}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400"
                    >
                      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {/* Content based on active tab */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'add-event' && renderAddEvent()}
            {activeTab === 'gallery' && renderGallery()}
            {activeTab === 'settings' && renderSettings()}
            {activeTab === 'security' && renderSecurity()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'system' && renderSystem()}
          </div>
        </div>
      </div>

      {selectedGalleryImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-6xl">
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img
                    src={selectedGalleryImage.url}
                    alt={selectedGalleryImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col">
                  <div className="mb-6">
                    <span className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest inline-block mb-4">
                      {selectedGalleryImage.category}
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                      {selectedGalleryImage.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Uploaded on {selectedGalleryImage.uploadDate}
                    </p>
                  </div>
                  <div className="space-y-6 flex-grow">
                    <div>
                      <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                        Description
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {selectedGalleryImage.description || `This image captures a memorable moment from our ${selectedGalleryImage.category.toLowerCase()} activities.`}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedGalleryImage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
                    <button className="flex-1 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button 
                      onClick={() => {
                        handleDeleteImage(selectedGalleryImage.id);
                        setSelectedGalleryImage(null);
                      }}
                      className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
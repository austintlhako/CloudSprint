import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import type { EducationLevel, LearnerProfile } from '../types';
import { getCountryOptions } from '../data/countries';
import { useAppLanguage } from '../services/i18n';

interface NavLinkItem {
  to: string;
  label: string;
  icon: string;
}

interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

const notificationStorageKey = 'cloudsprint_notifications';
const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch', 'Swahili', 'Arabic', 'Hindi', 'Bengali', 'Urdu', 'Mandarin Chinese', 'Japanese', 'Korean', 'Vietnamese', 'Turkish', 'Russian', 'Ukrainian', 'Polish', 'Greek', 'Hebrew', 'Thai', 'Indonesian', 'Malay', 'Amharic', 'Yoruba', 'Zulu'];

const defaultNotifications: AppNotification[] = [
  {
    id: 'welcome',
    title: 'Welcome to CloudSprint',
    message: 'Start with a short quiz or review a few flashcards today.',
    createdAt: new Date().toISOString(),
    read: false,
    href: '/quiz',
  },
  {
    id: 'planner-tip',
    title: 'Plan your next study session',
    message: 'Set an exam date and daily time in the study planner.',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: false,
    href: '/planner',
  },
];
const profileStorageKey = 'cloudsprint_learner_profile';
const emptyProfile: LearnerProfile = {
  fullName: '', nickname: '', educationLevel: 'other', country: '',
  githubUrl: '', linkedinUrl: '', school: '',
};

const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Dashboard', icon: '⌂' },
  { to: '/quiz', label: 'Mock exams', icon: '✓' },
  { to: '/flashcards', label: 'Flashcards', icon: '▣' },
  { to: '/planner', label: 'Study planner', icon: '◷' },
  { to: '/labs', label: 'Labs', icon: '⌘' },
  { to: '/community', label: 'Community', icon: '◎' },
  { to: '/reviews', label: 'Reviews', icon: '★' },
  { to: '/friends', label: 'Study with friends', icon: '♧' },
  { to: '/support', label: 'Raise an issue', icon: '?' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isGuest, isLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('cloudsprint_nav_collapsed') === 'true');
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [profile, setProfile] = useState<LearnerProfile>(() => {
    try { return { ...emptyProfile, ...JSON.parse(localStorage.getItem(profileStorageKey) ?? '{}') }; } catch { return emptyProfile; }
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(notificationStorageKey);
      return saved ? JSON.parse(saved) as AppNotification[] : defaultNotifications;
    } catch {
      return defaultNotifications;
    }
  });
  const notificationRef = useRef<HTMLDivElement>(null);
  const authStateResolved = useRef(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('cloudsprint_theme') !== 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('cloudsprint_language') ?? 'English');
  const [, translate] = useAppLanguage();

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !isDark);
    localStorage.setItem('cloudsprint_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    const closeNotificationsWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowNotifications(false);
    };
    window.addEventListener('keydown', closeNotificationsWithEscape);
    return () => window.removeEventListener('keydown', closeNotificationsWithEscape);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      authStateResolved.current = true;
      return;
    }
    const userProfileKey = `${profileStorageKey}_${user.id}`;
    try {
      const nextProfile = { ...emptyProfile, ...JSON.parse(localStorage.getItem(userProfileKey) ?? '{}') };
      setProfile(nextProfile);
      const promptKey = `${profileStorageKey}_prompt_${user.id}`;
      const promptedToday = localStorage.getItem(promptKey) === new Date().toISOString().slice(0, 10);
      if (authStateResolved.current && !promptedToday && !isProfileComplete(nextProfile)) {
        localStorage.setItem(promptKey, new Date().toISOString().slice(0, 10));
        setShowProfileSettings(true);
      }
    } catch {
      setProfile(emptyProfile);
      const promptKey = `${profileStorageKey}_prompt_${user.id}`;
      const promptedToday = localStorage.getItem(promptKey) === new Date().toISOString().slice(0, 10);
      if (authStateResolved.current && !promptedToday) {
        localStorage.setItem(promptKey, new Date().toISOString().slice(0, 10));
        setShowProfileSettings(true);
      }
    }
    authStateResolved.current = true;
  }, [isLoading, user]);

  useEffect(() => {
    localStorage.setItem(notificationStorageKey, JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('cloudsprint_language', language);
    document.documentElement.lang = language;
    window.dispatchEvent(new CustomEvent('cloudsprint:language-change', { detail: language }));
  }, [language]);

  useEffect(() => {
    const closeNotifications = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', closeNotifications);
    return () => document.removeEventListener('mousedown', closeNotifications);
  }, []);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest learner';
  const initials = displayName.slice(0, 2).toUpperCase();
  const profileCompletion = Math.round(Object.values(profile).filter(Boolean).length / Object.keys(profile).length * 100);
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const markNotificationRead = (id: string) => {
    setNotifications((items) => items.map((notification) => (
      notification.id === id ? { ...notification, read: true } : notification
    )));
  };
  const markAllNotificationsRead = () => {
    setNotifications((items) => items.map((notification) => ({ ...notification, read: true })));
  };
  const deleteNotification = (id: string) => {
    setNotifications((items) => items.filter((notification) => notification.id !== id));
  };
  const formatNotificationTime = (createdAt: string) => {
    const ageMinutes = Math.max(0, Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000));
    if (ageMinutes < 1) return 'Just now';
    if (ageMinutes < 60) return `${ageMinutes}m ago`;
    const ageHours = Math.floor(ageMinutes / 60);
    if (ageHours < 24) return `${ageHours}h ago`;
    return `${Math.floor(ageHours / 24)}d ago`;
  };
  const saveProfile = (event: FormEvent) => {
    event.preventDefault();
    if (user) localStorage.setItem(`${profileStorageKey}_${user.id}`, JSON.stringify(profile));
    setShowProfileSettings(false);
  };
  const downloadAccountData = () => {
    const accountData: Record<string, unknown> = {
      exportedAt: new Date().toISOString(),
      profile,
      preferences: {
        theme: localStorage.getItem('cloudsprint_theme'),
        language: localStorage.getItem('cloudsprint_language'),
        accessibility: localStorage.getItem('cloudsprint_accessibility'),
      },
    };
    Object.keys(localStorage)
      .filter((key) => key.startsWith('cloudsprint_'))
      .forEach((key) => {
        if (!(key in accountData)) accountData[key] = localStorage.getItem(key);
      });
    const blob = new Blob([JSON.stringify(accountData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cloudsprint-account-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  const deactivateAccount = async () => {
    if (!user) return;
    localStorage.setItem(`cloudsprint_account_deactivated_${user.id}`, new Date().toISOString());
    setShowProfileSettings(false);
    await signOut();
  };
  const deleteAccount = async () => {
    if (!user) return;
    downloadAccountData();
    Object.keys(localStorage)
      .filter((key) => key.startsWith('cloudsprint_'))
      .forEach((key) => localStorage.removeItem(key));
    setShowDeleteConfirmation(false);
    setShowProfileSettings(false);
    await signOut();
  };
  const toggleCollapsed = () => {
    setIsCollapsed((value) => {
      localStorage.setItem('cloudsprint_nav_collapsed', String(!value));
      document.documentElement.classList.toggle('nav-collapsed', !value);
      return !value;
    });
  };
  useEffect(() => {
    document.documentElement.classList.toggle('nav-collapsed', isCollapsed);
  }, [isCollapsed]);
  useEffect(() => {
    const openAuth = () => setShowAuth(true);
    window.addEventListener('cloudsprint:open-auth', openAuth);
    return () => window.removeEventListener('cloudsprint:open-auth', openAuth);
  }, []);

  if (isGuest && location.pathname === '/') {
    return (
      <>
        <header className="public-header">
          <Link to="/" className="brand-link"><span className="brand-mark">⚡</span><strong>CloudSprint</strong></Link>
          <button type="button" className="public-login-button" onClick={() => setShowAuth(true)}>Log in</button>
        </header>
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </>
    );
  }

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <Link to="/" onClick={() => setIsOpen(false)} className="brand-link">
            <span className="brand-mark">⚡</span>
            <span><strong>CloudSprint</strong></span>
          </Link>
          <button className="sidebar-close" onClick={() => setIsOpen(false)} aria-label="Close navigation">×</button>
          <button className="sidebar-collapse-button" onClick={toggleCollapsed} aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}>{isCollapsed ? '»' : '«'}</button>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-label">Workspace</p>
          {navLinks.map(({ to, label, icon }) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <Link key={to} to={to} onClick={() => setIsOpen(false)} className={`sidebar-link ${active ? 'active' : ''}`}>
                <span className="sidebar-icon" aria-hidden="true">{icon}</span>
                <span>{translate(label as Parameters<typeof translate>[0])}</span>
                {to === '/quiz' && <span className="sidebar-pill">80%</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="theme-toggle" onClick={() => setIsDark((value) => !value)}>
            <span>{isDark ? '☼' : '☾'}</span>{isDark ? 'Light mode' : 'Dark mode'}
          </button>
          <div className="profile-wrap">
            <button className="profile-button" onClick={() => setShowProfile((value) => !value)} aria-expanded={showProfile}>
              <span className="avatar">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials}</span>
              <span className="profile-copy"><strong>{displayName}</strong><small>{isGuest ? 'Guest mode' : 'My account'}</small></span>
              <span>⋮</span>
            </button>
            {showProfile && (
              <div className="profile-menu">
                {!isGuest && <button onClick={() => { setShowProfileSettings(true); setShowProfile(false); }}>Settings · My account ({profileCompletion}%)</button>}
                {!isGuest && <button onClick={() => navigate('/profile')}>Open profile page</button>}

                {!isGuest && <button onClick={() => void signOut()}>Log out</button>}
                {isGuest && <button onClick={() => setShowAuth(true)}>Create account / Log in</button>}
              </div>
            )}
          </div>
        </div>
      </aside>
      <button className="mobile-menu-button" onClick={() => setIsOpen(true)} aria-label="Open navigation">☰</button>
      <div className="sidebar-account-action">
        <div className="notification-wrap" ref={notificationRef}>
          <button
            type="button"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={showNotifications}
            title="Notifications"
            className="notification-button"
            onClick={() => setShowNotifications((value) => !value)}
          >
            ♢
            {unreadCount > 0 && <span aria-hidden="true">{unreadCount > 9 ? '9+' : unreadCount}</span>}
          </button>
          {showNotifications && (
            <section className="notification-panel" aria-label="Notifications" role="dialog" aria-modal="false" tabIndex={-1}>
              <div className="notification-panel-header">
                <div>
                  <h2>Notifications</h2>
                  <span>{unreadCount ? `${unreadCount} unread` : 'All caught up'}</span>
                </div>
                {unreadCount > 0 && (
                  <button type="button" onClick={markAllNotificationsRead}>Mark all as read</button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p className="notification-empty">You have no notifications.</p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`} key={notification.id}>
                      <button
                        type="button"
                        className="notification-content"
                        onClick={() => {
                          markNotificationRead(notification.id);
                          if (notification.href) navigate(notification.href);
                        }}
                      >
                        <span className="notification-status" aria-hidden="true" />
                        <span>
                          <strong>{notification.title}</strong>
                          <span>{notification.message}</span>
                          <small>{formatNotificationTime(notification.createdAt)}</small>
                        </span>
                      </button>
                      <div className="notification-actions">
                        {!notification.read && (
                          <button type="button" onClick={() => markNotificationRead(notification.id)}>
                            Mark read
                          </button>
                        )}
                        <button type="button" onClick={() => deleteNotification(notification.id)} aria-label={`Delete ${notification.title}`}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
        <label className="language-selector" htmlFor="navbar-language">
          <span className="sr-only">Language</span>
          <select id="navbar-language" name="language" value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Choose language">
            {languages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        {isGuest && <button onClick={() => setShowAuth(true)}>Log in</button>}
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      {showProfileSettings && !isGuest && (
        <div className="profile-settings-backdrop" role="presentation">
          <form className="profile-settings-modal" onSubmit={saveProfile}>
            <div className="profile-settings-heading"><div><h2>My account settings</h2><p>{profileCompletion}% profile complete. Manage your account details and data.</p></div><button type="button" onClick={() => setShowProfileSettings(false)} aria-label="Close account settings">×</button></div>
            <div className="profile-progress"><span style={{ width: `${profileCompletion}%` }} /></div>
            <label htmlFor="profile-full-name">Full name<input id="profile-full-name" name="fullName" value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} required pattern="^\s*\S+(?:\s+\S+)+\s*$" title="Enter your first and last name." /></label>
            <label htmlFor="profile-nickname">Nickname<input id="profile-nickname" name="nickname" value={profile.nickname} onChange={(event) => setProfile({ ...profile, nickname: event.target.value })} required /></label>
            <label htmlFor="profile-education-level">Level of study<select id="profile-education-level" name="educationLevel" value={profile.educationLevel} onChange={(event) => setProfile({ ...profile, educationLevel: event.target.value as EducationLevel })}><option value="other">Other</option><option value="university">University</option><option value="college">College</option><option value="bootcamp">Bootcamp</option><option value="highschool">High school</option></select></label>
            <label htmlFor="profile-country">Country<select id="profile-country" name="country" value={profile.country} onChange={(event) => setProfile({ ...profile, country: event.target.value })} required><option value="">Select your country</option>{getCountryOptions().map((country) => <option key={country.code} value={country.name}>{country.name}</option>)}</select></label>
            <label htmlFor="profile-school">School, university or programme<input id="profile-school" name="school" value={profile.school} onChange={(event) => setProfile({ ...profile, school: event.target.value })} required /></label>
            <label htmlFor="profile-github">GitHub link<input id="profile-github" name="githubUrl" type="url" placeholder="https://github.com/..." value={profile.githubUrl} onChange={(event) => setProfile({ ...profile, githubUrl: event.target.value })} required /></label>
            <label htmlFor="profile-linkedin">LinkedIn link<input id="profile-linkedin" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/..." value={profile.linkedinUrl} onChange={(event) => setProfile({ ...profile, linkedinUrl: event.target.value })} required /></label>
            <div className="profile-settings-actions"><button type="button" onClick={() => setShowProfileSettings(false)}>Cancel</button><button type="submit">Save settings</button></div>
            <section className="account-danger-zone" aria-labelledby="account-actions-heading">
              <h3 id="account-actions-heading">Account actions</h3>
              <p>Download a copy of your CloudSprint data before deactivating or deleting your account.</p>
              <div className="profile-settings-actions">
                <button type="button" onClick={downloadAccountData}>Download my data</button>
                <button type="button" onClick={() => void deactivateAccount()}>Deactivate account</button>
                <button type="button" onClick={() => setShowDeleteConfirmation(true)}>Delete account</button>
              </div>
            </section>
          </form>
        </div>
      )}
      {showDeleteConfirmation && user && (
        <div className="profile-settings-backdrop" role="presentation">
          <section className="profile-settings-modal account-delete-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-account-heading">
            <div className="profile-settings-heading">
              <div><h2 id="delete-account-heading">Delete your account?</h2><p>This permanently removes your locally stored CloudSprint data and signs you out.</p></div>
              <button type="button" onClick={() => setShowDeleteConfirmation(false)} aria-label="Cancel account deletion">×</button>
            </div>
            <p>Before continuing, download your data if you want to keep a copy. This action cannot be undone.</p>
            <div className="profile-settings-actions">
              <button type="button" onClick={downloadAccountData}>Download data first</button>
              <button type="button" onClick={() => void deleteAccount()}>Delete permanently</button>
              <button type="button" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function isProfileComplete(profile: LearnerProfile): boolean {
  return Object.values(profile).every(Boolean);
}

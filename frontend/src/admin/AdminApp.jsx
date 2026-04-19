import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Experience from './pages/Experience';
import Testimonials from './pages/Testimonials';
import Paket from './pages/Paket';
import Skills from './pages/Skills';
import Awards from './pages/Awards';
import Settings from './pages/Settings';
import { checkAuth, logout as apiLogout } from './api';

function getInitialPage() {
  return localStorage.getItem('ct-admin-page') || 'dashboard';
}

export default function AdminApp() {
  // null = checking, false = not auth'd, true = auth'd
  const [isAuth, setIsAuth] = useState(null);
  const [page, setPage] = useState(getInitialPage);

  // Validate session server-side on every mount — prevents the client-side
  // auth illusion where any string in localStorage looked "authenticated".
  useEffect(() => {
    checkAuth().then((user) => {
      setIsAuth(!!user);
    });
  }, []);

  const handleLogin = () => setIsAuth(true);

  const handleLogout = async () => {
    try {
      await apiLogout(); // clears httpOnly cookie server-side
    } catch {
      // ignore network errors — still clear local state
    }
    setIsAuth(false);
    setPage('dashboard');
    localStorage.removeItem('ct-admin-page');
  };

  const navigate = (p) => {
    setPage(p);
    localStorage.setItem('ct-admin-page', p);
  };

  // Loading state while validating session
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-500 text-sm">Memeriksa sesi...</div>
      </div>
    );
  }

  if (!isAuth) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'portfolio':
        return <Portfolio />;
      case 'experience':
        return <Experience />;
      case 'testimonials':
        return <Testimonials />;
      case 'paket':
        return <Paket />;
      case 'skills':
        return <Skills />;
      case 'awards':
        return <Awards />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Sidebar currentPage={page} onNavigate={navigate} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

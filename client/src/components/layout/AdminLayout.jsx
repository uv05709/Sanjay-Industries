import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HiChartPie, HiShoppingBag, HiCollection, HiInboxIn, 
  HiUsers, HiDocumentText, HiPhotograph, HiStar, 
  HiChatAlt2, HiCog, HiLogout, HiMenuAlt2, HiX 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: HiChartPie, exact: true },
    { name: 'Products', path: '/admin/products', icon: HiShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: HiCollection },
    { name: 'Bulk Orders', path: '/admin/bulk-orders', icon: HiInboxIn },
    { name: 'Dealers', path: '/admin/dealers', icon: HiUsers },
    { name: 'Blogs', path: '/admin/blogs', icon: HiDocumentText },
    { name: 'Gallery', path: '/admin/gallery', icon: HiPhotograph },
    { name: 'Testimonials', path: '/admin/testimonials', icon: HiStar },
    { name: 'Messages', path: '/admin/messages', icon: HiChatAlt2 },
    { name: 'Settings', path: '/admin/settings', icon: HiCog },
  ];

  return (
    <div className="flex h-screen bg-cream">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-dark text-white/70 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-dark-light border-b border-white/10">
          <div className="font-heading text-xl font-bold text-white tracking-wide">Sanjay Admin</div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-white/50 hover:text-white">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                      isActive ? 'bg-primary text-white font-medium' : 'hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/50 truncate">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <HiLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-cream-dark flex items-center justify-between px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-text-light hover:text-primary transition-colors"
          >
            <HiMenuAlt2 className="w-6 h-6" />
          </button>
          
          <div className="hidden lg:flex items-center gap-4 text-sm text-text-light">
            <span className="font-medium text-primary">Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:text-accent-dark font-medium transition-colors">
              View Website →
            </a>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-cream p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

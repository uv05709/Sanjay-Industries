import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiShoppingBag, HiInboxIn, HiUsers, HiChatAlt2, 
  HiTrendingUp, HiRefresh
} from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import { getDashboardStats } from '../../api';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await getDashboardStats();
      setStats(data.stats);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !stats) return <Loader />;

  const statCards = [
    { title: 'Total Products', value: stats?.products || 0, icon: HiShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100', link: '/admin/products' },
    { title: 'Bulk Orders', value: stats?.bulkOrders || 0, icon: HiInboxIn, color: 'text-accent', bg: 'bg-accent/10', link: '/admin/bulk-orders' },
    { title: 'Registered Dealers', value: stats?.dealers || 0, icon: HiUsers, color: 'text-green-600', bg: 'bg-green-100', link: '/admin/dealers' },
    { title: 'Unread Messages', value: stats?.unreadMessages || 0, icon: HiChatAlt2, color: 'text-red-600', bg: 'bg-red-100', link: '/admin/messages' },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-heading">Dashboard Overview</h1>
          <p className="text-sm text-text-light mt-1">Welcome to Sanjay Industries administration panel.</p>
        </div>
        <button 
          onClick={fetchStats} 
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-cream-darker rounded-md text-sm font-medium hover:bg-cream transition-colors shadow-sm"
        >
          <HiRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-light/10 text-error rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link key={index} to={card.link} className="card p-6 flex items-center gap-4 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-text-light font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-primary">{card.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bulk Orders */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-cream-dark flex items-center justify-between bg-white">
            <h2 className="font-semibold text-primary">Recent Bulk Orders</h2>
            <Link to="/admin/bulk-orders" className="text-sm text-accent hover:underline">View All</Link>
          </div>
          <div className="p-0">
            {stats?.recentOrders?.length > 0 ? (
              <div className="divide-y divide-cream-dark">
                {stats.recentOrders.map((order) => (
                  <div key={order._id} className="px-6 py-4 hover:bg-cream-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-medium text-text-dark">{order.name}</p>
                        <p className="text-xs text-text-light">{order.companyName || 'Individual'}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text line-clamp-1 mt-2"><span className="font-medium">Products:</span> {order.products}</p>
                    <p className="text-xs text-text-light mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-text-light text-sm">No recent orders found.</div>
            )}
          </div>
        </div>

        {/* Quick Links / Status */}
        <div className="space-y-6">
          <div className="card p-6 bg-gradient-to-br from-primary to-primary-light text-white">
            <div className="flex items-center gap-3 mb-4">
              <HiTrendingUp className="w-6 h-6 text-accent" />
              <h2 className="font-semibold text-lg">System Status</h2>
            </div>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Your catalog currently has <strong className="text-white">{stats?.products || 0}</strong> products across <strong className="text-white">{stats?.categories || 0}</strong> categories.
              The website is running smoothly.
            </p>
            <div className="flex gap-3">
              <Link to="/admin/products" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded text-sm transition-colors backdrop-blur-sm">
                Add Product
              </Link>
              <Link to="/admin/blogs" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded text-sm transition-colors backdrop-blur-sm">
                Write Blog
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/settings" className="p-3 border border-cream-darker rounded hover:bg-cream transition-colors text-center text-sm font-medium text-text-dark">
                Update Settings
              </Link>
              <Link to="/admin/gallery" className="p-3 border border-cream-darker rounded hover:bg-cream transition-colors text-center text-sm font-medium text-text-dark">
                Manage Gallery
              </Link>
              <Link to="/admin/dealers" className="p-3 border border-cream-darker rounded hover:bg-cream transition-colors text-center text-sm font-medium text-text-dark">
                View Dealers
              </Link>
              <Link to="/admin/testimonials" className="p-3 border border-cream-darker rounded hover:bg-cream transition-colors text-center text-sm font-medium text-text-dark">
                Testimonials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

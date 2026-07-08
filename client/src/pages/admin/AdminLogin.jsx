import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { HiLockClosed, HiMail } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';

const AdminLogin = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const onSubmit = async (data) => {
    setErrorMsg('');
    try {
      const result = await login(data.email, data.password);
      if (result.user?.role !== 'admin') {
        setErrorMsg('Access denied. Administrator privileges required.');
        // Optionally logout here since they aren't an admin
      } else {
        const origin = location.state?.from?.pathname || '/admin';
        navigate(origin);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <SEOHead title="Admin Login" />
      <div className="min-h-screen flex items-center justify-center bg-cream px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-warm-xl overflow-hidden relative z-10">
          <div className="bg-primary px-8 py-10 text-center">
            <h1 className="font-heading text-3xl text-white font-bold mb-2">Sanjay Industries</h1>
            <p className="text-white/70 text-sm tracking-widest uppercase font-body">Admin Portal</p>
          </div>
          
          <div className="p-8">
            {errorMsg && (
              <div className="mb-6 p-3 bg-error-light/10 border border-error-light/20 rounded-md text-error text-sm text-center">
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="input-label">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-text-light" />
                  </div>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    type="email"
                    className="input-field pl-10"
                    placeholder="admin@sanjayindustries.com"
                  />
                </div>
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-text-light" />
                  </div>
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type="password"
                    className="input-field pl-10"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary !mt-8"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

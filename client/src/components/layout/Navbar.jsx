import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown, HiSearch } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Products',
    path: '/products',
    submenu: [
      { name: 'Wooden Sindhora', path: '/products?category=wooden-sindhora' },
      { name: 'Wedding Items', path: '/products?category=wedding-items' },
      { name: 'Religious Products', path: '/products?category=religious-products' },
      { name: 'Gift Items', path: '/products?category=gift-items' },
      { name: 'Decorative Boxes', path: '/products?category=decorative-boxes' },
      { name: 'Custom Handicrafts', path: '/products?category=custom-handicrafts' },
      { name: 'View All Products', path: '/products' },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Manufacturing', path: '/manufacturing' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const isHome = location.pathname === '/';
  const navBg = isScrolled || !isHome
    ? 'bg-white shadow-warm border-b border-cream-dark'
    : 'bg-transparent';
  const textColor = isScrolled || !isHome ? 'text-text-dark' : 'text-white';
  const logoColor = isScrolled || !isHome ? 'text-primary' : 'text-white';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
        {/* Top Bar */}
        <div className={`hidden lg:block border-b transition-colors duration-400 ${isScrolled || !isHome ? 'border-cream-dark bg-cream' : 'border-white/10 bg-white/5'}`}>
          <div className="container-custom flex items-center justify-between py-1.5 text-caption">
            <span className={`transition-colors duration-400 ${isScrolled || !isHome ? 'text-text-light' : 'text-white/70'}`}>
              Manufacturer & Wholesale Supplier — Varanasi, India
            </span>
            <div className={`flex items-center gap-6 transition-colors duration-400 ${isScrolled || !isHome ? 'text-text-light' : 'text-white/70'}`}>
              <a href="tel:+91XXXXXXXXXX" className="hover:text-accent transition-colors">+91-XXXXXXXXXX</a>
              <a href="mailto:info@sanjayindustries.com" className="hover:text-accent transition-colors">info@sanjayindustries.com</a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className={`transition-colors duration-400 ${logoColor}`}>
                <div className="font-heading text-xl lg:text-2xl font-bold leading-none tracking-tight">
                  Sanjay Industries
                </div>
                <div className={`text-[10px] tracking-[0.25em] uppercase font-body font-medium transition-colors duration-400 ${isScrolled || !isHome ? 'text-secondary' : 'text-white/60'}`}>
                  Handcrafted Since Generations
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-4 py-2 font-body text-sm font-medium transition-colors duration-300
                      ${isActive ? 'text-accent' : textColor} hover:text-accent`
                    }
                  >
                    {link.name}
                    {link.submenu && <HiChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                  </NavLink>

                  {/* Submenu */}
                  {link.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-warm-lg border border-cream-dark py-2 mt-0"
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block px-5 py-2.5 text-sm text-text hover:bg-cream hover:text-primary transition-colors duration-200"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/bulk-order" className="btn-accent !py-2.5 !px-6 !text-xs">
                Bulk Order
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${textColor}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-warm-xl overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-5 border-b border-cream-dark">
                <span className="font-heading text-xl text-primary font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="text-text-dark">
                  <HiX className="w-6 h-6" />
                </button>
              </div>
              <nav className="py-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-6 py-3 font-body text-sm font-medium transition-colors
                        ${isActive ? 'text-accent bg-cream' : 'text-text-dark hover:bg-cream hover:text-primary'}`
                      }
                    >
                      {link.name}
                    </NavLink>
                    {link.submenu && (
                      <div className="pl-4">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-6 py-2 text-sm text-text-light hover:text-primary transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="px-6 py-4 border-t border-cream-dark">
                <Link to="/bulk-order" className="btn-accent w-full !text-xs">
                  Request Bulk Order
                </Link>
                <Link to="/become-dealer" className="btn-outline w-full !text-xs mt-3">
                  Become a Dealer
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

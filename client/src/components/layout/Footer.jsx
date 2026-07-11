import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { subscribeNewsletter } from '../../api';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');
  const { settings } = useSettings();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const { data } = await subscribeNewsletter(email);
      setSubStatus(data.message);
      setEmail('');
      setTimeout(() => setSubStatus(''), 5000);
    } catch (error) {
      setSubStatus(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Build social links array from settings — only show ones that have a URL
  const socialLinksData = [
    { icon: FaFacebookF, href: settings.socialLinks?.facebook },
    { icon: FaInstagram, href: settings.socialLinks?.instagram },
    { icon: FaYoutube, href: settings.socialLinks?.youtube },
    { icon: FaPinterestP, href: settings.socialLinks?.pinterest },
  ].filter(s => s.href);

  const contactPhone = settings.contactInfo?.phone || '';
  const contactEmail = settings.contactInfo?.email || 'info@sanjayindustries.com';
  const address = settings.contactInfo?.address || {};
  const addressStr = [address.city, address.state, address.country].filter(Boolean).join(', ') + (address.pincode ? ` — ${address.pincode}` : '');
  const workingWeekdays = settings.workingHours?.weekdays || 'Mon–Sat: 9:00 AM – 7:00 PM';
  const workingWeekends = settings.workingHours?.weekends || 'Sunday: Closed';

  return (
    <footer className="bg-dark text-white/80">
      {/* Newsletter Strip */}
      <div className="bg-primary">
        <div className="container-custom py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-heading-3 text-white mb-1">Stay Updated</h3>
              <p className="text-white/70 text-sm">Get notified about new products, wholesale offers, and seasonal collections.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-l-md focus:outline-none focus:border-accent text-sm"
                required
              />
              <button type="submit" className="px-6 py-3 bg-accent text-white font-semibold text-sm uppercase tracking-wide rounded-r-md hover:bg-accent-dark transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          {subStatus && <p className="text-accent-100 text-sm mt-3 text-center md:text-right">{subStatus}</p>}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — About */}
          <div>
            <div className="font-heading text-2xl text-white font-bold mb-1">{settings.siteName || 'Sanjay Industries'}</div>
            <div className="text-accent text-xs tracking-[0.2em] uppercase mb-5">Varanasi, India</div>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              A family-owned manufacturing business crafting traditional wooden Sindhora and handicraft products.
              From our workshop in the holy city of Varanasi, we supply handcrafted quality across India.
            </p>
            {socialLinksData.length > 0 && (
              <div className="flex gap-3">
                {socialLinksData.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-md bg-white/10 text-white/60 hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Products', path: '/products' },
                { name: 'Manufacturing Process', path: '/manufacturing' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Blog & Articles', path: '/blog' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/60 hover:text-accent transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Product Categories */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-5">Our Products</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Wooden Sindhora', path: '/products?category=wooden-sindhora' },
                { name: 'Wedding Items', path: '/products?category=wedding-items' },
                { name: 'Religious Products', path: '/products?category=religious-products' },
                { name: 'Gift Items', path: '/products?category=gift-items' },
                { name: 'Decorative Boxes', path: '/products?category=decorative-boxes' },
                { name: 'Custom Handicrafts', path: '/products?category=custom-handicrafts' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/60 hover:text-accent transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/bulk-order" className="text-sm text-accent hover:text-accent-light font-medium transition-colors">
                  Request Bulk Order →
                </Link>
              </li>
              <li>
                <Link to="/become-dealer" className="text-sm text-accent hover:text-accent-light font-medium transition-colors">
                  Become a Dealer →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              {addressStr && (
                <li className="flex items-start gap-3">
                  <HiLocationMarker className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">{addressStr}</span>
                </li>
              )}
              {contactPhone && (
                <li className="flex items-start gap-3">
                  <HiPhone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <a href={`tel:${contactPhone}`} className="text-sm text-white/60 hover:text-accent transition-colors">{contactPhone}</a>
                </li>
              )}
              {contactEmail && (
                <li className="flex items-start gap-3">
                  <HiMail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${contactEmail}`} className="text-sm text-white/60 hover:text-accent transition-colors">{contactEmail}</a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <HiClock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/60">
                  <p>{workingWeekdays}</p>
                  <p>{workingWeekends}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {settings.siteName || 'Sanjay Industries'}. All rights reserved. Handcrafted in Varanasi, India.
          </p>
          <div className="flex gap-4">
            {[
              { name: 'Privacy Policy', path: '/privacy-policy' },
              { name: 'Terms', path: '/terms' },
              { name: 'Shipping', path: '/shipping-policy' },
              { name: 'Returns', path: '/return-policy' },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-xs text-white/40 hover:text-accent transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

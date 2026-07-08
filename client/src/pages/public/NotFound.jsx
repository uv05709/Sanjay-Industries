import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';

const NotFound = () => (
  <>
    <SEOHead title="404 — Page Not Found" />
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
        <div className="font-heading text-[120px] md:text-[180px] text-primary/10 font-bold leading-none select-none">404</div>
        <h1 className="font-heading text-heading-1 text-primary font-bold -mt-6 mb-3">Page Not Found</h1>
        <p className="text-text mb-8">The page you are looking for does not exist or has been moved. Let us help you find what you need.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/products" className="btn-outline">View Products</Link>
          <Link to="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </motion.div>
    </div>
  </>
);
export default NotFound;

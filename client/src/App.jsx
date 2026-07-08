import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy-loaded public pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Products = lazy(() => import('./pages/public/Products'));
const SingleProduct = lazy(() => import('./pages/public/SingleProduct'));
const BulkOrder = lazy(() => import('./pages/public/BulkOrder'));
const BecomeDealer = lazy(() => import('./pages/public/BecomeDealer'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const Manufacturing = lazy(() => import('./pages/public/Manufacturing'));
const BlogList = lazy(() => import('./pages/public/BlogList'));
const BlogSingle = lazy(() => import('./pages/public/BlogSingle'));
const Contact = lazy(() => import('./pages/public/Contact'));
const FAQ = lazy(() => import('./pages/public/FAQ'));
const TestimonialsPage = lazy(() => import('./pages/public/TestimonialsPage'));
const PrivacyPolicy = lazy(() => import('./pages/public/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/public/Terms'));
const ShippingPolicy = lazy(() => import('./pages/public/ShippingPolicy'));
const ReturnPolicy = lazy(() => import('./pages/public/ReturnPolicy'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Lazy-loaded admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts'));
const ManageCategories = lazy(() => import('./pages/admin/ManageCategories'));
const ManageBulkOrders = lazy(() => import('./pages/admin/ManageBulkOrders'));
const ManageDealers = lazy(() => import('./pages/admin/ManageDealers'));
const ManageBlogs = lazy(() => import('./pages/admin/ManageBlogs'));
const ManageGallery = lazy(() => import('./pages/admin/ManageGallery'));
const ManageTestimonials = lazy(() => import('./pages/admin/ManageTestimonials'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageSettings = lazy(() => import('./pages/admin/ManageSettings'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<SingleProduct />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/become-dealer" element={<BecomeDealer />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/bulk-orders" element={<ManageBulkOrders />} />
          <Route path="/admin/dealers" element={<ManageDealers />} />
          <Route path="/admin/blogs" element={<ManageBlogs />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
          <Route path="/admin/testimonials" element={<ManageTestimonials />} />
          <Route path="/admin/messages" element={<ManageMessages />} />
          <Route path="/admin/settings" element={<ManageSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

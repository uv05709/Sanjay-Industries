import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ——— API Functions ———

// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');
export const logoutUser = () => api.post('/auth/logout');

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (slug) => api.get(`/products/${slug}`);
export const getFeaturedProducts = () => api.get('/products/featured');
export const getRelatedProducts = (slug) => api.get(`/products/${slug}/related`);

// Categories
export const getCategories = () => api.get('/categories');
export const getCategory = (slug) => api.get(`/categories/${slug}`);

// Bulk Orders
export const submitBulkOrder = (data) => api.post('/bulk-orders', data);

// Dealers
export const registerDealer = (data) => api.post('/dealers/register', data);

// Blogs
export const getBlogs = (params) => api.get('/blogs', { params });
export const getBlog = (slug) => api.get(`/blogs/${slug}`);
export const getRelatedBlogs = (slug) => api.get(`/blogs/${slug}/related`);
export const addBlogComment = (slug, data) => api.post(`/blogs/${slug}/comments`, data);

// Gallery
export const getGalleryImages = (params) => api.get('/gallery', { params });

// Testimonials
export const getTestimonials = () => api.get('/testimonials');

// Contact
export const submitContactMessage = (data) => api.post('/contact', data);

// Newsletter
export const subscribeNewsletter = (email) => api.post('/newsletter/subscribe', { email });

// Settings
export const getSettings = () => api.get('/settings');

// SEO
export const getPageSEO = (page) => api.get(`/seo/${page}`);

// Admin APIs
export const getDashboardStats = () => api.get('/admin/dashboard');
export const getAdminProducts = (params) => api.get('/products/admin/all', { params });
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const getAdminBulkOrders = (params) => api.get('/bulk-orders', { params });
export const updateBulkOrder = (id, data) => api.put(`/bulk-orders/${id}`, data);
export const deleteBulkOrder = (id) => api.delete(`/bulk-orders/${id}`);
export const getAdminDealers = (params) => api.get('/dealers', { params });
export const updateDealer = (id, data) => api.put(`/dealers/${id}`, data);
export const deleteDealer = (id) => api.delete(`/dealers/${id}`);
export const getAdminBlogs = () => api.get('/blogs/admin/all');
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
export const createGalleryImage = (data) => api.post('/gallery', data);
export const updateGalleryImage = (id, data) => api.put(`/gallery/${id}`, data);
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);
export const getAdminTestimonials = () => api.get('/testimonials/admin/all');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);
export const getAdminMessages = (params) => api.get('/contact', { params });
export const deleteMessage = (id) => api.delete(`/contact/${id}`);
export const getAllSEO = () => api.get('/seo');
export const updatePageSEO = (page, data) => api.put(`/seo/${page}`, data);
export const updateSettings = (data) => api.put('/settings', data);
export const uploadImage = (formData) => api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const uploadMultipleImages = (formData) => api.post('/upload/multiple', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteImage = (publicId) => api.delete(`/upload/${publicId}`);
export const getSubscribers = () => api.get('/newsletter');

export default api;

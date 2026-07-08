import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { submitBulkOrder } from '../../api';

const BulkOrder = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (formData) => {
    try {
      await submitBulkOrder(formData);
      setSuccess(true);
      reset();
      window.scrollTo(0, 0);
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const indianStates = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  return (
    <>
      <SEOHead title="Request Bulk Order" description="Place a bulk order for wooden Sindhora, wedding items, and handicrafts. Wholesale pricing from manufacturer. Fill our enquiry form." canonical="/bulk-order" />

      <section className="pt-28 pb-12 bg-primary">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Bulk Order' }]} />
          <h1 className="font-heading text-display-sm text-white font-bold mt-4">Request Bulk Order</h1>
          <p className="text-white/70 mt-2 max-w-xl">Fill in the form below and our wholesale team will contact you within 24 hours with pricing and availability.</p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-narrow">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
              <HiCheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="font-heading text-heading-2 text-primary mb-3">Enquiry Submitted Successfully</h2>
              <p className="text-text mb-6">Thank you for your interest in Sanjay Industries. Our wholesale team will review your requirements and contact you within 24 hours.</p>
              <button onClick={() => setSuccess(false)} className="btn-primary">Submit Another Enquiry</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="card p-8 md:p-10">
              <h2 className="font-heading text-heading-2 text-primary mb-2">Bulk Order Enquiry Form</h2>
              <p className="text-text text-sm mb-8">Fields marked with * are required.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="input-label">Full Name *</label>
                  <input {...register('name', { required: 'Name is required' })} className="input-field" placeholder="Your full name" />
                  {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="input-label">Company Name</label>
                  <input {...register('companyName')} className="input-field" placeholder="Your company name" />
                </div>

                <div>
                  <label className="input-label">GST Number</label>
                  <input {...register('gstNumber')} className="input-field" placeholder="e.g., 09AAACH7409R1ZH" />
                </div>

                <div>
                  <label className="input-label">Phone Number *</label>
                  <input {...register('phone', { required: 'Phone is required' })} className="input-field" placeholder="+91 XXXXX XXXXX" />
                  {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="input-label">Email Address *</label>
                  <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="input-field" placeholder="you@company.com" type="email" />
                  {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="input-label">City *</label>
                  <input {...register('city', { required: 'City is required' })} className="input-field" placeholder="Your city" />
                  {errors.city && <p className="text-error text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="input-label">State *</label>
                  <select {...register('state', { required: 'State is required' })} className="input-field">
                    <option value="">Select State</option>
                    {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-error text-xs mt-1">{errors.state.message}</p>}
                </div>

                <div>
                  <label className="input-label">Country</label>
                  <input {...register('country')} className="input-field" placeholder="India" defaultValue="India" />
                </div>
              </div>

              <div className="mt-5">
                <label className="input-label">Products Required *</label>
                <textarea {...register('products', { required: 'Products info is required' })} className="input-field" rows={3} placeholder="Describe the products you need — e.g., Red Sindhora (round), Kumkum Box Set, etc." />
                {errors.products && <p className="text-error text-xs mt-1">{errors.products.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="input-label">Quantity *</label>
                  <input {...register('quantity', { required: 'Quantity is required' })} className="input-field" placeholder="e.g., 500 pieces" />
                  {errors.quantity && <p className="text-error text-xs mt-1">{errors.quantity.message}</p>}
                </div>
                <div>
                  <label className="input-label">Expected Budget</label>
                  <input {...register('expectedBudget')} className="input-field" placeholder="e.g., ₹10,000 – ₹25,000" />
                </div>
              </div>

              <div className="mt-5">
                <label className="input-label">Additional Message</label>
                <textarea {...register('message')} className="input-field" rows={3} placeholder="Any specific requirements — custom colours, packaging, delivery timeline, etc." />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full md:w-auto">
                {isSubmitting ? 'Submitting...' : 'Submit Bulk Order Enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default BulkOrder;

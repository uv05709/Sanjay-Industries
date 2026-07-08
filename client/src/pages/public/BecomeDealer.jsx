import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { registerDealer } from '../../api';

const BecomeDealer = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try { await registerDealer(data); setSuccess(true); reset(); window.scrollTo(0, 0); }
    catch (error) { alert(error.response?.data?.message || 'Something went wrong.'); }
  };

  return (
    <>
      <SEOHead title="Become a Dealer" description="Apply to become an authorised dealer of Sanjay Industries. Wholesale pricing, reliable supply, and a product range your customers will love." canonical="/become-dealer" />
      <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Become a Dealer' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Become a Dealer</h1><p className="text-white/70 mt-2 max-w-xl">Join our network of 200+ dealers across India. We offer competitive wholesale pricing and consistent quality.</p></div></section>
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
              <HiCheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="font-heading text-heading-2 text-primary mb-3">Application Submitted</h2>
              <p className="text-text mb-6">Thank you for your interest. Our team will review your application and contact you within 3–5 business days.</p>
              <button onClick={() => setSuccess(false)} className="btn-primary">Submit Another Application</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="card p-8 md:p-10">
              <h2 className="font-heading text-heading-2 text-primary mb-6">Dealer Registration Form</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="input-label">Full Name *</label><input {...register('name', { required: 'Required' })} className="input-field" />{errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}</div>
                <div><label className="input-label">Company Name *</label><input {...register('companyName', { required: 'Required' })} className="input-field" />{errors.companyName && <p className="text-error text-xs mt-1">{errors.companyName.message}</p>}</div>
                <div><label className="input-label">GST Number</label><input {...register('gstNumber')} className="input-field" /></div>
                <div><label className="input-label">Phone *</label><input {...register('phone', { required: 'Required' })} className="input-field" />{errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}</div>
                <div><label className="input-label">Email *</label><input {...register('email', { required: 'Required' })} className="input-field" type="email" />{errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}</div>
                <div><label className="input-label">City *</label><input {...register('city', { required: 'Required' })} className="input-field" />{errors.city && <p className="text-error text-xs mt-1">{errors.city.message}</p>}</div>
                <div><label className="input-label">State *</label><input {...register('state', { required: 'Required' })} className="input-field" />{errors.state && <p className="text-error text-xs mt-1">{errors.state.message}</p>}</div>
                <div><label className="input-label">Business Type *</label><select {...register('businessType', { required: 'Required' })} className="input-field"><option value="">Select</option><option value="retailer">Retailer</option><option value="wholesaler">Wholesaler</option><option value="distributor">Distributor</option><option value="gift-shop">Gift Shop</option><option value="wedding-supplier">Wedding Supplier</option><option value="religious-store">Religious Store</option><option value="other">Other</option></select>{errors.businessType && <p className="text-error text-xs mt-1">{errors.businessType.message}</p>}</div>
                <div><label className="input-label">Years in Business</label><input {...register('yearsInBusiness')} className="input-field" type="number" /></div>
                <div><label className="input-label">Annual Turnover</label><input {...register('annualTurnover')} className="input-field" placeholder="e.g., ₹10L – ₹50L" /></div>
              </div>
              <div className="mt-5"><label className="input-label">Products of Interest</label><textarea {...register('productInterest')} className="input-field" rows={2} placeholder="Which product categories interest you?" /></div>
              <div className="mt-5"><label className="input-label">Additional Message</label><textarea {...register('message')} className="input-field" rows={3} /></div>
              <button type="submit" disabled={isSubmitting} className="btn-primary mt-8">{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};
export default BecomeDealer;

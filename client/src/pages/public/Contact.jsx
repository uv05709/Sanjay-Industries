import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiCheckCircle } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { submitContactMessage } from '../../api';
import { useSettings } from '../../context/SettingsContext';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [success, setSuccess] = useState(false);
  const { settings } = useSettings();

  const onSubmit = async (data) => {
    try { await submitContactMessage(data); setSuccess(true); reset(); }
    catch (error) { alert(error.response?.data?.message || 'Something went wrong.'); }
  };

  const address = settings.contactInfo?.address || {};
  const addressStr = [address.street, address.city, address.state].filter(Boolean).join(', ') + (address.pincode ? ` — ${address.pincode}` : '');
  const whatsappNumber = settings.contactInfo?.whatsapp || settings.contactInfo?.phone?.replace(/[^0-9]/g, '') || '';

  const contactInfo = [
    { icon: HiLocationMarker, title: 'Visit Us', lines: [addressStr || 'Varanasi, Uttar Pradesh', address.country || 'India'] },
    { icon: HiPhone, title: 'Call Us', lines: [settings.contactInfo?.phone || 'Contact us for details'].filter(Boolean) },
    { icon: HiMail, title: 'Email Us', lines: [settings.contactInfo?.email || 'info@sanjayindustries.com'].filter(Boolean) },
    { icon: HiClock, title: 'Working Hours', lines: [settings.workingHours?.weekdays || 'Mon–Sat: 9:00 AM – 7:00 PM', settings.workingHours?.weekends || 'Sunday: Closed'] },
  ];

  return (
    <>
      <SEOHead title="Contact Us" description="Get in touch with Sanjay Industries, Varanasi. Contact for wholesale enquiries, bulk orders, dealer registration, and general information." canonical="/contact" />
      <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Contact' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Contact Us</h1><p className="text-white/70 mt-2">We would love to hear from you. Reach out for wholesale enquiries, bulk orders, or any questions.</p></div></section>

      <section className="section-padding bg-cream">
        <div className="container-custom">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading text-lg text-primary font-semibold mb-2">{item.title}</h3>
                {item.lines.map((line, j) => <p key={j} className="text-text text-sm">{line}</p>)}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              {success ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-8 text-center">
                  <HiCheckCircle className="w-14 h-14 text-success mx-auto mb-4" />
                  <h3 className="font-heading text-heading-3 text-primary mb-2">Message Sent</h3>
                  <p className="text-text text-sm mb-4">We will get back to you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="btn-outline">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
                  <h2 className="font-heading text-heading-2 text-primary mb-6">Send Us a Message</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className="input-label">Name *</label><input {...register('name', { required: 'Required' })} className="input-field" />{errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}</div>
                    <div><label className="input-label">Email *</label><input {...register('email', { required: 'Required' })} className="input-field" type="email" />{errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}</div>
                    <div><label className="input-label">Phone</label><input {...register('phone')} className="input-field" /></div>
                    <div><label className="input-label">Subject *</label><input {...register('subject', { required: 'Required' })} className="input-field" />{errors.subject && <p className="text-error text-xs mt-1">{errors.subject.message}</p>}</div>
                  </div>
                  <div className="mt-5"><label className="input-label">Message *</label><textarea {...register('message', { required: 'Required' })} className="input-field" rows={5} />{errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}</div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary mt-6">{isSubmitting ? 'Sending...' : 'Send Message'}</button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <div className="card overflow-hidden h-full min-h-[400px]">
                <iframe
                  src={settings.googleMapsEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115014.00946455225!2d82.91198555!3d25.320555849999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"}
                  width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Sanjay Industries Location - Varanasi"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          {whatsappNumber && (
            <div className="mt-12 text-center">
              <p className="text-text mb-4">Prefer to chat? Reach us directly on WhatsApp for a faster response.</p>
              <a href={`https://wa.me/${whatsappNumber}?text=Hello%20Sanjay%20Industries`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold text-sm rounded-md hover:bg-[#1DA851] transition-colors">
                <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default Contact;

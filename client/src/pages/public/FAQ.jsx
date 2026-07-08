import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';

const faqs = [
  { q: 'What products does Sanjay Industries manufacture?', a: 'We manufacture wooden Sindhora (sindoor boxes), kumkum boxes, haldi-kumkum sets, pooja chowki, dry fruit boxes, jewellery boxes, decorative items, and custom wooden handicrafts. All products are handcrafted in our Varanasi workshop.' },
  { q: 'What is the Minimum Order Quantity (MOQ)?', a: 'MOQ varies by product. For basic Sindhora, the MOQ is 100 pieces. For premium Meenakari pieces, it is 50. For large decorative items, it can be as low as 25 pieces. Contact us for specific product MOQs.' },
  { q: 'Do you offer wholesale pricing?', a: 'Yes, we are a wholesale manufacturer. All prices on our website are wholesale rates. For orders above 1,000 pieces, we offer additional volume discounts. Contact our sales team for custom quotes.' },
  { q: 'Can you customise products with our branding?', a: 'Absolutely. We offer custom colours, designs, and branding on all products. For logo printing or custom artwork, the MOQ is 200+ pieces. We provide samples before bulk production.' },
  { q: 'What materials do you use?', a: 'We primarily use Gamhar wood (Gmelina arborea), Mango wood, and Sheesham wood (Indian Rosewood). All paints are lead-free, non-toxic lacquer colours. We use only food-safe linings where applicable.' },
  { q: 'Do you deliver across India?', a: 'Yes, we deliver to all major cities across India via trusted transport partners. Products are bubble-wrapped and packed in corrugated boxes. Delivery typically takes 5–7 days after dispatch.' },
  { q: 'How do I place a bulk order?', a: 'You can fill our Bulk Order form on the website, call us, or message us on WhatsApp. Our team will share a quote with product images, MOQ, pricing, and delivery timeline within 24 hours.' },
  { q: 'What are your payment terms?', a: 'For first-time orders: 100% advance payment. For repeat customers: 50% advance, 50% before dispatch. We accept bank transfers (NEFT/RTGS/IMPS), UPI, and cheque payments.' },
  { q: 'Can I order samples before placing a bulk order?', a: 'Yes, we encourage it. Sample charges are typically at retail price and are adjusted against your first bulk order. We ship samples via courier for quick delivery.' },
  { q: 'Are your products eco-friendly?', a: 'Yes. We use sustainably sourced wood, non-toxic paints, and minimal plastic in packaging. Our products are a greener alternative to plastic and metal items.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <SEOHead title="Frequently Asked Questions" description="Frequently asked questions about Sanjay Industries — MOQ, pricing, delivery, custom orders, and more." canonical="/faq" jsonLd={faqSchema} />
      <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'FAQ' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Frequently Asked Questions</h1></div></section>
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-primary text-sm pr-4">{faq.q}</span>
                  <HiChevronDown className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-5 pb-5 text-text text-sm leading-relaxed border-t border-cream-dark pt-4">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default FAQ;

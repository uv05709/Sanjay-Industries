import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import SectionHeading from '../../components/common/SectionHeading';

const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }} className={className}>{children}</motion.div>
);

const steps = [
  { step: '01', title: 'Wood Sourcing & Selection', desc: 'We source seasoned Gamhar, Mango, and Sheesham wood from trusted suppliers in and around Varanasi. Only wood with the right grain density, moisture content, and structural integrity makes it past our selection process.', detail: 'Each log is inspected for knots, cracks, and irregularities before being approved for production.' },
  { step: '02', title: 'Cutting & Block Preparation', desc: 'Selected logs are cut into blocks of appropriate size using power saws. Each block is measured and marked according to the product it will become — whether a small Sindhora or a large decorative box.', detail: 'Precision at this stage ensures minimal waste and consistent sizing across large batches.' },
  { step: '03', title: 'Lathe Turning & Shaping', desc: 'The heart of our process. Wood blocks are mounted on traditional and semi-automatic lathes where skilled turners shape them into round boxes, bowls, and containers. The lid and body are turned separately to ensure a precise fit.', detail: 'Our turners have 10–30 years of experience — each one can shape a Sindhora in under 2 minutes.' },
  { step: '04', title: 'Drying & Treatment', desc: 'Shaped pieces are air-dried in controlled conditions to reach optimal moisture levels. This prevents warping, cracking, or shrinking after the product reaches the end customer.', detail: 'Depending on the season, drying takes 24–72 hours. We never rush this step.' },
  { step: '05', title: 'Base Coating & Lacquer Application', desc: 'Dried pieces are mounted back on the lathe for the painting process. Coloured lac sticks are held against the spinning piece, creating vibrant, even coats of colour — red, gold, green, blue, or any custom shade.', detail: 'We use only lead-free, non-toxic lac paints that are safe for daily use and skin contact.' },
  { step: '06', title: 'Hand Painting & Meenakari Work', desc: 'For premium products, our master artisans hand-paint intricate designs — floral patterns, paisley motifs, geometric borders, and traditional Meenakari artwork using fine brushes and specialised paints.', detail: 'A single Meenakari Sindhora can take 15–20 minutes of painting time. No stencils, no shortcuts.' },
  { step: '07', title: 'Polishing & Quality Inspection', desc: 'Finished pieces receive a final polish for a smooth, lustrous surface. Every single product is then inspected for colour consistency, structural integrity, lid fit, and surface quality.', detail: 'Products that do not meet our standards are reworked or removed from the batch.' },
  { step: '08', title: 'Packaging & Dispatch', desc: 'Approved products are individually wrapped in bubble wrap, grouped by type and quantity, and packed into corrugated boxes with thermocol padding for fragile items. Ready for delivery across India.', detail: 'We partner with reliable transport services for safe, timely delivery to your doorstep.' },
];

const Manufacturing = () => (
  <>
    <SEOHead title="Manufacturing Process" description="See how Sanjay Industries manufactures every wooden product — from raw wood to finished art. Our 8-step handcrafted manufacturing process." canonical="/manufacturing" />
    <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Manufacturing Process' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Our Manufacturing Process</h1><p className="text-white/70 mt-2 max-w-xl">Every product goes through 8 meticulous steps — combining traditional techniques with modern quality standards.</p></div></section>

    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {steps.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex gap-6 mb-12 last:mb-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg font-heading">{item.step}</div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-accent/30 mt-3" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading text-heading-3 text-primary font-semibold mb-2">{item.title}</h3>
                  <p className="text-text leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-text-light text-sm italic">{item.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/bulk-order" className="btn-primary">Request a Bulk Order <HiArrowRight className="ml-2 w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  </>
);
export default Manufacturing;

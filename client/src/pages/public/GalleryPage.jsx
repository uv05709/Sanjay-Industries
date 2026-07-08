import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getGalleryImages } from '../../api';

const categories = ['all', 'products', 'workshop', 'process', 'team', 'packaging'];

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    try { const { data } = await getGalleryImages(); setImages(data.images || []); }
    catch (e) { setImages([]); }
  };

  const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <>
      <SEOHead title="Photo Gallery" description="Explore our workshop, manufacturing process, and product gallery. See how Sanjay Industries crafts every wooden piece by hand." canonical="/gallery" />
      <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Gallery' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Photo Gallery</h1><p className="text-white/70 mt-2">A visual journey through our workshop, process, and products.</p></div></section>
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-md text-sm font-medium capitalize transition-colors ${filter === cat ? 'bg-primary text-white' : 'bg-white text-text border border-cream-darker hover:border-primary'}`}>{cat}</button>
            ))}
          </div>
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <motion.div key={img._id || i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="break-inside-avoid">
                  <div className="card overflow-hidden group"><img src={img.image?.url} alt={img.title} className="w-full group-hover:scale-105 transition-transform duration-700" loading="lazy" /><div className="p-3"><p className="text-sm text-primary font-medium">{img.title}</p>{img.description && <p className="text-xs text-text-light mt-1">{img.description}</p>}</div></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16"><p className="text-text-light">Gallery images will appear here once uploaded from the admin panel.</p></div>
          )}
        </div>
      </section>
    </>
  );
};
export default GalleryPage;

import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle, center = true, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : ''} ${className}`}
    >
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      <div className={`divider my-4 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`section-subtitle mt-4 ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

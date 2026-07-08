import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        <li>
          <Link to="/" className="flex items-center gap-1 text-text-light hover:text-primary transition-colors">
            <HiHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <HiChevronRight className="w-3.5 h-3.5 text-text-light" />
            {item.path ? (
              <Link to={item.path} className="text-text-light hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

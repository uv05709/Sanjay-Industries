const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 border-4 border-cream-dark rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
        <div className="font-heading text-xl text-primary font-semibold">Sanjay Industries</div>
        <div className="text-xs text-text-light tracking-[0.15em] uppercase mt-1">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;

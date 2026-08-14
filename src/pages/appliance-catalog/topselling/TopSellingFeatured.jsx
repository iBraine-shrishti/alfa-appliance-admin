const TopSellingFeatured = ({ product, onEdit }) => {
  if (!product) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded border-2 border-dashed border-slate-200 text-center text-slate-400">
        <p className="text-sm font-semibold">No product assigned</p>
        <p className="text-xs">Assign a product to the featured spot</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded bg-navy-950">
      <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
        Featured Spot
      </span>

      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-contain p-8"
      />

      <div className="relative bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent px-6 py-6">
        <h3 className="text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-1 text-xl font-extrabold text-white">${product.price}</p>
        <button
          type="button"
          onClick={onEdit}
          className="mt-3 rounded bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default TopSellingFeatured;

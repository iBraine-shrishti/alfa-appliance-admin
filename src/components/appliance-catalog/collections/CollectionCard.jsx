import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/admin/appliance-catalog/collections/${collection.slug}`}
      className="rounded border border-slate-200 bg-white p-6 transition-colors hover:border-blue-200"
    >
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="mt-5 text-base font-bold text-navy-950">{collection.title}</h3>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-sm text-slate-400">{collection.productCount} Products</p>
        <FiArrowRight size={15} className="text-slate-300" />
      </div>
    </Link>
  );
};

export default CollectionCard;
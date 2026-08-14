import { useParams, Link } from "react-router-dom";
import { FiDownload, FiPlus, FiChevronDown } from "react-icons/fi";
import { adminCollections } from "../../../data/adminCollections";
import { getCollectionProducts } from "../../../data/collectionProducts";
import CollectionProductsTable from "../../../components/appliance-catalog/collections/CollectionProductsTable";

const CollectionDetail = () => {
  const { slug } = useParams();
  const collection = adminCollections.find((c) => c.slug === slug);
  const products = getCollectionProducts(slug);

  if (!collection) {
    return (
      <div className="rounded border border-slate-200 bg-white p-8 text-center text-slate-400">
        <p>Collection not found.</p>
        <Link to="/admin/appliance-catalog/collections" className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline">
          Back to All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-extrabold uppercase text-navy-950">{collection.title}</h1>
          <p className="mt-1 text-sm text-slate-400">{collection.productCount} Products</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiDownload size={15} />
            Export CSV
          </button>
          <Link
            to="/admin/appliance-catalog/add-product"
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <FiPlus size={15} />
            Add Product
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded border border-slate-200 bg-white px-5 py-4">
        <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
          FILTERS:
        </span>
        {["All Brands", "Any Price", "All Stock Status"].map((label) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-1.5 rounded border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            {label}
            <FiChevronDown size={13} />
          </button>
        ))}
      </div>

      <CollectionProductsTable products={products} />
    </div>
  );
};

export default CollectionDetail;

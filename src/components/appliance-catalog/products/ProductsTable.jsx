import { FiEdit2, FiTrash2 } from "react-icons/fi";
import StatusBadge from "../../StatusBadge";
import Pagination from "../../Pagination";

const STATUS_TONE = { "On Sale": "blue", Active: "slate" };

const ProductsTable = ({ products, page, totalPages, totalEntries, pageSize, onPageChange }) => {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold tracking-wider text-slate-500">
              <th className="px-5 py-3">Image</th>
              <th className="px-5 py-3">Product Information</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Inventory</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-4">
                  <div className="h-11 w-11 rounded-full bg-slate-100" />
                </td>
                <td className="px-5 py-4">
                  <p className="font-bold text-navy-950">{product.name}</p>
                  <p className="text-xs text-slate-400">URL: /{product.id}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-block rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {product.category.toUpperCase()}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {product.inventory > 0 ? (
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {product.inventory} in stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-semibold text-blue-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      Out of stock
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 font-bold text-navy-950">${product.price.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <StatusBadge label={product.status} tone={STATUS_TONE[product.status]} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <button type="button" className="text-slate-400 hover:text-blue-600" aria-label="Edit">
                      <FiEdit2 size={15} />
                    </button>
                    <button type="button" className="text-slate-400 hover:text-red-600" aria-label="Delete">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalEntries={totalEntries}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductsTable;

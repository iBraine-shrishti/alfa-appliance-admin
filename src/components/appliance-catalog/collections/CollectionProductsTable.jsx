import StatusBadge from "../../StatusBadge";

const STOCK_TONE = { "In Stock": "green", "Low Stock": "amber", "Out of Stock": "red" };

const CollectionProductsTable = ({ products }) => {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-navy-950 text-xs font-bold tracking-wider text-white">
              <th className="px-5 py-3">Image</th>
              <th className="px-5 py-3">Model Name</th>
              <th className="px-5 py-3">Brand</th>
              <th className="px-5 py-3">Price (£)</th>
              <th className="px-5 py-3">Stock Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-4">
                 
               <div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded bg-slate-100"><img src={product.image} alt={product.model} className="h-full w-full object-cover p-1" /></div>
   
                </td>
                <td className="px-5 py-4 font-semibold text-navy-950">{product.model}</td>
                <td className="px-5 py-4 text-slate-500">{product.brand}</td>
                <td className="px-5 py-4 font-bold text-navy-950">{product.price.toFixed(2)}</td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={
                      product.stockStatus === "Low Stock"
                        ? `Low Stock (${product.stockCount})`
                        : product.stockStatus
                    }
                    tone={STOCK_TONE[product.stockStatus]}
                  />
                </td>
                <td className="px-5 py-4">
                  <button type="button" className="text-sm font-semibold text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionProductsTable;

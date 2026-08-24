import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import ProductFilters from "../../components/appliance-catalog/products/ProductFilters";
import ProductsTable from "../../components/appliance-catalog/products/ProductsTable";
import { fetchAdminProducts, deleteProduct } from "../../services/api";

const PAGE_SIZE = 10;

const AllProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchAdminProducts();
    setProductsList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const ok = await deleteProduct(id);
      if (ok) {
        setProductsList((prev) => prev.filter((p) => p.id !== id));
      }
    }
  };

  const filtered = useMemo(() => {
    return productsList.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesStatus = !status || p.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [productsList, search, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="INVENTORY MANAGEMENT"
        title={
          <>
            All <span className="text-blue-600">Products</span>
          </>
        }
        subtitle={loading ? "Loading inventory..." : `Managing ${productsList.length} products`}
        actions={
          <Link
            to="/admin/appliance-catalog/add-product"
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <FiPlus size={15} />
            Add Product
          </Link>
        }
      />

      <ProductFilters
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        category={category}
        onCategoryChange={(v) => { setCategory(v); setPage(1); }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
      />

      <ProductsTable
        products={pageProducts}
        page={page}
        totalPages={totalPages}
        totalEntries={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default AllProducts;

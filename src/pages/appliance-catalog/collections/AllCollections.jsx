import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";
import PageHeader from "../../../components/PageHeader";
import CollectionCard from "../../../components/appliance-catalog/collections/CollectionCard";
import { adminCollections } from "../../../data/adminCollections";

const AllCollections = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return adminCollections;
    const q = search.toLowerCase();
    return adminCollections.filter((c) => c.title.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="All Collections"
        actions={
          <Link
            to="/admin/appliance-catalog/collections/create"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <FiPlus size={15} />
            Create Collection
          </Link>
        }
      />

      <div className="relative w-full max-w-md">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search collections..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filtered.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default AllCollections;

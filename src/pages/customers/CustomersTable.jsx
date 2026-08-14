import { FiMapPin } from "react-icons/fi";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";

const STATUS_TONE = { Subscribed: "green", Guest: "slate" };

const CustomersTable = ({ customers, page, totalPages, totalEntries, pageSize, onPageChange }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-navy-950 text-xs font-bold tracking-wider text-white">
              <th className="w-10 px-5 py-3">
                <input type="checkbox" className="rounded border-white/30" />
              </th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Orders</th>
              <th className="px-5 py-3">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-4">
                  <input type="checkbox" className="rounded border-slate-300" />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {c.initials}
                    </span>
                    <div>
                      <p className="font-semibold text-navy-950">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge label={c.status} tone={STATUS_TONE[c.status]} dot={c.status === "Subscribed"} />
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {c.location ? (
                    <span className="flex items-center gap-1.5">
                      <FiMapPin size={13} />
                      {c.location}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <FiMapPin size={13} />
                      Unknown
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {c.orders} {c.orders === 1 ? "Order" : "Orders"}
                  </span>
                </td>
                <td className="px-5 py-4 font-bold text-navy-950">${c.totalSpent}</td>
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

export default CustomersTable;

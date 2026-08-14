import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";

const PAYMENT_TONE = { Paid: "green", Pending: "amber", Failed: "red" };
const FULFILLMENT_TONE = {
  Delivered: "green",
  Processing: "blue",
  Unfulfilled: "amber",
  Cancelled: "slate",
};

const OrdersTable = ({ orders, page, totalPages, totalEntries, pageSize, onPageChange }) => {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <div className="flex items-center justify-between bg-navy-950 px-5 py-3.5">
        <p className="text-sm font-bold text-white">Recent Orders</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold tracking-wider text-slate-400">
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Fulfillment</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total (£)</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-4 font-bold text-navy-950">{order.id}</td>
                <td className="px-5 py-4 text-slate-500">{order.date}</td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-navy-950">{order.customerName}</p>
                  <p className="text-xs text-slate-400">{order.customerEmail}</p>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge label={order.payment} tone={PAYMENT_TONE[order.payment]} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={order.fulfillment}
                    tone={FULFILLMENT_TONE[order.fulfillment]}
                  />
                </td>
                <td className="px-5 py-4 text-slate-500">{order.items}</td>
                <td className="px-5 py-4 font-bold text-navy-950">£{order.total}</td>
                <td className="px-5 py-4">
                  <button type="button" className="text-sm font-semibold text-blue-600 hover:underline">
                    View Details
                  </button>
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

export default OrdersTable;

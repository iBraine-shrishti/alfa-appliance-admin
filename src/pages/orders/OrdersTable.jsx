import { useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import { FiEye, FiTrash2, FiX } from "react-icons/fi";

const PAYMENT_TONE = { Paid: "green", Pending: "amber", Failed: "red" };
const FULFILLMENT_TONE = {
  Delivered: "green",
  Processing: "blue",
  Unfulfilled: "amber",
  Cancelled: "slate",
};

const OrdersTable = ({ orders, page, totalPages, totalEntries, pageSize, onPageChange, onDelete }) => {
  const [deleteOrder, setDeleteOrder] = useState(null);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-navy-950 px-5 py-3.5">
        <p className="text-sm font-bold text-white">Recent Orders</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Item</th>
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
              <tr key={order.id} className="border-b border-slate-50 transition-colors last:border-0 hover:bg-blue-50/30">
                <td className="px-5 py-4 font-bold text-navy-950">{order.id}</td>
                <td className="px-5 py-4"><div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded bg-slate-50"><img src={order.image} alt="Order item" className="h-full w-full object-cover p-1" /></div></td>
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
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/orders/${encodeURIComponent(order.id)}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      aria-label={`View details for ${order.id}`}
                      title="View details"
                    >
                      <FiEye size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteOrder(order)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${order.id}`}
                      title="Delete order"
                    >
                      <FiTrash2 size={14} />
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

      {deleteOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-600">Delete order</p>
                <h2 className="mt-2 text-xl font-extrabold text-navy-950">Remove {deleteOrder.id}?</h2>
              </div>
              <button type="button" onClick={() => setDeleteOrder(null)} className="text-slate-400 hover:text-navy-950" aria-label="Close dialog">
                <FiX size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">This order will be removed from the current order list. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setDeleteOrder(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={() => { onDelete(deleteOrder.id); setDeleteOrder(null); }} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500">Delete order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;

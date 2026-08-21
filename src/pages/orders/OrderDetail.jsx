import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiBox, FiCheckCircle, FiMapPin, FiMoreHorizontal, FiPrinter, FiTrash2, FiUser, FiMail, FiPhone, FiTag } from "react-icons/fi";
import StatusBadge from "../../components/StatusBadge";
import { adminOrders } from "../../data/adminOrders";

const OrderDetail = () => {
  const { orderId } = useParams();
  const id = decodeURIComponent(orderId || "");
  const order = adminOrders.find((entry) => entry.id === id);

  if (!order) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-lg font-extrabold text-navy-950">Order not found</p>
        <Link to="/admin/orders" className="mt-3 inline-flex text-sm font-semibold text-blue-600 hover:underline">Back to orders</Link>
      </div>
    );
  }

  const unitPrice = Number(order.total.replace(/,/g, "")) / order.items;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Link to="/admin/orders" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-blue-600">
            <FiArrowLeft size={14} /> Back to orders
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-navy-950">{order.id}</h1>
            <StatusBadge label={order.payment} tone="green" dot />
            <StatusBadge label={order.fulfillment} tone="blue" dot />
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{order.date} at 4:57 PM</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-100"><FiTrash2 size={14} /> Delete order</button>
          <button type="button" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-navy-950 hover:bg-slate-50"><FiPrinter size={14} /> Print order</button>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50" aria-label="More actions"><FiMoreHorizontal size={17} /></button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.95fr)]">
        <div className="flex flex-col gap-6">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-950"><FiBox className="text-red-500" size={15} /> Order items ({order.items})</p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Standard shipping</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 sm:flex-row sm:items-center">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-cyan-300 shadow-lg shadow-blue-950/15">
                  <span className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-blue-600/40" />
                    <img src={order.image} alt="Ordered appliance" className="relative h-full w-full object-contain p-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-extrabold tracking-tight text-navy-950">Alfa appliance order bundle</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-400"><FiTag size={12} className="text-blue-600" /> SKU: ALFA-{order.id.replace("#ORD-", "")}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 shadow-sm">Premium appliance</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">In catalog</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Line total</p>
                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-navy-950">£{order.total}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">{order.items} items</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unit price</p><p className="mt-1 font-extrabold text-navy-950">£{unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quantity</p><p className="mt-1 font-extrabold text-navy-950">{order.items}</p></div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shipping</p><p className="mt-1 font-extrabold text-navy-950">Standard</p></div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p><p className="mt-1 flex items-center gap-1.5 font-extrabold text-blue-600"><FiCheckCircle size={13} /> {order.fulfillment}</p></div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-950">Payment summary</p></div>
            <div className="space-y-4 px-6 py-6 text-sm"><div className="flex justify-between"><span className="font-semibold text-slate-500">Subtotal ({order.items} items)</span><span className="font-bold text-navy-950">£{order.total}</span></div><div className="flex justify-between"><span className="font-semibold text-slate-500">Shipping</span><span className="font-bold text-navy-950">£0.00</span></div><div className="flex justify-between"><span className="font-semibold text-slate-500">Tax (0%)</span><span className="font-bold text-navy-950">£0.00</span></div><div className="border-t border-slate-200 pt-5 flex justify-between"><span className="font-extrabold uppercase tracking-[0.14em] text-navy-950">Total</span><span className="text-2xl font-extrabold text-red-600">£{order.total}</span></div></div>
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Payment method</p><p className="mt-1 text-sm font-bold text-navy-950">Paid by customer</p></div>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-950"><FiUser className="text-blue-600" size={15} /> Customer profile</p>
              <button type="button" className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline">Edit</button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-extrabold text-blue-600">{order.customerName.charAt(0)}</span>
              <div><p className="font-extrabold text-navy-950">{order.customerName}</p><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registered user</p></div>
            </div>
            <div className="mt-7 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Contact information</p>
              <p className="flex items-center gap-2 text-xs font-semibold text-blue-600"><FiMail size={13} /> {order.customerEmail}</p>
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-500"><FiPhone size={13} /> +44 7624 984192</p>
              <p className="flex items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400"><FiMapPin className="text-cyan-600" size={13} /> Shipping address</p>
              <p className="text-xs font-semibold leading-5 text-navy-950">{order.customerName}<br /><span className="text-blue-600">ALFA HOUSE</span><br /><span className="text-slate-500">London, United Kingdom</span></p>
              <button type="button" className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:underline">View on map</button>
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-950">Internal notes</p><button type="button" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:underline">Edit</button></div><p className="mt-7 text-xs font-bold uppercase italic tracking-wider text-slate-400">No internal notes for this order</p></section>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;
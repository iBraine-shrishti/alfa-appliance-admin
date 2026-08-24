import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiBox, FiCalendar, FiMapPin, FiMail, FiPhone, FiTrash2, FiUser } from "react-icons/fi";
import StatusBadge from "../../components/StatusBadge";
import { fetchCustomerDetail } from "../../services/api";

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      const data = await fetchCustomerDetail(customerId || "1");
      setCustomer(data);
      setLoading(false);
    };
    loadDetail();
  }, [customerId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
        Loading customer #{customerId} details...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-extrabold text-navy-950">Customer not found</p>
        <Link to="/admin/customers" className="mt-3 inline-block text-sm font-bold text-blue-600">Back to customers</Link>
      </div>
    );
  }

  const customerName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || customer.username;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="/admin/customers" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-blue-600">
            <FiArrowLeft size={14} /> Back to customers
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl font-extrabold text-blue-600">
              {customerName.charAt(0).toUpperCase()}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-navy-950">{customerName}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-slate-400">{customer.email}</p>
                <StatusBadge label="Active Account" tone="green" dot />
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-100">
          <FiTrash2 size={14} /> Delete customer
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.8fr)]">
        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-950">
            <FiUser className="text-blue-600" size={15} /> Account info
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b border-slate-100 pb-4 text-sm">
              <span className="font-semibold text-slate-400">Username</span>
              <b className="text-navy-950">{customer.username}</b>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-4 text-sm">
              <span className="font-semibold text-slate-400">Registered on</span>
              <b className="text-navy-950">{new Date(customer.date_joined || Date.now()).toLocaleDateString("en-GB")}</b>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Location</p>
              <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-navy-950">
                <FiMapPin className="mt-0.5 text-cyan-600" size={14} /> London, United Kingdom
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
              <p className="flex items-center gap-2"><FiMail size={13} /> {customer.email}</p>
              <p className="flex items-center gap-2"><FiPhone size={13} /> +44 7700 900088</p>
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-950">
            <FiBox className="text-blue-600" size={15} /> Recent Activity
          </p>
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <p className="text-xs font-extrabold text-navy-950">
                  ACCOUNT REGISTRATION <span className="ml-2 inline-flex items-center gap-1 font-semibold text-slate-400"><FiCalendar size={12} /> Live Account</span>
                </p>
                <StatusBadge label="Active" tone="green" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-600"><FiUser size={17} /></span>
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-600">Customer account registered.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerDetail;
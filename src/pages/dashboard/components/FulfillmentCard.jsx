import { FiTruck } from "react-icons/fi";

const FulfillmentCard = ({
  rate = 98.5,
  note,
  deliveryLabel = "ON-TIME DELIVERY",
  className = "",
}) => {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 ${className}`}>
      <p className="text-xs font-bold tracking-wider text-slate-400">
        FULFILLMENT RATE
      </p>
      <p className="mt-1 text-3xl font-extrabold text-navy-950">{rate}%</p>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>

      {note && <p className="mt-2 text-xs text-slate-400">{note}</p>}

      <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-blue-600">
        <FiTruck size={13} />
        {deliveryLabel}
      </p>
    </div>
  );
};

export default FulfillmentCard;
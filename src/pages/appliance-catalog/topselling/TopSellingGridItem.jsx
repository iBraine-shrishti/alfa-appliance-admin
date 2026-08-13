import { FiArrowUp, FiArrowDown, FiTrash2, FiPlus } from "react-icons/fi";

const TopSellingGridItem = ({ spot, product, onMoveUp, onMoveDown, onRemove, onAssign }) => {
  if (!product) {
    return (
      <button
        type="button"
        onClick={onAssign}
        className="flex min-h-[220px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <FiPlus size={18} />
        </span>
        <span className="text-xs font-bold tracking-wider">
          ASSIGN PRODUCT TO SPOT #{spot}
        </span>
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold tracking-wider text-slate-500">
          SPOT #{spot}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onMoveUp}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50"
            aria-label="Move up"
          >
            <FiArrowUp size={13} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50"
            aria-label="Move down"
          >
            <FiArrowDown size={13} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-red-500 hover:bg-red-50"
            aria-label="Remove"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

      <div className="flex h-28 items-center justify-center rounded-lg bg-slate-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-2" />
      </div>

      <p className="mt-3 text-sm font-semibold text-navy-950">{product.name}</p>
      <p className="mt-1 text-sm font-bold text-blue-600">${product.price}</p>
    </div>
  );
};

export default TopSellingGridItem;

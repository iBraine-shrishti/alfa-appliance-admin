const FIELD_LABEL = "mb-2 block text-xs font-bold tracking-wider text-slate-500";
const TEXTAREA_CLASS =
  "w-full resize-y rounded-b-lg border border-t-0 border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600";

const RichTextField = ({ label, placeholder, toolbar, rows = 4, value, onChange }) => {
  return (
    <div>
      <label className={FIELD_LABEL}>{label}</label>
      <div className="rounded-lg border border-slate-200">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2">
          <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-navy-950 outline-none">
            <option>Normal</option>
          </select>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            {toolbar.map((t) => (
              <span key={t} className="cursor-default px-1">
                {t}
              </span>
            ))}
          </div>
        </div>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={TEXTAREA_CLASS}
        />
      </div>
    </div>
  );
};

export default RichTextField;

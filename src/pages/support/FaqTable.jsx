import { FiEdit2, FiTrash2 } from "react-icons/fi";

const FaqTable = ({ faqs, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-navy-950 text-xs font-bold tracking-wider text-white">
              <th className="px-5 py-3">Question</th>
              <th className="px-5 py-3">Answer Preview</th>
              <th className="px-5 py-3">Product Assoc.</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b border-slate-50 last:border-0 align-top">
                <td className="max-w-xs px-5 py-4 font-semibold text-navy-950">
                  {faq.question}
                </td>
                <td className="max-w-sm px-5 py-4 text-slate-500">
                  <p className="line-clamp-1">{faq.answer}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-block rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                    {faq.product}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(faq)}
                      className="text-slate-400 hover:text-blue-600"
                      aria-label="Edit FAQ"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(faq.id)}
                      className="text-slate-400 hover:text-red-600"
                      aria-label="Delete FAQ"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
        <p className="text-sm text-slate-400">
          Showing 1 to {faqs.length} of {faqs.length} entries
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          Rows per page:
          <select className="rounded border border-slate-200 px-2 py-1 text-sm outline-none focus:border-blue-600">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FaqTable;

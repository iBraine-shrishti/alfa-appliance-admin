const PageHeader = ({ eyebrow, title, subtitle, actions }) => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        {eyebrow && (
          <p className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
};

export default PageHeader;

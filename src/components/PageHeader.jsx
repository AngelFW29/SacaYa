function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <span className="block text-xs font-bold tracking-wide uppercase text-green mb-1.5">
          {eyebrow}
        </span>
      )}
      <h1 className="font-display text-3xl font-semibold text-green-deep tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-text-soft mt-1">{subtitle}</p>}
    </div>
  );
}

export default PageHeader;

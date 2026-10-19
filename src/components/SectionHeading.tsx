export default function SectionHeading({ eyebrow, title, sub, light }: { eyebrow?: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-3 text-base leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

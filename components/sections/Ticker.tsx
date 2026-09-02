const ITEMS = [
  "Next.js", "TypeScript", "Supabase", "Claude", "Ollama", "Tailwind",
  "Product Design", "Burkina Faso", "Africa Tech", "FORGE Afrika",
  "Innovation", "Builder",
];

/**
 * Bandeau défilant. Purement décoratif : masqué aux lecteurs d'écran, et le
 * défilement s'arrête sous `prefers-reduced-motion` (règle globale CSS).
 */
export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden
      className="w-full select-none overflow-hidden border-y border-gold-3 bg-gold py-3"
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={`${item}-${i}`} className="flex flex-shrink-0 items-center">
            <span className="px-6 font-mono text-sm font-bold uppercase tracking-widest text-gold-ink">
              {item}
            </span>
            <span className="font-bold text-gold-ink/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

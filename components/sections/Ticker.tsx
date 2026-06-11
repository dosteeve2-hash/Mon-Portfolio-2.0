"use client";

const items = [
  "AI", "MIFA", "Project Africa", "Ollama", "Next.js", "Design",
  "Burkina Faso", "Innovation", "Claude", "TypeScript", "Supabase",
  "Web3", "Builder", "Africa Tech", "SDC",
];

export default function Ticker() {
  const repeated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-gold py-3 border-y border-gold-3 select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-bg px-6">
              {item}
            </span>
            <span className="text-bg/40 font-bold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

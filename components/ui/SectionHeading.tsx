import Reveal from "@/components/ui/Reveal";

interface SectionHeadingProps {
  /** Numéro de section affiché en mono, ex. "02" */
  num?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * En-tête de section unifié : même rythme typographique partout
 * (mono / Playfair italique / Outfit), au lieu d'un balisage recopié
 * légèrement différemment dans chaque section.
 */
export default function SectionHeading({
  num,
  eyebrow,
  title,
  accent,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={`${centered ? "text-center" : ""} ${className}`}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {num && (
          <span className="font-mono text-xs tabular-nums text-gold/70">{num}</span>
        )}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </span>
        <span
          aria-hidden
          className={`h-px w-10 bg-gradient-to-r from-gold/60 to-transparent ${
            centered ? "hidden sm:block" : ""
          }`}
        />
      </div>

      <h2 className="mt-3 font-playfair text-4xl sm:text-5xl md:text-6xl font-bold italic leading-[1.05] text-text-primary">
        {title}
        {accent && (
          <>
            <br />
            <span className="text-gradient-gold">{accent}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 font-outfit text-base md:text-lg text-text-primary-2 ${
            centered ? "mx-auto" : ""
          } max-w-xl`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

import type { ReactElement } from "react";

interface ProjectLogoProps {
  id: number;
  color: string;
  className?: string;
}

const NAVY = "#0A1628";

export default function ProjectLogo({ id, color, className = "" }: ProjectLogoProps) {
  const render = LOGOS[id];
  if (!render) return null;
  return <div className={className}>{render(color)}</div>;
}

const LOGOS: Record<number, (color: string) => ReactElement> = {
  // AURA Pro Phone Showcase — device icon
  1: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <rect x="17" y="9" width="14" height="30" rx="3" fill="none" stroke={color} strokeWidth="2" />
      <rect x="20" y="13" width="8" height="18" rx="1" fill={color} opacity="0.7" />
      <circle cx="24" cy="35" r="1.4" fill={color} />
      <text x="24" y="46" fontFamily="Arial" fontSize="6" fontWeight="800" fill={color} textAnchor="middle">
        AURA
      </text>
    </svg>
  ),
  // MIFA Life Shop — shopping bag icon
  2: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <path d="M14 19h20l-1.5 15a2 2 0 0 1-2 1.8H17.5a2 2 0 0 1-2-1.8L14 19z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 19v-3a6 6 0 0 1 12 0v3" fill="none" stroke={color} strokeWidth="2" />
      <text x="24" y="46" fontFamily="Arial" fontSize="6" fontWeight="800" fill={color} textAnchor="middle">
        MIFA
      </text>
    </svg>
  ),
  // Problem to Project Africa — idea / lightbulb icon
  3: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <path d="M24 10a9 9 0 0 0-5 16.5c1 .8 1.5 1.6 1.5 2.6V31h7v-1.9c0-1 .5-1.8 1.5-2.6A9 9 0 0 0 24 10z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="20.5" y1="35" x2="27.5" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="18" x2="24" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <text x="24" y="46" fontFamily="Arial" fontSize="5.5" fontWeight="800" fill={color} textAnchor="middle">
        P2PA
      </text>
    </svg>
  ),
  // TAAMA — agro / growth leaf icon
  4: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <path d="M24 12c8 1.5 11 8.5 8.5 17-8.5 1.5-15-2.5-16.5-10-1-5.5 2-6.5 8-7z" fill={color} opacity="0.85" />
      <path d="M24 29V16" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      <text x="24" y="44" fontFamily="Arial" fontSize="6.5" fontWeight="800" fill={color} textAnchor="middle">
        TAAMA
      </text>
    </svg>
  ),
  // UEEMT-Tokat — community / people icon
  5: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <circle cx="17" cy="18" r="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="31" cy="18" r="4" fill={color} opacity="0.7" />
      <path d="M9 32c0-4.5 3.5-7 8-7s8 2.5 8 7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M23 25c4.5 0 8 2.5 8 7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <text x="24" y="46" fontFamily="Arial" fontSize="5.5" fontWeight="800" fill={color} textAnchor="middle">
        UEEMT
      </text>
    </svg>
  ),
  // CompTrack
  6: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#0A1628" />
      <rect width="48" height="1.5" fill="#00BCD4" />
      <path d="M14 24 A10 10 0 1 0 14 26" stroke="#D4AF37" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="29" y1="14" x2="37" y2="14" stroke="#00BCD4" strokeWidth="3" strokeLinecap="round" />
      <line x1="33" y1="14" x2="33" y2="30" stroke="#00BCD4" strokeWidth="3" strokeLinecap="round" />
      <text x="24" y="44" fontFamily="Arial" fontSize="6" fontWeight="800" fill="#00BCD4" textAnchor="middle">
        CompTrack
      </text>
    </svg>
  ),
  // African Hybrid Agent — circuit / node icon
  7: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <circle cx="24" cy="16" r="3.2" fill={color} />
      <circle cx="14" cy="30" r="3.2" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="34" cy="30" r="3.2" fill="none" stroke={color} strokeWidth="2" />
      <path d="M22 18.5 16 27.5M26 18.5l8 9M17 30h14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <text x="24" y="46" fontFamily="Arial" fontSize="5.5" fontWeight="800" fill={color} textAnchor="middle">
        AGENT
      </text>
    </svg>
  ),
  // BurkinaCollect — layered data / stack icon
  8: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <polygon points="24,10 36,16 24,22 12,16" fill={color} opacity="0.85" />
      <polygon points="12,21 24,27 36,21 36,25 24,31 12,25" fill="none" stroke={color} strokeWidth="1.6" />
      <polygon points="12,28 24,34 36,28 36,32 24,38 12,32" fill="none" stroke={color} strokeWidth="1.6" />
      <text x="24" y="45" fontFamily="Arial" fontSize="5" fontWeight="800" fill={color} textAnchor="middle">
        COLLECT
      </text>
    </svg>
  ),
  // Forge Afrika — anvil / hammer icon
  9: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill={NAVY} />
      <rect width="48" height="1.5" fill={color} />
      <rect x="13" y="24" width="22" height="6" rx="1.5" fill={color} opacity="0.85" />
      <rect x="21" y="30" width="6" height="5" fill={color} opacity="0.85" />
      <rect x="17" y="35" width="14" height="3" rx="1" fill={color} />
      <path d="M20 22l6-10 5 3-7 9z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <text x="24" y="46" fontFamily="Arial" fontSize="6" fontWeight="800" fill={color} textAnchor="middle">
        FORGE
      </text>
    </svg>
  ),
};

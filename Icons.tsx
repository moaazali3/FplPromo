import React from "react";

export const GooglePlayIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-.914c-.16-.44-.24-.91-.24-1.392V4.12c0-.482.08-.952.24-1.392.15-.41.36-.72.61-.914z" fill="#00E5FF" />
    <path d="M17.153 8.64L4.857.77A2.29 2.29 0 0 0 3.61 1.814L13.793 12l3.36-3.36z" fill="#00FF87" />
    <path d="M3.61 22.186c.39.4.83.69 1.247.96l12.296-7.87-3.36-3.36L3.61 22.186z" fill="#FF4B4B" />
    <path d="M21.134 11.21l-3.98-2.57-3.36 3.36 3.36 3.36 3.98-2.57c.72-.46 1.16-1.02 1.16-1.79s-.44-1.33-1.16-1.79z" fill="#FFB703" />
  </svg>
);

export const ApkIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#00FF87" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v8" />
    <path d="m16 6-4 4-4-4" />
    <rect width="20" height="8" x="2" y="14" rx="2" />
    <path d="M6 18h.01" />
    <path d="M10 18h.01" />
  </svg>
);

export const WarningIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#FF4B4B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#FF4B4B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const LightningIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#00FF87" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const TargetRadarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#7C5CFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
  </svg>
);

export const TrophyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#FFD700" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#00FF87" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const TransferSwapIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#00FF87" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 3 4 4-4 4" />
    <path d="M20 7H4" />
    <path d="m8 21-4-4 4-4" />
    <path d="M4 17h16" />
  </svg>
);

export const BrainChipIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#7C5CFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3" />
    <path d="M15 1v3" />
    <path d="M9 20v3" />
    <path d="M15 20v3" />
    <path d="M20 9h3" />
    <path d="M20 14h3" />
    <path d="M1 9h3" />
    <path d="M1 14h3" />
  </svg>
);

export const StarRating: React.FC<{ rating?: number; size?: number; color?: string }> = ({
  rating = 5,
  size = 16,
  color = "#FFB703",
}) => (
  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
    {Array.from({ length: rating }).map((_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#00FF87" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const SoccerBallIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <polygon points="12 8 8 11 9 16 15 16 16 11" fill="rgba(255,255,255,0.2)" stroke={color} />
  </svg>
);

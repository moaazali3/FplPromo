import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const CaptainRiskScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gauge animation: 0 -> 76%
  const gaugePercent = interpolate(frame, [10, 50], [0, 76], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

  const cardSlide1 = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  const cardSlide2 = spring({ frame: frame - 25, fps, config: { damping: 14 } });

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0B0E17] text-white overflow-hidden select-none font-inter p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#7928CA]/30 border border-[#7928CA] flex items-center justify-center text-[#7928CA] text-sm">
            🎯
          </div>
          <div>
            <div className="font-outfit font-bold text-sm text-white">CAPTAIN RISK RADAR</div>
            <div className="font-cairo text-[10px] text-purple-400">رادار مخاطرة الكابتن والدفرنشيل</div>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055] text-[10px] font-bold font-outfit">
          HIGH RISK GW
        </div>
      </div>

      {/* Circular Risk Gauge Section */}
      <div className="relative rounded-2xl p-4 bg-gradient-to-b from-[#18122B] to-[#0E101D] border border-[#7928CA]/40 shadow-[0_8px_30px_rgba(121,40,202,0.25)] flex flex-col items-center mb-3">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* SVG Circular Ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
            {/* Background Track */}
            <circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke="#231F3D"
              strokeWidth="10"
            />
            {/* Animated Glow Progress Arc */}
            <circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke="url(#riskGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7928CA" />
                <stop offset="50%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#FF0055" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Metric Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-outfit font-extrabold text-3xl text-white">
              {Math.round(gaugePercent)}%
            </span>
            <span className="font-cairo text-[10px] text-[#FFB800] font-bold">نسبة المخاطرة</span>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#FF0055]/20 border border-[#FF0055]/50 text-[#FF0055] font-cairo text-[11px] font-bold">
            ⚠️ منطقة تقلبات عالية (Differential Alert)
          </span>
        </div>
      </div>

      {/* Head to Head Duel Cards */}
      <div className="text-[11px] font-cairo text-gray-400 mb-1.5 flex justify-between items-center px-1">
        <span>مقارنة الرأس بالرأس (Head-to-Head)</span>
        <span className="text-[#00FF85] font-mono">GW8 DUEL</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Consensus Pick (Safe) */}
        <div
          style={{ transform: `translateX(${(1 - cardSlide1) * -30}px)`, opacity: cardSlide1 }}
          className="rounded-xl p-2.5 bg-[#141926] border border-white/10"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-gray-400">كابتن الجولة المضمون</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="font-outfit font-bold text-sm text-white">Haaland (MCI)</div>
          <div className="text-[10px] text-gray-400 mb-2">ضد: ARS (خارج الأرض)</div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-gray-400">الملكية الفعالة:</span>
              <span className="font-bold text-white font-mono">148.2%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00FF85] h-full w-[88%]" />
            </div>
          </div>
        </div>

        {/* Differential Pick (Reward) */}
        <div
          style={{ transform: `translateX(${(1 - cardSlide2) * 30}px)`, opacity: cardSlide2 }}
          className="rounded-xl p-2.5 bg-[#1C152B] border border-[#7928CA]/60 shadow-[0_0_15px_rgba(121,40,202,0.2)]"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-[#FFB800]">خيار الدفرنشيل الذكي</span>
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-ping" />
          </div>
          <div className="font-outfit font-bold text-sm text-[#00FF85]">Palmer (CHE)</div>
          <div className="text-[10px] text-gray-400 mb-2">ضد: SOU (ملعبه)</div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-gray-400">الملكية الفعالة:</span>
              <span className="font-bold text-[#FFB800] font-mono">22.4%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#FFB800] h-full w-[35%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Risk Differentials list */}
      <div className="flex-1 rounded-xl p-2.5 bg-[#141926]/90 border border-white/10 flex flex-col justify-between">
        <div className="text-[10px] font-cairo text-gray-300 font-bold mb-1">
          أفضل ترشيحات الذكاء الاصطناعي للدفرنشيل:
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-white/5 text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#7928CA] text-white flex items-center justify-center font-bold text-[9px]">1</span>
              <span className="font-semibold text-white">C. Palmer</span>
              <span className="text-gray-400 text-[9px]">(CHE)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00FF85] font-mono font-bold">+18.5 Upside</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">FDR 2</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-white/5 text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-[9px]">2</span>
              <span className="font-semibold text-white">B. Saka</span>
              <span className="text-gray-400 text-[9px]">(ARS)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00FF85] font-mono font-bold">+14.2 Upside</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">FDR 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

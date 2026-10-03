import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const TransferLabScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bank balance animated transition: £0.4m -> £1.2m
  const bankBalance = interpolate(frame, [15, 35], [0.4, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const swapPulse = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10 },
  });

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0B0E17] text-white overflow-hidden select-none font-inter p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#00FF85]/20 border border-[#00FF85] flex items-center justify-center text-[#00FF85] text-sm">
            🔄
          </div>
          <div>
            <div className="font-outfit font-bold text-sm text-white">TRANSFER LAB & FDR</div>
            <div className="font-cairo text-[10px] text-emerald-400">مختبر الانتقالات وجدول الصعوبة</div>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#00FF85]/15 border border-[#00FF85]/30 text-[#00FF85] text-[10px] font-mono font-bold">
          1 FT AVAILABLE
        </div>
      </div>

      {/* Budget & Bank Status */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-xl p-2.5 bg-[#141926] border border-white/10">
          <div className="text-[10px] text-gray-400 font-cairo">الميزانية البنكية (ITB)</div>
          <div className="font-outfit font-black text-lg text-[#00FF85] font-mono">
            £{bankBalance.toFixed(1)}M
          </div>
        </div>
        <div className="rounded-xl p-2.5 bg-[#141926] border border-white/10">
          <div className="text-[10px] text-gray-400 font-cairo">قيمة الفريق الكلية</div>
          <div className="font-outfit font-black text-lg text-white font-mono">
            £104.8M
          </div>
        </div>
      </div>

      {/* Animated Player Swap Simulation */}
      <div className="rounded-xl p-3 bg-gradient-to-b from-[#161D2C] to-[#101420] border border-white/15 mb-3 shadow-lg">
        <div className="text-[11px] font-cairo text-gray-300 font-bold mb-2">
          محاكاة التبديل التكتيكي الذكي:
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* OUT Player */}
          <div className="flex-1 p-2 rounded-lg bg-red-950/40 border border-red-500/40 text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[8px] font-bold">OUT</span>
              <span className="text-[9px] text-gray-400">£9.8M</span>
            </div>
            <div className="font-bold text-xs text-white">Son H.M.</div>
            <div className="text-[9px] text-red-300 font-mono">FDR: 4 · 4 · 5 (صعب)</div>
          </div>

          {/* Swap Arrow Icon */}
          <div
            style={{ transform: `scale(${1 + swapPulse * 0.15})` }}
            className="w-7 h-7 rounded-full bg-[#00FF85] text-black flex items-center justify-center font-bold text-xs shadow-md shrink-0"
          >
            ⇄
          </div>

          {/* IN Player */}
          <div className="flex-1 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="px-1 py-0.2 rounded bg-[#00FF85] text-black text-[8px] font-bold">IN</span>
              <span className="text-[9px] text-[#00FF85]">£9.0M</span>
            </div>
            <div className="font-bold text-xs text-white">Saka B.</div>
            <div className="text-[9px] text-emerald-400 font-mono">FDR: 2 · 2 · 2 (سهل)</div>
          </div>
        </div>
      </div>

      {/* FDR (Fixture Difficulty Rating) Swings Matrix */}
      <div className="flex-1 rounded-xl p-3 bg-[#141926]/90 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] font-cairo text-gray-300 font-bold">
            تقلبات جدول الصعوبة (FDR Swings Matrix):
          </div>
          <span className="text-[9px] text-[#00FF85] font-bold font-mono">5 GWs</span>
        </div>

        {/* Arsenal FDR Green Run */}
        <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1 mb-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-white">Arsenal (ARS)</span>
            <span className="text-emerald-400 text-[9px] font-bold">جدول أخضر ممتاز 🟢</span>
          </div>
          <div className="grid grid-cols-5 gap-1 text-center font-mono text-[9px] font-bold">
            <div className="py-1 rounded bg-[#00FF85]/30 text-[#00FF85] border border-[#00FF85]/40">SOU (2)</div>
            <div className="py-1 rounded bg-[#00FF85]/30 text-[#00FF85] border border-[#00FF85]/40">BOU (2)</div>
            <div className="py-1 rounded bg-amber-500/30 text-amber-300 border border-amber-500/40">LIV (3)</div>
            <div className="py-1 rounded bg-[#00FF85]/30 text-[#00FF85] border border-[#00FF85]/40">NEW (2)</div>
            <div className="py-1 rounded bg-[#00FF85]/30 text-[#00FF85] border border-[#00FF85]/40">IPS (2)</div>
          </div>
        </div>

        {/* Spurs FDR Red Warning Run */}
        <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-white">Spurs (TOT)</span>
            <span className="text-red-400 text-[9px] font-bold">مواجهات قمة صعبة 🔴</span>
          </div>
          <div className="grid grid-cols-5 gap-1 text-center font-mono text-[9px] font-bold">
            <div className="py-1 rounded bg-red-600/40 text-red-200 border border-red-500/40">BHA (3)</div>
            <div className="py-1 rounded bg-red-700/60 text-red-200 border border-red-600/50">WHU (3)</div>
            <div className="py-1 rounded bg-red-900 text-red-300 border border-red-500">MCI (5)</div>
            <div className="py-1 rounded bg-red-900 text-red-300 border border-red-500">CHE (4)</div>
            <div className="py-1 rounded bg-red-700/60 text-red-200 border border-red-600/50">AVL (4)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

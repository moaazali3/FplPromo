import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile, spring, useVideoConfig } from "remotion";
import { C, cardStyle, easeOut, BgGrid, sp } from "./tokens";
import { ClockIcon, WarningIcon, LightningIcon } from "./Icons";
import { ThreeSoccerBall } from "./ThreeSoccerBall";

const fi = (f: number, a: number, b: number, ea = 0, eb = 1) =>
  interpolate(f, [a, b], [ea, eb], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

export const HookScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── 1. Explosive 3D Rocket Ball Shoot & Impact (Frames 0 → 26) ──
  // The ball launches from deep inside the pitch towards the camera lens
  const launchProgress = Math.min(Math.max(f / 18, 0), 1);
  const ballAccel = Math.pow(launchProgress, 2.6); // Aggressive rocket acceleration

  // Scale: 0.10 (deep field) → 0.78 (impact lens) → settles to 0.38 floating beside text
  const ballScale = f < 18 
    ? 0.10 + ballAccel * 0.68 
    : f < 30 
      ? interpolate(f, [18, 30], [0.78, 0.38], { extrapolateRight: "clamp" })
      : 0.38 + Math.sin(f * 0.08) * 0.015;

  const ballY = f < 18 
    ? interpolate(ballAccel, [0, 1], [180, 0])
    : f < 35 
      ? interpolate(f, [18, 35], [0, -35], { extrapolateRight: "clamp" })
      : -35 + Math.sin(f * 0.07) * 6;

  const ballX = f < 18 
    ? interpolate(ballAccel, [0, 1], [-80, 0])
    : f < 35 
      ? interpolate(f, [18, 35], [0, -520], { extrapolateRight: "clamp" })
      : -520 + Math.cos(f * 0.06) * 5;

  const ballSpin = 0; // Ball is completely static (no 2D disc rotation)
  const ballOpacity = f < 2 ? f * 0.5 : 1;

  // Effects only appear AFTER ball strikes the screen at frame 18 and bounces back!
  const ballEffectsProgress = f < 18
    ? 0
    : interpolate(f, [18, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOut,
      });

  // ── 2. Screen Impact Shockwave & Violent Camera Shake (Frames 18 → 38) ──
  const impactHappened = f >= 18;
  const shockwaveProgress = Math.min(Math.max((f - 18) / 22, 0), 1);
  const shockwaveScale = 0.2 + shockwaveProgress * 3.8;
  const shockwaveOp = impactHappened ? (1 - shockwaveProgress) * 0.85 : 0;

  // Flash burst at impact moment
  const flashOp = f >= 17 && f <= 28
    ? interpolate(f, [17, 19, 28], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Violent screen shake that decays smoothly
  const impactShakeX = f >= 18 && f <= 44
    ? Math.sin((f - 18) * 2.4) * Math.max(0, 16 - (f - 18) * 0.65)
    : 0;
  const impactShakeY = f >= 18 && f <= 44
    ? Math.cos((f - 18) * 2.1) * Math.max(0, 12 - (f - 18) * 0.5)
    : 0;

  const camZoom = 1.0 + (f / 130) * 0.038;

  // ── 3. 3D Stadium Turf Floor Opening Swoop ──
  const pitchRotX = fi(f, 0, 36, 68, 52);
  const pitchRotZ = fi(f, 0, 36, -26, 0);
  const pitchScale = fi(f, 0, 36, 1.45, 1.05);
  const pitchOpacity = fi(f, 0, 25, 0, 0.26);

  // ── 4. High-Octane Kinetic Text Entrances ──
  const ribbonOp = fi(f, 14, 28);
  const ribbonY = fi(f, 14, 28, -25, 0);

  // Punch 1 Spring
  const punch1Spring = sp(f, fps, 19, { damping: 11, mass: 0.7, stiffness: 200 });
  const punch1Scale = 0.5 + 0.5 * Math.min(punch1Spring, 1.05);
  const punch1Op = fi(f, 19, 25);

  // Punch 2 Spring
  const punch2Spring = sp(f, fps, 34, { damping: 12, mass: 0.75, stiffness: 180 });
  const punch2Scale = 0.6 + 0.4 * Math.min(punch2Spring, 1.04);
  const punch2Op = fi(f, 34, 42);

  // Punch 3 (Red Alert Warning)
  const warnSpring = sp(f, fps, 50, { damping: 13, mass: 0.8, stiffness: 170 });
  const warnY = interpolate(Math.min(warnSpring, 1), [0, 1], [35, 0]);
  const warnOp = fi(f, 50, 58);

  // Left panic card entrance
  const panicCardSpring = sp(f, fps, 28, { damping: 12, mass: 0.8, stiffness: 160 });
  const panicCardX = interpolate(Math.min(panicCardSpring, 1), [0, 1], [-80, 0]);
  const panicCardOp = fi(f, 28, 38);

  // Fast countdown milliseconds
  const secondsLeft = Math.max(0, 59 - Math.floor(f * 0.45));
  const msLeft = (99 - ((f * 13) % 99)).toString().padStart(2, "0");

  return (
    <AbsoluteFill style={{ background: C.midnight, overflow: "hidden" }}>
      <BgGrid />

      {/* ── Main Dynamic Camera Container with Impact Shake ── */}
      <AbsoluteFill
        style={{
          transform: `scale(${camZoom}) translate(${impactShakeX}px, ${impactShakeY}px)`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* ── 3D Stadium Turf Floor ── */}
        <div
          style={{
            position: "absolute",
            inset: "-20% -10% -20% -10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: 1000,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 1400,
              height: 900,
              transform: `rotateX(${pitchRotX}deg) rotateZ(${pitchRotZ}deg) scale(${pitchScale})`,
              transformStyle: "preserve-3d",
              opacity: pitchOpacity,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: `3px solid ${C.neonGreen}`,
                borderRadius: 16,
                boxShadow: `0 0 40px rgba(0,255,135,0.3), inset 0 0 50px rgba(0,255,135,0.15)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 2.5,
                background: C.neonGreen,
                boxShadow: "0 0 15px rgba(0,255,135,0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 320,
                height: 320,
                borderRadius: "50%",
                border: `2.5px solid ${C.neonGreen}`,
                boxShadow: "0 0 20px rgba(0,255,135,0.4)",
              }}
            />
          </div>
        </div>

        {/* Dynamic Stadium Ambient Glows */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "25%",
            width: 850,
            height: 850,
            borderRadius: "50%",
            background: C.neonGreen,
            opacity: 0.1 + Math.sin(f * 0.1) * 0.03,
            filter: "blur(180px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "20%",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: C.errorRed,
            opacity: 0.08 + Math.cos(f * 0.09) * 0.02,
            filter: "blur(170px)",
            pointerEvents: "none",
          }}
        />

        {/* ── Top Official Deadline Broadcast Ribbon ── */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 60,
            right: 60,
            opacity: ribbonOp,
            transform: `translateY(${ribbonY}px)`,
            ...cardStyle({
              padding: "12px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: "rgba(255, 75, 75, 0.4)",
            }),
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 75, 75, 0.2)",
                border: "1px solid rgba(255, 75, 75, 0.6)",
                borderRadius: 20,
                padding: "4px 14px",
                boxShadow: "0 0 15px rgba(255,75,75,0.4)",
              }}
            >
              <ClockIcon size={16} color="#FF4B4B" />
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, fontWeight: 900, color: "#FF6B6B" }}>
                إغلاق الديدلاين وشيك ⚠️
              </span>
            </div>

            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: 15,
                color: "#FFFFFF",
                letterSpacing: 1.5,
              }}
            >
              FPL GAMEWEEK DEADLINE · 00:00:{secondsLeft}:{msLeft}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                background: "rgba(0, 255, 133, 0.15)",
                border: `1px solid ${C.neonGreen}`,
                borderRadius: 6,
                padding: "4px 14px",
                fontFamily: "Outfit, sans-serif",
                fontSize: 12,
                fontWeight: 900,
                color: C.neonGreen,
                letterSpacing: 1,
                boxShadow: "0 0 15px rgba(0,255,133,0.3)",
              }}
            >
              11.4M MANAGERS LOCKING PICKS
            </span>
          </div>
        </div>

        {/* ── Left Side Matchday Panic Card: -8 HITS & Rank Collapse ── */}
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 40,
            transform: `translateX(${panicCardX}px)`,
            opacity: panicCardOp,
            width: 440,
            ...cardStyle({
              padding: "16px 20px",
              borderColor: "rgba(255, 75, 75, 0.5)",
              background: "linear-gradient(180deg, rgba(255,75,75,0.12) 0%, rgba(20,23,29,0.96) 100%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255,75,75,0.25)",
            }),
            zIndex: 25,
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span
              style={{
                background: "rgba(255,75,75,0.22)",
                border: "1px solid rgba(255,75,75,0.6)",
                borderRadius: 6,
                padding: "3px 10px",
                fontFamily: "Cairo, sans-serif",
                fontSize: 11.5,
                fontWeight: 900,
                color: "#FF6B6B",
              }}
            >
              ❌ مأساة كل أسبوع
            </span>
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, color: "#94A3B8", fontWeight: 800 }}>
              PANIC TRANSFERS
            </span>
          </div>

          {/* Panic Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,75,75,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#E2E8F0", fontWeight: 800 }}>
                سالب نقاط عشوائي
              </div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#FF4B4B",
                  textShadow: "0 0 10px rgba(255,75,75,0.6)",
                }}
              >
                -8 HITS
              </div>
            </div>

            <div
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,183,3,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontFamily: "Cairo, sans-serif", fontSize: 13, color: "#E2E8F0", fontWeight: 800 }}>
                انهيار الترتيب العام
              </div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#FFB703",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>🔻</span>
                <span>-65,000</span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,75,75,0.08)",
                border: "1px solid rgba(255,75,75,0.25)",
                borderRadius: 8,
                padding: "8px 10px",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: "Cairo, sans-serif", fontSize: 11.5, fontWeight: 800, color: "#CBD5E1", direction: "rtl" }}>
                كابتن دكة، وإصابة غير متوقعة قبل الماتش بساعة!
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Center Core Hook Typography (Kinetic Slam) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 560,
            right: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 16,
            zIndex: 25,
            direction: "rtl",
            textAlign: "right",
          }}
        >
          {/* Punch 1: The Frustration Hook */}
          <div
            style={{
              opacity: punch1Op,
              transform: `scale(${punch1Scale})`,
              transformOrigin: "right center",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                background: "rgba(0, 255, 133, 0.15)",
                border: `1.5px solid ${C.neonGreen}`,
                borderRadius: 8,
                padding: "4px 14px",
                fontFamily: "Cairo, sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: C.neonGreen,
                boxShadow: "0 0 20px rgba(0,255,133,0.3)",
              }}
            >
              لسه بتضيّع الديدلاين؟
            </span>
          </div>

          {/* Punch 2: The Giant Provocative Question */}
          <div
            style={{
              opacity: punch2Op,
              transform: `scale(${punch2Scale})`,
              transformOrigin: "right center",
            }}
          >
            <h1
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 900,
                fontSize: 68,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-1px",
                textShadow: "0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(0,255,135,0.25)",
              }}
            >
              وتاخد <span style={{ color: "#FF4B4B", textShadow: "0 0 25px rgba(255,75,75,0.7)" }}>-8 نقاط</span> وتحرق
              تغييراتك عشوائي؟
            </h1>
          </div>

          {/* Punch 3: Red Alert Stakes Banner */}
          <div
            style={{
              opacity: warnOp,
              transform: `translateY(${warnY}px)`,
              ...cardStyle({
                padding: "16px 28px",
                borderColor: "rgba(255, 75, 75, 0.6)",
                background: "linear-gradient(90deg, rgba(255, 75, 75, 0.22) 0%, rgba(20, 23, 29, 0.96) 100%)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }),
              boxShadow: "0 15px 40px rgba(0,0,0,0.8), 0 0 35px rgba(255,75,75,0.35)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(255,75,75,0.25)",
                border: "1.5px solid #FF4B4B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 0 15px rgba(255,75,75,0.5)",
              }}
            >
              <WarningIcon size={24} color="#FF4B4B" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 900,
                  fontSize: 24,
                  color: "#FFFFFF",
                }}
              >
                اختيار كابتن خاطئ يكلفك <span style={{ color: "#FF6B6B" }}>25+ نقطة</span> وانهيار ترتيبك العام!
              </div>
              <div
                style={{
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#CBD5E1",
                  marginTop: 2,
                }}
              >
                الفرق بين الفوز بالدوري وخسارته... قرار ذكي واحد قبل الديدلاين.
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. HERO SOCCER BALL (Static ball with dynamic orbital energy rings & speed effects) ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${ballX}px, ${ballY}px) scale(${ballScale})`,
            zIndex: 40,
            opacity: ballOpacity,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: 1200,
            willChange: "transform",
          }}
        >
          {/* Subtle soft stadium floor shadow under 3D ball */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 42,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)",
              filter: "blur(14px)",
              transform: "translateY(135px)",
              pointerEvents: "none",
            }}
          />

          {/* Ambient Backlight Glow behind the 3D ball (activates only after impact) */}
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 255, 135, 0.35) 0%, rgba(0, 229, 255, 0.18) 45%, transparent 75%)",
              filter: "blur(40px)",
              opacity: ballEffectsProgress * (0.85 + Math.sin(f * 0.1) * 0.15),
              pointerEvents: "none",
            }}
          />

          {/* Dynamic Speed Streaks Beside the Ball (activates only after impact) */}
          <div
            style={{
              position: "absolute",
              left: "82%",
              top: "42%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              pointerEvents: "none",
              opacity: ballEffectsProgress * fi(f, 22, 35),
              transform: `translateX(${interpolate(Math.sin(f * 0.1), [-1, 1], [-5, 10])}px)`,
              zIndex: 3,
            }}
          >
            <div
              style={{
                width: 90,
                height: 3,
                borderRadius: 2,
                background: "linear-gradient(90deg, #00FF87 0%, rgba(0,255,135,0) 100%)",
                boxShadow: "0 0 10px #00FF87",
              }}
            />
            <div
              style={{
                width: 140,
                height: 2,
                borderRadius: 2,
                background: "linear-gradient(90deg, #00E5FF 0%, rgba(0,229,255,0) 100%)",
                boxShadow: "0 0 10px #00E5FF",
                marginLeft: 15,
              }}
            />
          </div>

          {/* ── TRUE 3D WEBGL SOCCER BALL MODEL (Unclipped 780px Canvas) ── */}
          <div
            style={{
              position: "relative",
              width: 780,
              height: 780,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.85))",
              zIndex: 2,
            }}
          >
            <ThreeSoccerBall size={780} effectsProgress={ballEffectsProgress} />
          </div>
        </div>

        {/* ── 6. Explosive Screen Impact Shockwave Ring (Triggers at frame 18) ── */}
        {impactHappened && shockwaveOp > 0.02 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${shockwaveScale})`,
              width: 400,
              height: 400,
              borderRadius: "50%",
              border: "5px solid rgba(0, 255, 135, 0.95)",
              boxShadow: "0 0 60px rgba(0,255,135,0.9), inset 0 0 40px rgba(0,255,135,0.5)",
              opacity: shockwaveOp,
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
        )}

        {/* ── 7. Flash Exposure Burst at Impact ── */}
        {flashOp > 0.01 && (
          <AbsoluteFill
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(0,255,135,0.6) 40%, transparent 80%)",
              opacity: flashOp,
              pointerEvents: "none",
              mixBlendMode: "screen",
              zIndex: 60,
            }}
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

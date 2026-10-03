import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";

interface ThreeSoccerBallProps {
  size?: number;
  effectsProgress?: number; // 0 = clean ball flying in air; 1 = full cyber orbital rings after impact
  style?: React.CSSProperties;
}

export const ThreeSoccerBall: React.FC<ThreeSoccerBallProps> = ({
  size = 620,
  effectsProgress = 1,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame = useCurrentFrame();

  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    ballMesh: THREE.Mesh;
    ballGroup: THREE.Group;
    effectsGroup: THREE.Group;
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    ring3: THREE.Mesh;
    satellite1: THREE.Mesh;
    satellite2: THREE.Mesh;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handle = delayRender("Loading HD 3D Soccer Ball");

    // 1. WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 2. Perspective Camera with ample margin (prevents any ring clipping)
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
    camera.position.z = 4.8;

    // 3. Dynamic Studio Lighting for Deep 3D Specular Relief
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key bright specular spotlight (creates crisp highlight on leather hexagons)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(4, 5, 4.5);
    scene.add(keyLight);

    // Neon Green tactical rim light
    const greenRim = new THREE.DirectionalLight(0x00ff87, 2.8);
    greenRim.position.set(-4, 3, -1);
    scene.add(greenRim);

    // Cyan tactical bounce light
    const cyanLight = new THREE.DirectionalLight(0x00e5ff, 2.2);
    cyanLight.position.set(0, -4, 3);
    scene.add(cyanLight);

    // 4. Main 3D Ball Group
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // 5. Effects Group (Orbital Rings & Satellites) - Controlled by effectsProgress
    const effectsGroup = new THREE.Group();
    ballGroup.add(effectsGroup);

    // 6. Load High-Resolution 2048x1024 Soccer Ball Texture
    const textureLoader = new THREE.TextureLoader();
    const textureUrl = staticFile("soccer_ball_hd.jpg");
    const bumpUrl = staticFile("extracted_texture.jpg");

    const sphereGeo = new THREE.SphereGeometry(1.22, 64, 64);

    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Optional secondary leather bump texture
        textureLoader.load(
          bumpUrl,
          (bumpTex) => {
            bumpTex.wrapS = THREE.RepeatWrapping;
            bumpTex.wrapT = THREE.RepeatWrapping;
            bumpTex.repeat.set(6, 6);

            initMaterials(texture, bumpTex);
          },
          undefined,
          () => {
            initMaterials(texture, null);
          }
        );

        function initMaterials(colorTex: THREE.Texture, bumpTex: THREE.Texture | null) {
          const ballMat = new THREE.MeshStandardMaterial({
            map: colorTex,
            bumpMap: bumpTex || colorTex,
            bumpScale: 0.025,
            roughness: 0.32,
            metalness: 0.12,
          });

          const ballMesh = new THREE.Mesh(sphereGeo, ballMat);
          ballGroup.add(ballMesh);

          // ── Stronger, Electric 3D Gyroscopic Orbital Rings ──
          // Ring 1: Neon Green Equator Ring (with thick emissive core)
          const ring1Geo = new THREE.TorusGeometry(1.72, 0.026, 16, 120);
          const ring1Mat = new THREE.MeshStandardMaterial({
            color: 0x00ff87,
            emissive: 0x00ff87,
            emissiveIntensity: 1.6,
            roughness: 0.1,
            metalness: 0.9,
          });
          const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
          ring1.rotation.x = Math.PI / 2.7;
          effectsGroup.add(ring1);

          // Ring 2: Cyan Cross-Axis Ring
          const ring2Geo = new THREE.TorusGeometry(1.92, 0.022, 16, 120);
          const ring2Mat = new THREE.MeshStandardMaterial({
            color: 0x00e5ff,
            emissive: 0x00e5ff,
            emissiveIntensity: 1.5,
            roughness: 0.1,
            metalness: 0.9,
          });
          const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
          ring2.rotation.x = -Math.PI / 3.2;
          ring2.rotation.y = Math.PI / 5;
          effectsGroup.add(ring2);

          // Ring 3: Outer Horizon Holographic Ring
          const ring3Geo = new THREE.TorusGeometry(2.1, 0.012, 16, 120);
          const ring3Mat = new THREE.MeshBasicMaterial({
            color: 0x00ff87,
            transparent: true,
            opacity: 0.6,
          });
          const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
          ring3.rotation.x = Math.PI / 4;
          ring3.rotation.z = Math.PI / 6;
          effectsGroup.add(ring3);

          // Orbiting Satellites / Energy Beacons
          const satGeo = new THREE.SphereGeometry(0.09, 16, 16);
          const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x00ff87 });
          const satellite1 = new THREE.Mesh(satGeo, sat1Mat);
          effectsGroup.add(satellite1);

          const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
          const satellite2 = new THREE.Mesh(satGeo, sat2Mat);
          effectsGroup.add(satellite2);

          stateRef.current = {
            renderer,
            scene,
            camera,
            ballMesh,
            ballGroup,
            effectsGroup,
            ring1,
            ring2,
            ring3,
            satellite1,
            satellite2,
          };

          // Initial Render
          updateScene(frame, effectsProgress);
          continueRender(handle);
        }
      },
      undefined,
      (err) => {
        console.error("Error loading texture", err);
        continueRender(handle);
      }
    );

    return () => {
      renderer.dispose();
      sphereGeo.dispose();
    };
  }, [size]);

  const updateScene = (f: number, ep: number) => {
    if (!stateRef.current) return;
    const { renderer, scene, camera, ballGroup, effectsGroup, ring1, ring2, ring3, satellite1, satellite2 } = stateRef.current;

    // ── Continuous 3D Perspective Rotation of the Ball ──
    ballGroup.rotation.y = f * 0.042;
    ballGroup.rotation.x = 0.2 + Math.sin(f * 0.025) * 0.18;
    ballGroup.rotation.z = Math.cos(f * 0.02) * 0.1;

    // ── Effects Activation (0 during flight, scales & fades in after impact) ──
    effectsGroup.scale.set(ep, ep, ep);
    effectsGroup.visible = ep > 0.02;

    if (ep > 0.02) {
      // Counter-rotations for gyroscopic rings
      ring1.rotation.z = f * 0.048;
      ring2.rotation.z = -f * 0.042;
      ring3.rotation.z = f * 0.025;

      // Satellite 1 orbiting on ring 1
      const sat1Angle = f * 0.052;
      const r1 = 1.72;
      satellite1.position.x = Math.cos(sat1Angle) * r1;
      satellite1.position.y = Math.sin(sat1Angle) * r1 * Math.cos(Math.PI / 2.7);
      satellite1.position.z = Math.sin(sat1Angle) * r1 * Math.sin(Math.PI / 2.7);

      // Satellite 2 orbiting on ring 2
      const sat2Angle = -f * 0.045 + Math.PI;
      const r2 = 1.92;
      satellite2.position.x = Math.cos(sat2Angle) * r2 * Math.cos(Math.PI / 5);
      satellite2.position.y = Math.sin(sat2Angle) * r2 * Math.cos(-Math.PI / 3.2);
      satellite2.position.z = Math.sin(sat2Angle) * r2 * Math.sin(-Math.PI / 3.2);
    }

    renderer.render(scene, camera);
  };

  // Sync update per frame & effectsProgress
  useEffect(() => {
    updateScene(frame, effectsProgress);
  }, [frame, effectsProgress]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};

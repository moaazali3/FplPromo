import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";

interface ThreeSoccerBallProps {
  size?: number;
  style?: React.CSSProperties;
}

export const ThreeSoccerBall: React.FC<ThreeSoccerBallProps> = ({
  size = 460,
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
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    satellite: THREE.Mesh;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handle = delayRender("Loading 3D Soccer Ball Texture");

    // 1. WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = 4.2;

    // 3. Multi-Point Lighting for dramatic 3D volume & specular highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // Key bright light (creates realistic specular glint on ball panels)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Neon Green tactical rim light
    const greenRim = new THREE.DirectionalLight(0x00ff87, 2.4);
    greenRim.position.set(-4, 3, -2);
    scene.add(greenRim);

    // Cyan tactical bounce light
    const cyanLight = new THREE.DirectionalLight(0x00e5ff, 1.8);
    cyanLight.position.set(0, -5, 3);
    scene.add(cyanLight);

    // 4. Main 3D Ball Group
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // 5. Load Real Soccer Ball Equirectangular Texture
    const textureLoader = new THREE.TextureLoader();
    const textureUrl = staticFile("football_texture.jpg");

    const sphereGeo = new THREE.SphereGeometry(1.22, 64, 64);

    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const ballMat = new THREE.MeshStandardMaterial({
          map: texture,
          bumpMap: texture,
          bumpScale: 0.035,
          roughness: 0.32,
          metalness: 0.12,
        });

        const ballMesh = new THREE.Mesh(sphereGeo, ballMat);
        ballGroup.add(ballMesh);

        // 6. 3D Gyroscopic Orbital Rings in 3D Space
        // Ring 1: Neon Green Equator Ring
        const ring1Geo = new THREE.TorusGeometry(1.72, 0.02, 16, 120);
        const ring1Mat = new THREE.MeshStandardMaterial({
          color: 0x00ff87,
          emissive: 0x00ff87,
          emissiveIntensity: 0.85,
          roughness: 0.2,
          metalness: 0.8,
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 2.7;
        ballGroup.add(ring1);

        // Ring 2: Cyan Cross-Axis Ring
        const ring2Geo = new THREE.TorusGeometry(1.9, 0.016, 16, 120);
        const ring2Mat = new THREE.MeshStandardMaterial({
          color: 0x00e5ff,
          emissive: 0x00e5ff,
          emissiveIntensity: 0.8,
          roughness: 0.2,
          metalness: 0.8,
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = -Math.PI / 3.2;
        ring2.rotation.y = Math.PI / 5;
        ballGroup.add(ring2);

        // Ring 3: Satellite Beacon
        const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const satMat = new THREE.MeshBasicMaterial({ color: 0x00ff87 });
        const satellite = new THREE.Mesh(satGeo, satMat);
        ballGroup.add(satellite);

        stateRef.current = {
          renderer,
          scene,
          camera,
          ballMesh,
          ballGroup,
          ring1,
          ring2,
          satellite,
        };

        // Render initial frame
        ballGroup.rotation.y = frame * 0.04;
        ballGroup.rotation.x = 0.2 + Math.sin(frame * 0.025) * 0.18;
        ballGroup.rotation.z = Math.cos(frame * 0.02) * 0.1;
        renderer.render(scene, camera);

        continueRender(handle);
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

  // Frame update for Remotion
  useEffect(() => {
    if (!stateRef.current) return;
    const { renderer, scene, camera, ballGroup, ring1, ring2, satellite } = stateRef.current;

    // Continuous 3D rotation in perspective
    ballGroup.rotation.y = frame * 0.04;
    ballGroup.rotation.x = 0.2 + Math.sin(frame * 0.025) * 0.18;
    ballGroup.rotation.z = Math.cos(frame * 0.02) * 0.1;

    ring1.rotation.z = frame * 0.045;
    ring2.rotation.z = -frame * 0.038;

    const satAngle = frame * 0.05;
    const r = 1.72;
    satellite.position.x = Math.cos(satAngle) * r;
    satellite.position.y = Math.sin(satAngle) * r * Math.cos(Math.PI / 2.7);
    satellite.position.z = Math.sin(satAngle) * r * Math.sin(Math.PI / 2.7);

    renderer.render(scene, camera);
  }, [frame]);

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

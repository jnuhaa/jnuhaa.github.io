import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  DEBOUNCE_DELAY,
  HOVER_LEAVE_DELAY_MS,
  ACTIVITY_BASELINE,
  ACTIVITY_HOVER,
  ACTIVITY_INTERPOLATION,
  ACTIVITY_DECAY,
  ACTIVITY_THRESHOLD,
  ORBIT_RADIUS,
  POSITION_SCALE,
  UNIFORM_Y_POSITION,
  Y_POSITION_PIXEL,
  Y_POSITION_HELIX,
  BASE_SCALE_NEST,
  BASE_SCALE_OTHER,
  BACKGROUND_COLOR
} from '../constants.js';
import { PROJECTS } from '../data/projects.js';
import { createNest, createPixel, createHelix, createTriangle, createWave } from '../three/artifacts.js';

const ThreeCanvas = ({ activeProject, setActiveProject, setMouseOverObject, onProjectClick }) => {
  const mountRef = useRef(null);
  const activeProjectRef = useRef(activeProject);

  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  useEffect(() => {
    if (!mountRef.current) {
      console.error('ThreeCanvas: mountRef.current is null');
      return;
    }

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    if (width === 0 || height === 0) {
      console.warn('ThreeCanvas: Invalid dimensions, will retry on resize', { width, height });
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: w, height: h } = entry.contentRect;
          if (w > 0 && h > 0) resizeObserver.disconnect();
        }
      });
      resizeObserver.observe(mountRef.current);
      return () => resizeObserver.disconnect();
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND_COLOR.hex);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });

      const gl = renderer.getContext();
      if (!gl) {
        console.error('ThreeCanvas: Failed to create WebGL context');
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      if (mountRef.current.hasChildNodes()) mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);

      const canvas = renderer.domElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.outline = 'none';
      canvas.style.border = 'none';
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', '3D visualization');
    } catch (error) {
      console.error('ThreeCanvas: Error creating renderer:', error);
      if (mountRef.current) {
        mountRef.current.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #94a3b8; font-size: 12px;">WebGL not available</div>';
      }
      return;
    }

    if (!renderer) return;

    const GRID_Y_OFFSET = -0.5;

    const orbitCurve = new THREE.EllipseCurve(0, 0, ORBIT_RADIUS, ORBIT_RADIUS, 0, 2 * Math.PI, false, 0);
    const orbitPts = orbitCurve.getPoints(100);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2 });
    const orbit = new THREE.Line(orbitGeo, orbitMat);
    orbit.rotation.x = -Math.PI / 2;
    orbit.position.y = GRID_Y_OFFSET;
    scene.add(orbit);

    const dividerMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.15 });
    for (let i = 0; i < 3; i++) {
      const angle = (i * 120 + 30) * (Math.PI / 180);
      const ptrs = [
        new THREE.Vector3(0, GRID_Y_OFFSET, 0),
        new THREE.Vector3(Math.cos(angle) * 5, GRID_Y_OFFSET, Math.sin(angle) * 5)
      ];
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptrs), dividerMat);
      scene.add(line);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.bias = -0.0001;
    mainLight.shadow.radius = 20;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 20;
    scene.add(mainLight);

    const blueRim = new THREE.DirectionalLight(0xdbeafe, 2.0);
    blueRim.position.set(-5, 4, -5);
    scene.add(blueRim);

    const warmRim = new THREE.DirectionalLight(0xffedd5, 1.8);
    warmRim.position.set(5, 4, -5);
    scene.add(warmRim);

    const accentLight = new THREE.DirectionalLight(0xf0e6ff, 1.2);
    accentLight.position.set(0, 6, -8);
    scene.add(accentLight);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.18, transparent: true });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = GRID_Y_OFFSET;
    ground.receiveShadow = true;
    scene.add(ground);

    const targetActivities = new Map();

    const artifacts = PROJECTS.map((p, index) => {
      let mesh;
      switch (p.type) {
        case 'NEST': mesh = createNest(p.color); break;
        case 'PIXEL': mesh = createPixel(p.color); break;
        case 'HELIX': mesh = createHelix(p.color); break;
        case 'TRIANGLE': mesh = createTriangle(p.color); break;
        case 'WAVE': mesh = createWave(p.color); break;
        default: mesh = createNest(p.color);
      }

      const angleOffset = 36 * (Math.PI / 180);
      const angle = (index * 72 + angleOffset) * (Math.PI / 180);
      const x = ORBIT_RADIUS * Math.cos(angle);
      const z = ORBIT_RADIUS * Math.sin(angle);

      const yPosition = p.type === 'PIXEL' ? Y_POSITION_PIXEL
        : p.type === 'HELIX' ? Y_POSITION_HELIX
        : UNIFORM_Y_POSITION;
      mesh.position.set(x * POSITION_SCALE, yPosition * POSITION_SCALE, z * POSITION_SCALE);

      if (p.type === 'HELIX') {
        mesh.rotation.y = -50 * (Math.PI / 180);
      } else {
        mesh.rotation.y = Math.random() * Math.PI;
      }

      const baseScale = p.type === 'NEST' ? BASE_SCALE_NEST : BASE_SCALE_OTHER;
      if (p.type !== 'NEST') mesh.scale.setScalar(baseScale);

      const baseY = yPosition * POSITION_SCALE;

      mesh.userData = {
        id: p.id,
        baseScale,
        activity: ACTIVITY_BASELINE,
        baseY,
        update: mesh.userData.update || (() => {})
      };
      scene.add(mesh);
      return mesh;
    });

    artifacts.forEach((art) => targetActivities.set(art, ACTIVITY_BASELINE));

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoverState = false;
    let debounceTimeout = null;
    let lastHoveredProject = null;
    let returnToIntroTimeout = null;

    const getRoot = (obj) => {
      if (!obj) return null;
      let current = obj;
      let maxDepth = 20;
      while (current && current.parent && maxDepth > 0) {
        maxDepth--;
        if (current.userData?.isCollisionBox) {
          current = current.parent;
          continue;
        }
        if (current.userData?.id) return current;
        current = current.parent;
      }
      return current?.userData?.id ? current : null;
    };

    const onMouseMove = (event) => {
      if (!renderer?.domElement || !camera) return;

      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(artifacts, true);
      const hoveredRoot = intersects.length > 0 ? getRoot(intersects[0].object) : null;
      const isHovering = !!hoveredRoot;

      if (debounceTimeout) clearTimeout(debounceTimeout);

      if (isHovering !== hoverState) {
        const currentHoveredRoot = hoveredRoot;
        const currentIsHovering = isHovering;

        debounceTimeout = setTimeout(() => {
          hoverState = currentIsHovering;
          setMouseOverObject(currentIsHovering);

          artifacts.forEach((art) => {
            const targetActivity = (currentIsHovering && currentHoveredRoot && currentHoveredRoot === art)
              ? ACTIVITY_HOVER : ACTIVITY_BASELINE;
            targetActivities.set(art, targetActivity);
          });

          if (currentIsHovering && currentHoveredRoot?.userData?.id) {
            if (returnToIntroTimeout) {
              clearTimeout(returnToIntroTimeout);
              returnToIntroTimeout = null;
            }
            const project = PROJECTS.find((p) => p.id === currentHoveredRoot.userData.id);
            if (project && project !== lastHoveredProject) {
              lastHoveredProject = project;
              setActiveProject(project);
            }
          } else if (!currentIsHovering) {
            lastHoveredProject = null;
            if (returnToIntroTimeout) clearTimeout(returnToIntroTimeout);
            returnToIntroTimeout = setTimeout(() => {
              returnToIntroTimeout = null;
              setActiveProject(null);
            }, HOVER_LEAVE_DELAY_MS);
          }
        }, DEBOUNCE_DELAY);
      } else {
        setMouseOverObject(isHovering);

        if (hoverState && isHovering) {
          artifacts.forEach((art) => {
            const targetActivity = (hoveredRoot && hoveredRoot === art) ? ACTIVITY_HOVER : ACTIVITY_BASELINE;
            targetActivities.set(art, targetActivity);
          });
        } else if (!hoverState && !isHovering) {
          artifacts.forEach((art) => targetActivities.set(art, ACTIVITY_BASELINE));
        }

        if (isHovering && hoveredRoot?.userData?.id) {
          if (returnToIntroTimeout) {
            clearTimeout(returnToIntroTimeout);
            returnToIntroTimeout = null;
          }
          const project = PROJECTS.find((p) => p.id === hoveredRoot.userData.id);
          if (project && project !== lastHoveredProject) {
            lastHoveredProject = project;
            setActiveProject(project);
          }
        }
      }
    };

    const onMouseLeave = () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
        debounceTimeout = null;
      }
      hoverState = false;
      lastHoveredProject = null;
      setMouseOverObject(false);
      artifacts.forEach((art) => targetActivities.set(art, ACTIVITY_BASELINE));
      if (returnToIntroTimeout) clearTimeout(returnToIntroTimeout);
      returnToIntroTimeout = setTimeout(() => {
        returnToIntroTimeout = null;
        setActiveProject(null);
      }, HOVER_LEAVE_DELAY_MS);
    };

    const onClick = (event) => {
      if (!renderer?.domElement || !camera) return;

      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(artifacts, true);

      if (intersects.length > 0 && intersects[0]?.object) {
        const root = getRoot(intersects[0].object);
        if (root?.userData?.id) {
          if (returnToIntroTimeout) {
            clearTimeout(returnToIntroTimeout);
            returnToIntroTimeout = null;
          }
          const project = PROJECTS.find((p) => p.id === root.userData.id);
          if (project) {
            if (onProjectClick) onProjectClick(project);
            else setActiveProject(project);
          }
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mouseleave', onMouseLeave);
    domElement.addEventListener('click', onClick);

    const clock = new THREE.Clock();
    let animationFrameId = null;
    let isMounted = true;

    const animate = () => {
      if (!isMounted) return;

      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      artifacts.forEach((art) => {
        if (!isMounted) return;

        const targetActivity = targetActivities.get(art) ?? ACTIVITY_BASELINE;
        const currentActivity = art.userData.activity;
        const difference = targetActivity - currentActivity;

        if (Math.abs(difference) > ACTIVITY_THRESHOLD) {
          const interpolationRate = difference > 0 ? ACTIVITY_INTERPOLATION : ACTIVITY_DECAY;
          art.userData.activity += difference * interpolationRate;
        } else if (Math.abs(difference) > 0.001) {
          art.userData.activity = targetActivity;
        }

        art.userData.activity = Math.max(ACTIVITY_BASELINE, Math.min(ACTIVITY_HOVER, art.userData.activity));
        art.userData.update(t, art.userData.activity);

        const baseY = art.userData.baseY ?? art.position.y;
        art.position.y = baseY + Math.sin(t + art.userData.id) * 0.1;

        const isActive = activeProjectRef.current?.id === art.userData.id;
        const baseScale = art.userData.baseScale || 1.0;
        const targetScale = isActive ? baseScale * 1.5 : baseScale;
        art.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);

      if (debounceTimeout) clearTimeout(debounceTimeout);
      if (returnToIntroTimeout) clearTimeout(returnToIntroTimeout);

      if (renderer && renderer.domElement) {
        const canvas = renderer.domElement;
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
        canvas.removeEventListener('click', onClick);
      }
      window.removeEventListener('resize', handleResize);

      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((m) => {
                  if (m.map) m.map.dispose();
                  m.dispose();
                });
              } else {
                if (object.material.map) object.material.map.dispose();
                object.material.dispose();
              }
            }
          }
        });
        while (scene.children.length > 0) scene.remove(scene.children[0]);
      }

      if (mountRef.current && renderer?.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (renderer) {
        renderer.dispose();
        try {
          const gl = renderer.getContext();
          if (gl && typeof gl.getExtension === 'function') {
            const loseContext = gl.getExtension('WEBGL_lose_context');
            if (loseContext) loseContext.loseContext();
          }
        } catch (e) {}
      }
    };
  }, [setActiveProject, setMouseOverObject, onProjectClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full pointer-events-auto" />
    </div>
  );
};

export default ThreeCanvas;

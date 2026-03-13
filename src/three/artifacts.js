/**
 * 3D artifact generators for portfolio visualization.
 * Frosted glass materials and geometric shapes (Nest, Pixel, Helix, Triangle, Wave).
 *
 * References:
 * - https://blog.olivierlarose.com/tutorials/3d-glass-effect
 * - https://blog.maximeheckel.com/posts/caustics-in-webgl/
 */
import * as THREE from 'three';
import { COLLISION_BOX_SCALE } from '../constants.js';

/** Creates frosted glass material with soft shadows and color presence */
const createGlassMaterial = (color) => {
  const colorObj = new THREE.Color(color);
  const baseColor = new THREE.Color(0xffffff).lerp(colorObj, 0.15);
  const sheenColor = new THREE.Color(colorObj);
  sheenColor.lerp(new THREE.Color(0xffffff), 0.4);

  const material = new THREE.MeshPhysicalMaterial({
    color: baseColor,
    transmission: 0.4,
    opacity: 0.95,
    transparent: true,
    roughness: 0.4,
    metalness: 0.0,
    reflectivity: 0.6,
    ior: 1.5,
    thickness: 2.5,
    attenuationColor: colorObj,
    attenuationDistance: 1.2,
    specularIntensity: 1.0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
    side: THREE.DoubleSide,
    sheen: 0.5,
    sheenColor: sheenColor,
    sheenRoughness: 0.3
  });
  material.emissive = colorObj;
  material.emissiveIntensity = 0.08;
  return material;
};

/** Adds colored point light inside object for caustic shadows */
const addCausticLight = (group, color, intensity = 1.0) => {
  const colorObj = new THREE.Color(color);
  const light = new THREE.PointLight(colorObj, intensity, 5);
  light.position.set(0, 0, 0);
  light.castShadow = false;
  group.add(light);
  return light;
};

/** Adds collision box (25% smaller than element) for raycasting */
const addCollisionBox = (group, width, height, depth) => {
  const scale = COLLISION_BOX_SCALE;
  const boundingBox = new THREE.BoxGeometry(width * scale, height * scale, depth * scale);
  const invisibleMat = new THREE.MeshBasicMaterial({ visible: false, transparent: true, opacity: 0 });
  const collisionBox = new THREE.Mesh(boundingBox, invisibleMat);
  collisionBox.userData.isCollisionBox = true;
  group.add(collisionBox);
  return collisionBox;
};

export const createNest = (color) => {
  const group = new THREE.Group();
  const coreGeo = new THREE.SphereGeometry(0.2, 64, 64);
  const coreMat = createGlassMaterial(color);
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.castShadow = true;
  core.receiveShadow = true;
  group.add(core);

  const cageGeo = new THREE.SphereGeometry(0.55, 8, 6);
  const cageEdges = new THREE.WireframeGeometry(cageGeo);
  const cageLine = new THREE.LineSegments(cageEdges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));
  cageLine.scale.set(1, 1.35, 1);
  group.add(cageLine);

  addCausticLight(group, color, 1.2);
  group.userData.update = (t, activity) => {
    cageLine.rotation.y = t * 0.08;
    cageLine.rotation.x = Math.sin(t * 0.2) * 0.05;
    const beat = Math.sin(t * (2 + activity));
    core.scale.setScalar(1 + (beat * 0.1) + (activity * 0.1));
  };
  addCollisionBox(group, 1.1, 1.485, 1.1);
  return group;
};

export const createPixel = (color) => {
  const group = new THREE.Group();
  const mat = createGlassMaterial(color);
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  const size = 0.15;
  const gap = 0.02;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (Math.random() > 0.7) continue;
        const geo = new THREE.BoxGeometry(size, size, size);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(x * (size + gap), y * (size + gap), z * (size + gap));
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
        mesh.add(edges);
        mesh.userData = {
          basePos: mesh.position.clone(),
          offsetParams: { axis: Math.random() > 0.5 ? 'x' : 'y', dir: Math.random() > 0.5 ? 1 : -1 }
        };
        group.add(mesh);
      }
    }
  }

  addCausticLight(group, color, 1.0);
  group.userData.update = (t, activity) => {
    const shiftMagnitude = activity * 0.1;
    group.children.forEach((c) => {
      if (c.isMesh && c.userData.basePos) {
        const i = c.id;
        const step = Math.floor(t * (0.5 + activity * 2) + i);
        const isShifted = step % 4 === 0;
        c.position.copy(c.userData.basePos);
        if (isShifted && activity > 0.1) {
          c.position[c.userData.offsetParams.axis] += c.userData.offsetParams.dir * shiftMagnitude;
        }
      }
    });
  };
  addCollisionBox(group, 0.51, 0.51, 0.51);
  return group;
};

export const createHelix = (color) => {
  const group = new THREE.Group();
  const mat = createGlassMaterial(color);
  mat.attenuationColor = new THREE.Color(0xffffff);

  const points = [];
  const len = 40;
  for (let i = 0; i < len; i++) {
    const t = i / len;
    points.push(new THREE.Vector3((t - 0.5) * 1.5, Math.sin(t * Math.PI * 4) * 0.2, Math.cos(t * Math.PI * 4) * 0.2));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.02, 12, false);
  const tube1 = new THREE.Mesh(tubeGeo, mat);
  tube1.castShadow = true;
  tube1.receiveShadow = true;
  group.add(tube1);
  const tube2 = tube1.clone();
  tube2.rotation.x = Math.PI;
  group.add(tube2);

  const rungs = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const geo = new THREE.BoxGeometry(0.02, 0.08, 0.02);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.x = (i / 9 - 0.5) * 1.5;
    rungs.add(mesh);
  }
  group.add(rungs);

  addCausticLight(group, 0xffffff, 1.0);
  group.userData.update = (t, activity) => {
    const twistSpeed = 0.2 + activity * 0.8;
    tube1.rotation.x = t * twistSpeed;
    tube2.rotation.x = t * twistSpeed + Math.PI;
    rungs.rotation.x = t * twistSpeed;
  };
  addCollisionBox(group, 1.5, 0.4, 0.4);
  return group;
};

export const createTriangle = (color) => {
  const group = new THREE.Group();
  const mat = createGlassMaterial(color);
  const geo = new THREE.SphereGeometry(0.12, 32, 32);
  const p1 = new THREE.Vector3(0, 0.4, 0);
  const p2 = new THREE.Vector3(-0.35, -0.3, 0);
  const p3 = new THREE.Vector3(0.35, -0.3, 0);

  const n1 = new THREE.Mesh(geo, mat); n1.position.copy(p1); n1.castShadow = true; n1.receiveShadow = true;
  const n2 = new THREE.Mesh(geo, mat); n2.position.copy(p2); n2.castShadow = true; n2.receiveShadow = true;
  const n3 = new THREE.Mesh(geo, mat); n3.position.copy(p3); n3.castShadow = true; n3.receiveShadow = true;
  group.add(n1, n2, n3);

  const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2, p2, p3, p3, p1]);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  const dotGeo = new THREE.SphereGeometry(0.04);
  const dot = new THREE.Mesh(dotGeo, mat);
  dot.castShadow = true;
  dot.receiveShadow = true;
  group.add(dot);

  addCausticLight(group, color, 1.0);
  group.userData.update = (t, activity) => {
    group.rotation.y = t * 0.1;
    group.rotation.z = Math.sin(t * 0.5) * 0.1;
    const speed = t * (1 + activity * 2);
    const phase = speed % 3;
    if (phase < 1) dot.position.lerpVectors(p1, p2, phase);
    else if (phase < 2) dot.position.lerpVectors(p2, p3, phase - 1);
    else dot.position.lerpVectors(p3, p1, phase - 2);
  };
  addCollisionBox(group, 0.7, 0.7, 0.24);
  return group;
};

export const createWave = (color) => {
  const group = new THREE.Group();
  const mat = createGlassMaterial(color);
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  const barCount = 7;
  const spacing = 0.15;

  for (let i = 0; i < barCount; i++) {
    const geo = new THREE.CapsuleGeometry(0.04, 0.4, 4, 16);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const x = (i - (barCount - 1) / 2) * spacing;
    mesh.position.set(x, 0, 0);
    const edges = new THREE.LineSegments(new THREE.WireframeGeometry(geo), edgeMat);
    mesh.add(edges);
    group.add(mesh);
  }

  addCausticLight(group, color, 1.0);
  group.userData.update = (t, activity) => {
    const waveSpeed = 3 + activity * 4;
    const waveAmp = 0.3 + activity * 0.4;
    group.children.forEach((child, i) => {
      if (child.isMesh) {
        const sinVal = Math.sin(t * waveSpeed + i * 0.8);
        child.scale.y = 0.8 + Math.abs(sinVal) * waveAmp;
      }
    });
    group.rotation.y = Math.sin(t * 0.2) * 0.1;
  };
  addCollisionBox(group, 1.05, 0.4, 0.08);
  return group;
};

/**
 * Project data for portfolio display.
 *
 * Hero media (single source for both list view and subpage hero):
 * - heroMedia.src: path to video (.mp4, .webm), GIF (.gif), or image
 * - heroMedia.mediaOverlay: blend mode — 'screen', 'darken', 'none', etc.
 * - heroMedia.background: image path for background layer (e.g. '/media/nest-hero-banner-bg.png')
 * - heroMedia.backgroundOverlay: blend mode for background image (e.g. 'screen', 'darken')
 * - heroMedia.backgroundColor: hex color for section background
 * - heroMedia.titleColor: hex color for hero title
 * - heroMedia.titleBlendMode: blend mode for title (e.g. 'overlay', 'screen')
 * - heroMedia.heroTitle: optional override for hero title (else uses project.name)
 * - heroMedia.scale: scale factor for hero/list media (optional)
 * - heroMedia.offsetY: vertical offset in rem (optional, e.g. -0.75)
 * - heroMedia.objectFit: 'contain' (preserve aspect) or 'cover' (fill, may crop)
 * - heroMedia.awardBadge: optional path to award/badge image (e.g. '/media/onetutor-award.png')
 *
 * Projects without heroMedia (e.g. OneTutor, Tenmin): list view shows a color block using project.color.
 * For projects with media but no heroMedia, add listViewMedia (path) and listViewMediaBackgroundColor (optional).
 *
 * Other editable fields:
 * - name: Project name (displayed in center)
 * - client: Project brief/sector (displayed at top)
 * - description: Main description (displayed in center)
 * - timeline: Timeline/duration (displayed in center, below main description)
 * - projectBrief: Project brief text (displayed at top, below client) - optional
 * - projectType: Client/partner (displayed at bottom) - optional, falls back to ID-based logic
 * - sector: Project type/category (displayed at bottom) - optional, falls back to type
 * - type: Used for 3D artifact rendering (NEST, PIXEL, HELIX, TRIANGLE, WAVE) - DO NOT CHANGE
 * - color: Color for 3D artifact - DO NOT CHANGE
 * - pos: 3D position - DO NOT CHANGE
 * - complexity: 3D complexity - DO NOT CHANGE
 */
export const PROJECTS = [
  {
    id: 1,
    slug: 'nest',
    name: 'Nest.',
    heroMedia: {
      src: '/media/nest-hero-banner.mp4',
      mediaOverlay: 'screen',
      background: null,
      backgroundOverlay: null,
      backgroundColor: '#FF5500',
      titleColor: '#FFFFFF',
      titleBlendMode: 'screen',
      scale: 1,
      objectFit: 'contain'
    },
    client: 'Academic Project',
    type: 'NEST',
    sector: 'Healthcare Service Design',
    projectType: 'UX Research and Design',
    projectBrief: 'How can we give young cancer patients a safe space of autonomy that is stripped of them during hospitalization?',
    description: 'Giving young cancer patients a safe space of autonomy',
    timeline: '2024 — 4 MONTHS',
    color: '#fb923c',
    pos: [-2.8, 0.4, 1.2],
    complexity: 1
  },
  {
    id: 2,
    slug: 'pixel',
    name: 'Pixel 2.0',
    heroMedia: {
      src: '/media/pixel-7-video.mp4',
      mediaOverlay: 'soft-light',
      background: null,
      backgroundOverlay: null,
      backgroundColor: '#7c3aed',
      titleColor: '#ffffff',
      titleBlendMode: 'screen',
      scale: 1.25,
      objectFit: 'contain'
    },
    client: 'Hyundai Europe Design Center',
    type: 'PIXEL',
    sector: 'Automotive User Interface',
    projectType: 'Automotive UX, Interior and Exterior Design',
    projectBrief: 'What is Next for the N series?',
    description: 'Reimagining the role of Hyundai pixels',
    timeline: '2024 — 4 WEEKS',
    color: '#7c3aed',
    pos: [-0.5, -0.8, 2.8],
    complexity: 1
  },
  {
    id: 3,
    slug: 'dna-evolution',
    name: 'DNA Evolution',
    heroMedia: {
      src: '/media/evolution-hand.gif',
      mediaOverlay: 'screen',
      background: null,
      backgroundOverlay: null,
      backgroundColor: '#3b82f6',
      titleColor: '#FFFFFF',
      titleBlendMode: 'screen',
      heroTitle: 'DNA Evolution',
      scale: 1,
      objectFit: 'contain'
    },
    client: 'Physical User Interface @BMW',
    type: 'HELIX',
    sector: 'Automotive User Interface',
    projectType: 'Concept Design',
    projectBrief: 'How can we use AI to generate a "New Normal" of design aesthetics, appeal to our senses in a multisensory way?',
    description: 'Hyper-personalizing automotive UX',
    timeline: '2023, 2024 — 3 MONTHS',
    color: '#3b82f6',
    pos: [3.2, -0.5, 0.8],
    complexity: 1
  },
  {
    id: 4,
    slug: 'onetutor',
    name: 'OneTutor',
    heroMedia: {
      src: '/media/onetutor-hero.mp4',
      mediaOverlay: 'soft-light',
      background: null,
      backgroundOverlay: null,
      backgroundColor: '#4F46E5',
      titleColor: '#FFFFFF',
      titleBlendMode: 'screen',
      scale: 1,
      objectFit: 'contain',
      awardBadge: '/media/onetutor-award.png'
    },
    client: 'OneTutor AI',
    type: 'TRIANGLE',
    sector: 'AI Edtech Platform',
    projectType: 'Web UX/UI, Product Strategy',
    projectBrief: 'How can we build trust of professors and students in AI-assisted content creation and tutoring?',
    description: 'Bringing AI to higher education',
    timeline: '2025, 2026 — 4 MONTHS, ONGOING',
    color: '#60a5fa',
    pos: [2.4, 1.6, -1.0],
    complexity: 5
  },
  {
    id: 5,
    slug: 'tenmin',
    name: 'Tenmin AI',
    heroMedia: {
      src: '/media/tenmin-demo.mp4',
      mediaOverlay: 'multiply',
      background: null,
      backgroundOverlay: null,
      backgroundColor: '#0299BB',
      titleColor: '#FFFFFF',
      titleBlendMode: 'screen',
      scale: 1.5,
      offsetY: +1.5,
      objectFit: 'contain'
    },
    client: 'Tenmin AI',
    type: 'WAVE',
    sector: 'Conversational AI Platform',
    projectType: 'App UX/UI',
    projectBrief: 'HHow might we make the review feature fun and engaging so that users stay motivated to study consistently?',
    description: 'Gamifying language learning with AI',
    timeline: '2025 — 2 MONTHS',
    color: '#c9ffff',
    pos: [0.2, 1.8, -2.8],
    complexity: 1
  }
];

/** Get project by slug, or null if not found */
export const getProjectBySlug = (slug) => PROJECTS.find(p => p.slug === slug) ?? null;

/**
 * Get hero media config for a project. Used by both list view and subpage hero.
 * Returns heroMedia when present, else derives from listView* for backward compat.
 */
export const getHeroMediaConfig = (project) => {
  if (!project) return null;
  const hm = project.heroMedia;
  if (hm?.src) {
    return {
      src: hm.src,
      mediaOverlay: hm.mediaOverlay ?? hm.overlay ?? 'none',
      background: hm.background,
      backgroundOverlay: hm.backgroundOverlay ?? null,
      backgroundColor: hm.backgroundColor ?? project.color,
      titleColor: hm.titleColor ?? project.color,
      titleBlendMode: hm.titleBlendMode ?? 'overlay',
      title: hm.heroTitle ?? project.name,
      scale: hm.scale ?? 1,
      offsetY: hm.offsetY ?? 0,
      objectFit: hm.objectFit ?? 'contain',
      awardBadge: hm.awardBadge ?? project.awardBadge ?? null
    };
  }
  const src = project.listViewMedia ?? project.videoUrl;
  if (!src) return null;
  return {
    src,
    mediaOverlay: project.listViewMediaOverlay ?? 'none',
    background: project.listViewMediaBackground,
    backgroundOverlay: null,
    backgroundColor: project.listViewMediaBackgroundColor ?? project.color,
    titleColor: project.color,
    titleBlendMode: 'overlay',
    title: project.name,
    scale: project.listViewMediaScale ?? 1,
    offsetY: project.listViewMediaOffsetY ?? 0,
    objectFit: project.listViewMediaObjectFit ?? 'contain'
  };
};

/**
 * Optional transform for hero and list hero media.
 * Centralizes any per-project tweaks (e.g., Tenmin zoom/offset).
 */
export const getHeroMediaTransform = (project) => {
  if (!project) return null;

  const config = getHeroMediaConfig(project);
  if (!config) return null;

  const transforms = [];

  if (config.scale && config.scale !== 1) {
    transforms.push(`scale(${config.scale})`);
  }

  if (typeof config.offsetY === 'number' && config.offsetY !== 0) {
    transforms.push(`translateY(${config.offsetY}rem)`);
  }

  return transforms.length ? transforms.join(' ') : null;
};

/** Get prev/next project for navigation (wraps around) */
export const getAdjacentProjects = (slug) => {
  const idx = PROJECTS.findIndex(p => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
};

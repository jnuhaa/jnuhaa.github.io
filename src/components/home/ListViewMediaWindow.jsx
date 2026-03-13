/**
 * List view thumbnail. Renders the same hero media and title as the subpage hero,
 * scaled to list view size (max-w-2xl aspect-video). Structure matches ProjectHero exactly.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { getHeroMediaConfig, getHeroMediaTransform } from '../../data/projects.js';

const ListViewMediaWindow = ({ project, instant = false }) => {
  const config = getHeroMediaConfig(project);
  if (!config) {
    const bgColor = project?.color ?? '#94a3b8';
    return (
      <motion.div
        initial={instant ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
        transition={instant ? { duration: 0 } : { type: 'spring', damping: 24, stiffness: 300 }}
        className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      />
    );
  }

  const mediaSrc = config.src;
  const isGif = mediaSrc?.toLowerCase().endsWith('.gif');
  const isVideo = !isGif && /\.(mp4|webm|ogg)$/i.test(mediaSrc ?? '');
  const mediaOverlayStyle =
    config.mediaOverlay && config.mediaOverlay !== 'none'
      ? { mixBlendMode: config.mediaOverlay }
      : {};
  const title = config.title ?? project?.name ?? '';
  const mediaTransform = getHeroMediaTransform(project);

  return (
    <motion.div
      initial={instant ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={instant ? { duration: 0 } : { type: 'spring', damping: 24, stiffness: 300 }}
      className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: config.backgroundColor }}
    >
      {config.background && (
        <img
          src={config.background}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          aria-hidden
          style={
            config.backgroundOverlay
              ? { mixBlendMode: config.backgroundOverlay }
              : {}
          }
        />
      )}
      {isVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            ...mediaOverlayStyle,
            ...(mediaTransform
              ? { transform: mediaTransform, transformOrigin: 'center center' }
              : {})
          }}
          src={config.src}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : mediaSrc ? (
        <img
          src={config.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          style={mediaOverlayStyle}
        />
      ) : null}
      {title && (
        <h1
          className="relative font-medium tracking-tight text-center"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
            letterSpacing: '-0.04em',
            mixBlendMode: config.titleBlendMode ?? 'overlay',
            color: config.titleColor
          }}
        >
          {title}
        </h1>
      )}
      {config.awardBadge && (
        <img
          src={config.awardBadge}
          alt="Award"
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-8 sm:w-10 md:w-12 h-auto object-contain brightness-0 invert drop-shadow-md z-10"
        />
      )}
    </motion.div>
  );
};

export default ListViewMediaWindow;

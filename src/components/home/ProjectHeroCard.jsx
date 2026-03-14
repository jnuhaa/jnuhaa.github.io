/**
 * Compact hero-style card for the mobile gallery. Renders video/image, title,
 * and blend effects. Clickable; navigates to project subpage.
 */
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHeroMediaConfig, getHeroMediaTransform } from '../../data/projects.js';

const ProjectHeroCard = ({ project }) => {
  const videoRef = useRef(null);
  const isIntersectingRef = useRef(false);
  const config = getHeroMediaConfig(project);
  const mediaSrc = config?.src;
  const isGif = mediaSrc?.toLowerCase().endsWith('.gif');
  const isVideo = !!config && !isGif && /\.(mp4|webm|ogg)$/i.test(mediaSrc ?? '');

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    const play = () => {
      if (isIntersectingRef.current) video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting) play();
          else video.pause();
        });
      },
      { rootMargin: '50px', threshold: 0.1 }
    );
    observer.observe(video);
    video.addEventListener('canplay', play);
    if (video.readyState >= 3) play();
    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', play);
    };
  }, [isVideo, mediaSrc]);

  if (!config) {
    const bgColor = project?.color ?? '#94a3b8';
    return (
      <Link
        to={`/project/${project.slug}`}
        className="block relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden flex items-center justify-center cursor-pointer active:opacity-95 transition-opacity"
        style={{ backgroundColor: bgColor }}
      >
        <span className="relative font-medium tracking-tight text-center text-white text-xl sm:text-2xl">
          {project.name}
        </span>
      </Link>
    );
  }

  const mediaOverlayStyle =
    config.mediaOverlay && config.mediaOverlay !== 'none'
      ? { mixBlendMode: config.mediaOverlay }
      : {};
  const title = config.title ?? project?.name ?? '';
  const mediaTransform = getHeroMediaTransform(project);

  return (
    <Link
      to={`/project/${project.slug}`}
      className="block relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden flex items-center justify-center cursor-pointer active:opacity-95 transition-opacity"
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
          ref={videoRef}
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
          preload="auto"
        />
      ) : (
        <img
          src={config.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          style={mediaOverlayStyle}
        />
      )}
      {title && (
        <h2
          className="relative font-medium tracking-tight text-center pointer-events-none"
          style={{
            fontFamily: '"Aspekta", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            letterSpacing: '-0.04em',
            mixBlendMode: config.titleBlendMode ?? 'overlay',
            color: config.titleColor
          }}
        >
          {title}
        </h2>
      )}
      {config.awardBadge && (
        <img
          src={config.awardBadge}
          alt="Award"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-10 md:w-12 h-auto object-contain brightness-0 invert drop-shadow-md sm:drop-shadow-lg z-10 pointer-events-none"
        />
      )}
    </Link>
  );
};

export default ProjectHeroCard;

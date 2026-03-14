/**
 * Shared project hero section. Renders the subpage thumbnail (hero) using
 * config from project.heroMedia. Same config drives list view via getHeroMediaConfig.
 */
import React, { useRef, useEffect } from 'react';
import { getHeroMediaConfig, getHeroMediaTransform } from '../data/projects.js';

const ProjectHero = ({ project, titleOverride }) => {
  const videoRef = useRef(null);
  const config = getHeroMediaConfig(project);
  const title = titleOverride ?? config?.title ?? project?.name ?? '';
  const mediaTransform = getHeroMediaTransform(project);
  const isGif = config?.src?.toLowerCase().endsWith('.gif');
  const isVideo = !!config && !isGif && /\.(mp4|webm|ogg)$/i.test(config.src ?? '');

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    const play = () => video.play().catch(() => {});
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else video.pause();
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    observer.observe(video);
    video.addEventListener('canplay', play);
    if (video.readyState >= 3) play();
    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', play);
    };
  }, [isVideo, config?.src]);

  if (!config) return null;

  const mediaOverlayStyle =
    config.mediaOverlay && config.mediaOverlay !== 'none'
      ? { mixBlendMode: config.mediaOverlay }
      : {};

  return (
    <section
      className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[450px] lg:h-[596px] mb-6 sm:mb-9 overflow-hidden flex items-center justify-center rounded-2xl sm:rounded-3xl"
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
        <h1
          className="relative font-medium tracking-tight text-center"
          style={{
            fontFamily: '"Aspekta", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
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
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 lg:top-6 lg:right-6 w-12 sm:w-16 md:w-20 lg:w-24 h-auto object-contain brightness-0 invert drop-shadow-lg z-10"
        />
      )}
    </section>
  );
};

export default ProjectHero;

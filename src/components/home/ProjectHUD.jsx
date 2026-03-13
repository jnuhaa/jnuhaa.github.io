import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterFast from './TypewriterFast.jsx';
import ListViewMediaWindow from './ListViewMediaWindow.jsx';
import { TYPOGRAPHY } from '../../layouts/case-study';
import { getHeroMediaConfig } from '../../data/projects.js';

const ProjectHUD = ({ project, variant = 'map' }) => {
  const showMediaInsteadOfName = variant === 'list';
  const [rectReady, setRectReady] = useState(false);

  useEffect(() => {
    if (!showMediaInsteadOfName) return;
    const id = requestAnimationFrame(() => setRectReady(true));
    return () => cancelAnimationFrame(id);
  }, [showMediaInsteadOfName, project?.id]);

  const bottomText = project.projectType || (project.id === 3 ? 'BMW GROUP' : project.id === 2 ? 'SAINT-GOBAIN' : 'INTERNAL R&D');
  const heroConfig = getHeroMediaConfig(project);

  if (showMediaInsteadOfName) {
    return (
      <div className="relative w-full h-full flex flex-col z-20 min-h-0 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="flex-shrink-0 pt-4 lg:pt-5 xl:pt-6 pr-4 pb-3 lg:pb-4 xl:pb-6 relative"
        >
          <div className="flex items-baseline gap-x-4 invisible pointer-events-none" aria-hidden>
            <div className="flex items-baseline gap-x-3 flex-shrink-0">
              <span className={`${TYPOGRAPHY.caption} text-slate-400 leading-none`}>Project brief</span>
              <span className="inline-flex items-center justify-center shrink-0 w-1.5 h-1.5 leading-none">
                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
              </span>
            </div>
            <div className="flex flex-col flex-1 min-w-0 space-y-2">
              <span className={`${TYPOGRAPHY.caption} text-slate-900 uppercase tracking-widest leading-none`}>{project.client}</span>
              {project.projectBrief && (
                <p className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider leading-relaxed normal-case`}>{project.projectBrief}</p>
              )}
            </div>
          </div>
          <div className="absolute inset-0 pt-6 pr-4 flex items-start">
            <div className="flex items-baseline gap-x-4 w-full">
              <div className="flex items-baseline gap-x-3 flex-shrink-0">
                <TypewriterFast text="Project brief" speed={20} delay={0} className={`${TYPOGRAPHY.caption} text-slate-400 leading-none`} />
                <span className="inline-flex items-center justify-center shrink-0 w-1.5 h-1.5 leading-none" aria-hidden>
                  <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0 space-y-2">
                <TypewriterFast text={project.client} speed={20} delay={200} className={`${TYPOGRAPHY.caption} text-slate-900 uppercase tracking-widest leading-none`} />
                {project.projectBrief && (
                  <p className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider leading-relaxed normal-case`}>
                    <TypewriterFast text={project.projectBrief} speed={5} delay={400} />
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex items-center justify-center min-h-0 px-4 py-3 lg:py-4 xl:py-6">
          <div className="w-full max-w-2xl">
            {rectReady ? (
              <ListViewMediaWindow project={project} instant />
            ) : (
              <div className="w-full aspect-video rounded-lg" aria-hidden style={{ minHeight: 1 }} />
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="flex-shrink-0 flex justify-end pt-3 lg:pt-4 xl:pt-6 pb-4 lg:pb-5 xl:pb-6 pr-4 relative"
        >
          <div className="flex flex-col items-end invisible pointer-events-none" aria-hidden>
            <div className="flex items-baseline gap-x-4">
              <div className="flex items-baseline gap-x-3 flex-shrink-0">
                <span className={`${TYPOGRAPHY.caption} text-slate-400 leading-none`}>Type</span>
                <span className="inline-flex items-center justify-center shrink-0 w-1.5 h-1.5 leading-none">
                  <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                </span>
              </div>
              <span className={`${TYPOGRAPHY.caption} text-slate-900 uppercase tracking-widest leading-none whitespace-nowrap flex-shrink-0`}>{bottomText}</span>
            </div>
            <div className="mt-2 text-right">
              <div className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider whitespace-nowrap normal-case`}>{project.sector || project.type}</div>
            </div>
          </div>
          <div className="absolute inset-0 pt-6 pb-6 pr-4 flex justify-end items-end">
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-x-4">
                <div className="flex items-baseline gap-x-3 flex-shrink-0">
                  <span className={`${TYPOGRAPHY.caption} text-slate-400 leading-none`}>Type</span>
                  <span className="inline-flex items-center justify-center shrink-0 w-1.5 h-1.5 leading-none" aria-hidden>
                    <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                  </span>
                </div>
                <span className={`${TYPOGRAPHY.caption} text-slate-900 uppercase tracking-widest leading-none whitespace-nowrap flex-shrink-0`}>
                  <TypewriterFast text={bottomText} speed={20} delay={500} />
                </span>
              </div>
              <div className="mt-2 text-right">
                <div className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider whitespace-nowrap normal-case`}>
                  <TypewriterFast text={project.sector || project.type} speed={20} delay={650} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center z-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute top-6 lg:top-8 xl:top-12 left-0"
      >
        <div className="flex items-baseline gap-x-4">
          <div className="flex items-baseline gap-x-3 flex-shrink-0">
            <TypewriterFast text="Project brief" speed={20} delay={0} className={`${TYPOGRAPHY.caption} text-slate-400 leading-none`} />
            <span className="inline-flex items-center justify-center shrink-0 w-1.5 h-1.5 leading-none" aria-hidden>
              <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            </span>
          </div>
          <div className="flex flex-col flex-1 min-w-0 space-y-2">
            <TypewriterFast text={project.client} speed={20} delay={200} className={`${TYPOGRAPHY.caption} text-slate-900 uppercase tracking-widest leading-none`} />
            {project.projectBrief && (
              <p className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider leading-relaxed normal-case`}>
                <TypewriterFast text={project.projectBrief} speed={5} delay={400} />
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 sm:space-y-6 lg:space-y-6 xl:space-y-8 my-auto pl-0 sm:pl-4 pt-8 sm:pt-12 lg:pt-12 xl:pt-20 pb-8 sm:pb-12 lg:pb-12 xl:pb-16">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 lg:gap-6 xl:gap-12">
          <h2 className={`${TYPOGRAPHY.title} text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl text-slate-900 leading-[0.9]`}>
            <TypewriterFast text={project.name} speed={25} delay={100} />
          </h2>
          {heroConfig?.awardBadge && (
            <img
              src={heroConfig.awardBadge}
              alt="Award"
              className="w-8 sm:w-10 lg:w-12 xl:w-14 h-auto object-contain flex-shrink-0 mt-1"
            />
          )}
        </div>
        <div className="max-w-md ml-4 sm:ml-6 lg:ml-8 border-l border-slate-300 pl-4 sm:pl-5 lg:pl-6 py-1 mt-4 sm:mt-0">
          <p className={`${TYPOGRAPHY.caption} text-slate-600 leading-relaxed normal-case`}>
            <TypewriterFast text={project.description} speed={10} delay={300} />
          </p>
          <p className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider leading-relaxed normal-case mt-4`}>
            <TypewriterFast text={project.timeline} speed={5} delay={600} />
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "circOut", delay: 0.2 }}
        className="absolute bottom-6 lg:bottom-8 xl:bottom-12 right-0"
      >
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-x-4">
            <div className="flex items-baseline gap-x-3 flex-shrink-0">
              <span className={`${TYPOGRAPHY.caption} text-slate-400 leading-none`}>Type</span>
              <span className="inline-flex items-center justify-center shrink-0 w-1.5 h-1.5 leading-none" aria-hidden>
                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
              </span>
            </div>
            <span className={`${TYPOGRAPHY.caption} text-slate-900 uppercase tracking-widest leading-none whitespace-nowrap flex-shrink-0`}>
              <TypewriterFast text={bottomText} speed={20} delay={500} />
            </span>
          </div>
          <div className="mt-2 text-right">
            <div className={`${TYPOGRAPHY.caption} text-slate-400 tracking-wider whitespace-nowrap normal-case`}>
              <TypewriterFast text={project.sector || project.type} speed={20} delay={650} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectHUD;

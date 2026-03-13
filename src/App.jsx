import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HOVER_LEAVE_DELAY_MS, BACKGROUND_COLOR } from './constants.js';
import { PROJECTS } from './data/projects.js';
import ProjectPage from './pages/ProjectPage.jsx';
import Impressum from './pages/Impressum.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Nav from './components/Nav.jsx';
import ThreeCanvas from './components/ThreeCanvas.jsx';
import { TypewriterIntro, ProjectHUD } from './components/home';
import ProjectHeroGallery from './components/home/ProjectHeroGallery.jsx';
import PlaygroundIntro from './components/home/PlaygroundIntro.jsx';
import { TYPOGRAPHY } from './layouts/case-study';
import { useIsTouchDevice, useMediaQuery } from './hooks/index.js';

// --- App Root ---
const ProjectPageWrapper = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  useEffect(() => {
    const scrollToTop = () => {
      scrollRef.current?.scrollTo(0, 0);
      window.scrollTo(0, 0);
    };
    scrollToTop();
    requestAnimationFrame(scrollToTop);
  }, [location.pathname]);
  return (
    <div ref={scrollRef} className={`w-full h-full overflow-y-auto ${BACKGROUND_COLOR.tailwind}`}>
      <ProjectPage />
    </div>
  );
};

const ImpressumPageWrapper = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  useEffect(() => {
    const scrollToTop = () => {
      scrollRef.current?.scrollTo(0, 0);
      window.scrollTo(0, 0);
    };
    scrollToTop();
    requestAnimationFrame(scrollToTop);
  }, [location.pathname]);
  return (
    <div ref={scrollRef} className={`w-full h-full overflow-y-auto ${BACKGROUND_COLOR.tailwind}`}>
      <Impressum />
    </div>
  );
};

const DESKTOP_MEDIA = '(min-width: 1024px)';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('map');
  const [activeProject, setActiveProject] = useState(null);
  const [mouseOverObject, setMouseOverObject] = useState(false);
  const listReturnTimeoutRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [navSection, setNavSection] = useState('work');

  const isDesktop = useMediaQuery(DESKTOP_MEDIA);
  const isTouch = useIsTouchDevice();
  const isProjectPage = location.pathname.startsWith('/project/');

  const showMap = isDesktop && viewMode === 'map';
  const hudVariant = isDesktop ? viewMode : 'list';

  const handleProjectClick = useCallback(
    (project) => {
      if (project?.slug) navigate(`/project/${project.slug}`);
    },
    [navigate]
  );

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const isMedia = (el) => el && /^(IMG|VIDEO|PICTURE|SVG)$/.test(el.tagName);
    const preventContextMenu = (e) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    const preventDragStart = (e) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    document.addEventListener('contextmenu', preventContextMenu, true);
    document.addEventListener('dragstart', preventDragStart, true);
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu, true);
      document.removeEventListener('dragstart', preventDragStart, true);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (listReturnTimeoutRef.current) {
        clearTimeout(listReturnTimeoutRef.current);
        listReturnTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) setActiveProject(null);
  }, [isDesktop]);

  // Fonts loaded via index.html (Aspekta from Fontshare)

  const showGlassCursor = !isTouch && !isProjectPage && mouseOverObject;
  const showDotCursor = !isTouch && !showGlassCursor;

  return (
    <div
      className={`min-h-screen ${BACKGROUND_COLOR.tailwind} text-slate-900 ${TYPOGRAPHY.font} overflow-hidden ${
        !isTouch && (showGlassCursor || showDotCursor) ? 'cursor-none' : ''
      }`}
    >
      {!isTouch && (
        <CustomCursor mousePos={mousePos} showGlass={showGlassCursor} showDot={showDotCursor} />
      )}

      <Nav
        viewMode={viewMode}
        setViewMode={setViewMode}
        navSection={navSection}
        setNavSection={setNavSection}
        isDesktop={isDesktop}
      />

      {navSection === 'work' && (
        <main className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full pt-[88px] sm:pt-20 md:pt-28 lg:pt-24 relative">
          <Routes>
            <Route path="/" element={<>
        {/* LEFT: Project Narrative */}
        <div
          className={`w-full lg:w-1/2 min-h-[50vh] lg:min-h-0 lg:h-full flex items-center justify-center p-6 sm:p-12 lg:p-12 xl:p-20 relative overflow-hidden ${BACKGROUND_COLOR.tailwind}`}
        >
          
          {/* A. SLOW ATMOSPHERE: The Background Video Overlay */}
          {/* This only appears when a project is active */}
          <AnimatePresence>
            {activeProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }} // SLOW transition
                className="absolute inset-0 z-0 overflow-hidden"
              >
                {/* Placeholder for Video - using plain background color */}
                <div className={`absolute inset-0 ${BACKGROUND_COLOR.tailwind}`} />
                {/* If you have a video URL, use: <video src={activeProject.videoUrl} className="w-full h-full object-cover opacity-60" autoPlay loop muted /> */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* B. FAST DATA: The Content Layer */}
          <div className="relative w-full max-w-xl min-h-[60vh] lg:min-h-0 lg:h-[60vh] z-10">
            <AnimatePresence mode="wait">
              
              {!activeProject ? (
                // STATE 1: IDLE (Blueprint layout - coherent with ProjectHUD)
                <motion.div 
                  key="intro"
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(5px)", transition: { duration: 0.2 } }}
                  className="absolute inset-0"
                >
                  <TypewriterIntro />
                </motion.div>
              ) : (
                // STATE 2: ACTIVE — ProjectHUD (list: media replaces name; map: full HUD)
                <motion.div 
                  key={`project-${activeProject.id}-${viewMode}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0"
                >
                  <ProjectHUD project={activeProject} variant={hudVariant} />
                </motion.div>
              )}
              
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Spatial Engine (desktop only) / List */}
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-0 lg:h-full relative overflow-hidden">
          {isDesktop && (
            <div className={`w-full h-full absolute inset-0 ${showMap ? 'visible' : 'invisible pointer-events-none'}`}>
              <ThreeCanvas
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                setMouseOverObject={setMouseOverObject}
                onProjectClick={handleProjectClick}
              />
            </div>
          )}
          {!isDesktop && (
            <div
              className={`w-full h-full p-4 sm:p-6 overflow-y-auto ${BACKGROUND_COLOR.tailwind}`}
            >
              <ProjectHeroGallery />
            </div>
          )}
          {isDesktop && !showMap && (
            <div
              className={`w-full h-full p-6 sm:p-12 lg:p-24 overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-700 ${BACKGROUND_COLOR.tailwind}`}
              onMouseLeave={() => {
                if (listReturnTimeoutRef.current) clearTimeout(listReturnTimeoutRef.current);
                listReturnTimeoutRef.current = setTimeout(() => {
                  listReturnTimeoutRef.current = null;
                  setActiveProject(null);
                }, HOVER_LEAVE_DELAY_MS);
              }}
            >
              <div className="min-h-full flex flex-col justify-center">
               <div className="space-y-0 divide-y divide-slate-100">
                 {['onetutor', 'tenmin', 'nest', 'dna-evolution', 'pixel'].map((slug) => {
                   const p = PROJECTS.find((pr) => pr.slug === slug);
                   if (!p) return null;
                   return (
                 <div 
                    key={p.id} 
                      className="group py-4 flex items-center gap-3 min-h-[44px] cursor-pointer lg:cursor-none transition-colors"
                      onMouseEnter={() => {
                        if (listReturnTimeoutRef.current) {
                          clearTimeout(listReturnTimeoutRef.current);
                          listReturnTimeoutRef.current = null;
                        }
                        setActiveProject(p);
                      }}
                      onMouseLeave={() => {
                        if (listReturnTimeoutRef.current) clearTimeout(listReturnTimeoutRef.current);
                        listReturnTimeoutRef.current = setTimeout(() => {
                          listReturnTimeoutRef.current = null;
                          setActiveProject(null);
                        }, HOVER_LEAVE_DELAY_MS);
                      }}
                      onClick={() => handleProjectClick(p)}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150"
                        style={{ backgroundColor: activeProject?.id === p.id ? (p.slug === 'onetutor' ? '#4F46E5' : p.color) : 'transparent' }}
                        aria-hidden
                      />
                      <p className={`${TYPOGRAPHY.caption} text-[13px] text-slate-700 normal-case leading-snug`}>
                        {p.name} — {p.description}
                      </p>
                   </div>
                 );
                 })}
                </div>
               </div>
            </div>
          )}
        </div>
            </>} />
            <Route path="/impressum" element={<ImpressumPageWrapper />} />
            <Route path="/project/:slug" element={<ProjectPageWrapper />} />
          </Routes>
        </main>
      )}

      {navSection === 'playground' && (
        <main className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full pt-[88px] sm:pt-20 md:pt-28 lg:pt-24 relative">
          <div
            className={`w-full lg:w-1/2 min-h-[50vh] lg:min-h-0 lg:h-full flex items-center justify-center p-6 sm:p-12 lg:p-12 xl:p-20 relative overflow-hidden ${BACKGROUND_COLOR.tailwind}`}
          >
            <div className="relative w-full max-w-xl min-h-[60vh] lg:min-h-0 lg:h-[60vh] z-10">
              <PlaygroundIntro />
            </div>
          </div>
          <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-0 lg:h-full relative overflow-hidden">
            <div className={`absolute inset-0 ${BACKGROUND_COLOR.tailwind}`} />
          </div>
        </main>
      )}
    </div>
  );
};

export default App;


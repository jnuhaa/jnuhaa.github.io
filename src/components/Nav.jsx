import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List as ListIcon, Map as MapIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import MunichTime from './MunichTime.jsx';
import MunichWeather from './MunichWeather.jsx';
import { TYPOGRAPHY } from '../layouts/case-study';
import { BACKGROUND_COLOR } from '../constants.js';
import { getAdjacentProjects, getProjectBySlug } from '../data/projects.js';

const Nav = ({
  viewMode,
  setViewMode,
  navSection,
  setNavSection,
  isDesktop = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isProjectPage = location.pathname.startsWith('/project/');
  const isImpressumPage = location.pathname === '/impressum';
  const currentSlug = isProjectPage ? location.pathname.replace('/project/', '').replace(/\/$/, '') : null;
  const projectNav = isProjectPage && currentSlug
    ? getAdjacentProjects(currentSlug)
    : isImpressumPage
      ? { prev: getProjectBySlug('onetutor'), next: getProjectBySlug('tenmin') }
      : { prev: null, next: null };
  const { prev: prevProject, next: nextProject } = projectNav;

  const useVerticalLayout = !isDesktop;
  const navBgClass = useVerticalLayout ? 'bg-transparent' : BACKGROUND_COLOR.tailwind;

  return (
    <nav className={`fixed top-0 left-0 w-full z-[250] ${navBgClass} min-h-[72px] sm:min-h-0 pt-5 pb-5 px-5 sm:pt-8 sm:pb-8 sm:px-6 md:pt-10 md:pb-10 md:px-8 lg:pt-12 lg:pb-12 lg:pr-12 lg:pl-20 flex justify-between items-center pointer-events-none isolate`}>
      <div className="hidden xl:block min-w-0 xl:min-w-[180px] flex-shrink-0">
        <MunichTime />
      </div>

      <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto absolute left-1/2 -translate-x-1/2">
        <div className={`flex ${BACKGROUND_COLOR.tailwind} border border-slate-200 p-1 rounded-full`}>
          {['playground', 'cv', 'work'].map((s) => (
            <button
              key={s}
              onClick={() => {
                if (s === 'cv') {
                  window.open('/CV_Juna_Han.pdf', '_blank', 'noopener,noreferrer');
                  return;
                }
                setNavSection(s);
                if (s === 'work' && (isProjectPage || isImpressumPage)) navigate('/');
              }}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center px-3 sm:px-5 py-2 rounded-full cursor-pointer lg:cursor-none ${TYPOGRAPHY.caption} transition-all ${
                navSection === s
                  ? (s === 'work' && (isProjectPage || isImpressumPage))
                    ? 'text-slate-400 hover:text-slate-900'
                    : 'bg-slate-900 text-white'
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {(isDesktop || isProjectPage || isImpressumPage) && (
        <div className={`flex ${BACKGROUND_COLOR.tailwind} border border-slate-200 p-1 rounded-full`}>
          {(isProjectPage || isImpressumPage) ? (
            <>
              <button
                onClick={() => prevProject && navigate(`/project/${prevProject.slug}`)}
                className={`min-h-[44px] min-w-[44px] p-2 rounded-full flex items-center justify-center cursor-pointer lg:cursor-none ${prevProject ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-400 cursor-not-allowed'}`}
                disabled={!prevProject}
                aria-label="Previous project"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => nextProject && navigate(`/project/${nextProject.slug}`)}
                className={`min-h-[44px] min-w-[44px] p-2 rounded-full flex items-center justify-center cursor-pointer lg:cursor-none ${nextProject ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-400 cursor-not-allowed'}`}
                disabled={!nextProject}
                aria-label="Next project"
              >
                <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setViewMode('map')}
                className={`min-h-[44px] min-w-[44px] p-2 rounded-full flex items-center justify-center cursor-pointer lg:cursor-none ${viewMode === 'map' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                aria-label="Map view"
                aria-pressed={viewMode === 'map'}
              >
                <MapIcon size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`min-h-[44px] min-w-[44px] p-2 rounded-full flex items-center justify-center cursor-pointer lg:cursor-none ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <ListIcon size={14} />
              </button>
            </>
          )}
        </div>
        )}
      </div>

      <div className="hidden xl:flex min-w-0 xl:min-w-[200px] justify-end flex-shrink-0">
        <MunichWeather />
      </div>
    </nav>
  );
};

export default Nav;

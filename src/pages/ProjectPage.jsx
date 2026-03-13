import React, { Suspense, lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects.js';

const DNAEvolution = lazy(() => import('./projects/DNAEvolution.jsx'));
const Nest = lazy(() => import('./projects/Nest.jsx'));
const OneTutor = lazy(() => import('./projects/OneTutor.jsx'));
const Tenmin = lazy(() => import('./projects/Tenmin.jsx'));
const Pixel = lazy(() => import('./projects/Pixel.jsx'));

const PROJECT_COMPONENTS = {
  'dna-evolution': DNAEvolution,
  nest: Nest,
  onetutor: OneTutor,
  tenmin: Tenmin,
  pixel: Pixel
};

const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const Component = PROJECT_COMPONENTS[slug];
  if (!Component) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-pulse text-slate-400 text-sm">Loading…</div></div>}>
      <Component project={project} />
    </Suspense>
  );
};

export default ProjectPage;

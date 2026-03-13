/**
 * Vertical gallery of hero-style cards for small screens (list view).
 * Each card links to its project subpage. No hover interaction.
 */
import React from 'react';
import { PROJECTS } from '../../data/projects.js';
import ProjectHeroCard from './ProjectHeroCard.jsx';

const PROJECT_ORDER = ['onetutor', 'tenmin', 'nest', 'dna-evolution', 'pixel'];

const ProjectHeroGallery = () => {
  const projects = PROJECT_ORDER.map((slug) =>
    PROJECTS.find((p) => p.slug === slug)
  ).filter(Boolean);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {projects.map((project) => (
        <ProjectHeroCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectHeroGallery;

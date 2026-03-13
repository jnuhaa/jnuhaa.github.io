/**
 * Case Study Layout System
 * Single file with all components: Layout, ToC, Section, Container, ProjectIntro.
 */
import React, { useState, useEffect } from 'react';
import { TYPOGRAPHY, CONTENT, LABEL, COLORS, GAP } from './tokens.js';

// ─────────────────────────────────────────────────────────────────────────────
// TableOfContents
// ─────────────────────────────────────────────────────────────────────────────
const TableOfContents = ({ sections, className = '' }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const firstId = sections[0]?.id;
    const firstEl = firstId ? document.getElementById(firstId) : null;
    if (!firstEl) return;

    const getScrollParent = (el) => {
      let parent = el.parentElement;
      while (parent) {
        const { overflowY } = getComputedStyle(parent);
        const scrollable = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
          parent.scrollHeight > parent.clientHeight;
        if (scrollable) return parent;
        parent = parent.parentElement;
      }
      return null;
    };

    const scrollContainer = getScrollParent(firstEl) ?? document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const checkActiveSection = () => {
      const rect = firstEl.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.2) setActiveId('');
    };

    scrollContainer.addEventListener('scroll', checkActiveSection, { passive: true });
    checkActiveSection();

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', checkActiveSection);
    };
  }, [sections]);

  return (
    <nav className={`hidden xl:block w-40 flex-shrink-0 self-start sticky top-8 ${className}`} aria-label="Case study sections">
      <ul className="space-y-2">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block ${TYPOGRAPHY.font} font-light text-[12px] tracking-tight leading-snug text-slate-400 transition-colors ${
                activeId === id ? 'text-slate-900 font-medium' : 'hover:text-slate-700'
              }`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
const Section = ({ id, title, subtitle, background = 'light', children, className = '' }) => {
  const dark = background === 'dark';
  const sectionClass = dark ? 'bg-slate-900 w-full px-6 md:px-8 lg:px-10 py-16 md:py-20 rounded-xl' : '';
  const titleClass = dark ? 'text-white' : 'text-slate-900';
  const subtitleClass = dark ? 'text-slate-300' : 'text-slate-800';
  const bodyClass = dark ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id={id} className={`space-y-8 scroll-mt-32 ${sectionClass} ${className}`}>
      {title && <h2 className={`${TYPOGRAPHY.title} text-2xl md:text-3xl ${titleClass}`}>{title}</h2>}
      {subtitle && <h3 className={`${TYPOGRAPHY.subtitle} -mt-2 ${subtitleClass}`}>{subtitle}</h3>}
      <div className={`space-y-8 ${TYPOGRAPHY.body} ${bodyClass}`}>{children}</div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Container
// ─────────────────────────────────────────────────────────────────────────────
const GAP_MAP = { sm: GAP.sm, md: GAP.md, lg: GAP.lg, xl: GAP.xl };
const LAYOUT_CLASSES = {
  single: 'max-w-4xl',
  half: 'grid grid-cols-1 md:grid-cols-2 items-start',
  third: 'grid grid-cols-2 md:grid-cols-3',
  quarter: 'grid grid-cols-2 md:grid-cols-4',
  row: 'flex flex-col md:flex-row flex-wrap items-stretch',
  stack: 'flex flex-col',
  asymmetric: 'grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 [&>*:first-child]:md:row-span-2',
  full: 'w-full'
};

const Container = ({
  layout = 'single',
  background = 'none',
  bordered = false,
  label,
  labelPosition = 'above',
  reverse = false,
  gap = 'md',
  children,
  className = ''
}) => {
  const gapClass = GAP_MAP[gap] ?? GAP.md;
  const layoutClass = LAYOUT_CLASSES[layout] ?? LAYOUT_CLASSES.single;
  const bgClass = COLORS.background[background] ?? '';
  const borderClass = bordered ? `border rounded-lg ${background === 'dark' ? COLORS.borderDark : COLORS.border}` : '';
  const paddingClass = (background !== 'none' || bordered) ? 'p-6' : '';
  const childArray = React.Children.toArray(children);
  const isHalf = layout === 'half' && childArray.length >= 2;
  const textClass = background === 'dark' ? 'text-slate-200' : '';

  const content = (
    <div className={`${layoutClass} ${gapClass} ${bgClass} ${borderClass} ${paddingClass} ${textClass}`}>
      {isHalf && reverse ? (
        <>
          <div className="md:order-2">{childArray[0]}</div>
          <div className="md:order-1">{childArray[1]}</div>
        </>
      ) : (
        children
      )}
    </div>
  );

  const labelClass = background === 'dark' ? `${LABEL.base} text-slate-500` : LABEL.base;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && labelPosition === 'above' && <span className={labelClass}>{label}</span>}
      {content}
      {label && labelPosition === 'below' && <span className={`${labelClass} mt-3 block`}>{label}</span>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ProjectIntro
// ─────────────────────────────────────────────────────────────────────────────
const MetaRow = ({ label, value, dark }) => {
  if (!value) return null;
  const labelClass = dark ? 'text-slate-500' : 'text-slate-400';
  const valueClass = dark ? 'text-slate-200' : 'text-slate-900';
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
      <span className={`${TYPOGRAPHY.caption} sm:min-w-[100px] ${labelClass}`}>{label}</span>
      <span className={`text-sm ${TYPOGRAPHY.font} ${valueClass}`}>{value}</span>
    </div>
  );
};

const ProjectIntro = ({
  title,
  timeline,
  brief,
  type,
  role,
  deliverables,
  contributors,
  myContribution,
  heroMedia,
  layout = 'stacked',
  theme = 'light',
  className = ''
}) => {
  const dark = theme === 'dark';
  const hasMeta = timeline || type || role || deliverables || contributors || myContribution;
  const titleClass = dark ? 'text-white' : 'text-slate-900';
  const briefClass = dark ? 'text-slate-300' : 'text-slate-600';

  const metaBlock = hasMeta && (
    <div className="flex flex-col gap-4 sm:gap-3">
      <MetaRow label="Timeline" value={timeline} dark={dark} />
      <MetaRow label="Type" value={type} dark={dark} />
      <MetaRow label="Role" value={role} dark={dark} />
      <MetaRow label="Deliverables" value={deliverables} dark={dark} />
      <MetaRow label="Contributors" value={contributors} dark={dark} />
      <MetaRow label="My contribution" value={myContribution} dark={dark} />
    </div>
  );

  const textBlock = (
    <div className="space-y-6">
      <h1 className={`${TYPOGRAPHY.title} text-4xl md:text-5xl lg:text-6xl ${titleClass}`}>{title}</h1>
      {metaBlock}
      {brief && <p className={`${TYPOGRAPHY.body} text-lg max-w-2xl ${briefClass}`}>{brief}</p>}
    </div>
  );

  const heroBlock = heroMedia && (
    <div className={`w-full rounded-xl overflow-hidden aspect-video md:aspect-[4/3] flex items-center justify-center ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
      {typeof heroMedia === 'string' ? <img src={heroMedia} alt="" className="w-full h-full object-cover" /> : heroMedia}
    </div>
  );

  const headerClass = dark ? 'bg-slate-900 text-white w-full px-6 md:px-8 lg:px-10 py-16 md:py-24 rounded-xl' : '';

  if (layout === 'split' && heroMedia) {
    return (
      <header className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${headerClass} ${className}`}>
        <div className="space-y-8">{textBlock}</div>
        <div className="lg:sticky lg:top-28">{heroBlock}</div>
      </header>
    );
  }

  return (
    <header className={`space-y-8 ${headerClass} ${className}`}>
      <h1 className={`${TYPOGRAPHY.title} text-4xl md:text-5xl lg:text-6xl ${titleClass}`}>{title}</h1>
      {heroBlock}
      {metaBlock}
      {brief && <p className={`${TYPOGRAPHY.body} text-lg max-w-2xl ${briefClass}`}>{brief}</p>}
    </header>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CaseStudyLayout & SectionDivider
// ─────────────────────────────────────────────────────────────────────────────
const CaseStudyLayout = ({ children, sections = [], contentMaxWidth, className = '' }) => {
  const maxWidth = contentMaxWidth ?? CONTENT.maxWidthWide;

  return (
    <article className={`w-full min-h-full ${className}`}>
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 pb-12 md:pb-16">
        {sections.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(160px,1fr)_1024px_minmax(0,1fr)] gap-12 xl:gap-16">
            <TableOfContents sections={sections} />
            <div className={`w-full min-w-0 ${maxWidth}`}>{children}</div>
            <div className="hidden xl:block" aria-hidden />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(160px,1fr)_1024px_minmax(0,1fr)] gap-12 xl:gap-16">
            <div className="hidden xl:block" aria-hidden />
            <div className={`w-full min-w-0 ${maxWidth}`}>{children}</div>
            <div className="hidden xl:block" aria-hidden />
          </div>
        )}
      </div>
    </article>
  );
};

export const SectionDivider = ({ className = '' }) => (
  <hr className={`border-slate-200 my-12 md:my-20 ${className}`} aria-hidden />
);

export default CaseStudyLayout;
export { TableOfContents, Section, Container, ProjectIntro };

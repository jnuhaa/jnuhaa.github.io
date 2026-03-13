/**
 * Reference: Container layout examples and case-study patterns.
 * Use this file as a reference when building case study pages (e.g. Nest, DNA Evolution, OneTutor).
 * Not wired to routing — for copy/paste and structure reference only.
 */
import React from 'react';
import {
  CaseStudyLayout,
  SectionDivider,
  ProjectIntro,
  Section,
  Container,
  TYPOGRAPHY
} from '../../layouts/case-study';

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'layouts', title: 'Layout Playground' },
  { id: 'approach', title: 'Approach' },
  { id: 'insights', title: 'Insights' }
];

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e2e8f0" width="400" height="300"/><text fill="%2394a3b8" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14">Image</text></svg>'
  );

/** Mock project for ProjectIntro when viewing this reference in isolation */
const MOCK_PROJECT = {
  name: 'Layout Reference',
  sector: 'Reference',
  projectBrief: 'How to use Container and Section components in case studies.',
  projectType: 'Documentation'
};

const Reference = () => (
  <CaseStudyLayout sections={SECTIONS}>
    <ProjectIntro
      title={MOCK_PROJECT.name}
      timeline={MOCK_PROJECT.sector}
      brief={MOCK_PROJECT.projectBrief}
      type={MOCK_PROJECT.projectType}
      role="UX Research, Concept Design"
      myContribution="UX Research, Prototyping"
      theme="dark"
    />

    <SectionDivider />

    {/* Overview */}
    <Section id="overview" title="Overview" subtitle="What is this about?">
      <p className={TYPOGRAPHY.body}>
        How might we use AI to generate a &quot;New Normal&quot; of design aesthetics, appeal to our senses in a
        multisensory way and create new experiences? This project explores hyper-personalizing automotive UX through
        AI-driven design.
      </p>

      <Container layout="third" label="Key focus areas" gap="lg">
        <div className="space-y-1">
          <div className="text-2xl font-normal text-slate-900">AI</div>
          <p className={`${TYPOGRAPHY.body} text-sm`}>Design generation</p>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-normal text-slate-900">Multisensory</div>
          <p className={`${TYPOGRAPHY.body} text-sm`}>Experience</p>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-normal text-slate-900">Personalization</div>
          <p className={`${TYPOGRAPHY.body} text-sm`}>User-centric</p>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    {/* Layout playground using Container only */}
    <Section id="layouts" title="Layout Playground" subtitle="All layout variants">
      <p className={TYPOGRAPHY.body}>
        Every layout pattern below is built with Containers and simple blocks—no extra layout components—so you can
        reuse them as baselines in other case studies.
      </p>

      <Container layout="single" background="grey" bordered label="single (whole box, grey)">
        <div className="space-y-2">
          <p className={TYPOGRAPHY.body}>
            Single column, constrained width. Background and border optional.
          </p>
        </div>
      </Container>

      <Container layout="half" label="half (50/50)" gap="lg">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900">Text block</h4>
          <p className={`${TYPOGRAPHY.body} text-sm`}>
            Left: text or any content. Useful for commentary next to an image or diagram.
          </p>
        </div>
        <div className="space-y-2">
          <img src={PLACEHOLDER} alt="" className="w-full rounded-lg" />
        </div>
      </Container>

      <Container layout="half" reverse label="half + reverse (swap order)" gap="lg">
        <div className="space-y-2">
          <img src={PLACEHOLDER} alt="" className="w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900">Media-first layout</h4>
          <p className={`${TYPOGRAPHY.body} text-sm`}>
            Media on left, text on right. Good for hero visuals with supporting explanation.
          </p>
        </div>
      </Container>

      <Container layout="third" label="third (3 columns)" gap="lg">
        {[
          { value: '100+', label: 'Stories' },
          { value: '5', label: 'Years' },
          { value: '90%', label: 'Engagement' }
        ].map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="text-2xl font-normal text-slate-900">{item.value}</div>
            <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>{item.label}</p>
          </div>
        ))}
      </Container>

      <Container layout="quarter" label="quarter (4 columns)" gap="lg">
        {['AI', 'UX', 'Research', 'Design'].map((label) => (
          <div key={label} className="flex items-center justify-center px-4 py-6 rounded-lg border border-slate-200">
            <span className={`${TYPOGRAPHY.body} text-sm text-slate-700`}>{label}</span>
          </div>
        ))}
      </Container>

      <Container layout="row" label="row (horizontal flex)" gap="lg">
        <div className="flex-1 border border-slate-200 rounded-lg p-4 space-y-2 bg-white">
          <h4 className="text-sm font-semibold text-slate-900">Problem</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
            Users expect personalization but fear loss of brand identity.
          </p>
        </div>
        <div className="flex-1 border border-slate-200 rounded-lg p-4 space-y-2 bg-white">
          <h4 className="text-sm font-semibold text-slate-900">Opportunity</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
            AI can scale personalization without losing coherence.
          </p>
        </div>
      </Container>

      <Container layout="stack" label="stack (vertical)" gap="lg">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900">Step 1 — Research</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>Understanding user needs and context.</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900">Step 2 — Concept</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>Exploring directions and hypotheses.</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900">Step 3 — Prototype</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>Building and testing the concept.</p>
        </div>
      </Container>

      <Container layout="asymmetric" label="asymmetric (1 large + 2 stacked)" gap="lg">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img src={PLACEHOLDER} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-4">
          <img src={PLACEHOLDER} alt="" className="w-full rounded-lg" />
          <img src={PLACEHOLDER} alt="" className="w-full rounded-lg" />
        </div>
      </Container>

      <Container layout="full" label="full (bleed)" labelPosition="above">
        <div className="aspect-video bg-slate-200 flex items-center justify-center rounded-lg">
          <span className={`${TYPOGRAPHY.body} text-sm text-slate-500`}>Full-width content</span>
        </div>
      </Container>

      <Container layout="single" background="subtle" bordered>
        <p className={`${TYPOGRAPHY.body} text-slate-600`}>
          Container without label. Useful for simple narrative blocks.
        </p>
      </Container>
    </Section>

    <SectionDivider />

    {/* Approach */}
    <Section id="approach" title="Approach" subtitle="How did we tackle this?" background="dark">
      <p className={TYPOGRAPHY.body}>
        We followed a structured process from research to concept, using AI-driven experimentation as a partner rather
        than a replacement for designers.
      </p>
      <Container layout="stack" gap="lg">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-100">Research</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-300`}>
            Understanding user needs, brand constraints, and opportunities for multisensory experiences.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-100">Concept</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-300`}>
            Exploring AI-generated patterns and mapping them to BMW&apos;s brand DNA.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-100">Prototype</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-300`}>
            Building interactive prototypes to test how drivers perceive and interact with evolving aesthetics.
          </p>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    {/* Insights */}
    <Section id="insights" title="Insights" subtitle="Key learnings">
      <Container layout="row" gap="lg">
        <div className="flex-1 border border-slate-200 rounded-lg p-4 space-y-2 bg-white">
          <h4 className="text-sm font-semibold text-slate-900">Problem</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
            Users expect personalization but fear loss of brand identity.
          </p>
        </div>
        <div className="flex-1 border border-slate-200 rounded-lg p-4 space-y-2 bg-white">
          <h4 className="text-sm font-semibold text-slate-900">Opportunity</h4>
          <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
            AI can scale personalization without losing coherence across touchpoints.
          </p>
        </div>
      </Container>

      <Container layout="single" background="subtle" bordered label="Key learnings">
        <div className="space-y-2">
          <p className={`${TYPOGRAPHY.body} text-slate-700`}>
            From early experiments, we learned that:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
            <li>Users value consistency in brand expression.</li>
            <li>Personalization is expected in premium segments.</li>
            <li>AI-generated variants still require human curation.</li>
          </ul>
        </div>
      </Container>

      <Container layout="single" label="Quote">
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <p className={`${TYPOGRAPHY.body} text-slate-700 italic`}>
            &quot;The future of automotive design lies in the balance between AI-generated variety and human-curated
            quality.&quot;
          </p>
          <p className={`${TYPOGRAPHY.caption} mt-2 normal-case`}>Design Lead, BMW Group</p>
        </div>
      </Container>

      <Container layout="single" label="Takeaway">
        <div className="border border-slate-200 rounded-lg p-4 bg-amber-50">
          <p className={`${TYPOGRAPHY.body} text-slate-800`}>
            The project validated that AI can augment—not replace—designer judgment in creating coherent yet
            personalized experiences.
          </p>
        </div>
      </Container>
    </Section>
  </CaseStudyLayout>
);

export default Reference;

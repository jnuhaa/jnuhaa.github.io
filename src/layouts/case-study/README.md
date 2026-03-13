# Case Study Layout System

Reusable layout components for project case study pages.

## Usage

```jsx
import {
  CaseStudyLayout,
  Section,
  SectionDivider,
  Container,
  ProjectIntro,
  TYPOGRAPHY
} from '@/layouts/case-study';

<CaseStudyLayout sections={[{ id: 'overview', title: 'Overview' }]}>
  <ProjectIntro title="Project Name" brief="..." />
  <SectionDivider />
  <Section id="overview" title="Overview" subtitle="Subtitle">
    <p className={TYPOGRAPHY.body}>Body text...</p>
    <Container layout="half">
      <p>Left</p>
      <img src="..." alt="..." />
    </Container>
  </Section>
</CaseStudyLayout>
```

## Components

| Component | Purpose |
|-----------|---------|
| `CaseStudyLayout` | Page wrapper with optional ToC sidebar |
| `Section` | Content block with h2, subtitle, body area |
| `Container` | Layout grid (single, half, third, full, etc.) |
| `SectionDivider` | Horizontal rule between sections |
| `ProjectIntro` | Hero block with title, meta, brief |

## Container layouts

`single` | `half` | `third` | `quarter` | `row` | `stack` | `asymmetric` | `full`

## Design tokens

`TYPOGRAPHY` (font, title, subtitle, body, caption), `SPACING`, `GAP`, `COLORS`, `CONTENT`

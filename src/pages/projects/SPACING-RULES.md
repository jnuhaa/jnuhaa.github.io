# Project Subpage Spacing Rules

This document describes the spacing conventions used for project case study subpages (e.g. DNA Evolution, Nest). Apply these rules for consistent vertical rhythm across project pages.

## Overview

- **`space-y-12`** — Between main content blocks (images, videos, containers, text groups)
- **`space-y-4`** — Between consecutive paragraphs within a single text group
- **Exceptions** — Do not apply when text is part of half-containers, grids, or other custom layouts

---

## Rules

### 1. Outer content: `space-y-12`

Use `space-y-12` as the spacing between all main content blocks. Wrap each section’s content in:

```jsx
<div className="space-y-12">
  {/* images, videos, text groups, grids, etc. */}
</div>
```

Each direct child (paragraph block, image, video, grid, Container, etc.) is treated as a separate block and gets `space-y-12` spacing from its siblings.

### 2. Text groups: `space-y-4`

For consecutive paragraphs with **no media in between**, wrap them in a group with `space-y-4`:

```jsx
<div className="space-y-4">
  <p className={TYPOGRAPHY.body}>First paragraph...</p>
  <p className={TYPOGRAPHY.body}>Second paragraph...</p>
  <p className={TYPOGRAPHY.body}>Third paragraph...</p>
</div>
```

Only apply this when paragraphs follow each other directly (no image, video, grid, or Container between them).

### 3. Exceptions: Do not apply when text is rearranged

**Do not** wrap text in `space-y-4` when:

- Text is inside a **half-container** (`Container layout="half"`), where paragraphs may be laid out side-by-side
- Text is part of a **grid** or custom layout (e.g. text and images interleaved)
- Text is in a **Container layout="third"** or other special layout

In these cases, the layout component controls spacing and structure.

---

## Example structure

```jsx
<Section id="example" title="Example" subtitle="Subtitle">
  <Container layout="full" gap="lg">
    <div className="space-y-12">
      {/* Block 1: Text group */}
      <div className="space-y-4">
        <p className={TYPOGRAPHY.body}>First paragraph.</p>
        <p className={TYPOGRAPHY.body}>Second paragraph.</p>
      </div>

      {/* Block 2: Image */}
      <img src="/media/example.jpg" className="w-full h-auto rounded-xl" />

      {/* Block 3: Single paragraph (no wrapper needed) */}
      <p className={TYPOGRAPHY.body}>Standalone paragraph.</p>

      {/* Block 4: Half-container (no space-y-4 for children) */}
      <Container layout="half" gap="lg">
        <p className={TYPOGRAPHY.body}>Left column.</p>
        <p className={TYPOGRAPHY.body}>Right column.</p>
      </Container>

      {/* Block 5: Text group after media */}
      <div className="space-y-4">
        <p className={TYPOGRAPHY.body}>Another paragraph.</p>
        <p className={TYPOGRAPHY.body}>And another.</p>
      </div>
    </div>
  </Container>
</Section>
```

---

## Reference implementations

- `DNAEvolution.jsx` — Your BMW DNA, Driver ↔ AI, Explorative Suggestions sections
- `Nest.jsx` — Research, Ideation, Concept, Prototype, Moodboard, What’s Next sections

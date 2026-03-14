import React from 'react';
import { CaseStudyLayout, SectionDivider, Section, Container, TYPOGRAPHY } from '../../layouts/case-study';
import ProjectHero from '../../components/ProjectHero';
import MermaidDiagram from '../../components/MermaidDiagram';

const BENTO_ICON_COLOR = '0299BB';
const BENTO_ICON_SIZE = 24;

const BentoIcon = ({ icon, alt = '' }) => {
  const src = `https://api.iconify.design/${icon}.svg?color=%23${BENTO_ICON_COLOR}&width=${BENTO_ICON_SIZE}&height=${BENTO_ICON_SIZE}`;
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0">
      <img
        src={src}
        alt={alt}
        width={BENTO_ICON_SIZE}
        height={BENTO_ICON_SIZE}
        className="pointer-events-none"
      />
    </span>
  );
};

const SECTIONS = [
  { id: 'context', title: 'Context and stakes' },
  { id: 'research', title: 'Research insights' },
  { id: 'loop', title: 'Flash → Focus → Feedback' },
  { id: 'decisions', title: 'Final UX decisions' },
  { id: 'reflection', title: 'Reflection' }
];

const Tenmin = ({ project }) => (
  <CaseStudyLayout sections={SECTIONS}>
    <ProjectHero project={project} />

    {/* Intro grid: duration / client / etc. */}
    <section className="mt-16 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] gap-x-10 gap-y-4">
        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Client</div>
        <div className={TYPOGRAPHY.body}>Tenmin AI</div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Duration</div>
        <div className={TYPOGRAPHY.body}>2025 — 2.5 months</div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Project type</div>
        <div className={TYPOGRAPHY.body}>App UX/UI</div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Description</div>
          <div className={TYPOGRAPHY.body}>
            Leveraging emotional design principles to “hook” language learners to the review feature.
        </div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Brief</div>
        <div className={TYPOGRAPHY.body}>
            How might we help language learners to form a habit of reviewing their vocabulary everyday?
        </div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Summary</div>
        <div className={`${TYPOGRAPHY.body} space-y-3`}>
          <p>
            “Tenmin” is a mobile app that offers an AI language tutor for real-time conversational practice.
            The app provides immediate feedback on pronounciation, personalized lesson content, and interactive
            speaking exercise designed to build practical fluency faster than traditional language learning methods.
            Their vision is to help users actually speak a langauage, not just learn one. 
            Tenmin’s review feature experience was redesigned to support users to form a habit to practice every day,
            supporting Tenmin’s business goals for user retention and reinforcing its value proposition:
            not just “AI that talks to you,” but “a tutor that helps you keep coming back.”
          </p>
        </div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Team</div>
        <div className={TYPOGRAPHY.body}>
          Nadia Lee, Juna Han, Mauricio Rivero, Thy Nguyen
        </div>

        <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Role</div>
        <div className={`${TYPOGRAPHY.body} space-y-3`}>
          <p>
            UX research, interaction design, and high-fidelity prototyping for the review feature (shipped)
          </p>
          <p>
          <a
                href="https://tenmin.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 cursor-pointer lg:cursor-none"
          >Link to Tenmin ↗</a>
          </p>
        </div>
      </div>
    </section>

    <SectionDivider />

    <Section id="context" title="Context and stakes">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              Tenmin’s promise is to help people actually speak a language.
              The product already provides
              real-time AI conversation, pronunciation feedback, and bite-sized lessons, but the review experience lagged
              behind. 
            </p>
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section id="research" title="Research insights">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              This work was grounded in 10 interviews with language learners new to Tenmin.
              Participants were interviewed about their language learning experience and were asked to use the app
              in unscripted sessions. Afterwards, participants were asked to share their thoughts on the app.
              I tackled the third pain point: learning gets boring. For many learners, review felt like a chore
              rather than a meaningful part of their learning journey. The challenge was making the review feature
              fun and engaging so that users come back to practice every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
              <BentoIcon icon="lucide:route" alt="Don't know where to start" />
              <h3 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Don’t know where to start</h3>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                Many language learners opened Tenmin wanting to practice, but weren’t sure which content to review first,
                or understanding what “good” progress looked like. This uncertainty introduced learning friction.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
              <BentoIcon icon="lucide:users" alt="No good practice partners" />
              <h3 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>No good practice partners</h3>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                Language learners struggle to find safe, reliable speaking partners. In‑person
                classes are hard to fit into a busy schedule, online partners sometimes feel awkward or unsafe, and
                generic AI tools lacked personality.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
              <BentoIcon icon="lucide:sparkles" alt="Learning gets boring" />
              <h3 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Learning gets boring</h3>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                Language learners get demotivated when lessons become boring or too difficult. Making flashcards
                takes too much time and feels like a chore, so learners get lazy and stop studying consistently.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section id="loop" title="Solution: Flash → Focus → Feedback interaction model">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              To make reviewing more fun and engaging, I studied why apps like Tinder feel so “sticky” to use
              and adapted a few of those interaction principles for Tenmin. Three ideas became especially important:
              swipe-to-like, variable-ratio rewards, and a sense of validation during and after a session.
            </p>
          </div>

          <MermaidDiagram
            chart={`
flowchart LR
  center["Interaction principles applied to Tenmin"]

  swipe["Swipe-to-like"]
  swipeTinder["Each swipe is a very short, low-effort interaction, which makes it easy to repeat the process over and over again."]
  swipeTenmin["Flashcards were redesigned to be swipeable, taking only a few seconds, so it feels natural to keep going."]

  variable["Variable-ratio operant conditioning"]
  variableTinder["Rewards, such as matches, are given after an unpredictable number of interactions, which reinforces the behavior and makes the experience feel addictive."]
  variableTenmin["Small rewards such as personalized messages and interactions from the tutor during and after review were implemented, but they vary in content and frequency, mirroring the feeling of being noticed in social apps."]

  validation["Validation"]
  validationTinder["The attention users get from other users makes them feel special, which keeps them coming back."]

  center --> swipe --> swipeTinder --> swipeTenmin
  center --> variable --> variableTinder --> variableTenmin
  center --> validation --> validationTinder --> variableTenmin

  %% Styling (match user flow diagram)
  classDef defaultNode fill:#ffffff,stroke:#CBD5E1,color:#0F172A;
  class center,swipe,variable,validation,swipeTinder,swipeTenmin,variableTinder,variableTenmin,validationTinder defaultNode;
`}
          />
      <div className="space-y-4">
        <p className={TYPOGRAPHY.body}>
          Building on these insights and learning science principles such as spaced repetition, the review
          experience was redesigned into the Flash → Focus → Feedback system. The design follows three principles that integrate research insights:
          Gated progression, personalized scaffolded learning, and delayed variable rewards, which are explained in more detail below.
        </p>
      </div>
          <MermaidDiagram
            chart={`
flowchart TB
  %% Core nodes
  start([Start])
  settingsL["Change settings: Lessons / Saved, Words / Expressions"]
  bookmark["View bookmark"]
  review["Review page: Bookmark / Smart Review"]
  smart{"Smart Review?"}
  quick["Quick Review: sort cards into 3 boxes (Don't know, Not sure, I know)"]
  advDecision{"Advanced Review?"}
  adv["Advanced Review: AI-leveraged personalized exercises"]
  tutor["Tutor interaction: supplementary exercises, games, special flashcards, fun facts"]
  rewards["Receive rewards: shareable flashcards with streak stats for SNS"]
  endNode([End])

  yesNode([Yes])
  nextTimeNode([Next time])

  settingsR["Change settings: Lessons / Saved, A to B, B to A, mix"]
  share["Download card and share on SNS"]

  %% Callout notes (Flash / Focus / Feedback + design principles)
  quickNote["“Flash” + gated progression: Quick Review uses a 3-box sorting system to help the tutor gather diagnostic data before unlocking Advanced Review while helping learners memorize vocab with spaced repetition."]
  advNote["“Focus” + scaffolded and personalized learning: Advanced Review builds on Quick Review by targeting weaker areas with personalized exercises, increasing difficulty gradually while removing unnecessary repetition."]
  tutorNote["“Feedback” + delayed variable rewards: in-depth tutor interaction unlocks only after Advanced Review, providing variable social moments that make sessions feel rewarding."]

  %% Main vertical path
  start --> review
  review --> smart
  smart --> yesNode --> quick
  quick --> advDecision
  advDecision --> adv
  adv --> tutor
  tutor --> rewards
  rewards --> endNode

  %% Left-hand interactions
  settingsL --- bookmark --- review
  quick --- quickNote

  %% Right-hand interactions
  quick --- settingsR
  advDecision --> nextTimeNode --> review
  adv --- advNote
  tutor --- tutorNote
  rewards --- share

  %% Styling
  classDef defaultNode fill:#ffffff,stroke:#CBD5E1,color:#0F172A;
  classDef callout fill:#0299BB,stroke:#0299BB,color:#ffffff;

  class start,settingsL,bookmark,review,smart,quick,advDecision,adv,tutor,rewards,settingsR,share,endNode,yesNode,nextTimeNode defaultNode;
  class quickNote,advNote,tutorNote callout;
`}
          />
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section id="decisions" title="Final UX decisions">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
              <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-500`}>
                V1_Removing Advanced Review and “Not Sure” box
              </h3>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[375px] overflow-hidden rounded-xl min-h-0">
                <iframe
                  width="375"
                  height="812"
                  className="absolute inset-0 h-full w-full border-0"
                  src="https://embed.figma.com/proto/H6KAQk9SnmOyC8yzbRAqYc/Tenmin?node-id=1-3839&scaling=contain&content-scaling=responsive&page-id=0%3A1&footer=false&starting-point-node-id=1%3A3839&show-proto-sidebar=0&embed-host=share"
                  allowFullScreen
                />
              </div>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
              Following discussion with the CPO, the “Advanced Review” stage was deprioritized because quizzes
              after each lesson already surface weak vocabulary and carry those items into the review page, and
              we chose to focus on targeted flashcard practice. Instead, words a learner repeatedly struggles with
              could trigger a “Practice” suggestion, enabling users to practice immediately.
              Additionally, the 3-box sorting system was simplified to 2 options,
              removing “not sure” since it overlaps with “don’t know.” This reduces cognitive load and
              makes swiping more straightforward.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
              <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-500`}>
                V2_Simplifying AI interactions
              </h3>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[375px] overflow-hidden rounded-xl min-h-0">
                <iframe
                  width="375"
                  height="812"
                  className="absolute inset-0 h-full w-full border-0"
                  src="https://embed.figma.com/proto/H6KAQk9SnmOyC8yzbRAqYc/Tenmin?node-id=1-2034&scaling=contain&content-scaling=responsive&page-id=0%3A1&footer=false&starting-point-node-id=1%3A2034&show-proto-sidebar=0&embed-host=share"
                  allowFullScreen
                />
              </div>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                AI features were initially scattered across the interface, with different entry points.
                To reduce confusion, they were consolidated into a single “Ask a question” entry point with
                suggested prompt bubbles that feel like interacting with a tutor rather than navigating a menu.
                The feature copy was also rewritten in a more conversational tone to help users feel like they can talk to the AI.
                AI interactions appear in a separate overlay, distinguishing AI assistance from the flashcard experience.

              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
            <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-500`}>
              Review feature prototype
            </h3>
            <div className="relative mx-auto w-full max-w-[375px] aspect-[9/16] overflow-hidden rounded-xl min-h-0">
              <iframe
                width="375"
                height="812"
                className="absolute inset-0 h-full w-full border-0"
                src="https://embed.figma.com/proto/H6KAQk9SnmOyC8yzbRAqYc/Tenmin?node-id=50-11300&scaling=contain&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=50%3A11300&footer=false&show-proto-sidebar=0&embed-host=share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
            <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-500`}>
              Tenmin app prototype
            </h3>
            <div className="relative mx-auto w-full max-w-[375px] aspect-[9/16] overflow-hidden rounded-xl min-h-0">
              <iframe
                width="375"
                height="812"
                className="absolute inset-0 h-full w-full border-0"
                src="https://embed.figma.com/proto/H6KAQk9SnmOyC8yzbRAqYc/Tenmin?node-id=50-10548&scaling=contain&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=50%3A10548&footer=false&show-proto-sidebar=0&embed-host=share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="w-full rounded-xl overflow-hidden">
              <video
                src="/media/tenmin-demo.mp4"
                className="w-full h-auto transform scale-[1.265] -translate-y-0.75"
                autoPlay
                loop
                muted
              />
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section
      id="reflection"
      title="Designing with constraints"
      subtitle="What I learned from this project"
    >
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4">
            <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-400`}>
              Tenmin team in action!
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[4/3]">
                <img
                  src="/media/tenmin-team-1.JPG"
                />
              </div>
              <div className="relative aspect-[4/3]">
                <img
                  src="/media/tenmin-team-2.JPG"
                  className="absolute top-2 left-4 w-3/5 h-auto"
                  alt="Tenmin research session"
                />
                <img
                  src="/media/tenmin-team-3.JPG"
                  className="absolute bottom-2 right-2 w-2/5 h-auto"
                  alt="Tenmin team workshop"
                />
              </div>
            </div>
          </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>Learning is an emotional experience</h3>
            <p className={TYPOGRAPHY.body}>
              I learned that reviewing is an emotional experience, not just functional.
              Learners become demotivated to review over time, and designing from that starting point
              helped me widen the scope of the review feature to include emotional design elements.
              For this purpose, studying social apps with established interaction patterns
              was a great way to get inspiration for designing the review feature to feel more like a social experience
              that keeps learners wanting to come back while still being functional as a learning tool.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>Stay agile to pace with startup growth</h3>
            <p className={TYPOGRAPHY.body}>
              Many initially planned features didn’t make it into the final demo because the redesign had to pace
              with the startup’s fast-moving product development. This required aligning closely with product
              priorities, technical feasibility, and the existing app architecture and keeping the solutions
              more near-term than long-term, which meant cutting back on features when necessary. I proposed design directions to the CPO,
              gathered feedback, and iterated quickly, learning to adapt design decisions to where the startup was standing at the time.
            </p>
          </div>
        </div>
  </div>
      </Container>
    </Section>
  </CaseStudyLayout>
);

export default Tenmin;

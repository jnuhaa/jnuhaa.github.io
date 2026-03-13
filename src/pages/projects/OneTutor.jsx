import React from 'react';
import {
  CaseStudyLayout,
  SectionDivider,
  Section,
  Container,
  TYPOGRAPHY
} from '../../layouts/case-study';
import ProjectHero from '../../components/ProjectHero';

const BENTO_ICON_COLOR = '4F46E5';
const BENTO_ICON_SIZE = 24;
/** Icon from Iconify API (e.g. "lucide:brain"). */
const BentoIcon = ({ icon, alt = '' }) => {
  const src = `https://api.iconify.design/${icon}.svg?color=%23${BENTO_ICON_COLOR}&width=${BENTO_ICON_SIZE}&height=${BENTO_ICON_SIZE}`;
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0">
      <img src={src} alt={alt} width={BENTO_ICON_SIZE} height={BENTO_ICON_SIZE} className="pointer-events-none" />
    </span>
  );
};

const SECTIONS = [
  { id: 'context', title: 'Context and stakes' },
  { id: 'adoption', title: 'Research insights' },
  { id: 'decisions', title: 'Key decisions' },
  { id: 'decisions-tag-set', title: 'One quiz = one tag set' },
  { id: 'decisions-manage-quizzes', title: 'Unified Manage Quizzes flow' },
  { id: 'decisions-ai-tutor', title: 'AI tutor as more than a chatbot' },
  { id: 'outcome', title: 'Outcome summary' },
  { id: 'responsibility', title: 'Reflection' }
];

const OneTutor = ({ project }) => (
  <CaseStudyLayout sections={SECTIONS}>
    <ProjectHero project={project} />

    {/* Intro grid: duration / client / etc. */}
      <section className="mt-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] gap-x-10 gap-y-4">
          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Client</div>
          <div className={TYPOGRAPHY.body}>OneTutor AI</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Duration</div>
          <div className={TYPOGRAPHY.body}>2025, 2026 — 4 months, ongoing</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Project type</div>
          <div className={TYPOGRAPHY.body}>Web UX/UI, Product Strategy</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Description</div>
          <div className={TYPOGRAPHY.body}>Bringing AI to higher education</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Brief</div>
          <div className={TYPOGRAPHY.body}>
            How can we build trust of professors and students in AI-assisted content creation and tutoring?
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Summary</div>
          <div className={`${TYPOGRAPHY.body} space-y-3`}>
            <p>
              “OneTutor” is an AI-powered LMS platform that transforms course materials into effective learning
              experiences and provides learning analytics from student interactions, enabling lecturers to integrate responsible AI into their entire teaching cycle in a
              Human-in-the-Loop model. The goal of this work was to reduce adoption friction and build trust in the AI tutor by restructuring
              the information architecture, simplifying core flows, and designing transparency features that help both
              lecturers and students understand and rely on the system.
            </p>
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Team</div>
          <div className={TYPOGRAPHY.body}>
            Juna Han, Fabio Burmann, Özge Belgül, Nicolas Ebner
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Role</div>
          <div className={`${TYPOGRAPHY.body} space-y-3`}>
            <p>
            UX Research, IA restructuring, accessibility, branding, and design system
            </p>
            <p>
              <a
                href="https://ux-design-awards.com/winners/2026-1-onetutor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 cursor-none"
              >
                Link to UX Awards project page ↗
              </a>
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
            OneTutor is an AI-powered LMS platform that transforms course materials into effective learning experiences. It enables lecturers to integrate responsible AI into their entire teaching cycle from course preparation, delivery to assessment in a Human-in-the-Loop (HITL) model, combining automation with human oversight to ensure content accuracy, while students benefit from an AI tutor that provides reliable and personalized tutoring. It is currently in use by 30 universities and 21,000 learners in Germany (as of Nov. 2025).
          </p>
          <p className={TYPOGRAPHY.body}>
            Before the redesign, the information architecture and user flow of the product weren’t defined yet: A large-scale pilot study across 10 institutions and 2 user interviews reflected these weak points with insights related to adoption friction, creating a risk of a technically capable product with a responsible AI model failing due to UX.
          </p>
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section id="adoption" title="What was causing adoption friction?">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <h2 className={TYPOGRAPHY.subtitle}>1. Quantitative insights about OneTutor users and GenAI adoption</h2>

          {/* Lecturers — labeled container */}
          <div className="space-y-4">
            <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-500`}>For lecturers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl flex flex-col gap-3 min-h-[180px] border border-slate-200 bg-white md:col-span-2">
                <BentoIcon icon="lucide:bot" alt="GenAI experience" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>50% without GenAI experience</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                  Lecturers’ prior experience with Generative AI (GenAI) in teaching and their comfort level with technology (tech-affinity) influence their trust in AI and willingness to use it. 50% of surveyed lecturers had no prior GenAI teaching experience and, as a group, scored a lower 2.7 on the &quot;Affinity for Technology Interaction&quot; self-efficacy scale (ATI-S index) compared to those with prior experience (scoring 3.3).
                </p>
              </div>

              <div className="p-5 rounded-2xl flex flex-col gap-3 min-h-[180px] border border-slate-200 bg-white">
                <BentoIcon icon="lucide:message-circle-question" alt="Unaware" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>61% of students unaware</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                  The limited GenAI experience likely prevents lecturers from trusting in and advocating for AI-integrated teaching tools, which may explain why 61% of students who didn’t use OneTutor were unaware of its existence.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-3 lg:col-span-3">
                <BentoIcon icon="lucide:handshake" alt="Tech-affinity" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Low tech-affinity correlates with low trust</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                  Individuals with lower tech-affinity tend to experience anxiety and a steeper learning curve when engaging with technology. Additionally, AI research supports a strong correlation between self-efficacy and trust in AI.
                </p>
              </div>
            </div>
          </div>

          {/* Students — labeled container */}
          <div className="space-y-4">
            <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-500`}>For students</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-3 min-h-[180px]">
                <BentoIcon icon="lucide:scale" alt="Pedagogical misalignment" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Pedagogical misalignment</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                  78% felt other learning methods were more effective; 62% preferred active research over AI-assisted tutoring; 60% felt the tool didn’t fit their learning style. 34% feared degraded critical thinking (over-reliance anxiety).
                </p>
              </div>

              <div className="p-5 rounded-2xl flex flex-col gap-3 min-h-[180px] border border-slate-200 bg-white">
                <BentoIcon icon="mdi:emoticon-confused-outline" alt="Doubt in AI" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>43% doubt in AI answers</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                  Students cited skepticism about the accuracy of the AI as their reason for non-use. XAI research shows that &quot;black box&quot; tutors lacking explanations, sources, or reasoning significantly reduce confidence—even with correct output.
                </p>
              </div>
            </div>
          </div>

          <p className={`${TYPOGRAPHY.body} text-slate-700`}>
            Conclusion: Trust in AI was fragile among both lecturers and students. The findings indicated a need for two main platform improvements:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
              <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-start text-lg font-medium text-slate-900 ${TYPOGRAPHY.font}`} aria-hidden>1</span>
              <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Simplify the platform's user experience</h4>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                where lecturers can collaborate easily with AI can serve as a buffer for the observed fragile trust and accommodate the diverse levels of tech-affinity and GenAI familiarity.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
              <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-start text-lg font-medium text-slate-900 ${TYPOGRAPHY.font}`} aria-hidden>2</span>
              <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Make the AI’s behavior more transparent</h4>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                to students by demonstrating the AI’s logic and sourcing its answers, alongside supporting them with advanced tutoring features to make AI feel more like a learning companion.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className={TYPOGRAPHY.subtitle}>2. Qualitative insights about OneTutor’s UX</h2>
            <div className="space-y-4">
              <p className={TYPOGRAPHY.body}>
                What we observed:
              </p>
              <ul className={`${TYPOGRAPHY.body} list-disc list-inside space-y-1`}>
                <li>Lecturers struggled to generate and manage quizzes</li>
                <li>Students found navigation confusing and cognitively heavy</li>
              </ul>
              <p className={TYPOGRAPHY.body}>What this came from:</p>
              <ul className={`${TYPOGRAPHY.body} list-disc list-inside space-y-1`}>
                <li>The existing information architecture for quizzes in OneTutor, where a quiz is assigned a single “topic” (e.g., “AI” for an AI quiz), is not scalable.              </li>
              </ul>
              <p className={TYPOGRAPHY.body}>
                Currently, quizzes in OneTutor are labeled as “topics.” For example, a quiz on “AI” is assigned the “AI” topic and appears to students in a lecturer’s course list under that name.
                The system is functional under simple conditions: In an ideal scenario, you’d have courses with a small, manageable number of independent topics. Imagine a “Color Theory” course with quizzes for primary colors like red, yellow and blue.
                The system breaks when topics become interconnected. Let’s say we introduce a quiz on purple. Since purple is a mix of “red” and “blue,” shouldn’t this quiz also be associated with these topics, not just the “purple” topic?
              </p>
              <p className={TYPOGRAPHY.body}>
                The flaw in the existing system is assuming “one quiz = one topic.” Professors must manage large-scale courses with 150+ materials and 30+ topics, which leads to a “flat tag list” of hundreds of unmanageable tag instances, which students already experience as a messy layout. Additionally, academic knowledge is not always linear and can be:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-3">
                <BentoIcon icon="lucide:route" alt="Linear" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Linear</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                  Roadmap-like (e.g. German A1 → B1)
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-3">
                <BentoIcon icon="lucide:folder-tree" alt="Hierarchical" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Hierarchical</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                  Folder-like (e.g. Variables → Control Flow, Conditionals, Loops)
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col gap-3">
                <BentoIcon icon="lucide:git-branch" alt="Interconnected" />
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Interconnected</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>
                  Mindmap-like (e.g. Machine Learning ↔ Computer Vision)
                </p>
              </div>
            </div>
            <p className={TYPOGRAPHY.body}>
              Conclusion: The existing system neglects the fact that topics are often interrelational, which risks collapse as the course scales. Importantly, it imposes a high cognitive load on students by forcing them to mentally sort the topics themselves. For professors, the rigid &quot;one quiz = one topic&quot; logic and the consequent need to add extra keywords for the topic for clarity when generating questions was highly confusing. The findings indicated a need for an easily maintainable system for creating and managing quizzes and their associated tags.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
              <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-start text-lg font-medium text-slate-900 ${TYPOGRAPHY.font}`} aria-hidden>3</span>
              <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Make it easy to create and manage quizzes</h4>
              <p className={`${TYPOGRAPHY.body} text-sm text-slate-600 flex-1`}>
                by implementing a scalable system that allows for organization and reuse of a high number of topics for quizzes, and a more intuitive layout for lecturers to create and manage quizzes, all of which students can benefit from as they navigate the platform.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />


    <Section id="decisions" title="Key decisions">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          {/* Subchapter 1 */}
          <div id="decisions-tag-set" className="space-y-12 scroll-mt-32">
            <h1 className={`${TYPOGRAPHY.title} text-xl md:text-2xl text-slate-900`}>1. From &quot;one quiz = one topic&quot; to &quot;one quiz = one tag set&quot;</h1>

            <video src="/media/onetutor-film-modular-design.mp4" autoPlay loop muted playsInline className="w-full h-auto rounded-2xl border border-slate-200" />
            <img src="/media/onetutor-2.jpg" className="w-full h-auto rounded-2xl border border-slate-200" />
            <img src="/media/onetutor-3.jpg" className="w-full h-auto rounded-2xl border border-slate-200" />
            
            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4">
              <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-400`}>Previously…</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-topics.png" alt="Topics" className="w-full h-auto rounded-2xl border border-slate-200" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                  A quiz could only be associated with one topic.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-materials.png" alt="Materials" className="w-full h-auto rounded-2xl border border-slate-200" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                  A looong list of materials also wasn’t easy to manage.
                </p>
              </div>
              </div>
            </div>

            <div className={`${TYPOGRAPHY.body} text-slate-600 space-y-4`}>
              <h4 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>1. Tagging system × Quizzes</h4>
            <p>
              We redesigned the IA for quizzes to allow for scalability in practice. Previously, a quiz was limited to a one-to-one mapping with a single “topic” attribute. The new IA utilizes a one-to-many mapping and embeds multi-selectable topic tags and learning materials as a set of attributes, “tag set,” into each quiz. This approach has the following advantages: 
            </p>
            <ul className={`${TYPOGRAPHY.body} list-disc list-inside space-y-2`}>
              <li>Flexibility: Small topics can be combined into one quiz or broad topics split into multiple quizzes (e.g., subtopics like “AI fundamentals”).</li>
              <li>Reuse: Topics can be used across various quizzes (e.g., using the “AI” topic tag for quizzes on “Deep Learning,” “Computer Vision,” etc.”).</li>
            </ul>
            </div>

            <div className={`${TYPOGRAPHY.body} text-slate-600 space-y-4`}>
              <h4 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>2. Tagging system × Learning materials</h4>
            <p>
              Applying this logic to learning materials led to an idea with future potential: using AI to auto-extract topic tags from uploaded learning materials. These auto-extracted tags would then be applied to quizzes when linked to them, creating an automated workflow that cuts down on manual labeling effort. Tag set for materials:
            </p>
            <ul className={`${TYPOGRAPHY.body} list-disc list-inside space-y-1`}>
              <li>Topics (Auto-extracted)</li>
              <li>Module (Year, week, chapter)</li>
              <li>Format (Slides, worksheet, transcript, video, PDF, etc.)</li>
              <li>Upload date</li>
            </ul>
            </div>

            <div className={`${TYPOGRAPHY.body} text-slate-600 space-y-4`}>
              <h4 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>3. ... Integrated into the UI</h4>
            <p>
              Quizzes and learning materials are resigned as card or table formats with the tags displayed as embedded UI chips. They are placed in a “filterable library” interface designed for progressive disclosure to prevent overwhelming both user groups.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Trade-off</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>↑ Slightly more upfront structure for lecturers in exchange for long-term clarity.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Why it matters</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>The solutions result in a more intuitive layout, accommodating users with varying tech-affinity scores (ATI-S). The cleaner quiz interface reduces navigational clutter for students and prevents complexity as the course grows. This foundation creates opportunities for an auto-extracting AI feature and a controlled information hierarchy that the AI tutor can leverage.</p>
              </div>
            </div>
          </div>

          <SectionDivider />

          {/* Subchapter 2 */}
          <div id="decisions-manage-quizzes" className="space-y-12 scroll-mt-32">
            <h1 className={`${TYPOGRAPHY.title} text-xl md:text-2xl text-slate-900`}>2. One unified &quot;Manage Quizzes&quot; flow</h1>

            <video src="/media/onetutor-film-question-generation.mp4" autoPlay loop muted playsInline className="w-full h-auto rounded-2xl border border-slate-200" />
            <img src="/media/onetutor-4.jpg" className="w-full h-auto rounded-2xl border border-slate-200" />
            
            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4">
              <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-400`}>Previously…</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-material-quiz-first.png" className="w-full h-auto rounded-2xl border border-slate-200" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                    Course homepage was cluttered, with 3 separate options for managing the quiz and the questions.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-generate-questions.png" className="w-full h-auto rounded-2xl border border-slate-200" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                  “Generate Questions with AI” page
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-edit-questions.png" className="w-full h-auto rounded-2xl border border-slate-200" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                  “Question Editing for Your Topics” page
                </p>
              </div>
              </div>
            </div>

            <div className={`${TYPOGRAPHY.body} text-slate-600 space-y-4`}>
            <p>
              Lecturers were finding it difficult to generate and manage questions, and were confused by redundant “Generate Questions” and “Edit Questions” screens. To simplify the content creation process, we designed a 3-step flow utilizing progressive disclosure:
            </p>
            <ol className={`${TYPOGRAPHY.body} list-decimal list-inside space-y-2`}>
              <li>Configure quiz</li>
              <li>Select materials from a filterable materials library</li>
              <li>Generate & edit in a two-panel view</li>
            </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Trade-off</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>Fewer visible options upfront for more control.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Why it matters</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>The solution supports OneTutor human-in-the-loop approach. Simplified workflows improve adoption rates by enabling lecturers to use AI-assisted creation tools as content creators without needing to be AI power users.</p>
              </div>
            </div>
          </div>

          <SectionDivider />

          {/* Subchapter 3 */}
          <div id="decisions-ai-tutor" className="space-y-12 scroll-mt-32">
            <h1 className={`${TYPOGRAPHY.title} text-xl md:text-2xl text-slate-900`}>3. AI tutor as more than just a chatbot</h1>

            <video src="/media/onetutor-film-assistant-bar.mp4" autoPlay loop muted playsInline className="w-full h-auto rounded-2xl border border-slate-200" />
            <img src="/media/onetutor-new-quiz.svg" className="w-full h-auto rounded-2xl border border-slate-200" />

            <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4">
              <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-400`}>Previously…</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-quiz.png" className="w-full h-auto rounded-2xl" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                  Quiz interface: A “Help” button that opens a preset hint.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <img src="/media/onetutor-chat.png" className="w-full h-auto rounded-2xl" />
                <p className={`${TYPOGRAPHY.font} text-sm font-light leading-[1.7] text-slate-400`}>
                  Chat interface: A chat window that exists as a separate page.
                </p>
              </div>
              </div>
            </div>
            
            <div className={`${TYPOGRAPHY.body} text-slate-600 space-y-4`}>
            <p>
              While the restructuring of the IA for quizzes and general UI improvements enhanced usability for both lecturers and students, a critical challenge remained: student skepticism regarding AI accuracy (cited by 43% of surveyed students as the reason for not using OneTutor). To address this fundamental issue of AI trust, we designed the AI Assistant Bar. This feature is a context-aware, lightweight “glass” overlay embedded directly within quizzes. The chat feature is integrated into the overlay whereas currently it exists as a separate page.
            </p>
            <ul className={`${TYPOGRAPHY.body} list-disc list-inside space-y-2`}>
              <li>Placement: It is designed to provide non-disruptive guidance without breaking focus.</li>
              <li>Source citation: It allows students to trace GenAI’s output back to its original source materials. This directly addresses the trust deficits.</li>
              <li>Multi-modal tutoring: It serves as a groundwork for supporting diverse learning preferences (e.g., text, audio, video) and future accessibility extensions (e.g., for ADHD and dyslexia support).</li>
            </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Trade-off</h4>
                <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>This design prioritizes the non-disruptive learning experience over the conversational freedom of a full chat window.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
                  <h4 className={`${TYPOGRAPHY.subtitle} text-sm text-slate-900`}>Why it matters</h4>
                  <p className={`${TYPOGRAPHY.body} text-sm text-slate-600`}>The AI Assistant Bar transforms the perception of AI from an untrustworthy blackbox into a dependable learning partner. By mitigating the primary adoption blocker (trust deficits), we expect significantly increased student engagement. It also lays the groundwork for future accessibility extensions, including support for students with ADHD and dyslexia.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section id="outcome" title="Outcome summary">
      <Container layout="full" gap="lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <ul className={`${TYPOGRAPHY.body} list-disc list-inside space-y-2`}>
            <li>Tagging system for easy quiz and material management</li>
            <li>Clearer visual hierarchy and UI for reduced cognitive load</li>
            <li>Simplified 3-step content creation workflow for improved lecturer confidence</li>
            <li>AI Assistant Bar for improved student AI trust and future accessibility extensions</li>
          </ul>
          </div>
        </div>
      </Container>
    </Section>

    <SectionDivider />

    <Section id="responsibility" title="Designing for academic responsibility" subtitle="What I learned from this project">
      <Container layout="full" gap="lg">
        <div className="space-y-12">

        <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4">
          <h3 className={`${TYPOGRAPHY.caption} tracking-[0.18em] uppercase text-slate-400`}>Teamwork makes dreamwork!</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="aspect-[4/3]">
              <img src="/media/onetutor-team-1.jpeg" className="w-11/12 h-11/12 object-contain" />
            </div>
            <div className="grid grid-rows-2 gap-3 aspect-[4/3]">
                <img src="/media/onetutor-team-2.jpeg" className="w-11/12 h-11/12 object-contain" />
                <img src="/media/onetutor-team-3.png" className="w-11/12 h-11/12 object-contain" />
            </div>
          </div>
        </div>
          <div className="space-y-4">
            <h4 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>Sometimes, “UX cleanups” are not enough</h4>
            <p className={TYPOGRAPHY.body}>
              It took courage to convince the team that the root of our problems was not the ugly platform. We needed to tap into system-level restructuring of the product and ensure that it can support universities on a stable IA foundation. Once we established clarity at this level, an appealing layout naturally followed.
            </p>
          </div>
            <div className="space-y-4">
            <h4 className={`${TYPOGRAPHY.subtitle} text-slate-900`}>Help people befriend AI</h4>
            <p className={TYPOGRAPHY.body}>
              OneTutor aims to become an institutional AI layer for deep learning. To achieve this mission, we need to treat AI as a socio-technical system, not just a feature. Designing for user trust and control should come first before expecting users to fully engage with AI’s technical capabilities as a teaching assistant and a learning companion.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  </CaseStudyLayout>
);

export default OneTutor;

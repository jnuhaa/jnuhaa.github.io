import React from 'react';
import {
  CaseStudyLayout,
  Section,
  SectionDivider,
  Container,
  TYPOGRAPHY
} from '../../layouts/case-study';
import ProjectHero from '../../components/ProjectHero';

const SECTIONS = [
  { id: 'research', title: 'Context' },
  { id: 'ideation', title: 'Ideation' },
  { id: 'concept', title: 'Concept: Nest and the Egg' },
  { id: 'prototype', title: 'Prototype and materials' },
  { id: 'journeys', title: 'User journeys and Egg-GPT' },
  { id: 'next', title: "Reflection" }
];

const Nest = ({ project }) => (
  <CaseStudyLayout sections={SECTIONS}>
    <ProjectHero project={project} />

    {/* Intro grid: duration / supervised by / etc. */}
      <section className="mt-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] gap-x-10 gap-y-4">
          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Duration</div>
          <div className={TYPOGRAPHY.body}>4 months, 2024</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Supervised by</div>
          <div className={TYPOGRAPHY.body}>Prof. Dr. Tina Weisser, Christina Ebert</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Project type</div>
          <div className={TYPOGRAPHY.body}>
            Service design concept for project “Playful Healthcare Design”
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Description</div>
          <div className={TYPOGRAPHY.body}>
            Empowering young cancer patients to regain autonomy and build emotional resilience.
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Brief</div>
          <div className={TYPOGRAPHY.body}>
            How can we give young cancer patients a safe space of autonomy that is stripped of them during hospitalization?
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Summary</div>
          <div className={TYPOGRAPHY.body}>
            <p>
              “Nest” addresses a critical gap in traditional healthcare services that often overlook the specific
              needs of children and teenagers by utilising the Playful Healthcare design approach, which recognises
              the value of games in transforming care experiences for young patients.
            </p>
            <p>
              This demographic’s deep connection to digital media creates a unique opportunity to use gamification
              as a therapeutic and educational tool, with studies showing it can increase engagement by 34% and
              adherence by 20% (Deloitte Insights, 2020). Our aim was to deliver an interactive and immersive
              experience that empowers young cancer patients to regain autonomy to build emotional resilience
              through personalized and positive experiences, rooted in AI-powered user research and evidence-based
              design.
            </p>
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Team</div>
          <div className={TYPOGRAPHY.body}>Vlad Panait, Daryna Derepa, Juna Han</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Role</div>
          <div className={TYPOGRAPHY.body}>
            Research, concept development, structural design of Nest, 3D modeling and animations.
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Main narrative sections — grouped into readable blocks using Container */}
      <Section id="research" title="Understanding the context" subtitle="Research & problem framing">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <div className="space-y-4">
              <p className={TYPOGRAPHY.body}>
              Our team followed the Service Design Thinking Process throughout the project to systematically extract insights, identify challenges, and ideate impactful solutions. We selected young cancer patients as our target group due to the unique challenges they face as youth during extended hospitalizations. We began with a Stakeholder Map to identify both direct and indirect stakeholders.
            </p>
            <p className={TYPOGRAPHY.body}>
              Key questions were: Who is affected? Who can provide insights or inspiration? Next we used an Actors Map to analyze the relationships between these stakeholders to identify potential pain points. These hypotheses served not as conclusions but rather as tools to develop discussion guides for engaging with stakeholders, ensuring that the insights gained were rooted in real-life experiences.
            </p>
            </div>

            <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src="/media/nest-2.svg" alt="Stakeholder mapping" className="w-full h-auto rounded-xl" />
              <img src="/media/nest-3.svg" alt="Actors map" className="w-full h-auto rounded-xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src="/media/nest-4.svg" alt="User research walls" className="w-full h-auto rounded-xl" />
              <img src="/media/nest-5.svg" alt="Service design process" className="w-full h-auto rounded-xl" />
            </div>
            </div>

            <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              We used ChatGPT to assist in drafting discussion guides, tailoring questions for key stakeholders—hospital staff, young cancer patients undergoing treatment, and their guardians—in order to extract meaningful insights while maintaining a sensitive tone. Our goal was to understand:
            </p>
            <ul className={`${TYPOGRAPHY.body} list-none space-y-2 pl-0`}>
              <li>• Whether our hypotheses aligned with their realities.</li>
              <li>• A typical day in the life of a young cancer patient.</li>
              <li>• Current forms of support available and areas for improvement.</li>
            </ul>
            <p className={TYPOGRAPHY.body}>
              However, when outreach to pediatric facilities yielded no responses for an extended period, we had to adapt quickly. Using ChatGPT, we simulated custom personas to simulate interviews with our target groups to extract insights, replacing direct stakeholder input. The personas—Maxi, a 7-year-old leukemia patient; Julia, a 16-year-old general patient; and Helena, a 36-year-old assistant doctor—were developed using a detailed prompt in the GPT Builder. The prompt outlined each persona’s background, behaviour, psychological state, rules to ensure realistic responses, and additional information derived from literature and real-life interviews. At the same time, we conducted desk research to test our hypotheses. This strategy allowed us to make progress in the research phase and gather insights despite the initial challenges. In addition, these personas were also used in the prototyping phase to assess our initial rough ideas.
            </p>
            </div>

            <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden">
                <video src="/media/nest-7.mp4" className="w-full h-auto" autoPlay loop muted playsInline />
              </div>
              <div className="flex flex-col gap-6">
                <img src="/media/nest-6.svg" alt="Discussion guides and research" className="w-full h-auto rounded-xl" />
                <img src="/media/nest-8.svg" alt="Personas and research synthesis" className="w-full h-auto rounded-xl" />
              </div>
            </div>
            <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              Fortunately, our survey received responses from two nurses and two psychologists. Additionally, we conducted an interview with Ms. Charlotte Liepelt, a clinic clown specialising in pediatric care. To organize the findings, we categorized them into User Research Walls, which were distilled into insights spanning Pains, Gains, Needs, and Opportunities.
            </p>
            <div className="space-y-4">
              <p className={TYPOGRAPHY.body}>
                Here are our key takeaways: Young cancer patients, from children to teenagers, struggle with loss of autonomy as they rely heavily on caregivers, which impacts their self-confidence. Their daily life is shaped by strict medical routines, leaving little room for individuality or spontaneous activities. Even relaxation activities are often imposed on them. Older children, in particular, are affected by social isolation, as they feel disconnected from their peers and normal life, and a lack of privacy, which becomes more challenging as they grow.
              </p>
              <p className={TYPOGRAPHY.body}>
                Despite these difficulties, certain aspects of the hospital experience offer support. Positive relationships with caregivers provide emotional security, and many hospitals offer recreational activities that provide entertainment. Children are also offered intensive individual care, which plays a vital role in their emotional coping.
              </p>
              <p className={TYPOGRAPHY.body}>
                Our research also highlighted critical areas of improvement: providing more choice and flexibility in daily routines, encouraging open discussions about emotions, and integrating familiar elements of home life to maintain a sense of normality. Additionally, improved training for caregivers to address pain perception, greater availability of psychological support outside regular hours, and private spaces for relaxation and emotional conversations emerged as essential needs. Finally, it was suggested that incorporating creative outlets can further enhance engagement and emotional resilience.
              </p>
            </div>
            <p className={TYPOGRAPHY.body}>
              Based on these insights, we established the following goals:
            </p>
            </div>
            </div>

            <Container layout="third" gap="lg">
          <div className="space-y-1">
            <div className={TYPOGRAPHY.subtitle}>Enable freedom of choice</div>
            <p className={`${TYPOGRAPHY.body} text-sm`}>Restore a sense of autonomy and control by offering patients freedom of choice, allowing them to decide what they want to explore based on their individual needs outside of scheduled treatment times.</p>
          </div>
          <div className="space-y-1">
            <div className={TYPOGRAPHY.subtitle}>Reconnect with normal life</div>
            <p className={`${TYPOGRAPHY.body} text-sm`}>Integrate familiar elements of their everyday lives to provide a distraction from the hospital environment, helping them redirect their focus toward and reconnect with healthy, familiar and positive aspects of life.</p>
          </div>
          <div className="space-y-1">
            <div className={TYPOGRAPHY.subtitle}>Create a safe space</div>
            <p className={`${TYPOGRAPHY.body} text-sm`}>Offer an environment where they are encouraged to openly share their thoughts and emotions.</p>
          </div>
          </Container>

            <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
                These goals and insights guided the project’s focus question for the ideation phase: “How might we empower young cancer patients to restore a sense of autonomy and control to build emotional resilience through personalized and positive experiences?”
            </p>
          </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="ideation" title="Ideation" subtitle="From goals to immersive concept">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <p className={TYPOGRAPHY.body}>
              Using the Crazy8 method, we generated 24 rapid ideas in just 8 minutes, prioritising quantity over quality to explore a wide range of possibilities. From this pool, we selected the ideas with the greatest potential for further development. To evaluate these ideas comprehensively, we applied the Six Thinking Hats method, examining each idea from six perspectives: optimistic, pessimistic, analytical, emotional, creative, and organizational. This approach allowed us to identify both the strengths and limitations of each idea, providing a clear direction for further development.
            </p>
            <img src="/media/nest-12.svg" className="w-full h-auto rounded-xl" />
            <p className={TYPOGRAPHY.body}>
              At this point, we knew we wanted to create an immersive experience. Using the ZwickyBox method, we conducted structured ideation around the concept of “immersive experience”. We divided the keyword into distinct categories, assigned values to each, and combined these values to generate diverse concept directions. Several key considerations emerged during this process. Personalized input was prioritized to ensure the experience could adapt to each patient’s unique needs and preferences. Hands-on interaction—drawing, writing, and other manual activities—was identified as a valuable way to foster creativity. Additionally, we decided to focus our concept on children aged 8–10 and older, as younger children in critical developmental stages benefit more from virtual-free activities that support their motor, sensory, and language development.
            </p>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="concept" title="Concept: Nest and the Egg" subtitle="Form, structure, and interaction">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <p className={TYPOGRAPHY.body}>
              The brainstorming process began with a focus on soft, round shapes, contrasting the sharp, cold forms commonly associated with hospitals, such as syringes and medical equipment. This exploration inspired the concept of a “Nest”—a cozy “safe space” designed to offer comfort and emotional support for patients. The Nest is a tent-like structure mounted on the wall above the patient’s bed, easily deployable by turning a lever. This creates a private and inviting space without disrupting the shared hospital environment. To overcome the challenge of designing a practical yet unobtrusive solution, we drew inspiration from collapsible, origami-like designs. After multiple iterations, we developed a structure that is simple to set up, seamlessly integrates into hospital rooms, and provides ample coverage and comfort.
            </p>
            <div className="relative w-full rounded-xl overflow-hidden bg-white">
              <img src="/media/nest-14.png" alt="Form exploration" className="block w-full h-auto" />
              <img
                src="/media/nest-hero-banner-bg.png"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <p className={TYPOGRAPHY.body}>
                Young cancer patients, who face the daily challenges of illness and strict routines, often lack opportunities to simply be “kids” and pursue their specific individual needs despite the availability of many recreational activities. With Nest, we aim to support these patients and give some of that freedom back to them.
              </p>
              <img src="/media/nest-17.png" className="w-full h-auto rounded-xl" />
              <img src="/media/nest-16.png" className="w-full h-auto rounded-xl" />
              <p className={TYPOGRAPHY.body}>
                By deploying the canopy, patients create a private safe space, take full control of the Egg, and
                independently determine the content of the projections based on their own needs and wishes.
              </p>
              <p className={TYPOGRAPHY.body}>
                Inside the Nest, patients can access the Egg by pulling down a lever. The Egg is an interactive device housed in its own small resting plate. It serves as a bridge between the physical and digital worlds, using an AI assistant to process tactile and auditory inputs, delivering personalized experiences through projections and sound. Nest carries multiple meanings: it is the resting place for the Egg, the projection canopy surrounding the bed, and a symbol of comfort and security.
              </p>
              <img src="/media/nest-18.png" className="w-full h-auto rounded-xl" />
            </div>
            <div className="flex flex-col items-center text-center space-y-12">
            {/* 1–2: grouped */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
              <div className="space-y-3 flex flex-col items-center">
                <div className="relative w-full max-w-xs rounded-xl overflow-hidden bg-white">
                  <img src="/media/nest-20-1.gif" alt="" className="block w-full h-auto" />
                  <img
                    src="/media/nest-hero-banner-bg.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
                <div>
                  <h4 className={TYPOGRAPHY.subtitle}>Create your “safe space”</h4>
                </div>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <div className="relative w-full max-w-xs rounded-xl overflow-hidden bg-white">
                  <img src="/media/nest-20-2.gif" alt="" className="block w-full h-auto" />
                  <img
                    src="/media/nest-hero-banner-bg.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
                <div>
                  <h4 className={TYPOGRAPHY.subtitle}>Interact with the Egg</h4>
                </div>
              </div>
            </div>
            {/* 3–7: grouped */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-5xl">
            <div className="space-y-3 flex flex-col items-center">
                <video
                  src="/media/nest-20-3.mp4"
                  className="w-full max-w-xs rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div>
                  <h4 className={TYPOGRAPHY.subtitle}>Easy to hold</h4>
                  <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                    Similar to a stress ball, the Egg is soft and squishy. It helps patients relax, creating a sense of comfort.
                  </p>
                </div>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <video
                  src="/media/nest-20-4.mp4"
                  className="w-full max-w-xs rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div>
                  <h4 className={TYPOGRAPHY.subtitle}>Change mode</h4>
                  <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                    Shake the Egg to switch between the three available modes: Speech mode, drawing mode, and favorites mode.
                  </p>
                </div>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <video
                  src="/media/nest-20-5.mp4"
                  className="w-full max-w-xs rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div>
                  <h4 className={TYPOGRAPHY.subtitle}>Speech mode</h4>
                  <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                    Talk to the Egg about your day, feelings, or wishes—just like you would to a good friend.
                  </p>
                </div>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <video
                  src="/media/nest-20-6.mp4"
                  className="w-full max-w-xs rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div>
                  <h4 className={TYPOGRAPHY.subtitle}>Drawing mode</h4>
                  <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                    Use the Egg like a pencil and draw on any surface. Let your creativity shine!
                  </p>
                </div>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <video
                  src="/media/nest-20-7.mp4"
                  className="w-full max-w-xs rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div>
                  <h4 className={`${TYPOGRAPHY.subtitle} text-sm`}>Color change!</h4>
                  <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                    When you squeeze the Egg, it changes color. Press it as many times as you like until you find your favorite color!
                  </p>
                </div>
              </div>
            </div>
            {/* 8–10: separate */}
            <div className="space-y-3 flex flex-col items-center w-132 max-w-3xl">
              <div className="relative w-full max-w-md rounded-xl overflow-hidden bg-white">
                <img src="/media/nest-20-8.gif" alt="" className="block w-full h-auto" />
                <img
                  src="/media/nest-hero-banner-bg.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              <div>
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm`}>Activate the immersive experience</h4>
                <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                  Place the Nest in its designated Nest—small plate designed to hold it—and push it upwards to activate the immersive experience. The Egg processes the patient’s inputs and responds with personalized projections and sound through a projector, creating a dynamic and engaging environment.
                </p>
              </div>
            </div>

            <div className="space-y-3 flex flex-col items-center w-132 max-w-3xl">
              <video
                src="/media/nest-20-9.mp4"
                className="w-full max-w-md rounded-xl"
                autoPlay
                loop
                muted
                playsInline
              />
              <div>
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm`}>Co-created journey</h4>
                <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                  Patients can provide feedback to the Egg, allowing it to further adapt to their needs and preferences.This process empowers the patient to become an active participant in shaping their own space.
                </p>
              </div>
            </div>

            <div className="space-y-3 flex flex-col items-center w-full max-w-3xl">
              <video
                src="/media/nest-20-10.mp4"
                className="w-full max-w-md rounded-xl"
                autoPlay
                loop
                muted
                playsInline
              />
              <div>
                <h4 className={`${TYPOGRAPHY.subtitle} text-sm`}>Weeee!</h4>
                <p className={`${TYPOGRAPHY.caption} text-xs mt-1`}>
                  Be a kid.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              Nest addresses the brief by incorporating playfulness into healthcare service design, improving the hospitalization experience for young cancer patients. In line with the focus question, Nest empowers patients to regain a sense of autonomy and control while building emotional resilience through personalized and positive interactions.
            </p>
            <p className={TYPOGRAPHY.body}>
              How? Nest provides patients with choice and flexibility, allowing them to participate in transforming their space according to their needs. With full control over input and output, patients actively shape their environment, fostering a sense of independence. This immersive experience offers an escape from the hospital routine, enabling patients to step into a new world where fears, uncertainties and similar emotions are no longer central.
            </p>
            <p className={TYPOGRAPHY.body}>
              Additionally, Nest creates a personal, judgement-free space, encouraging patients to openly share their thoughts, needs, and emotions. Their input is immediately reflected in their environment as a gamified element. Rather than passively consuming traditional digital content, patients engage in an uplifting interaction that prioritizes their emotional well-being.
            </p>
          </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="prototype" title="Prototype and materials" subtitle="Making Nest tangible">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <div className="space-y-4">
              <p className={TYPOGRAPHY.body}>
                To address key challenges during development, we focused on making the Nest accessible across different patient groups. The Nest and the Egg operate entirely through tactile and auditory feedback, without buttons or screens, ensuring it remains intuitive even in less-than-ideal conditions, such as after treatment.
              </p>
              <p className={TYPOGRAPHY.body}>
                Material challenges were also addressed by finding textiles that fulfil the requirements for the Nest and using soft and durable silicone to conceal delicate technical components for the Egg to create a plush, hygienic device. We identified the material requirements as the following: Breathable, heat- and moisture-resistant, hypoallergenic, skin-friendly, durable, easy to clean, sound-dampening, and light-blocking.
              </p>
              <p className={TYPOGRAPHY.body}>
                We created a prototype by milling a mould, constructing the mould framework, and pouring silicone into it. The result is a prototype featuring a soft silicone layer that mimics the intended tactile feel, with integrated LEDs whose colors can be adjusted using a remote control.
              </p>
            </div>
            <img src="/media/nest-22.jpg" className="w-full h-auto rounded-xl" />
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="journeys" title="User journeys and Egg-GPT" subtitle="Maxi, Julia, and personalized projections">
        <Container layout="full" gap="lg">
          <div className="space-y-4">
            {/* <img src="/media/nest-archive-25.svg" className="w-full h-auto rounded-xl" /> */}
            {/* <img src="/media/nest-archive-26.svg" className="w-full h-auto rounded-xl" /> */}
            {/* <img src="/media/nest-archive-27.svg" className="w-full h-auto rounded-xl" /> */}
            <p className={TYPOGRAPHY.body}>
              We created two user journeys to illustrate practical applications of Nest. First, we meet Maxi, a 7-year-old boy who uses the Egg’s speech mode to narrate his emotions and activate comforting projections. Drawing inspiration from his love of football, these experiences give him hope and help him better articulate his dreams, needs, and daily life. Then, we meet Julia, a 12-year-old girl who uses the Egg’s drawing mode to create vibrant visuals. Within the Nest’s safe environment, Julia finds a creative outlet that shifts her focus from physical changes like hair loss to her inner self as an artist. Julia is also enabled to communicate with loved ones within her safe space. To simulate the processes within the Egg, we developed an Egg-GPT, which analyses user inputs—whether speech or drawings—and generates prompts for video projection and sound. Using Runway, we created final personalized videos based on these prompts, ensuring dynamic, immersive visual experiences tailored to each patient’s inputs.
            </p>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section>
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <img src="/media/nest-moodboard.png" className="w-full h-auto rounded-xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[28, 29, 30, 31, 32, 33].map((n) => (
              <div key={n} className="relative rounded-xl overflow-hidden bg-black aspect-[791.25/960] min-h-[291px]">
                <video
                  src={`/media/nest-${n}.mp4`}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-[0.95]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="next" title="Reflection" subtitle="What we learned and what’s next">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
          <img
            src="/media/nest-35.png"
            className="w-full h-auto rounded-xl"
            style={{
              filter: 'sepia(100%) opacity(0.85) saturate(100%) hue-rotate(-48deg)'
            }} /*brightness(1.2) contrast(1.1)*/
          />
          <div className="space-y-4">
            <p className={TYPOGRAPHY.body}>
              With Nest, we aimed to address the often-overlooked emotional needs of young cancer patients and transform their hospital experience by prioritizing autonomy, self-expression, and support for complex emotional challenges, offering more than basic entertainment.
            </p>
            <p className={TYPOGRAPHY.body}>
              One of the greatest challenges was engaging directly with young cancer patients and stakeholders due to strict data privacy policies. This limitation taught us the importance of adaptability. By leveraging GPT-Personas and conducting desk research as alternative approaches, we gained meaningful insights. Learning about the daily lives of young patients and seeing our initial assumptions evolved into tangible insights was a rewarding experience.
            </p>
            <p className={TYPOGRAPHY.body}>
              This journey underscored the importance of designing for the nuanced emotional needs of young cancer patients. Within our team, we faced challenges in coordination and meeting deadlines but overcame them through transparent communication. Looking ahead, the next step is to test Nest directly with young cancer patients, which was not feasible during this project. We would also like to explore integration with existing therapeutic tools and adapt the concept for diverse pediatric contexts. With Nest, we hope to bridge the gap in emotional care for young cancer patients, providing them with the tools to navigate their journey with greater comfort.
            </p>
          </div>
          </div>
        </Container>
      </Section>
    </CaseStudyLayout>
);

export default Nest;

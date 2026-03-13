import React, { useEffect, useRef } from 'react';
import {
  CaseStudyLayout,
  Section,
  SectionDivider,
  Container,
  TYPOGRAPHY
} from '../../layouts/case-study';
import ProjectHero from '../../components/ProjectHero';

const SECTIONS = [
  { id: 'dna', title: 'Your BMW DNA' },
  { id: 'ecosystem', title: 'Living ecosystem' },
  { id: 'driver-ai', title: 'Driver ↔ AI' },
  { id: 'persona-alex', title: 'Persona 1: Alex' },
  { id: 'persona-mia', title: 'Persona 2: Mia' },
  { id: 'explorative', title: "What's next?" }
];

// Canvas-based overlay inspired by the original p5.js sketch.
// Draws radial dots whose rotation responds to mouse Y, blended over the brain image.
const DnaSketchOverlay = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '-25%';
    canvas.style.left = '-35%'; // wider and shifted left, similar to original HTML
    canvas.style.pointerEvents = 'none';
    canvas.style.mixBlendMode = 'overlay';

    const resize = () => {
      if (!container) return;
      const { offsetWidth, offsetHeight } = container;
      const width = offsetWidth * 1.5;
      const height = offsetHeight * 1.5;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    container.appendChild(canvas);

    let mouseY = window.innerHeight / 2;
    const handleMouseMove = (e) => {
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (let i = 0; i < 300; i++) {
        const radius = i * 1;
        const angleDeg = i * mouseY * 0.025;
        const angle = (angleDeg * Math.PI) / 180;

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (canvas.parentNode === container) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

const DNAEvolution = ({ project }) => (
  <CaseStudyLayout sections={SECTIONS}>
    <ProjectHero project={project} titleOverride="DNA Evolution" />

    {/* Intro grid */}
      <section className="mt-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] gap-x-10 gap-y-4">
          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Duration</div>
          <div className={TYPOGRAPHY.body}>4 months, 2023–2024</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Supervised by</div>
          <div className={TYPOGRAPHY.body}>Prof. Dr. Wickenheiser, Isabella Zidek, Felix Staudacher</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Project type</div>
          <div className={TYPOGRAPHY.body}>
            Transportation design concept for project “BEYOND” developed in cooperation with the department Physical
            User Interface (“Physisches Nutzerinterface”) @BMW
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Description</div>
          <div className={TYPOGRAPHY.body}>
            Hyper-personalising automotive user experience with an AI system that allows the car to imitate evolution
            and optimize its form to fulfil the driver’s changing needs.
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Brief</div>
          <div className={TYPOGRAPHY.body}>
            How can we use AI to generate a “New Normal” of design aesthetics, appeal to our senses in a multisensory
            way and create new experiences?
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Summary</div>
          <div className={`${TYPOGRAPHY.body} space-y-3`}>
            <p>
              “BMW DNA Evolution” envisions cars as living companions that evolve alongside us based on our BMW DNA
              and life circumstances to provide a hyper-personalized driving experience through an AI system that
              leverages emotional GenAI, speech recognition, computer vision and evolutionary algorithms. The growth
              process of the vehicle mirrors natural evolution by undergoing endless cycles of learning, and applying
              what it learned to design, test and implement form configurations to optimize performance—whether
              it’s enhancing fuel efficiency to lower a student’s living costs or improving safety features
              to ease an amateur driver’s anxiety.
            </p>
            <p>
              <a
                href="https://figmashort.link/K45WmM"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 cursor-none"
              >
                Link to Figma presentation ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Your BMW DNA */}
      <Section id="dna" title="Your BMW DNA" subtitle="From static machines to living companions">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <img src="/media/evolution-2.gif" className="w-full h-auto rounded-xl" />
            <div className="space-y-4">
              <p className={TYPOGRAPHY.body}>
              Today, cars are static machines. There is general lack of personalization, and despite undergoing
              ever-changing circumstances in our lifetime, cars cannot dynamically adapt to and optimize for evolving
              performance needs, resulting in a one-size-fits-all experience. Defining this problem led to the
              question: What if you could experience a car that is not just a machine but a living companion that
              grows with you over time? This is the main idea behind BMW DNA Evolution, a concept inspired by
              biological processes, where the goal was to create a hyper-personalized driving experience leveraging
              Artificial Intelligence (AI) to run a system that empowers the car to come alive, continuously learn
              about and adapt in real-time to your personal “DNA”—your current needs, habits, preferences and
              lifestyle as a driver.
            </p>
            <p className={TYPOGRAPHY.body}>
              This concept is based on the idea that BMW has core values which their cars have embodied over the
              last century. After research, I defined these as premium quality, performance and innovation. These
              could be called their DNA, and it was always BMW’s job to reinterpret this DNA for every new
              release. What if, with the help of AI, drivers can participate in this reinterpretation, and define
              what BMW DNA means for them personally?
            </p>
            <p className={TYPOGRAPHY.body}>
              I broke down the BMW DNA further into its various aspects or “genes” that can be turned on or off
              depending on how relevant they are for the driver at any given moment. This unique gene combination
              gives rise to the driver’s own BMW DNA.
            </p>
          </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* Driver, AI, Neurons and Modules */}
      <Section id="ecosystem" title="Driver, AI, Neurons and Modules" subtitle="A living ecosystem">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
          {/* <img src="/media/evolution-archive-3.jpg" className="w-full h-auto rounded-xl" /> */}
          <Container layout="half" gap="lg">
            <p className={TYPOGRAPHY.body}>
              This concept is about allowing the car to grow and optimize its form based on the driver’s BMW
              DNA. The expression of the BMW DNA and the corresponding growth process is driven by a system, BMW
              CORPUS, which facilitates interactions between the driver, emotional GenAI, neurons and smart
              modules. AI serves as the car’s brain, using neurons (electrical channels), to communicate with
              modules (shape-shifting components of the car body), deriving their form and functionality from
              communicating with AI. In the following, I cover the relationship between these elements in detail.
            </p>
            <p className={TYPOGRAPHY.body}>
              When it came to designing this system, I was inspired by the connection between AI and the human
              brain, where both serve as the central intelligence of the whole system which coordinates input (e.g.
              burning heat on fingers!) and output (fingers swell) using the nervous system to carry information
              fingers-to-brain and brain-to-fingers.
            </p>
          </Container>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* Driver <-> AI */}
      <Section id="driver-ai" title="Driver ↔ AI" subtitle="Like raising a child">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <p className={TYPOGRAPHY.body}>
                  The role of AI is to behave like a curious child eager to learn about its “parent” (the driver) and
                  environment as a dynamic learning entity, where it gathers data on your needs, habits, emotions, and
                  preferences in order to continuously update your BMW DNA through AI-driven learning technologies such
                  as emotional AI, speech recognition, and computer vision. The driver accompanies the growth process by
                  providing guidance and feedback. This relationship between the driver and AI involves three main
                  phases:
            </p>
            <Container layout="half" gap="lg">
              <div className="space-y-4">
                <p className={TYPOGRAPHY.body}>
                  <strong>1. Birth phase:</strong> AI starts by analysing the driver and activates relevant genes,
                  which marks the birth of your BMW DNA.
                </p>
                <p className={TYPOGRAPHY.body}>
                  <strong>2. Growth phase:</strong> AI gathers input data from the driver using emotional AI and speech
                  recognition, and the environment using computer vision. It uses this data to drive growth, which is
                  specified next in AI ↔ MODULES. The choice of these technologies is made from the research that… 1)
                  Emotional AI can analyse facial expressions, voice tone, and physiological signals (like heart rate)
                  to infer the driver’s emotional state, which is useful for collecting implicit data about
                  satisfaction with the car’s performance. 2) Speech recognition allows for hands-free interaction
                  between the driver and AI to capture verbal feedback and observations from the driver, which is
                  useful for collecting explicit data. 3) Computer vision is useful for capturing visual data in the
                  environment as inspiration for generating outputs.
                </p>
                <p className={TYPOGRAPHY.body}>
                  <strong>3. Recording phase:</strong> AI saves all acquired data from every drive into a tangible
                  database as its “brain” designed like a tree-ring that grows over time, allowing for storage and
                  sharing of experiences in form of data, fostering a community where drivers can benefit from each
                  other’s experiences, enhancing the collective intelligence of the system. You could “play”
                  archives to experience others’ daily life, holidays, or useful forms developed over time to
                  support those with special needs.
                </p>
              </div>
              <div className="space-y-2">
                <img src="/media/evolution-4.gif" className="w-full h-auto rounded-xl" />
                <img src="/media/evolution-5.gif" className="w-full h-auto rounded-xl" />
                <img src="/media/evolution-6.jpg" className="w-full h-auto rounded-xl" />
              </div>
            </Container>
            <div className="relative w-full h-auto rounded-xl overflow-hidden">
              <img
                src="/media/evolution-7.jpg"
                alt="Recording phase - tree-ring brain"
                className="w-full h-auto"
              />
              <DnaSketchOverlay />
            </div>
            <Container layout="half" gap="lg">
              <div className="space-y-4">
                <p className={TYPOGRAPHY.body}>
                  How exactly does AI create an evolving car, continuously changing its form and functionality? The car
                  body is made of shape-shifting modules that are connected to AI through electrical channels or
                  “neurons.” Just like in the human body, these 3 types of neurons allow the AI to use the modules to
                  observe the outside world (retinal), instruct the modules to transform (motor) and finally, receive
                  external stimuli as feedback (sensory).
                </p>
                <p className={TYPOGRAPHY.body}>
                  To translate the driver’s DNA into a form, AI takes inspiration from the outside world. AI
                  deconstructs these observations into actionable data and develops many inspired guidelines that
                  instruct the modules to transform into corresponding variants, which are transmitted via neurons to the
                  modules. The modules reorganize their structure and deploy into a form to be tested, changing the
                  car’s form and function in real time. With test outcomes from the modules and user feedback, AI
                  determines how successful the form was. The variants either retract into their original form for
                  rebuilding or survive if successful.
                </p>
                <p className={TYPOGRAPHY.body}>
                  Here, modules undergo endless cycles of experimentation, testing and optimisation where AI
                  continuously generates multiple design variants, tests and evaluates their performance, implements
                  them, and learns from both successes and failures. This model mirrors natural evolution, where AI is
                  given the freedom to explore playfully, understanding that multiple iterations lead to optimal outcomes
                  over time, like the double diamond design process. This flexibility is crucial to driving innovation
                  in the car’s form and function. By using AI-driven adaptation technologies like 3D generative AI
                  to produce variants and evolutionary algorithms to test and optimize outputs, we equip AI with the
                  ability to imitate evolution. This leads to enhanced user satisfaction by providing a deeply
                  personalized driving experience tailored to the driver’s DNA.
                </p>
              </div>
              <div className="space-y-2">
                <img src="/media/evolution-8.jpg" className="w-full h-auto rounded-xl" />
                <img src="/media/evolution-10.jpg" className="w-full h-auto rounded-xl" />
                <img src="/media/evolution-9.gif" className="w-full h-auto rounded-xl" />
                <img src="/media/evolution-12.jpg" className="w-full h-auto rounded-xl" />
                <img src="/media/evolution-11.gif" className="w-full h-auto rounded-xl" />
              </div>
            </Container>
            <img src="/media/evolution-13.jpg" className="w-full h-auto rounded-xl" />
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* Persona 1: Alex */}
      <Section id="persona-alex" title="Persona 1: Alex" subtitle="Fuel efficiency and aerodynamics">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <img src="/media/evolution-14.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-15.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-16.gif" className="w-full h-auto rounded-xl" />
            <p className={TYPOGRAPHY.body}>
              Meet Alex: A student with a tight budget looking to save money on fuel. AI knows Alex wants a
              fuel-efficient ride, so it activates the “aerodynamics” gene. But how does it make this happen? Using
              computer vision, it searches the environment for aerodynamic inspirations. AI looks around—what’s
              aerodynamic? Birds! It deconstructs the bird’s shape, learns from it, and reconstructs it into a
              variety of impressions.
            </p>
            <div className="rounded-xl overflow-hidden bg-black/5">
              <video
                src="/media/evolution-17.mp4"
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <img src="/media/evolution-18.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-19.gif" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-20.gif" className="w-full h-auto rounded-xl" />
            <p className={TYPOGRAPHY.body}>
              AI combines them in different ways to create variant guidelines that define the texture, structure and
              behaviour of the variants, which are then projected onto the modules to create them in real life. AI
              tests and evaluates hundreds of them, each one tested against criteria like air resistance and driver
              feedback and scored from 0 to 1. Some designs are successful; others are discarded: AI experiments
              with elements like bird-like bionic flaps or airy bones, which is mostly producing mediocre results.
              AI is disappointed and consults Alex.
            </p>
            <img src="/media/evolution-21.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-22.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-23.gif" className="w-full h-auto rounded-xl" />
            <p className={TYPOGRAPHY.body}>
              Feedback comes in from Alex: “Maybe try something like planes?” AI listens, finds a plane, and creates
              a guideline combined with the highest scoring one from the bird, leading to a sleek, aerodynamic design
              that helps Alex save money on every trip. This example demonstrates emotional GenAI’s
              “generative” capacity of conducting trial-and-error experiments to create, identify and refine
              potential designs that satisfy the driver’s needs.
            </p>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* Persona 2: Mia */}
      <Section id="persona-mia" title="Persona 2: Mia" subtitle="Safety and emotional support">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <img src="/media/evolution-24.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-25.jpg" className="w-full h-auto rounded-xl" />
            <p className={TYPOGRAPHY.body}>
              Meet Mia: A driver who is afraid of driving. The activated genes are “safety” and “driver assistance.”
              For this example, I was inspired by my mother who dislikes driving, especially on highways, because of
              the times she almost got involved in car accidents.
            </p>
            <img src="/media/evolution-26.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-27.jpg" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-28.jpg" className="w-full h-auto rounded-xl" />
            <p className={TYPOGRAPHY.body}>
              Based on this, AI initially searches for and implements sturdy structures like buildings to be able to
              protect Mia from even a nuclear bomb. However, it soon learns that her fear is psychological, not just
              physical. AI then searches for human elements that make the driver happy, generating impressions from
              dogs, children playing with bubbles, soft textiles and a couple holding hands, to design a car that
              provides emotional support.
            </p>
            <img src="/media/evolution-29.gif" className="w-full h-auto rounded-xl" />
            <img src="/media/evolution-30.gif" className="w-full h-auto rounded-xl" />
            <div className="rounded-xl overflow-hidden bg-black/5">
              <video
                src="/media/evolution-31.mp4"
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <p className={TYPOGRAPHY.body}>
              For the exterior, AI considers the fact that Mia is not only concerned about her own safety, but also
              that of others, to produce a balloon-like, self-healing surface materiality that reduces damage in a
              crash.
            </p>
            <div className="rounded-xl overflow-hidden bg-black/5">
              <video
                src="/media/evolution-32.mp4"
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <p className={TYPOGRAPHY.body}>
              For the interior, AI mimics human-to-human contact to create a reassuring environment. After obtaining
              more contact surface with Mia’s arm, AI retrieves biometric data to better understand her
              emotional state. All of this data that was generated by experimenting together with AI could be shared
              with the community to help others better cope with the same issue. This example demonstrates emotional
              GenAI’s “emotional” capacity to adapt not just to functional needs but to emotional ones as well.
            </p>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* Explorative Suggestions */}
      <Section id="explorative" title="Explorative Suggestions" subtitle="Future directions">
        <Container layout="full" gap="lg">
          <div className="space-y-12">
            <img src="/media/evolution-33.png" className="w-full h-auto rounded-xl" />
            <div className="rounded-xl overflow-hidden bg-black/5">
              <video
                src="/media/evolution-34.mp4"
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <Container layout="half" gap="lg">
              <p className={TYPOGRAPHY.body}>
                By integrating AI-driven learning technologies like emotional AI, speech recognition, and computer
                vision, we were able to humanize AI as a highly logically and emotionally intelligent companion that
                we can love hanging around with. However, when it comes to AI-driven adaptation technologies like
                3D generative AI and evolutionary algorithms, there is significant progress to be made. Evolutionary
                algorithms show great potential for mimicking natural evolution. They are already being successfully
                applied in engineering fields like aerodynamics and structural design, where they optimize complex
                systems by exploring a broad range of design options and identifying the most efficient solutions.
              </p>
              <p className={TYPOGRAPHY.body}>
                In addition, recent breakthroughs in smart materials, such as self-healing polymers, shape-memory
                alloys, and 4D-printed structures, open up new possibilities. These materials, capable of changing
                their form, structure, and behaviour in unique ways, present an exciting opportunity for developing
                shape-shifting materials that can bring the outputs of generative AI into 3D, moving beyond the
                limitations of our flat screens. This advancement would allow generative AI to directly create and
                influence tangible structures in real time.
              </p>
            </Container>
            <img src="/media/evolution-35.jpg" className="w-full h-auto rounded-xl" />
            <div className="space-y-4">
              <p className={TYPOGRAPHY.body}>
                To wrap it up, this concept is about utilizing AI to realize the potential of personalization while
                humanising the entire experience, where AI is designed to behave like a child who is not perfect from
                the beginning, but rather grows up together with the driver as its main consultant through guided
                experiences that accumulate each drive, reflected in the transformation of its own body. Fueled by
                playful twists on real-life biological concepts, this concept creates a playground for wilder
                imaginations: How about an electric car that grows wind turbines on its roof?
              </p>
              <p className={TYPOGRAPHY.body}>
                By asking ourselves, “What if cars could evolve?” we open up a future of hyper-personalized mobility
                where cars are redefined as living companions that learn, adapt, grow, and thrive with their drivers,
                where every drive becomes a journey of discovery and growth, calling for a reimagining of the
                relationship between humans and machines.
              </p>
          </div>
          </div>
        </Container>
      </Section>
    </CaseStudyLayout>
);

export default DNAEvolution;

import React, { useRef, useEffect } from 'react';
import {
  CaseStudyLayout,
  Section,
  SectionDivider,
  Container,
  TYPOGRAPHY
} from '../../layouts/case-study';
import ProjectHero from '../../components/ProjectHero';

const SECTIONS = [
  { id: 'whats-next', title: "What’s Next for Pixels?" },
  { id: 'structural', title: 'Pixels as a structural element' },
  { id: 'building', title: 'New way of building' },
  { id: 'seeing', title: 'New way of seeing' },
  { id: 'conclusion', title: 'New N, new Pixel' }
];

// Layered wrapper: video bg + overlay + top SVG (from reference pixel-section)
// Video drives layout so overlay and top layer align with video dimensions
const LayeredWrapper = ({ videoSrc, overlaySrc, topSrc, alt }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, [videoSrc]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <div className="relative w-full z-0">
        <video
          ref={videoRef}
          className="w-full h-auto block"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <img
          src={overlaySrc}
          className="absolute inset-0 w-full h-full object-cover z-[2] pointer-events-none mix-blend-color opacity-[0.85] saturate-150"
          aria-hidden
        />
        <img
          src={topSrc}
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        />
      </div>
    </div>
  );
};

const Pixel = ({ project }) => (
  <CaseStudyLayout sections={SECTIONS}>
    <ProjectHero project={project} />

    {/* Intro grid */}
      <section className="mt-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] gap-x-10 gap-y-4">
          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Duration</div>
          <div className={TYPOGRAPHY.body}>4 months, 2024-2025</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Supervised by</div>
          <div className={TYPOGRAPHY.body}>Prof. Dr. Wickenheiser, Sebastian Bekmann</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Project type</div>
          <div className={TYPOGRAPHY.body}>
            Transportation design concept for project “Hyundai N” developed in cooperation
            with Hyundai Europe Design Center
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Description</div>
          <div className={TYPOGRAPHY.body}>
            Reimagining the role of Hyundai pixels for the future line-up of the N series.
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Brief</div>
          <div className={TYPOGRAPHY.body}>What is Next for the N series?</div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`}>Summary</div>
          <div className={TYPOGRAPHY.body}>
            “N Pixel” is a proposal for pixels, an iconic design element of Hyundai, to play an evolved role
            in the N series, where they are reimagined as light-refracting glass artefacts that reshape our
            connection to the environment while supporting the high performance of the N series without compromising
            aesthetics. Here, we move beyond pixels as an artefact that simply emits artificial light and towards
            a new role that utilises natural light in the environment to shape the N experience.
          </div>

          <div className={`${TYPOGRAPHY.caption} tracking-[0.18em]`} />
          <div className={TYPOGRAPHY.body}>
            <a
              href="https://figmashort.link/MzTj7n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 transition-colors cursor-none"
            >
              Link to Figma presentation ↗
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      <Section id="whats-next" title="What’s Next for Pixels?">
        <Container layout="full" gap="lg">
          <div className="space-y-8">
            <img src="/media/pixel-1.jpg" className="w-full h-auto block rounded-xl" />

            <p className={TYPOGRAPHY.body}>
              Pixels have long been a signature design element in Hyundai vehicles, but I saw an opportunity
              to expand their role beyond decoration and transform them into a defining element of Hyundai’s design DNA.
              Drawing inspiration from traditional Hanok windows and the pioneering work of Nam June Paik, who is considered
              the “father” of video art, I was inspired by how Korean design fosters innovation within structured constraints—allowing
              radical ideas to emerge within the framework of a literal cube. I wanted to apply this thinking to pixels,
              evolving them from a static graphic motif into a dynamic, functional asset for the N series.
            </p>
            <img src="/media/pixel-2.jpg" className="w-full h-auto block rounded-xl" />
            <Container layout="half" gap="lg">
              <div className="space-y-4">
                <p className={TYPOGRAPHY.body}>
                  Initially, I explored how pixels could reshape the vehicle’s character, emphasising either triangular or
                  rectangular elements to toggle between a daily and a sporty aesthetic. However, I soon shifted my focus
                  to a deeper challenge relevant to the N series, which was, “How can we offset the heavy battery weight of
                  high-performance EVs without compromising aesthetics while leveraging the unique structural opportunities of EVs
                  to redefine the N experience?”
                </p>
                <p className={TYPOGRAPHY.body}>
                  This led to the creation of the “N Pixel”, which is a proposal for pixels to move beyond their current role
                  as a decoration to play an active role in shaping performance and perception in the future N series.
                  Instead of simply emitting artificial light, pixels are reimagined as light-refracting glass artefacts embedded
                  with liquid crystals into the car’s glazing. By applying voltage, N pixels create controlled optical distortions,
                  such as magnification and reduction. By manipulating light rather than physical mass, N Pixels support N’s high
                  performance by offsetting its heavy battery weight while creating a new visual vocabulary for the N series and
                  offer an advanced in-cabin experience by visually enhancing the sense of speed and motion.
                </p>
              </div>
              <div className="space-y-2">
                {[3, 4, 5].map((n) => (
                  <img
                    key={n}
                    src={`/media/pixel-${n}.jpg`}
                    alt="Hyundai N Pixel"
                    className="w-full h-auto rounded-xl"
                  />
                ))}
              </div>
            </Container>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="structural" title="Pixels as a stuctural element">
        <Container layout="full" gap="lg">
          <div className="space-y-8">
              {/* <img src="/media/pixel-archive-6.svg" className="w-full h-auto block rounded-xl" /> */}
              <video
                className="w-full max-w-2xl mx-auto h-auto block rounded-xl object-cover"
                src="/media/pixel-7-video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <img src="/media/pixel-8.svg" className="w-full h-auto block rounded-xl" />
              <img src="/media/pixel-9.jpg" className="w-full h-auto block rounded-xl" />
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="building" title="New way of building">
        <Container layout="full" gap="lg">
          <div className="space-y-8">
            <p className={TYPOGRAPHY.body}>
              For the exterior, the goal was to develop an ultra-lightweight, reduced body that supports high performance,
              with N Pixels shaping its appearance. After studying aerodynamic forms, I arrived at a cab-forward design that
              dramatically reduces weight by eliminating the rear area. This approach leverages the advantages of EV architecture,
              shifting the passenger space forward and optimising aerodynamics via a teardrop-shaped roofline.
            </p>

            {[10, 11, 12, 13, 14, 15].map((n) => (
              <img key={n} src={`/media/pixel-${n}.jpg`} className="w-full h-auto block rounded-xl" />
            ))}

            <p className={TYPOGRAPHY.body}>
              Here, N pixels serve as a structural element that lends the car body visual interest by applying optical distortion
              to shape its appearance and achieve a sporty yet minimalist form language, which is inspired by the “light architectural”
              aesthetic of Hanok. Here is a demonstration of how N Pixels can transform a purely functional EV body into an iconic
              Hyundai N vehicle of the future, where they serve two key purposes:
            </p>

            <Container layout="half" gap="md">
              <p className={TYPOGRAPHY.body}>
                <strong>1. Visually reconstructing the rear area:</strong> Since a teardrop-shaped rear can visually slow the car down,
                controlled optical distortions counteract this effect by “filling in” the missing rear to make the car appear larger
                and more dynamic than its actual proportions suggest.
              </p>
              <p className={TYPOGRAPHY.body}>
              <strong>2. Enhancing the minimalistic aesthetic:</strong> Selective transparency in areas like the
              front creates a minimalistic, futuristic look.
              </p>
            </Container>

            {/* Layered pixel section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <LayeredWrapper
                videoSrc="/media/pixel-16-video.mp4"
                overlaySrc="/media/pixel-purple-overlay.jpg"
                topSrc="/media/pixel-16.svg"
              />
              <LayeredWrapper
                videoSrc="/media/pixel-17-video.mp4"
                overlaySrc="/media/pixel-purple-overlay.jpg"
                topSrc="/media/pixel-17.svg"
              />
              <LayeredWrapper
                videoSrc="/media/pixel-18-video.mp4"
                overlaySrc="/media/pixel-purple-overlay.jpg"
                topSrc="/media/pixel-18.svg"
              />
            </div>

            <img src="/media/pixel-19.jpg" className="w-full h-auto block rounded-xl" />

            <p className={TYPOGRAPHY.body}>
              The result is a visually striking form, where N Pixels create parallel, forward-leaning vertical lines with
              symmetric light reflections, reinforcing a form language of speed and motion. By magnifying and reducing vehicle
              areas in intended ways, N Pixels reshape proportions in ways that defy physical limitations. The takeaway is that
              we can use optical manipulation rather than physical mass to define the vehicle’s identity and transform an
              aerodynamic object into a bold, recognizable Hyundai N vehicle without adding significant weight—only lightweight
              glass structures (N Pixels).
            </p>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="seeing" title="New way of seeing">
        <Container layout="full" gap="lg">
          <div className="space-y-8">
            <img src="/media/pixel-20.jpg" className="w-full h-auto block rounded-xl" />

            <p className={TYPOGRAPHY.body}>
              In the era of autonomous driving, we no longer have to see things the way they are. The interior,
              utilizing N Pixels, challenges conventional design by offering radically new ways to experience
              speed through optical illusion. Inspired by Hanok’s Maru, an outdoor raised platform for relaxation,
              the interior is envisioned as an open, floor-like space, where caved-in seating allows us to recline barefoot,
              sensitising our perception. In this state, a fisheye effect appears directly in our field of vision,
              distorting the environment and amplifying the sense of speed beyond the car’s actual speed.
            </p>

            <video
              className="w-full max-w-2xl mx-auto h-auto block rounded-xl object-cover"
              src="/media/pixel-21-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            <p className={TYPOGRAPHY.body}>
              Beyond speed perception, N Pixels dissolve the boundary between interior and exterior. By refracting
              in-cabin lighting, they create immersive experiences and deepen our connection with the surrounding
              environment. N Pixels convert organic, flowing light into structured, geometric lighting patterns,
              reinforcing the bold, technical identity of the N series. For this proposal, AI-generated patterns
              inspired by Korean letterforms influenced the lighting sequences—bridging Hyundai’s heritage with
              the future of immersive driving experiences.
            </p>

            <div className="relative w-full rounded-xl overflow-hidden">
              <img src="/media/pixel-22.svg" alt="Hyundai N Pixel" className="absolute inset-0 w-full h-full object-contain z-0" />
              <div className="relative w-full z-[1]">
                <video
                  className="w-full h-auto block"
                  src="/media/pixel-22-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <img
                  src="/media/pixel-22-cover.png"
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      <Section id="conclusion" title="New N, New Pixel">
        <Container layout="full" gap="lg">
          <p className={TYPOGRAPHY.body}>
            With N Pixel, I aimed to evolve Hyundai’s design language for the N series, transforming pixels
            from a static decorative element into an active structural element. By leveraging natural light
            and optical illusions, N Pixel achieves radical transformation in both exterior aesthetics and
            performance while redefining interior perception. Rooted in Korean design philosophy, it follows
            the principle of innovation within elegant constraints—maximizing impact without unnecessary complexity.
            Advancing Hyundai’s heritage in the context of Korean design philosophy, the concept “N Pixel”
            redefines how we interact with speed, space, and the driving environment for the next generation of the N series.
          </p>
        </Container>
      </Section>
    </CaseStudyLayout>
);

export default Pixel;

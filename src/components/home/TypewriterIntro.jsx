import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TooltipPopup from './TooltipPopup.jsx';
import { TYPOGRAPHY } from '../../layouts/case-study';
import { useMediaQuery } from '../../hooks/index.js';

const BODY_TEXT_PART1 = "I'm Juna, a product designer.";
const BODY_TEXT_PART2 = "I love designing AI-powered experiences that signal care + joy. As the curator of this gallery, I'd love to hear how I can improve your stay on this little corner of the internet. Enjoy!";
const BODY_TEXT = `${BODY_TEXT_PART1} ${BODY_TEXT_PART2}`;

const HOBBY_TEXT = 'In my free time, you can find me vibe coding, finding new matcha spots and learning new Italian recipes!';

const PRODUCT_DESIGNER_STICKERS = [
  '/media/sticker-1.png',
  '/media/sticker-2.png',
  '/media/tenmin-team-2.JPG',
  '/media/sticker-4.png',
  'media/onetutor-team-1.jpeg',
  'media/tenmin-team-3.JPG',
];

const GREETING_SEQUENCE = [
  { text: "Hello,", pauseAfter: 6000 },
  { text: "Hallo ◡̈,", pauseAfter: 6000 },
  { text: "반가워요,", pauseAfter: 6000 }
];

const TypewriterIntro = () => {
  const isWideViewport = useMediaQuery('(min-width: 1280px)');
  const [phase, setPhase] = useState('typing');
  const [greetingIndex, setGreetingIndex] = useState(0);
  const initialGreeting = GREETING_SEQUENCE[greetingIndex].text;
  const [charIndex, setCharIndex] = useState(0);
  const fullText = `${initialGreeting} ${BODY_TEXT}`;
  const [cyclingGreetingIndex, setCyclingGreetingIndex] = useState(0);
  const [cyclingCharIndex, setCyclingCharIndex] = useState(0);
  const [cyclingPhase, setCyclingPhase] = useState('paused');
  const [showHobbyLine, setShowHobbyLine] = useState(false);
  const [hobbyCharIndex, setHobbyCharIndex] = useState(0);

  const firstSentenceLength = (GREETING_SEQUENCE[0].text + ' ' + BODY_TEXT_PART1).length;
  const typingSpeedMs = charIndex >= firstSentenceLength ? 25 : 40;

  useEffect(() => {
    if (phase !== 'typing') return;

    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => setCharIndex((prev) => prev + 1), typingSpeedMs);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhase('cycling');
        setCyclingGreetingIndex(0);
        setCyclingCharIndex(GREETING_SEQUENCE[0].text.length);
        setCyclingPhase('backspacing-greeting');
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [phase, charIndex, fullText, typingSpeedMs]);

  useEffect(() => {
    if (phase !== 'cycling') return;

    const currentGreetingObj = GREETING_SEQUENCE[cyclingGreetingIndex];
    const nextIndex = (cyclingGreetingIndex + 1) % GREETING_SEQUENCE.length;
    const nextGreetingObj = GREETING_SEQUENCE[nextIndex];
    const currentGreetingLength = currentGreetingObj.text.length;

    if (cyclingPhase === 'backspacing-greeting') {
      if (cyclingCharIndex > 0) {
        const timeout = setTimeout(() => setCyclingCharIndex((prev) => prev - 1), 60);
        return () => clearTimeout(timeout);
      } else {
        setCyclingCharIndex(0);
        const timeout = setTimeout(() => setCyclingPhase('typing-greeting'), 2000);
        return () => clearTimeout(timeout);
      }
    } else if (cyclingPhase === 'typing-greeting') {
      if (cyclingCharIndex < nextGreetingObj.text.length) {
        const timeout = setTimeout(() => setCyclingCharIndex((prev) => prev + 1), 120);
        return () => clearTimeout(timeout);
      } else {
        setCyclingGreetingIndex(nextIndex);
        setCyclingPhase('paused');
        const pauseDuration = nextGreetingObj.pauseAfter;
        const timeout = setTimeout(() => {
          setCyclingPhase('backspacing-greeting');
          setCyclingCharIndex(nextGreetingObj.text.length);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else if (cyclingPhase === 'paused') {
      const timeout = setTimeout(() => {
        setCyclingPhase('backspacing-greeting');
        setCyclingCharIndex(currentGreetingObj.text.length);
      }, currentGreetingObj.pauseAfter);
      return () => clearTimeout(timeout);
    }
  }, [phase, cyclingGreetingIndex, cyclingCharIndex, cyclingPhase]);

  useEffect(() => {
    if (showHobbyLine) {
      setHobbyCharIndex(0);
    }
  }, [showHobbyLine]);

  useEffect(() => {
    if (!showHobbyLine) return;
    if (hobbyCharIndex >= HOBBY_TEXT.length) return;
    const timeout = setTimeout(() => {
      setHobbyCharIndex((prev) => prev + 1);
    }, 22);
    return () => clearTimeout(timeout);
  }, [showHobbyLine, hobbyCharIndex]);

  let displayText = '';

  if (phase === 'typing') {
    displayText = fullText.substring(0, charIndex);
  } else if (phase === 'cycling') {
    const currentGreeting = GREETING_SEQUENCE[cyclingGreetingIndex].text;
    const currentFullText = `${currentGreeting} ${BODY_TEXT}`;

    if (cyclingPhase === 'paused') {
      displayText = currentFullText;
    } else if (cyclingPhase === 'backspacing-greeting') {
      const remainingGreeting = currentGreeting.substring(0, cyclingCharIndex);
      displayText = `${remainingGreeting} ${BODY_TEXT}`;
    } else if (cyclingPhase === 'typing-greeting') {
      const nextGreeting = GREETING_SEQUENCE[(cyclingGreetingIndex + 1) % GREETING_SEQUENCE.length].text;
      const newGreetingPortion = nextGreeting.substring(0, cyclingCharIndex);
      displayText = `${newGreetingPortion} ${BODY_TEXT}`;
    } else {
      displayText = currentFullText;
    }
  }

  let activeGreeting = '';
  if (phase === 'typing') {
    activeGreeting = GREETING_SEQUENCE[0].text;
  } else if (phase === 'cycling') {
    if (cyclingPhase === 'typing-greeting') {
      const nextIndex = (cyclingGreetingIndex + 1) % GREETING_SEQUENCE.length;
      activeGreeting = GREETING_SEQUENCE[nextIndex].text;
    } else {
      activeGreeting = GREETING_SEQUENCE[cyclingGreetingIndex].text;
    }
  }
  const greetingLength = activeGreeting.length;

  let greetingPortion = '';
  let bodyPortion = '';

  if (phase === 'cycling' && cyclingPhase === 'backspacing-greeting' && cyclingCharIndex === 0) {
    greetingPortion = '';
    bodyPortion = displayText.trim();
  } else {
    greetingPortion = displayText.substring(0, greetingLength);
    const bodyStart = greetingLength;
    bodyPortion = displayText.substring(bodyStart).trim();
  }

  if (phase === 'typing') {
    greetingPortion = displayText.substring(0, greetingLength);
    const bodyStart = greetingLength;
    bodyPortion = displayText.substring(bodyStart).trim();
  }

  const firstSentenceEnd = bodyPortion.indexOf('.');
  const bodyPart1 = firstSentenceEnd !== -1 ? bodyPortion.substring(0, firstSentenceEnd + 1) : bodyPortion;
  const bodyPart2 = firstSentenceEnd !== -1 ? bodyPortion.substring(firstSentenceEnd + 1).trim() : '';

  const HERO_LINE1_PREFIX = "I'm Juna, ";
  const commaIdx = bodyPart1.indexOf(', ');
  const heroLine1 = commaIdx !== -1 ? bodyPart1.substring(0, commaIdx + 1) : bodyPart1;
  const heroLine2Display = commaIdx !== -1 && bodyPart1.length > HERO_LINE1_PREFIX.length
    ? bodyPart1.substring(commaIdx + 2)
    : '';

  const renderHeroLine2 = () => {
    if (!heroLine2Display) return null;
    const match = heroLine2Display.match(/^(a )(product designer)(\.?)$/);
    if (match) {
      const [, before, phrase, after] = match;
      return (
        <span className="whitespace-nowrap">
          {before}
          <TooltipPopup
            variant="bright"
            position={isWideViewport ? 'top-right' : 'top'}
            images={PRODUCT_DESIGNER_STICKERS}
            onHoverChange={setShowHobbyLine}
            triggerClassName="inline-block border-b-2 border-dotted border-slate-400 pb-0.5"
          >
            {phrase}
          </TooltipPopup>
          {after}
        </span>
      );
    }
    return heroLine2Display;
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center lg:items-stretch z-20">
      <div className="space-y-4 sm:space-y-6 my-auto pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 text-center lg:text-left w-full max-w-xl">
        <h2 className={`${TYPOGRAPHY.title} text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-slate-900 leading-[0.9]`}>
          {greetingPortion && <span>{greetingPortion}</span>}
          {heroLine1 && (
            <>
              {' '}
              <span>{heroLine1}</span>
            </>
          )}
          {heroLine2Display && (
            <>
              <br />
              <span>{renderHeroLine2()}</span>
            </>
          )}
        </h2>
        <div className="space-y-2 max-w-md mx-auto lg:mx-0">
          <p className={`${TYPOGRAPHY.caption} text-slate-600 text-sm leading-relaxed`}>
            I love designing zero-to-one AI-powered digital experiences that scale responsibly and bring care + joy to people.
          </p>
          <div className="min-h-[3.25rem]">
            <AnimatePresence mode="wait">
              {showHobbyLine ? (
                <motion.p
                  key="hobby-line"
                  className={`${TYPOGRAPHY.caption} text-slate-600 text-sm leading-relaxed normal-case`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {HOBBY_TEXT.substring(0, hobbyCharIndex)}
                </motion.p>
              ) : (
                <motion.p
                  key="impressum"
                  className={`${TYPOGRAPHY.caption} text-slate-600 text-sm leading-relaxed normal-case`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/impressum" className="hover:text-slate-900 transition-colors cursor-pointer lg:cursor-none">Impressum</Link>
                  {' · Copyright ©Juna Han 2026'}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypewriterIntro;

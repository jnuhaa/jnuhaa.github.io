import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TYPOGRAPHY } from '../../layouts/case-study';

const WHEEL_THRESHOLD = 0.12;
const TOUCH_HIDE_DELAY_MS = 600;

const TooltipPopup = ({ text, content, images, position = 'bottom', variant = 'dark', triggerClassName = '', onHoverChange, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [wheelIndex, setWheelIndex] = useState(0);
  const lastPointerXRef = useRef(0.5);
  const touchEndTimeoutRef = useRef(null);
  const isBright = variant === 'bright';
  const isTopRight = position === 'top-right';

  const getPositionClasses = () => {
    if (isTopRight) return 'bottom-full left-full mb-2 ml-2';
    if (position === 'top') return 'bottom-full mb-3 left-1/2 -translate-x-1/2';
    return 'top-full mt-3 left-1/2 -translate-x-1/2';
  };

  const getTransformOrigin = () => {
    if (isTopRight) return 'bottom left';
    if (position === 'top') return 'bottom center';
    return 'top center';
  };

  const stickerContent = images && images.length >= 3 && (
    <div className="relative w-52 md:w-48 h-28 md:h-40">
      {(() => {
        const visibleCount = 3;
        const total = images.length;
        const len = Math.min(visibleCount, total);
        const offset = ((wheelIndex % total) + total) % total;
        const order = Array.from({ length: len }, (_, idx) => (offset + idx) % total);

        return order.map((imageIndex, visualIndex) => {
          const src = images[imageIndex];
          const i = visualIndex;
          const baseClasses = 'absolute rounded-none border-[4px] border-white bg-transparent';
          const sizeClasses = 'w-24 md:w-28 h-auto';
          const positionClasses =
            i === 0
              ? 'top-1 left-0'
              : i === 1
                ? 'top-4 right-1'
                : 'bottom-0 left-6';
          const rotation =
            i === 0 ? -8 : i === 1 ? 5 : -4;

          return (
            <motion.img
              key={`${offset}-${imageIndex}`}
              src={src}
              alt=""
              className={`${baseClasses} ${sizeClasses} ${positionClasses}`}
              style={{
                transformOrigin: 'center',
                zIndex: visualIndex + 1,
                /*boxShadow: '0 10px 24px rgba(148,163,184,0.1)' // subtle slate-toned drop shadow*/
              }}
              initial={{ opacity: 0, scale: 0.9, rotate: rotation - 10 }}
              animate={{ opacity: 1, scale: 1, rotate: rotation }}
              transition={{ delay: 0.12 * i, type: 'spring', damping: 20, stiffness: 180 }}
            />
          );
        });
      })()}
    </div>
  );

  const renderContent = () => {
    if (stickerContent) return stickerContent;
    if (content) return content;
    return (
      <p className={`${isBright ? `${TYPOGRAPHY.body} text-slate-600` : 'text-xs text-white leading-relaxed font-medium text-center'}`}>
        {text}
      </p>
    );
  };

  useEffect(() => {
    return () => {
      if (touchEndTimeoutRef.current) {
        clearTimeout(touchEndTimeoutRef.current);
        touchEndTimeoutRef.current = null;
      }
    };
  }, []);

  const show = () => {
    if (touchEndTimeoutRef.current) {
      clearTimeout(touchEndTimeoutRef.current);
      touchEndTimeoutRef.current = null;
    }
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
    setWheelIndex(0);
  };

  const hide = () => {
    setIsHovered(false);
    if (onHoverChange) onHoverChange(false);
  };

  const handlePointerX = (clientX, el) => {
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const delta = x - lastPointerXRef.current;
    if (delta > WHEEL_THRESHOLD) {
      setWheelIndex((prev) => prev + 1);
      lastPointerXRef.current = x;
    } else if (delta < -WHEEL_THRESHOLD) {
      setWheelIndex((prev) => prev - 1);
      lastPointerXRef.current = x;
    }
    // Only update lastPointerXRef on shuffle so delta accumulates across small moves
  };

  return (
    <span
      className={`relative inline-block cursor-pointer lg:cursor-none ${triggerClassName}`}
      style={{ touchAction: 'manipulation' }}
      onMouseEnter={(e) => {
        show();
        const rect = e.currentTarget.getBoundingClientRect();
        lastPointerXRef.current = (e.clientX - rect.left) / rect.width;
      }}
      onMouseMove={(e) => handlePointerX(e.clientX, e.currentTarget)}
      onMouseLeave={() => {
        if (touchEndTimeoutRef.current) {
          clearTimeout(touchEndTimeoutRef.current);
          touchEndTimeoutRef.current = null;
        }
        hide();
      }}
      onTouchStart={(e) => {
        show();
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        if (touch) lastPointerXRef.current = (touch.clientX - rect.left) / rect.width;
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) handlePointerX(touch.clientX, e.currentTarget);
      }}
      onTouchEnd={() => {
        touchEndTimeoutRef.current = setTimeout(() => {
          touchEndTimeoutRef.current = null;
          hide();
        }, TOUCH_HIDE_DELAY_MS);
      }}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            style={{
              transformOrigin: getTransformOrigin(),
              ...(isTopRight ? {} : { left: '50%', x: '-50%' })
            }}
            initial={{
              opacity: 0,
              scale: 0.92,
              ...(isTopRight ? { x: -6, y: 6 } : { y: position === 'top' ? 12 : -12 })
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              ...(isTopRight ? { x: -4, y: 4 } : { y: position === 'top' ? 8 : -8 }),
              transition: { duration: 0.2 }
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 260, mass: 0.9 }}
            className={`absolute ${getPositionClasses()} z-[400] ${stickerContent ? 'w-auto' : isBright ? 'w-full max-w-[22rem]' : 'w-max max-w-[250px]'} pointer-events-none`}
          >
            <div className={`relative rounded-xl ${
              stickerContent
                ? ''
                : isBright
                  ? 'border border-slate-200 px-6 py-6'
                  : 'bg-slate-900 shadow-xl px-4 py-3'
            }`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.08, duration: 0.25 }}
                className={`relative z-10 block ${isBright && !stickerContent ? 'text-left' : ''}`}
              >
                {renderContent()}
              </motion.div>
              {!isBright && !stickerContent && (
                <div
                  className={`absolute ${position === 'top' ? 'top-full' : 'bottom-full'} left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 ${position === 'top' ? 'rotate-45 -mt-1.5' : '-rotate-45 -mb-1.5'}`}
                  style={{ borderRadius: '1px' }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default TooltipPopup;

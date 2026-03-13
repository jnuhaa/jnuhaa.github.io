/**
 * Application constants for 3D scene, activity interpolation, and theming.
 * Centralized for easy tuning and consistent behavior across modules.
 */

/** Debounce delay (ms) for cursor/hover state to prevent blinking */
export const DEBOUNCE_DELAY = 10;

/** Delay (ms) before returning to intro when cursor leaves hovered project */
export const HOVER_LEAVE_DELAY_MS = 750;

/** Activity interpolation (3D artifact hover state) */
export const ACTIVITY_BASELINE = 0.1;
export const ACTIVITY_HOVER = 0.8;
export const ACTIVITY_INTERPOLATION = 0.05;
export const ACTIVITY_DECAY = 0.03;
export const ACTIVITY_THRESHOLD = 0.02;

/** 3D scene layout */
export const ORBIT_RADIUS = 3.5;
export const POSITION_SCALE = 0.85;
export const UNIFORM_Y_POSITION = 0.6;
export const Y_POSITION_PIXEL = 0.3;
export const Y_POSITION_HELIX = 0.3;
export const BASE_SCALE_NEST = 1.0;
export const BASE_SCALE_OTHER = 1.2;
export const COLLISION_BOX_SCALE = 0.75;

/** Breakpoint (px): below = mobile layout (stacked, list only), above = desktop (split, map or list) */
export const LAYOUT_BREAKPOINT_PX = 1024;

/** Background color - white for main and subpages */
export const BACKGROUND_COLOR = {
  hex: 0xffffff,
  tailwind: 'bg-white'
};

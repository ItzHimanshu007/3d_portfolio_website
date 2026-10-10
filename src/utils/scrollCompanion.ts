// Shared timing for the hero character "popping out" into the floating scroll companion (ScrollModel).
// The companion only exists on wide screens, so the hero image only fades there.
export const COMPANION_MEDIA_QUERY = '(min-width: 1025px)';

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export const popStart = (vh: number) => vh * 0.12;
export const popEnd = (vh: number) => vh * 0.5;

/** 0 while the hero image is fully shown, 1 once the companion has fully taken over. */
export const popProgress = (scrollY: number, vh: number) =>
    smoothstep(clamp01((scrollY - popStart(vh)) / (popEnd(vh) - popStart(vh))));

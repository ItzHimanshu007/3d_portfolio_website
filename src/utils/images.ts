// Every photo/screenshot in public/projects and public/hackathons ships as `name.webp` (max 1600px wide)
// plus `name-800.webp`. These helpers let the browser pick the smaller file where it is enough.
export const thumbnail = (src: string) => src.replace(/\.webp$/, '-800.webp');

export const responsiveSrcSet = (src: string) => `${thumbnail(src)} 800w, ${src} 1600w`;

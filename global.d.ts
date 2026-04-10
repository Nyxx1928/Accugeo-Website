// Type declarations for importing CSS files in TypeScript
// Fixes: "Cannot find module or type declarations for side-effect import of './globals.css'"

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';

export {};

/// <reference types="vite-plugin-svgr/client" />
import 'csstype';

declare module 'csstype' {
  interface Properties {
    WebkitAppRegion?: string; // Add WebkitAppRegion as a valid CSS property
    userSelect?: string; // Add userSelect with a relaxed type
  }
}

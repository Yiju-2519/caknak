/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    // Disable ESLint during build
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Disable TypeScript type checking during build
    typescript: {
      ignoreBuildErrors: true,
    },
  };

export default config;

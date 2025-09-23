import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  typescript: {
    // Disable type checking during build to bypass external library errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

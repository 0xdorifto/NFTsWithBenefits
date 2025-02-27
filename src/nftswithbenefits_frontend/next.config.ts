import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  typescript: {
    // !! WARN !!
    // Ignoring TypeScript errors during build can lead to issues in production
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";


const output = process.env.NEXT_PUBLIC_OUTPUT_MODE as "standalone" | "export"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: output ?? "export",
  typescript: {
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

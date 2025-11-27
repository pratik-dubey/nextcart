import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // Ensure Turbopack/Next infers the workspace root correctly
      root: path.resolve(__dirname),
    },
  },
};

export default nextConfig;

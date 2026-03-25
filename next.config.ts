import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // turbopack.root silences the workspace-root warning in dev mode
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

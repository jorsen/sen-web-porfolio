import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ws", "bufferutil", "utf-8-validate", "@neondatabase/serverless"],
};

export default nextConfig;

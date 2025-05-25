// root/frontend/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
      {
        protocol: "https",
        hostname: "5.imimg.com",
      },
    ],
  },
  // domains: ["example.com"],
  allowedDevOrigins: ['http://192.168.1.105:3000', 'http://192.168.1.105:3001'],
};


export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
    allowedDevOrigins: ["http://localhost:3000","http://192.168.43.17:3000"]
};

export default nextConfig;
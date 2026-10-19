import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: ["localhost","127.0.0.1","http://localhost:3000","http://192.168.43.17:3000","http://localhost:1234","http://192.168.0.106:1234","http://192.168.0.108:1234"],
  serverExternalPackages: ["pg"],
};

export default nextConfig;
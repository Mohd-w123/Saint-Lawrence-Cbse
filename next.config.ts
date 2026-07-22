import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tal203091.s3.ap-south-1.amazonaws.com",
        pathname: "/BIZ365/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // optional but recommended
  async rewrites() {
    return [
      {
        source: "/api/:path*",          // frontend request path
        destination: "https://todo-app.pioneeralpha.com/api/:path*", // real API
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pioneer-alpha-website-django-s3-bucket-new-2.s3.amazonaws.com"
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
    ]
  }
};

export default nextConfig;

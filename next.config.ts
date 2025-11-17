import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // optional but recommended
  experimental: {
    appDir: true, // if using /app directory
  } as any,
  async rewrites() {
    return [
      {
        source: "/api/:path*",          // frontend request path
        destination: "https://todo-app.pioneeralpha.com/api/:path*", // real API
      },
    ];
  },
};

export default nextConfig;

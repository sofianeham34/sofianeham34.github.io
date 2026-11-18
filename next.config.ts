import type { NextConfig } from "next";

// Export statique : le site entier est généré au build et servi par GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Deux mises en page racines (français et anglais) : la page 404 est définie à part.
  experimental: { globalNotFound: true },
};

export default nextConfig;

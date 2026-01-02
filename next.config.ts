import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // experimental: {
  //   turbopack: {
  //     // Ensure Turbopack/Next infers the workspace root correctly
  //     root: path.resolve(__dirname),
  //   },
  // },

  // here we have specified next js Image from next/image that from which source image of user is coming
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*.googleusercontent.com",
//         pathname: "**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

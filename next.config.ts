// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["source.unsplash.com"], // ✅ Allow Unsplash images
    
  },
};

export default nextConfig;

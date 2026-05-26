/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",          // generate static HTML/CSS/JS in /out folder
  basePath: "/Medical-Tourism-",   // matches your GitHub repo name exactly
  assetPrefix: "/Medical-Tourism-/",
  trailingSlash: true,       // GitHub Pages needs /about/ not /about
  images: {
    unoptimized: true,       // GitHub Pages can't run Next.js image server
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
};

export default nextConfig;

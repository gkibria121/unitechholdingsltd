/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost:8000",
      },
      {
        protocol: "http",
        hostname: "gkibria121.com:8000",
      },

      {
        protocol: "http",
        hostname: "gkibria121.com",
      },
      {
        protocol: "http",
        hostname: "192.168.0.6",
      },

      {
        protocol: "https",
        hostname: "unitechholdingsltd.com",
      },

      {
        protocol: "http",
        hostname: "unitech.jumpintojob.com",
      },
      {
        protocol: "https",
        hostname: "unitech.jumpintojob.com",
      },
    ],
  },
};

export default nextConfig;

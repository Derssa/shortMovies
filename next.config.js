/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_SANITY_PROJECT_ID: process.env.NEXT_APP_SANITY_PROJECT_ID,
    NEXT_APP_SANITY_TOKEN: process.env.NEXT_APP_SANITY_TOKEN,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_FB_PIXEL: process.env.NEXT_PUBLIC_FB_PIXEL,
  },
  images: {
    domains: ["i.ytimg.com"],
  },
  i18n: {
    locales: ["ar"],
    defaultLocale: "ar",
  },
  async redirects() {
    return [
      {
        source: "/aflam",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

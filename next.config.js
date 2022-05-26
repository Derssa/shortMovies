/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

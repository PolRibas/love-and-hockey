/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'es-ES', 'es-AR', 'ca-ES'],
    defaultLocale: 'ca-ES',
    // localeDetection: false,
  },
};

export default nextConfig;

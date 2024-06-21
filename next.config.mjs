/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'es-ES', 'es-AR', 'ca-ES', 'nl-NL'],
    defaultLocale: 'ca-ES',
  },
  publicRuntimeConfig: {
    timeZone: process.env.NEXT_PUBLIC_TIME_ZONE || 'UTC',
  },
};

export default nextConfig;

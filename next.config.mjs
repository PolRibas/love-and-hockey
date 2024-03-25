/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'es-ES', 'es-AR', 'ca-ES', 'nl-NL'],
    defaultLocale: 'ca-ES',
    localeDetection: true,
  },
};

export default nextConfig;

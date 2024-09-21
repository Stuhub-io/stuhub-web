import analyzer from '@next/bundle-analyzer'
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false
};

const withBundleAnalyzer = analyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);

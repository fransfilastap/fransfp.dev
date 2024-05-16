/* eslint-disable quotes */
// eslint-disable-next-line quotes

import withBundleAnalyzer from "@next/bundle-analyzer";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const headers = async ()=>{
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspHeader.replace(/\n/g, ''),
        },
      ],
    },
  ]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: headers
};

const config =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;

export default config;

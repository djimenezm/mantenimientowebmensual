import Script from 'next/script';
import { adsConfig } from '@/lib/ads';

export default function AdSenseScript() {
  if (!adsConfig.enabled) return null;

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.client}`}
    />
  );
}

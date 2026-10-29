import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // 1. Notificar a Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-JM0SSS2W3R', {
        page_path: location.pathname + location.search,
      });
    }

    // 2. Notificar a Meta Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}
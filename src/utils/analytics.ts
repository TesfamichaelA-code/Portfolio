// This file sets up Plausible Analytics with custom event tracking
// Plausible is GDPR-compliant, cookie-free, and privacy-focused

// Initialize the Plausible script
export const initPlausible = () => {
  // Only run in production to avoid counting development views
  if (window.location.hostname === 'localhost') return;

  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = window.location.hostname;
  script.src = 'https://plausible.io/js/script.js';
  
  document.head.appendChild(script);
};

// Custom event tracker for specific actions
export const trackEvent = (eventName: string, props?: Record<string, string | number | boolean>) => {
  // Only track in production
  if (window.location.hostname === 'localhost') {
    console.log(`[DEV] Event tracked: ${eventName}`, props);
    return;
  }

  // Track with Plausible if loaded
  if (window.plausible) {
    window.plausible(eventName, { props });
  }
};

// Add global type for Plausible
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { callback?: () => void; props?: Record<string, string | number | boolean> }) => void;
  }
}

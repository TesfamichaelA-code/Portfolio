import { useState, useEffect, useRef, RefObject } from 'react';
import { trackEvent } from '../utils/analytics';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  sectionName?: string; // Add section name for analytics tracking
}

type UseInViewReturn = [RefObject<HTMLElement>, boolean];

export const useInView = (options: InViewOptions = {}): UseInViewReturn => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIsInView(entry.isIntersecting);
        
        // Track section view only once when it comes into view
        if (entry.isIntersecting && options.sectionName && !hasTrackedView.current) {
          trackEvent('section_viewed', {
            section: options.sectionName,
            timestamp: new Date().toISOString()
          });
          hasTrackedView.current = true;
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.sectionName]);

  return [ref, isInView];
};
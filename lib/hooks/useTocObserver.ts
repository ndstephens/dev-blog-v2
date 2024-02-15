import { useEffect, useRef, useState } from 'react';

export function useTocObserver() {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState('');

  const handleObserver: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry?.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  };

  useEffect(() => {
    if (window) {
      observer.current = new IntersectionObserver(handleObserver, {
        rootMargin: '-70px 0% -80% 0px',
      });

      const elements = document.querySelectorAll(
        '.my-prose h2, .my-prose h3, .my-prose h4, .post-page-blank',
      );
      elements.forEach((elem) => observer.current?.observe(elem));
      return () => observer.current?.disconnect();
    }
  }, []);

  return { activeId };
}

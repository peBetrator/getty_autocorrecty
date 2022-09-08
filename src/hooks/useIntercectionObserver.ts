import { MutableRefObject, useEffect, useState } from 'react';

export default function useIntercectionObserver<
  T extends HTMLElement = HTMLElement
>(
  ref: MutableRefObject<T | undefined>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Init observer
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref?.current) {
      // Subscribe to entry
      observer.observe(ref.current);
    }

    return () => {
      // Unsubscribe from all elements
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
}

import { useEffect, useRef, useState } from "react";

/** To use, pass the ref to the element. Once the  */
export const useInView = (threshold: number) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        (entries, _observer) => {
          entries.forEach((entry) => {
            if (
              entry.target === currentRef &&
              entry.intersectionRatio >= threshold
            )
              setInView(true);
          });
        },
        { threshold },
      );
      observer.observe(currentRef);
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [threshold]);
  return { ref, inView };
};

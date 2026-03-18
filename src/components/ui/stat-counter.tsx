import { useRef, useState, useEffect, useCallback } from "react";

type StatCounterProps = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

export const StatCounter = ({
  value,
  label,
  suffix = "",
  decimals = 0,
  duration = 1800,
}: StatCounterProps) => {
  const [display, setDisplay] = useState("0");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(value.toFixed(decimals));
        setDone(true);
      }
    };
    requestAnimationFrame(step);
  }, [value, decimals, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(value.toFixed(decimals));
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, value, decimals]);

  return (
    <div ref={ref} className="text-center">
      <span
        className={`block text-4xl md:text-5xl font-bold text-accent tabular-nums ${done ? "stat-counter-done" : ""}`}
      >
        {display}
        {suffix}
      </span>
      <span className="block text-xs uppercase tracking-widest font-medium text-text-muted-dark mt-2">
        {label}
      </span>
    </div>
  );
};

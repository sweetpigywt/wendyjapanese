import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
      }}
      className={`transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

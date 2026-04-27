import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

export const Petals = ({ count = 14 }: { count?: number }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 14 + Math.random() * 14,
        delay: Math.random() * 12,
        size: 8 + Math.random() * 10,
        opacity: 0.35 + Math.random() * 0.4,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-petal-fall"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C9 6 6 9 2 12c4 3 7 6 10 10 3-4 6-7 10-10-4-3-7-6-10-10z"
              fill="hsl(var(--sakura))"
              fillOpacity="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

export const BackToTop = () => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sakura text-white shadow-soft transition-all duration-300 hover:scale-110 hover:bg-sakura/90 focus:outline-none focus:ring-2 focus:ring-sakura focus:ring-offset-2",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

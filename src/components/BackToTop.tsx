import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n";

export const BackToTop = () => {
  const { t } = useI18n();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="border-sumi/20 bg-card/70 text-sumi hover:border-sakura hover:text-sakura"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="mr-1 h-4 w-4" />
      {t.backToTop}
    </Button>
  );
};
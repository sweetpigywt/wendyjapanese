import { Languages, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n, languages, Lang } from "@/i18n/i18n";

interface Props {
  variant?: "header" | "footer";
}

export const LanguageSwitcher = ({ variant = "header" }: Props) => {
  const { lang, setLang, t } = useI18n();
  const current = languages.find((l) => l.code === lang)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-sumi backdrop-blur transition-colors hover:border-sakura hover:text-sakura focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
        aria-label={t.langLabel}
      >
        <Languages className="h-3.5 w-3.5" strokeWidth={1.8} />
        <span>{current.native}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={variant === "header" ? "end" : "center"}
        className="min-w-[140px] border-border bg-card"
      >
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code as Lang)}
            className="flex cursor-pointer items-center justify-between text-sm"
          >
            <span>{l.label}</span>
            {l.code === lang && <Check className="h-4 w-4 text-sakura" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

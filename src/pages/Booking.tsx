import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Petals } from "@/components/Petals";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import { useI18n } from "@/i18n/i18n";
import wendyLogo from "@/assets/wendy-logo.png";

type Entry = {
  code: string;
  native: string;
  label: string;
  url: string;
};

const ENTRIES: Entry[] = [
  {
    code: "ja",
    native: "日本語",
    label: "Japanese",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc5IujUCfQIRw0PMdu7811-0KzBaEj-9jLWgjbAXCP92Sj8Kg/viewform",
  },
  {
    code: "zh",
    native: "中文",
    label: "Chinese",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSd0uJdU_g1v2CnGKpSnMlw93skiiaj5c3YPaNu1zEBKH00tgw/viewform",
  },
  {
    code: "en",
    native: "English",
    label: "English",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdZqi3_xe5k0X6OSDg3KUjWXt80sGzrZUJucsyxoabDpdqkXA/viewform",
  },
  {
    code: "fr",
    native: "Français",
    label: "French",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdc3McGUV-bGqxsyOiRTZeR8cAnSwXt35yUXIJ0STafe8wCwQ/viewform",
  },
];

const Booking = () => {
  const { t } = useI18n();

  return (
    <div className="washi-bg relative min-h-screen text-foreground">
      <Petals />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={wendyLogo} alt="Wendy logo" width={36} height={36} className="h-9 w-9 rounded-md object-contain" />
          <span className="font-serif text-lg font-bold tracking-wider">Wendy</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="header" />
          <Button asChild variant="outline" className="border-sumi/20">
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> {t.booking.back}</Link>
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-6 md:pt-12">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.booking.eyebrow}</p>
            <h1 className="font-serif text-4xl font-black text-sumi md:text-5xl">{t.booking.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.booking.subtitle}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {t.booking.availability}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-4 sm:grid-cols-2">
            {ENTRIES.map((e) => (
              <Card
                key={e.code}
                className="flex items-center justify-between gap-4 border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-sakura hover:shadow-soft"
              >
                <div>
                  <div className="font-serif text-xl font-bold text-sumi">{e.native}</div>
                  <div className="mt-1 text-xs tracking-wider text-muted-foreground">{e.label}</div>
                </div>
                <Button asChild className="bg-sakura text-primary-foreground hover:bg-sakura/90">
                  <a href={e.url} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> {t.booking.openForm}
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 text-center text-xs text-muted-foreground">
          <LanguageSwitcher variant="footer" />
          <div>© {new Date().getFullYear()} {t.footer}</div>
        </div>
      </footer>
    </div>
  );
};

export default Booking;

import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Petals } from "@/components/Petals";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import { useI18n } from "@/i18n/i18n";
import wendyLogo from "@/assets/wendy-logo.png";

const Courses = () => {
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
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> {t.courses.back}</Link>
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-6 md:pt-12">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.courses.eyebrow}</p>
            <h1 className="font-serif text-4xl font-black text-sumi md:text-5xl">{t.courses.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t.courses.subtitle}</p>
          </div>
        </Reveal>

        <div className="space-y-10">
          {t.courses.items.map((course, idx) => (
            <Reveal key={course.title} delay={idx * 80}>
              <Card className="overflow-hidden border-border bg-card p-6 shadow-card md:p-10">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sakura/10 text-sakura">
                      <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h2 className="font-serif text-xl font-bold leading-tight text-sumi md:text-2xl">{course.title}</h2>
                      {course.summary && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
                      )}
                    </div>
                  </div>
                  {course.spec && (
                    <span className="rounded-full border border-sakura/30 bg-sakura/5 px-3 py-1 text-xs tracking-wider text-sakura">
                      {course.spec}
                    </span>
                  )}
                </div>

                <div className="mb-4 h-px w-12 bg-sakura" />

                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.courses.sessionsLabel}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  {course.sections.map((sec) => (
                    <div key={sec.heading} className="rounded-xl border border-border bg-background/60 p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-sakura" />
                        <h3 className="font-serif text-sm font-bold text-sumi">{sec.heading}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {sec.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-sakura" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.courses.pricing.eyebrow}</p>
              <h2 className="font-serif text-3xl font-black text-sumi md:text-4xl">{t.courses.pricing.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t.courses.pricing.intro}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {t.courses.pricing.groups.map((group) => (
                <Card key={group.heading} className="border-border bg-card p-6 shadow-card md:p-8">
                  <h3 className="font-serif text-lg font-bold text-sumi md:text-xl">{group.heading}</h3>
                  {group.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                  )}
                  <div className="mt-4 h-px w-10 bg-sakura" />
                  <ul className="mt-4 space-y-3">
                    {group.items.map((it) => (
                      <li
                        key={it.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-sumi">{it.label}</div>
                          {it.note && (
                            <div className="mt-0.5 text-xs text-muted-foreground">{it.note}</div>
                          )}
                        </div>
                        <div className="font-serif text-base font-bold text-sakura">{it.price}</div>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">{t.courses.pricing.currencyNote}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button asChild size="lg" className="bg-sakura text-primary-foreground hover:bg-sakura/90">
              <Link to="/booking">{t.nav.trial} →</Link>
            </Button>
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

export default Courses;

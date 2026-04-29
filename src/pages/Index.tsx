import { useState } from "react";
import {
  Award,
  BookOpen,
  Mic,
  Sparkles,
  Mail,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Globe2,
  Star,
  Send,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Petals } from "@/components/Petals";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/i18n";
import { supabase } from "@/integrations/supabase/client";
import sensei from "@/assets/sensei.jpg";
import wechatQr from "@/assets/wechat-qr.jpg";
import whatsappQr from "@/assets/whatsapp-qr.jpg";

const credentialIcons = [Award, GraduationCap, Globe2, Star];
const featureIcons = [BookOpen, Mic, Sparkles];

const Index = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [submitting, setSubmitting] = useState(false);
  const [qrOpen, setQrOpen] = useState<null | "wechat" | "whatsapp">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error(t.contact.errorRequired);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 255),
        message: form.message.trim().slice(0, 2000),
      });
      if (error) throw error;
      try {
        await supabase.functions.invoke("send-contact-email", {
          body: { name: form.name, email: form.email, message: form.message },
        });
      } catch {
        /* email best-effort */
      }
      toast.success(t.contact.success);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(t.contact.errorRequired);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="washi-bg relative min-h-screen text-foreground">
      <Petals />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2">
          <span className="ink-stamp h-9 w-9 rounded-md text-lg" aria-label="Wendy">😊</span>
          <span className="font-serif text-lg font-bold tracking-wider">Wendy</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#about" className="transition-colors hover:text-sakura">{t.nav.about}</a>
          <a href="#features" className="transition-colors hover:text-sakura">{t.nav.features}</a>
          <a href="#path" className="transition-colors hover:text-sakura">{t.nav.path}</a>
          <a href="#contact" className="transition-colors hover:text-sakura">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="header" />
          <Button asChild className="hidden bg-sakura text-primary-foreground hover:bg-sakura/90 md:inline-flex">
            <a href="#contact">{t.nav.trial} <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura" />
              {t.hero.welcome}
            </p>
            <h1 className="font-serif text-4xl font-black leading-tight text-sumi md:text-6xl">
              {t.hero.title1}<br />
              <span className="text-sakura">{t.hero.title2}</span>
            </h1>
            <p className="mt-6 max-w-md whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-sakura text-primary-foreground shadow-soft hover:bg-sakura/90" asChild>
                <a href="#contact">{t.hero.ctaPrimary}</a>
              </Button>
              <Button size="lg" variant="outline" className="border-sumi/20" asChild>
                <a href="#path">{t.hero.ctaSecondary}</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <div className="font-serif text-3xl font-bold text-sumi">98<span className="text-sakura">%</span></div>
                <div className="text-xs tracking-wider text-muted-foreground">{t.hero.stat2Label}</div>
              </div>
              <div className="border-l border-border pl-8">
                <div className="font-serif text-3xl font-bold text-sumi">{t.hero.stat1Value}</div>
                <div className="text-xs tracking-wider text-muted-foreground">{t.hero.stat1Label}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative">
              <div className="vertical-jp absolute -left-10 top-4 hidden text-xs tracking-[0.3em] text-muted-foreground md:block">
                {t.hero.sideText}
              </div>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-warm shadow-soft">
                <iframe
                  src="https://www.youtube.com/embed/gRXVPGAqbFg?rel=0&modestbranding=1"
                  title={t.hero.videoTitle}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
                <div className="pointer-events-none absolute right-4 top-4 ink-stamp h-12 w-12 rotate-3 rounded text-xl" aria-label="Wendy">😊</div>
              </div>
              <p className="mt-3 text-center text-xs tracking-widest text-muted-foreground">{t.hero.videoTitle} · {t.hero.videoSub}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 border-t border-border/60 bg-card/40 py-24 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[auto_1fr]">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-sakura/40" />
              <img
                src={sensei}
                alt="Wendy Sensei"
                width={320}
                height={320}
                loading="lazy"
                className="relative h-72 w-72 rounded-2xl object-cover shadow-card md:h-80 md:w-80"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.about.eyebrow}</p>
            <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">
              {t.about.title1}<br />{t.about.title2}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{t.about.bio}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {t.about.credentials.map((label, i) => {
                const Icon = credentialIcons[i];
                return (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-sakura">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-medium text-sumi">{label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.features.eyebrow}</p>
              <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">{t.features.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.features.subtitle}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {t.features.items.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <Reveal key={f.title} delay={i * 120}>
                  <Card className="group relative h-full overflow-hidden border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                    <div className="absolute right-4 top-4 font-serif text-6xl font-black text-accent">
                      {f.jp}
                    </div>
                    <div className="relative">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-sumi">{f.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                      <div className="mt-6 h-px w-12 bg-sakura" />
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="path" className="relative z-10 border-t border-border/60 bg-card/40 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.path.eyebrow}</p>
              <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">{t.path.title}</h2>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-sakura via-sakura/40 to-transparent md:left-1/2" />

            <div className="space-y-12">
              {t.path.items.map((m, i) => (
                <Reveal key={m.stage + i} delay={i * 80}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-sakura bg-background">
                        <div className="h-2.5 w-2.5 rounded-full bg-sakura" />
                      </div>
                    </div>

                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                      <Card className="border-border bg-background p-6 shadow-card transition-transform hover:-translate-y-0.5">
                        <div className={`flex items-center gap-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                          <span className="rounded-md bg-sakura px-2.5 py-1 font-serif text-xs font-bold tracking-wider text-primary-foreground">
                            {m.stage}
                          </span>
                          <span className="text-xs text-muted-foreground">{m.weeks}</span>
                        </div>
                        <h3 className="mt-3 font-serif text-lg font-bold text-sumi">{m.level}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                      </Card>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.contact.eyebrow}</p>
              <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">{t.contact.title}</h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">{t.contact.subtitle}</p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <Card className="border-border bg-card p-8 shadow-card">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.contact.name}</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.contact.namePh}
                      className="border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.contact.email}</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.contact.message}</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.messagePh}
                      rows={4}
                      className="border-border bg-background"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-sakura text-primary-foreground hover:bg-sakura/90">
                    <Send className="mr-2 h-4 w-4" /> {t.contact.send}
                  </Button>
                </form>
              </Card>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex h-full flex-col gap-4">
                <a href="mailto:wenty_y@hotmail.com" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">{t.contact.emailLabel}</div>
                    <div className="font-medium text-sumi">wenty_y@hotmail.com</div>
                  </div>
                </a>

                <a href="https://line.me/ti/p/QQ17Cz-yW_" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">{t.contact.lineLabel}</div>
                    <div className="font-medium text-sumi">QQ17Cz-yW_</div>
                  </div>
                </a>

                <button type="button" onClick={() => setQrOpen("wechat")} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">{t.contact.wechatLabel}</div>
                    <div className="font-medium text-sumi">{t.contact.scanQr}</div>
                  </div>
                </button>

                <button type="button" onClick={() => setQrOpen("whatsapp")} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">{t.contact.whatsappLabel}</div>
                    <div className="font-medium text-sumi">Wendy FLORITA · {t.contact.scanQr}</div>
                  </div>
                </button>

                <Card className="mt-auto bg-gradient-sakura p-6 text-primary-foreground">
                  <p className="font-serif text-sm leading-relaxed">{t.contact.quote}</p>
                  <p className="mt-2 text-xs opacity-80">{t.contact.quoteSub}</p>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QR modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setQrOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-sm rounded-2xl bg-background p-6 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-center font-serif text-lg font-bold text-sumi">
              {qrOpen === "wechat" ? t.contact.wechatLabel : t.contact.whatsappLabel}
            </div>
            <img
              src={qrOpen === "wechat" ? wechatQr : whatsappQr}
              alt={qrOpen === "wechat" ? "WeChat QR" : "WhatsApp QR"}
              className="mx-auto h-72 w-72 rounded-lg object-contain"
            />
            <p className="mt-4 text-center text-xs text-muted-foreground">{t.contact.scanQr}</p>
            <button
              onClick={() => setQrOpen(null)}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-sumi"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 text-center text-xs text-muted-foreground">
          <LanguageSwitcher variant="footer" />
          <div>© {new Date().getFullYear()} {t.footer}</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

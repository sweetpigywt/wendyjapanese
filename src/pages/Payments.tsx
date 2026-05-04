import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ExternalLink, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Petals } from "@/components/Petals";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import { useI18n } from "@/i18n/i18n";
import { CalendarClock } from "lucide-react";
import wendyLogo from "@/assets/wendy-logo.png";
import wechatQr from "@/assets/wechat-qr.jpg";
import paypalQr from "@/assets/paypal-qr.png";
import alipayQr from "@/assets/alipay-qr.png";
import wiseQr from "@/assets/wise-qr.jpg";

// Editable payment account details — update to your real handles.
const ACCOUNTS = {
  paypayLink: "https://qr.paypay.ne.jp/p2p01_dcjYoYxmsgG8Oc23",
};

// Generate QR via free public API for the PayPay link (no extra deps).
const paypayQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(
  ACCOUNTS.paypayLink,
)}`;

const Payments = () => {
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const formsContent: Record<string, { title: string; subtitle: string; items: { label: string; url: string }[] }> = {
    zh: {
      title: "课程预约表单",
      subtitle: "完成付款后，请通过以下表单提交你的预约信息。",
      items: [{ label: "中文学员预约表单", url: "https://forms.gle/ADd2njCZUrYT59aH8" }],
    },
    en: {
      title: "Booking Form",
      subtitle: "After payment, please submit your booking via the form below.",
      items: [{ label: "English Booking Form", url: "https://forms.gle/YNoL9PDG3oVpzxyF6" }],
    },
    ja: {
      title: "予約フォーム",
      subtitle: "お支払い後、以下のフォームよりご予約情報をお送りください。",
      items: [{ label: "日本語予約フォーム", url: "https://forms.gle/pkQRebRczB4y94oe8" }],
    },
    fr: {
      title: "Formulaire de réservation",
      subtitle: "Après le paiement, veuillez soumettre votre réservation via le formulaire correspondant à votre période.",
      items: [
        { label: "Heure d'été (France)", url: "https://forms.gle/aD5HfDjbwrrqVgkY7" },
        { label: "Heure d'hiver (France)", url: "https://forms.gle/HnwJWzQBLfTYFiQd7" },
      ],
    },
  };
  const forms = formsContent[lang] ?? formsContent.en;

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
    } catch {
      /* ignore */
    }
  };

  type Method = {
    key: keyof typeof t.payments.methods;
    accent: string;
    qr?: string;
    handle?: string;
    link?: string;
  };

  const methods: Method[] = [
    { key: "paypal", accent: "from-[#003087] to-[#0070ba]", qr: paypalQr },
    { key: "paypay", accent: "from-[#ff0033] to-[#ff5577]", qr: paypayQrSrc, link: ACCOUNTS.paypayLink },
    { key: "wechat", accent: "from-[#07c160] to-[#34d27a]", qr: wechatQr },
    { key: "alipay", accent: "from-[#1677ff] to-[#3ea0ff]", qr: alipayQr },
    { key: "wise", accent: "from-[#163300] to-[#9fe870]", qr: wiseQr },
  ];

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
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> {t.payments.back}</Link>
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-6 md:pt-12">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.payments.eyebrow}</p>
            <h1 className="font-serif text-4xl font-black text-sumi md:text-5xl">{t.payments.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.payments.subtitle}</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {methods.map((m, i) => (
            <Reveal key={m.key} delay={i * 90}>
              <Card className="group relative h-full overflow-hidden border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${m.accent} opacity-20 blur-2xl`} />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-sumi">{t.payments.methods[m.key]}</h3>
                    <span className={`rounded-md bg-gradient-to-br ${m.accent} px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-white`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{t.payments.descriptions[m.key]}</p>

                  {m.qr && (
                    <div className="mb-4 flex justify-center rounded-xl border border-border bg-background p-3">
                      <img
                        src={m.qr}
                        alt={`${t.payments.methods[m.key]} QR`}
                        loading="lazy"
                        className="h-48 w-48 rounded-md object-contain"
                      />
                    </div>
                  )}

                  {m.handle && (
                    <button
                      type="button"
                      onClick={() => copy(m.key, m.handle!)}
                      className="mb-3 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm text-sumi transition-colors hover:border-sakura"
                    >
                      <span className="truncate font-mono text-xs">{m.handle}</span>
                      <span className="flex shrink-0 items-center gap-1 text-xs text-sakura">
                        {copied === m.key ? (
                          <><Check className="h-3.5 w-3.5" /> {t.payments.copied}</>
                        ) : (
                          <><Copy className="h-3.5 w-3.5" /> {t.payments.copy}</>
                        )}
                      </span>
                    </button>
                  )}

                  {m.link && (
                    <Button asChild variant="outline" className="w-full border-sumi/20">
                      <a href={m.link} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1 h-4 w-4" /> {m.qr ? t.payments.scanQr : t.payments.openLink}
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-12 max-w-xl text-center text-xs text-muted-foreground">
            {t.payments.note}
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">FORM</p>
              <h2 className="font-serif text-2xl font-black text-sumi md:text-3xl">{forms.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{forms.subtitle}</p>
            </div>
            <div className="grid gap-4">
              {forms.items.map((item) => (
                <Card key={item.url} className="border-border bg-card p-5 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sakura/10 text-sakura">
                        <CalendarClock className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span className="text-sm font-medium text-sumi">{item.label}</span>
                    </div>
                    <Button asChild className="bg-sakura text-primary-foreground hover:bg-sakura/90">
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1 h-4 w-4" /> Open Form
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
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

export default Payments;

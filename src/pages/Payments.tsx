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
  const { t } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

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

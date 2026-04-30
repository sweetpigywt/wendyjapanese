import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarCheck, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Petals } from "@/components/Petals";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/i18n";
import { supabase } from "@/integrations/supabase/client";
import wendyLogo from "@/assets/wendy-logo.png";

// Available time slots (JST). Edit freely.
const TIME_SLOTS = [
  "09:00 – 10:00",
  "10:00 – 11:00",
  "11:00 – 12:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "15:00 – 16:00",
  "16:00 – 17:00",
  "19:00 – 20:00",
  "20:00 – 21:00",
  "21:00 – 22:00",
];

const Booking = () => {
  const { t, lang } = useI18n();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().slice(0, 10);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      toast.error(t.booking.errorRequired);
      return;
    }
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("trial_bookings").insert({
        id,
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 255),
        contact: form.contact.trim().slice(0, 255) || null,
        preferred_date: form.date,
        preferred_time: form.time,
        notes: form.notes.trim().slice(0, 2000) || null,
        lang,
      });
      if (error) throw error;

      // Reuse the existing contact-email edge function so a notification
      // lands in wenty_y@hotmail.com just like contact-form submissions.
      const composedMessage =
        `【新预约 / New Trial Booking】\n` +
        `Date: ${form.date}\n` +
        `Time (JST): ${form.time}\n` +
        `Contact: ${form.contact || "—"}\n` +
        `Lang: ${lang}\n\n` +
        `Notes:\n${form.notes || "—"}`;

      try {
        await supabase.functions.invoke("send-contact-email", {
          body: { name: form.name, email: form.email, message: composedMessage },
        });
      } catch {
        /* email best-effort */
      }

      toast.success(t.booking.success);
      setForm({ name: "", email: "", contact: "", date: "", time: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error(t.booking.errorRequired);
    } finally {
      setSubmitting(false);
    }
  };

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

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-6 md:pt-12">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-sakura">{t.booking.eyebrow}</p>
            <h1 className="font-serif text-4xl font-black text-sumi md:text-5xl">{t.booking.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.booking.subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Card className="border-border bg-card p-6 shadow-card md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.booking.name}</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border-border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.booking.email}</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border-border bg-background"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.booking.contactLabel}</label>
                <Input
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="border-border bg-background"
                  placeholder={t.booking.contactPh}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.booking.date}</label>
                  <Input
                    type="date"
                    min={today}
                    max={maxDate}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="border-border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.booking.time}</label>
                  <p className="mb-2 text-[10px] tracking-wider text-muted-foreground">{t.booking.timeHint}</p>
                </div>
              </div>

              {/* Time slot grid */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {TIME_SLOTS.map((slot) => {
                  const active = form.time === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setForm({ ...form, time: slot })}
                      className={
                        "rounded-lg border px-3 py-2 text-sm font-medium transition-all " +
                        (active
                          ? "border-sakura bg-sakura text-primary-foreground shadow-soft"
                          : "border-border bg-background text-sumi hover:border-sakura hover:text-sakura")
                      }
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="mb-2 block text-xs tracking-wider text-muted-foreground">{t.booking.notes}</label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={4}
                  className="border-border bg-background"
                  placeholder={t.booking.notesPh}
                />
              </div>

              {(form.date || form.time) && (
                <div className="rounded-xl border border-sakura/30 bg-sakura/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs tracking-wider text-sakura">
                    <CalendarCheck className="h-4 w-4" /> {t.booking.summaryTitle}
                  </div>
                  <div className="font-serif text-sm text-sumi">
                    {form.date || "—"} · {form.time || "—"}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-sakura text-primary-foreground hover:bg-sakura/90"
              >
                <Send className="mr-2 h-4 w-4" /> {t.booking.submit}
              </Button>
            </form>
          </Card>
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

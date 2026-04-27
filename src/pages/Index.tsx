import { useState } from "react";
import {
  Award,
  BookOpen,
  Mic,
  Sparkles,
  PlayCircle,
  Mail,
  MessageCircle,
  Github,
  ArrowRight,
  GraduationCap,
  Globe2,
  Star,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Petals } from "@/components/Petals";
import sensei from "@/assets/sensei.jpg";

const features = [
  {
    icon: BookOpen,
    jp: "文法",
    title: "互动式语法讲解",
    desc: "拆解日语句法骨架，结合动画与情景例句，让助词、敬语、时态变得直观可感。",
  },
  {
    icon: Mic,
    jp: "発音",
    title: "地道口语纠音",
    desc: "一对一录音反馈，针对中国学习者的高低音调与促音难点逐字打磨。",
  },
  {
    icon: Sparkles,
    jp: "AI",
    title: "AI 辅助学习工具",
    desc: "专属 AI 陪练 7×24 小时对话练习，自动生成单词卡与个性化复习计划。",
  },
];

const milestones = [
  { stage: "入门", level: "五十音 · 假名", weeks: "第 1–4 周", desc: "听写、书写、发音三位一体，建立日语第一印象。" },
  { stage: "N5", level: "基础语法", weeks: "第 5–14 周", desc: "掌握 800 词与基础句型，能进行简单自我介绍与日常问候。" },
  { stage: "N4", level: "日常会话", weeks: "第 15–28 周", desc: "熟练动词变形、敬语雏形，看懂浅显文章。" },
  { stage: "N3", level: "进阶表达", weeks: "第 29–48 周", desc: "突破语法瓶颈，开启动漫、新闻原文听读。" },
  { stage: "N2", level: "商务沟通", weeks: "第 49–72 周", desc: "应对面试与职场邮件，掌握 6000+ 词汇。" },
  { stage: "N1", level: "高级精通", weeks: "第 73 周起", desc: "文学、论文、口译训练，迈向母语者水平。" },
];

const credentials = [
  { icon: Award, label: "JLPT N1 满分认证" },
  { icon: GraduationCap, label: "8 年线上线下教学经验" },
  { icon: Globe2, label: "早稻田大学交换访学" },
  { icon: Star, label: "累计 2000+ 学员" },
];

const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("请填写姓名与邮箱");
      return;
    }
    toast.success("ありがとう！消息已送达，老师会尽快回复你 ✿");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="washi-bg relative min-h-screen text-foreground">
      <Petals />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2">
          <span className="ink-stamp h-9 w-9 rounded-md text-lg">櫻</span>
          <span className="font-serif text-lg font-bold tracking-wider">Sakura 日语学堂</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#about" className="transition-colors hover:text-sakura">老师介绍</a>
          <a href="#features" className="transition-colors hover:text-sakura">教学特色</a>
          <a href="#path" className="transition-colors hover:text-sakura">学习路径</a>
          <a href="#contact" className="transition-colors hover:text-sakura">联系方式</a>
        </nav>
        <Button asChild variant="default" className="hidden bg-sakura text-primary-foreground hover:bg-sakura/90 md:inline-flex">
          <a href="#contact">免费试听 <ArrowRight className="ml-1 h-4 w-4" /></a>
        </Button>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura" />
              ようこそ · WELCOME
            </p>
            <h1 className="font-serif text-4xl font-black leading-tight text-sumi md:text-6xl">
              掌握地道日语,<br />
              <span className="text-sakura">开启文化之门</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              从五十音到 N1，我陪你走完每一步。<br />
              系统化课程 · 真人纠音 · AI 全天候陪练。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-sakura text-primary-foreground shadow-soft hover:bg-sakura/90" asChild>
                <a href="#contact">预约免费试听</a>
              </Button>
              <Button size="lg" variant="outline" className="border-sumi/20" asChild>
                <a href="#path">查看学习路径</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <div className="font-serif text-3xl font-bold text-sumi">2000<span className="text-sakura">+</span></div>
                <div className="text-xs tracking-wider text-muted-foreground">学员遍布全球</div>
              </div>
              <div className="border-l border-border pl-8">
                <div className="font-serif text-3xl font-bold text-sumi">98<span className="text-sakura">%</span></div>
                <div className="text-xs tracking-wider text-muted-foreground">JLPT 通过率</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative">
              {/* vertical jp text accent */}
              <div className="vertical-jp absolute -left-10 top-4 hidden text-xs tracking-[0.3em] text-muted-foreground md:block">
                日本語の世界へ
              </div>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-warm shadow-soft">
                {/* video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--washi)),hsl(var(--accent)))]" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <button className="group/btn flex h-20 w-20 items-center justify-center rounded-full bg-sakura text-primary-foreground shadow-soft transition-transform hover:scale-110">
                      <PlayCircle className="h-10 w-10" strokeWidth={1.5} />
                    </button>
                    <p className="mt-5 font-serif text-lg text-sumi">课程介绍视频</p>
                    <p className="mt-1 text-xs tracking-widest text-muted-foreground">90 秒了解教学方法</p>
                  </div>
                </div>
                {/* corner mark */}
                <div className="absolute right-4 top-4 ink-stamp h-12 w-12 rotate-3 rounded text-base">
                  櫻
                </div>
              </div>
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
                alt="Sakura 老师 头像"
                width={320}
                height={320}
                loading="lazy"
                className="relative h-72 w-72 rounded-2xl object-cover shadow-card md:h-80 md:w-80"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="mb-3 text-xs tracking-[0.3em] text-sakura">先生紹介 · ABOUT SENSEI</p>
            <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">
              はじめまして,<br />我是 Sakura 老师
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              八年专注日语教学，深耕语法体系与口语表达。曾任日企翻译，熟悉商务与生活场景的真实语境。
              我相信学习语言不只是背单词，而是打开一扇通往文化、电影、文学的门。
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {credentials.map((c) => (
                <div key={c.label} className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-sakura">
                    <c.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm font-medium text-sumi">{c.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">特色 · TEACHING METHOD</p>
              <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">三大教学特色</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                兼顾科学与温度，让每一节课都有清晰的进步。
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <Card className="group relative h-full overflow-hidden border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <div className="absolute right-4 top-4 font-serif text-6xl font-black text-accent transition-colors group-hover:text-accent/80">
                    {f.jp}
                  </div>
                  <div className="relative">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura">
                      <f.icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-sumi">{f.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    <div className="mt-6 h-px w-12 bg-sakura" />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="path" className="relative z-10 border-t border-border/60 bg-card/40 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">学习路径 · ROADMAP</p>
              <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">
                从假名到 N1 的完整旅程
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-sakura via-sakura/40 to-transparent md:left-1/2" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <Reveal key={m.stage} delay={i * 80}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    {/* dot */}
                    <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-sakura bg-background">
                        <div className="h-2.5 w-2.5 rounded-full bg-sakura" />
                      </div>
                    </div>

                    {/* card */}
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
              <p className="mb-3 text-xs tracking-[0.3em] text-sakura">お問い合わせ · CONTACT</p>
              <h2 className="font-serif text-3xl font-bold text-sumi md:text-4xl">
                开始你的日语之旅
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                留下联系方式，老师会在 24 小时内回复，并赠送一节免费试听课。
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <Card className="border-border bg-card p-8 shadow-card">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs tracking-wider text-muted-foreground">姓名 · お名前</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="你的称呼"
                      className="border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-wider text-muted-foreground">邮箱 · メール</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-wider text-muted-foreground">想说的话 · メッセージ</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="目前的日语水平、想达到的目标……"
                      rows={4}
                      className="border-border bg-background"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sakura text-primary-foreground hover:bg-sakura/90">
                    <Send className="mr-2 h-4 w-4" /> 发送消息
                  </Button>
                </form>
              </Card>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex h-full flex-col gap-4">
                <a href="mailto:sakura.sensei@example.com" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">Email</div>
                    <div className="font-medium text-sumi">sakura.sensei@example.com</div>
                  </div>
                </a>
                <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">微信</div>
                    <div className="font-medium text-sumi">sakura_sensei_jp</div>
                  </div>
                </div>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sakura hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sakura/10 text-sakura group-hover:bg-sakura group-hover:text-primary-foreground">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-muted-foreground">GitHub · 学习资源</div>
                    <div className="font-medium text-sumi">@sakura-sensei</div>
                  </div>
                </a>

                <Card className="mt-auto bg-gradient-sakura p-6 text-primary-foreground">
                  <p className="font-serif text-sm leading-relaxed">
                    「千里の道も一歩から」
                  </p>
                  <p className="mt-2 text-xs opacity-80">千里之行，始于足下。</p>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6">
          © {new Date().getFullYear()} Sakura 日语学堂 · Made with <span className="text-sakura">♥</span> in 東京
        </div>
      </footer>
    </div>
  );
};

export default Index;

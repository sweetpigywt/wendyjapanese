import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "zh" | "en" | "ja" | "fr";

type Dict = {
  nav: { about: string; features: string; path: string; contact: string; trial: string };
  hero: {
    welcome: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Label: string;
    stat2Label: string;
    videoTitle: string;
    videoSub: string;
    sideText: string;
  };
  about: {
    eyebrow: string;
    title1: string;
    title2: string;
    bio: string;
    credentials: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { jp: string; title: string; desc: string }[];
  };
  path: {
    eyebrow: string;
    title: string;
    weeks: (w: string) => string;
    items: { stage: string; level: string; weeks: string; desc: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    namePh: string;
    email: string;
    message: string;
    messagePh: string;
    send: string;
    errorRequired: string;
    success: string;
    emailLabel: string;
    wechatLabel: string;
    githubLabel: string;
    quote: string;
    quoteSub: string;
  };
  footer: string;
  langLabel: string;
};

const zh: Dict = {
  nav: { about: "老师介绍", features: "教学特色", path: "学习路径", contact: "联系方式", trial: "免费试听" },
  hero: {
    welcome: "ようこそ · 欢迎",
    title1: "掌握地道日语,",
    title2: "开启文化之门",
    subtitle: "从五十音到 N1，我陪你走完每一步。\n系统化课程 · 真人纠音 · AI 全天候陪练。",
    ctaPrimary: "预约免费试听",
    ctaSecondary: "查看学习路径",
    stat1Label: "学员遍布全球",
    stat2Label: "JLPT 通过率",
    videoTitle: "课程介绍视频",
    videoSub: "90 秒了解教学方法",
    sideText: "日本語の世界へ",
  },
  about: {
    eyebrow: "先生紹介 · 老师介绍",
    title1: "はじめまして,",
    title2: "我是 Wendy 老师",
    bio: "八年专注日语教学，深耕语法体系与口语表达。曾任日企翻译，熟悉商务与生活场景的真实语境。我相信学习语言不只是背单词，而是打开一扇通往文化、电影、文学的门。",
    credentials: ["JLPT N1 满分认证", "8 年线上线下教学经验", "早稻田大学交换访学", "累计 2000+ 学员"],
  },
  features: {
    eyebrow: "特色 · 教学方法",
    title: "三大教学特色",
    subtitle: "兼顾科学与温度，让每一节课都有清晰的进步。",
    items: [
      { jp: "文法", title: "互动式语法讲解", desc: "拆解日语句法骨架，结合动画与情景例句，让助词、敬语、时态变得直观可感。" },
      { jp: "発音", title: "地道口语纠音", desc: "一对一录音反馈，针对中国学习者的高低音调与促音难点逐字打磨。" },
      { jp: "AI", title: "AI 辅助学习工具", desc: "专属 AI 陪练 7×24 小时对话练习，自动生成单词卡与个性化复习计划。" },
    ],
  },
  path: {
    eyebrow: "学习路径 · 路线图",
    title: "从假名到 N1 的完整旅程",
    weeks: (w) => w,
    items: [
      { stage: "入门", level: "五十音 · 假名", weeks: "第 1–4 周", desc: "听写、书写、发音三位一体，建立日语第一印象。" },
      { stage: "N5", level: "基础语法", weeks: "第 5–14 周", desc: "掌握 800 词与基础句型，能进行简单自我介绍与日常问候。" },
      { stage: "N4", level: "日常会话", weeks: "第 15–28 周", desc: "熟练动词变形、敬语雏形，看懂浅显文章。" },
      { stage: "N3", level: "进阶表达", weeks: "第 29–48 周", desc: "突破语法瓶颈，开启动漫、新闻原文听读。" },
      { stage: "N2", level: "商务沟通", weeks: "第 49–72 周", desc: "应对面试与职场邮件，掌握 6000+ 词汇。" },
      { stage: "N1", level: "高级精通", weeks: "第 73 周起", desc: "文学、论文、口译训练，迈向母语者水平。" },
    ],
  },
  contact: {
    eyebrow: "お問い合わせ · 联系",
    title: "开始你的日语之旅",
    subtitle: "留下联系方式，老师会在 24 小时内回复，并赠送一节免费试听课。",
    name: "姓名 · お名前",
    namePh: "你的称呼",
    email: "邮箱 · メール",
    message: "想说的话 · メッセージ",
    messagePh: "目前的日语水平、想达到的目标……",
    send: "发送消息",
    errorRequired: "请填写姓名与邮箱",
    success: "ありがとう！消息已送达，老师会尽快回复你 ✿",
    emailLabel: "Email",
    wechatLabel: "微信",
    githubLabel: "GitHub · 学习资源",
    quote: "「千里の道も一歩から」",
    quoteSub: "千里之行，始于足下。",
  },
  footer: "Wendy 日语学堂 · Made with ♥ in 福岡",
  langLabel: "语言",
};

const en: Dict = {
  nav: { about: "About", features: "Method", path: "Roadmap", contact: "Contact", trial: "Free Trial" },
  hero: {
    welcome: "ようこそ · WELCOME",
    title1: "Master authentic Japanese,",
    title2: "open the door to a culture",
    subtitle: "From kana to N1 — I'll walk every step with you.\nStructured curriculum · live coaching · 24/7 AI partner.",
    ctaPrimary: "Book a free trial",
    ctaSecondary: "View roadmap",
    stat1Label: "Students worldwide",
    stat2Label: "JLPT pass rate",
    videoTitle: "Course intro video",
    videoSub: "90 seconds about my method",
    sideText: "Into the world of 日本語",
  },
  about: {
    eyebrow: "先生紹介 · ABOUT SENSEI",
    title1: "Nice to meet you,",
    title2: "I'm Wendy Sensei",
    bio: "Eight years devoted to teaching Japanese, with deep focus on grammar systems and spoken expression. Former in-house translator at a Japanese firm. I believe language learning isn't memorising words — it's opening a door to culture, cinema and literature.",
    credentials: ["JLPT N1 perfect score", "8 years teaching experience", "Waseda University exchange", "2000+ students taught"],
  },
  features: {
    eyebrow: "METHOD · TEACHING APPROACH",
    title: "Three pillars of my teaching",
    subtitle: "Rigorous yet warm — every lesson delivers measurable progress.",
    items: [
      { jp: "文法", title: "Interactive grammar", desc: "We dissect Japanese sentence structure with animated diagrams and real-life examples — particles, keigo and tenses become intuitive." },
      { jp: "発音", title: "Native-like pronunciation", desc: "Personal voice feedback targeting pitch accent and sokuon — the exact spots non-natives stumble on." },
      { jp: "AI", title: "AI-powered practice", desc: "A dedicated AI partner for 24/7 conversation, auto-generated flashcards and a personalised review schedule." },
    ],
  },
  path: {
    eyebrow: "ROADMAP · LEARNING PATH",
    title: "The full journey from kana to N1",
    weeks: (w) => w,
    items: [
      { stage: "Start", level: "Kana · 50 sounds", weeks: "Week 1–4", desc: "Listening, writing, pronunciation as one — your very first taste of Japanese." },
      { stage: "N5", level: "Foundations", weeks: "Week 5–14", desc: "Master 800 words and core patterns — introduce yourself and handle daily greetings." },
      { stage: "N4", level: "Everyday talk", weeks: "Week 15–28", desc: "Verb conjugation, the basics of keigo, and reading short articles with ease." },
      { stage: "N3", level: "Advanced expression", weeks: "Week 29–48", desc: "Break the grammar plateau and start enjoying anime and news in the original." },
      { stage: "N2", level: "Business fluency", weeks: "Week 49–72", desc: "Handle interviews and workplace email; expand vocabulary to 6,000+ words." },
      { stage: "N1", level: "Mastery", weeks: "From week 73", desc: "Literature, academic papers and interpretation — approaching native-level command." },
    ],
  },
  contact: {
    eyebrow: "お問い合わせ · CONTACT",
    title: "Start your Japanese journey",
    subtitle: "Leave your details — I'll reply within 24 hours and offer a free trial lesson.",
    name: "Name · お名前",
    namePh: "How should I call you?",
    email: "Email · メール",
    message: "Your message · メッセージ",
    messagePh: "Your current level, your goals...",
    send: "Send message",
    errorRequired: "Please enter your name and email",
    success: "ありがとう! Message received — I'll reply soon ✿",
    emailLabel: "Email",
    wechatLabel: "WeChat",
    githubLabel: "GitHub · Resources",
    quote: "「千里の道も一歩から」",
    quoteSub: "A journey of a thousand miles begins with a single step.",
  },
  footer: "Wendy Japanese Studio · Made with ♥ in Fukuoka",
  langLabel: "Language",
};

const ja: Dict = {
  nav: { about: "講師紹介", features: "教え方", path: "学習プラン", contact: "お問い合わせ", trial: "無料体験" },
  hero: {
    welcome: "ようこそ · WELCOME",
    title1: "本物の日本語を身につけ,",
    title2: "文化への扉を開こう",
    subtitle: "五十音からN1まで、一歩ずつ一緒に歩みます。\n体系的なカリキュラム・ネイティブ発音指導・24時間AIパートナー。",
    ctaPrimary: "無料体験を予約",
    ctaSecondary: "学習プランを見る",
    stat1Label: "世界中の受講生",
    stat2Label: "JLPT合格率",
    videoTitle: "コース紹介動画",
    videoSub: "90秒で教え方を紹介",
    sideText: "日本語の世界へ",
  },
  about: {
    eyebrow: "先生紹介 · ABOUT SENSEI",
    title1: "はじめまして,",
    title2: "Wendy先生です",
    bio: "8年間、日本語教育一筋。文法体系と話し言葉の表現を専門としています。日系企業での翻訳経験もあり、ビジネスから日常まで生きた日本語をお伝えします。言語学習は単語暗記ではなく、文化・映画・文学への扉を開くことだと信じています。",
    credentials: ["JLPT N1 満点取得", "オンライン・対面 8年指導歴", "早稲田大学 交換留学", "受講生 2,000名以上"],
  },
  features: {
    eyebrow: "特色 · 教え方",
    title: "3つの教育の柱",
    subtitle: "厳密さと温かさ、毎回のレッスンで確かな成長を。",
    items: [
      { jp: "文法", title: "インタラクティブ文法", desc: "文の骨格をアニメと実例で分解。助詞・敬語・時制が直感的に理解できます。" },
      { jp: "発音", title: "ネイティブ発音矯正", desc: "1対1の音声フィードバックで、高低アクセントと促音をピンポイントに矯正。" },
      { jp: "AI", title: "AI学習サポート", desc: "専用AIパートナーが24時間会話練習。単語カードと復習計画も自動生成。" },
    ],
  },
  path: {
    eyebrow: "学習プラン · ROADMAP",
    title: "かなからN1までの完全ロードマップ",
    weeks: (w) => w,
    items: [
      { stage: "入門", level: "五十音 · かな", weeks: "第1〜4週", desc: "聞く・書く・発音を一体化、日本語との最初の出会い。" },
      { stage: "N5", level: "基礎文法", weeks: "第5〜14週", desc: "800語と基本文型をマスター。自己紹介と日常挨拶ができる。" },
      { stage: "N4", level: "日常会話", weeks: "第15〜28週", desc: "動詞活用と敬語の基礎、簡単な文章が読める。" },
      { stage: "N3", level: "応用表現", weeks: "第29〜48週", desc: "文法の壁を突破し、アニメやニュースを原語で楽しむ。" },
      { stage: "N2", level: "ビジネス対応", weeks: "第49〜72週", desc: "面接やビジネスメールに対応、6,000語以上を習得。" },
      { stage: "N1", level: "上級習熟", weeks: "第73週〜", desc: "文学・論文・通訳訓練、ネイティブレベルへ。" },
    ],
  },
  contact: {
    eyebrow: "お問い合わせ · CONTACT",
    title: "日本語の旅を始めよう",
    subtitle: "ご連絡をいただければ、24時間以内にお返事し、無料体験レッスンをご案内します。",
    name: "お名前",
    namePh: "お呼びする名前",
    email: "メールアドレス",
    message: "メッセージ",
    messagePh: "現在のレベル、目標など…",
    send: "送信する",
    errorRequired: "お名前とメールをご入力ください",
    success: "ありがとうございます！まもなくお返事いたします ✿",
    emailLabel: "Email",
    wechatLabel: "WeChat",
    githubLabel: "GitHub · 学習リソース",
    quote: "「千里の道も一歩から」",
    quoteSub: "千里の道も一歩から始まる。",
  },
  footer: "Wendy 日本語スタジオ · Made with ♥ in 福岡",
  langLabel: "言語",
};

const fr: Dict = {
  nav: { about: "Le professeur", features: "Méthode", path: "Parcours", contact: "Contact", trial: "Cours d'essai" },
  hero: {
    welcome: "ようこそ · BIENVENUE",
    title1: "Maîtrisez un japonais authentique,",
    title2: "ouvrez la porte d'une culture",
    subtitle: "Des kana au N1 — je vous accompagne à chaque étape.\nCursus structuré · coaching humain · IA disponible 24h/24.",
    ctaPrimary: "Réserver un essai gratuit",
    ctaSecondary: "Voir le parcours",
    stat1Label: "Élèves dans le monde",
    stat2Label: "Taux de réussite JLPT",
    videoTitle: "Vidéo de présentation",
    videoSub: "90 secondes sur ma méthode",
    sideText: "Vers le monde du 日本語",
  },
  about: {
    eyebrow: "先生紹介 · LE PROFESSEUR",
    title1: "Enchantée,",
    title2: "je suis Wendy Sensei",
    bio: "Huit ans d'enseignement du japonais, avec une attention particulière à la grammaire et à l'expression orale. Ancienne traductrice en entreprise japonaise. Apprendre une langue, ce n'est pas mémoriser des mots — c'est ouvrir une porte sur une culture, un cinéma, une littérature.",
    credentials: ["Score parfait au JLPT N1", "8 ans d'enseignement", "Échange à l'université Waseda", "Plus de 2 000 élèves"],
  },
  features: {
    eyebrow: "MÉTHODE · APPROCHE",
    title: "Trois piliers pédagogiques",
    subtitle: "Rigueur et chaleur — chaque cours apporte un progrès mesurable.",
    items: [
      { jp: "文法", title: "Grammaire interactive", desc: "Nous décomposons la structure des phrases avec animations et exemples concrets — particules, keigo et temps deviennent intuitifs." },
      { jp: "発音", title: "Prononciation authentique", desc: "Retours audio personnalisés sur l'accent de hauteur et le sokuon — exactement là où les francophones butent." },
      { jp: "AI", title: "Pratique assistée par IA", desc: "Un partenaire IA dédié pour converser 24h/24, des cartes de vocabulaire et un programme de révision personnalisés." },
    ],
  },
  path: {
    eyebrow: "PARCOURS · ROADMAP",
    title: "Le parcours complet, des kana au N1",
    weeks: (w) => w,
    items: [
      { stage: "Début", level: "Kana · 50 sons", weeks: "Semaine 1–4", desc: "Écoute, écriture et prononciation réunies — votre premier contact avec la langue." },
      { stage: "N5", level: "Bases", weeks: "Semaine 5–14", desc: "800 mots et structures de base : se présenter, gérer les salutations." },
      { stage: "N4", level: "Conversation", weeks: "Semaine 15–28", desc: "Conjugaison, premiers pas en keigo, lecture de textes simples." },
      { stage: "N3", level: "Expression avancée", weeks: "Semaine 29–48", desc: "Franchir le palier grammatical, profiter d'animes et d'actualités en V.O." },
      { stage: "N2", level: "Niveau professionnel", weeks: "Semaine 49–72", desc: "Entretiens et e-mails pro, plus de 6 000 mots maîtrisés." },
      { stage: "N1", level: "Maîtrise", weeks: "Dès la semaine 73", desc: "Littérature, articles académiques, interprétation — proche du niveau natif." },
    ],
  },
  contact: {
    eyebrow: "お問い合わせ · CONTACT",
    title: "Commencez votre voyage japonais",
    subtitle: "Laissez vos coordonnées — je réponds sous 24 h et j'offre un cours d'essai.",
    name: "Nom · お名前",
    namePh: "Comment vous appeler ?",
    email: "Email · メール",
    message: "Votre message · メッセージ",
    messagePh: "Votre niveau actuel, vos objectifs…",
    send: "Envoyer",
    errorRequired: "Merci d'indiquer votre nom et votre email",
    success: "ありがとう ! Message bien reçu, je reviens vite vers vous ✿",
    emailLabel: "Email",
    wechatLabel: "WeChat",
    githubLabel: "GitHub · Ressources",
    quote: "「千里の道も一歩から」",
    quoteSub: "Un voyage de mille lieues commence par un pas.",
  },
  footer: "Wendy Studio de japonais · Made with ♥ à Fukuoka",
  langLabel: "Langue",
};

const dictionaries: Record<Lang, Dict> = { zh, en, ja, fr };

export const languages: { code: Lang; label: string; native: string }[] = [
  { code: "zh", label: "中文", native: "中文" },
  { code: "en", label: "English", native: "EN" },
  { code: "ja", label: "日本語", native: "日本語" },
  { code: "fr", label: "Français", native: "FR" },
];

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<I18nCtx | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "zh";
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && dictionaries[saved]) return saved;
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("en")) return "en";
    return "zh";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
    document.documentElement.lang = l === "zh" ? "zh-CN" : l;
  };

  return <Ctx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
};

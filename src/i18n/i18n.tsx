import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    stat1Value: string;
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
  subjects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    seniority: string;
    seniorityValue: string;
    levelsLabel: string;
    levels: string[];
    agesLabel: string;
    ages: string[];
    coursesLabel: string;
    courses: { name: string; desc: string }[];
  };
  intro: {
    eyebrow: string;
    title: string;
    subtitle: string;
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
    lineLabel: string;
    whatsappLabel: string;
    scanQr: string;
    quote: string;
    quoteSub: string;
  };
  footer: string;
  langLabel: string;
  payments: {
    nav: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    scanQr: string;
    openLink: string;
    copy: string;
    copied: string;
    note: string;
    methods: { paypal: string; paypay: string; wechat: string; alipay: string; wise: string };
    descriptions: { paypal: string; paypay: string; wechat: string; alipay: string; wise: string };
  };
  booking: {
    nav: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    name: string;
    email: string;
    contactLabel: string;
    contactPh: string;
    date: string;
    time: string;
    notes: string;
    notesPh: string;
    submit: string;
    success: string;
    errorRequired: string;
    summaryTitle: string;
    timeHint: string;
  };
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
    stat1Label: "全年龄段学员皆可教学",
    stat1Value: "全年龄",
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
    credentials: ["JLPT N1 满分认证", "8 年线上线下教学经验", "日本日语教学国家资格证持有者", "可用中 / 日 / 英 三语教学"],
  },
  features: {
    eyebrow: "特色 · 教学方法",
    title: "三大教学特色",
    subtitle: "兼顾科学与温度，让每一节课都有清晰的进步。",
    items: [
      { jp: "文法", title: "互动式语法讲解", desc: "拆解日语句法骨架，结合动画与情景例句，让助词、敬语、时态变得直观可感。" },
      { jp: "発音", title: "地道口语纠音", desc: "一对一录音反馈，针对中国学习者的高低音调与促音难点逐字打磨。" },
      { jp: "練習", title: "丰富的课后练习工具", desc: "配套丰富的课后练习与复习材料，帮助你巩固当天上课的内容。" },
    ],
  },
  subjects: {
    eyebrow: "授課科目 · 授课科目",
    title: "我能教授的课程",
    subtitle: "覆盖从零基础到考试与商务，全年龄段都能找到合适的方向。",
    seniority: "教龄",
    seniorityValue: "10 年",
    levelsLabel: "学生水平",
    levels: ["初学者", "预备中级", "中级", "中高级", "进阶", "能力", "未指定"],
    agesLabel: "首选年龄段",
    ages: ["学生 (17–22)", "成人 (23–40)", "成人 (40+)"],
    coursesLabel: "课程方向",
    courses: [
      { name: "会话日语", desc: "聚焦真实生活场景的自然口语：点餐、问路、与朋友聊天，重点训练听力与发音，让你敢开口、说得地道。" },
      { name: "初学者日语", desc: "从平假名、片假名到基础句型，配合大量图片与简单例句，帮零基础的你打下扎实的入门地基。" },
      { name: "JLPT (N5–N1)", desc: "覆盖 N5 到 N1 的词汇、语法与阅读，配合真题训练与听力策略，定位弱项、稳步提分。" },
      { name: "进阶日语", desc: "新闻阅读、日剧赏析、敬语 (Keigo) 与正式表达，帮助你理解语言背后的文化与思维方式。" },
      { name: "商务日语", desc: "职场场景实战：电话应对、商务邮件、会议礼仪与角色扮演，让你在日企从容沟通。" },
    ],
  },
  intro: {
    eyebrow: "自我介绍 · 三语简介",
    title: "中日英三语自我介绍",
    subtitle: "一段简短的视频，让你直观感受我的授课风格与教学方式。",
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
    lineLabel: "LINE",
    whatsappLabel: "WhatsApp",
    scanQr: "扫码添加",
    quote: "「千里の道も一歩から」",
    quoteSub: "千里之行，始于足下。",
  },
  footer: "Wendy 日语学堂 · Made with ♥ in 福岡",
  langLabel: "语言",
  payments: {
    nav: "付款方式",
    eyebrow: "支付 · PAYMENT",
    title: "付款方式",
    subtitle: "支持多种国际与本地支付渠道，请选择最方便你的方式。",
    back: "← 返回首页",
    scanQr: "扫码支付",
    openLink: "打开链接",
    copy: "复制",
    copied: "已复制",
    note: "完成付款后请将截图发送给老师，我会尽快确认。",
    methods: { paypal: "PayPal", paypay: "PayPay", wechat: "微信支付", alipay: "支付宝", wise: "Wise" },
    descriptions: {
      paypal: "适合海外学员，使用 PayPal 邮箱地址完成转账。",
      paypay: "日本本地最便捷的支付方式，扫码即可。",
      wechat: "中国大陆学员推荐，微信扫码即可付款。",
      alipay: "支持中国大陆与多国支付宝，扫码完成转账。",
      wise: "国际汇款首选，费率低、到账快。",
    },
  },
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
    stat1Label: "All ages welcome",
    stat1Value: "All ages",
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
    credentials: ["JLPT N1 perfect score", "8 years teaching experience", "Certified Japanese-language teacher (Japan national qualification)", "Teaches in Chinese / Japanese / English"],
  },
  features: {
    eyebrow: "METHOD · TEACHING APPROACH",
    title: "Three pillars of my teaching",
    subtitle: "Rigorous yet warm — every lesson delivers measurable progress.",
    items: [
      { jp: "文法", title: "Interactive grammar", desc: "We dissect Japanese sentence structure with animated diagrams and real-life examples — particles, keigo and tenses become intuitive." },
      { jp: "発音", title: "Native-like pronunciation", desc: "Personal voice feedback targeting pitch accent and sokuon — the exact spots non-natives stumble on." },
      { jp: "練習", title: "Rich after-class practice", desc: "Plenty of practice and review materials so you can reinforce what we covered in class the same day." },
    ],
  },
  subjects: {
    eyebrow: "SUBJECTS · WHAT I TEACH",
    title: "Courses I can teach",
    subtitle: "From absolute beginner to JLPT and business — there's a track for every age and goal.",
    seniority: "Years teaching",
    seniorityValue: "10 years",
    levelsLabel: "Student levels",
    levels: ["Beginner", "Pre-intermediate", "Intermediate", "Upper-intermediate", "Advanced", "Proficient", "Unspecified"],
    agesLabel: "Preferred age groups",
    ages: ["Students (17–22)", "Adults (23–40)", "Adults (40+)"],
    coursesLabel: "Course tracks",
    courses: [
      { name: "Conversational Japanese", desc: "Speak naturally in real-life situations — ordering food, asking directions, chatting with friends. Heavy focus on listening and pronunciation so you feel confident with native speakers." },
      { name: "Beginner Japanese", desc: "Hiragana and Katakana, then simple sentence patterns with lots of pictures and examples — a strong, patient foundation for absolute beginners." },
      { name: "JLPT (N5–N1)", desc: "Vocabulary, grammar and reading from N5 to N1, with past papers and listening strategies. We pinpoint weak spots and aim for the best score possible." },
      { name: "Advanced Japanese", desc: "News articles, Japanese TV, Keigo (honorifics) and formal expression — understand the deeper meaning of the language and the culture behind it." },
      { name: "Business Japanese", desc: "Real workplace skills: phone calls, business email, meeting etiquette and role-play of common scenarios — Japanese you can use at a Japanese company." },
    ],
  },
  intro: {
    eyebrow: "INTRODUCTION · 自己紹介",
    title: "Trilingual self-introduction (CN / JP / EN)",
    subtitle: "A short video to give you a feel for my teaching style and how I approach Japanese.",
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
    lineLabel: "LINE",
    whatsappLabel: "WhatsApp",
    scanQr: "Scan QR to add",
    quote: "「千里の道も一歩から」",
    quoteSub: "A journey of a thousand miles begins with a single step.",
  },
  footer: "Wendy Japanese Studio · Made with ♥ in Fukuoka",
  langLabel: "Language",
  payments: {
    nav: "Payment",
    eyebrow: "PAYMENT · 支払い",
    title: "Payment methods",
    subtitle: "Multiple international and local payment options — pick whichever works best for you.",
    back: "← Back to home",
    scanQr: "Scan to pay",
    openLink: "Open link",
    copy: "Copy",
    copied: "Copied",
    note: "Please send me a screenshot once paid and I'll confirm shortly.",
    methods: { paypal: "PayPal", paypay: "PayPay", wechat: "WeChat Pay", alipay: "Alipay", wise: "Wise" },
    descriptions: {
      paypal: "Best for international students — pay via PayPal email.",
      paypay: "The easiest local option in Japan — just scan the QR code.",
      wechat: "Recommended for students in mainland China — scan to pay.",
      alipay: "Works across mainland China and many countries — scan the QR.",
      wise: "Best for international transfers — low fees, fast settlement.",
    },
  },
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
    stat1Label: "全年齢層に対応",
    stat1Value: "全年齢",
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
    credentials: ["JLPT N1 満点取得", "オンライン・対面 8年指導歴", "日本語教育能力検定 国家資格保持", "中国語・日本語・英語の3言語で指導可能"],
  },
  features: {
    eyebrow: "特色 · 教え方",
    title: "3つの教育の柱",
    subtitle: "厳密さと温かさ、毎回のレッスンで確かな成長を。",
    items: [
      { jp: "文法", title: "インタラクティブ文法", desc: "文の骨格をアニメと実例で分解。助詞・敬語・時制が直感的に理解できます。" },
      { jp: "発音", title: "ネイティブ発音矯正", desc: "1対1の音声フィードバックで、高低アクセントと促音をピンポイントに矯正。" },
      { jp: "練習", title: "充実した課後練習ツール", desc: "豊富な復習教材で、その日のレッスン内容をしっかり定着させます。" },
    ],
  },
  subjects: {
    eyebrow: "授業科目 · WHAT I TEACH",
    title: "対応できるコース",
    subtitle: "ゼロからの初心者、JLPT、ビジネス日本語まで。年齢を問わず最適なコースが見つかります。",
    seniority: "指導歴",
    seniorityValue: "10年",
    levelsLabel: "対象レベル",
    levels: ["初級", "準中級", "中級", "中上級", "上級", "熟達", "未指定"],
    agesLabel: "対象年齢",
    ages: ["学生 (17–22)", "成人 (23–40)", "成人 (40+)"],
    coursesLabel: "コース内容",
    courses: [
      { name: "会話日本語", desc: "実生活の場面で自然に話せるように指導します。注文・道案内・友人との雑談など、聴解と発音を重視します。" },
      { name: "初心者向け日本語", desc: "ひらがな・カタカナから簡単な文型まで、絵や例を多用して、ゼロからしっかり基礎を作ります。" },
      { name: "JLPT (N5–N1)", desc: "N5からN1までの語彙・文法・読解、過去問演習と聴解対策で、弱点を見つけて点数を伸ばします。" },
      { name: "上級日本語", desc: "ニュース記事・ドラマ・敬語と公式表現を学び、言語の奥にある文化と考え方まで理解します。" },
      { name: "ビジネス日本語", desc: "電話応対、ビジネスメール、会議マナーをロールプレイで実践。日系企業で使える日本語を身につけます。" },
    ],
  },
  intro: {
    eyebrow: "自己紹介 · INTRODUCTION",
    title: "中・日・英 三か国語での自己紹介",
    subtitle: "短い動画で、私の授業スタイルと日本語へのアプローチをご覧いただけます。",
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
    lineLabel: "LINE",
    whatsappLabel: "WhatsApp",
    scanQr: "QRコードで追加",
    quote: "「千里の道も一歩から」",
    quoteSub: "千里の道も一歩から始まる。",
  },
  footer: "Wendy 日本語スタジオ · Made with ♥ in 福岡",
  langLabel: "言語",
  payments: {
    nav: "お支払い",
    eyebrow: "PAYMENT · お支払い",
    title: "お支払い方法",
    subtitle: "複数の国際・国内決済に対応。ご都合の良い方法をお選びください。",
    back: "← トップへ戻る",
    scanQr: "QRで支払う",
    openLink: "リンクを開く",
    copy: "コピー",
    copied: "コピーしました",
    note: "お支払い後、スクリーンショットをお送りください。確認次第ご連絡します。",
    methods: { paypal: "PayPal", paypay: "PayPay", wechat: "WeChat Pay", alipay: "Alipay", wise: "Wise" },
    descriptions: {
      paypal: "海外の生徒さんにおすすめ。PayPalのメール宛に送金できます。",
      paypay: "日本国内で最も手軽な決済方法。QRを読み取るだけ。",
      wechat: "中国本土の生徒さんに最適。WeChatでQRを読み取って決済。",
      alipay: "中国本土および各国で利用可能。QRコードでお支払い。",
      wise: "国際送金に最適。手数料が安く、着金も早いです。",
    },
  },
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
    stat1Label: "Tous âges bienvenus",
    stat1Value: "Tous âges",
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
    credentials: ["Score parfait au JLPT N1", "8 ans d'enseignement", "Diplôme d'État japonais d'enseignement du japonais", "Enseigne en chinois / japonais / anglais"],
  },
  features: {
    eyebrow: "MÉTHODE · APPROCHE",
    title: "Trois piliers pédagogiques",
    subtitle: "Rigueur et chaleur — chaque cours apporte un progrès mesurable.",
    items: [
      { jp: "文法", title: "Grammaire interactive", desc: "Nous décomposons la structure des phrases avec animations et exemples concrets — particules, keigo et temps deviennent intuitifs." },
      { jp: "発音", title: "Prononciation authentique", desc: "Retours audio personnalisés sur l'accent de hauteur et le sokuon — exactement là où les francophones butent." },
      { jp: "練習", title: "Exercices après-cours riches", desc: "De nombreux supports d'entraînement pour réviser le contenu vu en cours le jour même." },
    ],
  },
  subjects: {
    eyebrow: "MATIÈRES · CE QUE J'ENSEIGNE",
    title: "Les cours que je peux donner",
    subtitle: "Du grand débutant au JLPT et au japonais professionnel — un parcours adapté à chaque âge et chaque objectif.",
    seniority: "Années d'enseignement",
    seniorityValue: "10 ans",
    levelsLabel: "Niveaux des élèves",
    levels: ["Débutant", "Pré-intermédiaire", "Intermédiaire", "Intermédiaire+", "Avancé", "Maîtrise", "Non précisé"],
    agesLabel: "Tranches d'âge préférées",
    ages: ["Étudiants (17–22)", "Adultes (23–40)", "Adultes (40+)"],
    coursesLabel: "Parcours proposés",
    courses: [
      { name: "Japonais conversationnel", desc: "Parler naturellement dans la vraie vie — commander, demander son chemin, discuter avec des amis. Forte place à l'écoute et à la prononciation." },
      { name: "Japonais débutant", desc: "Hiragana et Katakana, puis structures simples avec beaucoup d'images et d'exemples — une base patiente et solide pour vrais débutants." },
      { name: "JLPT (N5–N1)", desc: "Vocabulaire, grammaire et compréhension du N5 au N1, avec annales et stratégies d'écoute pour viser le meilleur score." },
      { name: "Japonais avancé", desc: "Articles d'actualité, séries japonaises, Keigo (langage honorifique) et expressions formelles — comprendre la langue et la culture en profondeur." },
      { name: "Japonais des affaires", desc: "Compétences pro réelles : appels, e-mails, étiquette en réunion et jeux de rôles — un japonais utilisable en entreprise japonaise." },
    ],
  },
  intro: {
    eyebrow: "PRÉSENTATION · 自己紹介",
    title: "Présentation trilingue (CN / JP / EN)",
    subtitle: "Une courte vidéo pour découvrir mon style d'enseignement et ma façon d'aborder le japonais.",
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
    lineLabel: "LINE",
    whatsappLabel: "WhatsApp",
    scanQr: "Scanner le QR",
    quote: "「千里の道も一歩から」",
    quoteSub: "Un voyage de mille lieues commence par un pas.",
  },
  footer: "Wendy Studio de japonais · Made with ♥ à Fukuoka",
  langLabel: "Langue",
  payments: {
    nav: "Paiement",
    eyebrow: "PAIEMENT · 支払い",
    title: "Moyens de paiement",
    subtitle: "Plusieurs options de paiement internationales et locales — choisissez celle qui vous convient.",
    back: "← Retour à l'accueil",
    scanQr: "Scanner pour payer",
    openLink: "Ouvrir le lien",
    copy: "Copier",
    copied: "Copié",
    note: "Envoyez-moi une capture d'écran après paiement, je confirmerai rapidement.",
    methods: { paypal: "PayPal", paypay: "PayPay", wechat: "WeChat Pay", alipay: "Alipay", wise: "Wise" },
    descriptions: {
      paypal: "Idéal à l'international — payez via l'email PayPal.",
      paypay: "L'option la plus simple au Japon — il suffit de scanner.",
      wechat: "Recommandé pour les élèves en Chine continentale — scannez pour payer.",
      alipay: "Disponible en Chine continentale et dans de nombreux pays — scannez le QR.",
      wise: "Idéal pour les virements internationaux — frais bas, exécution rapide.",
    },
  },
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

const detectFromBrowser = (): Lang => {
  if (typeof navigator === "undefined") return "en";
  const langs = [navigator.language, ...(navigator.languages || [])].map((l) => l.toLowerCase());
  for (const l of langs) {
    if (l.startsWith("ja")) return "ja";
    if (l.startsWith("fr")) return "fr";
    // Only Traditional Chinese (TW / HK / MO) maps to zh per spec
    if (l === "zh-tw" || l === "zh-hk" || l === "zh-mo" || l.startsWith("zh-hant")) return "zh";
  }
  return "en";
};

const detectFromCountry = (country: string): Lang | null => {
  const c = country.toUpperCase();
  if (c === "JP") return "ja";
  if (c === "TW" || c === "HK" || c === "MO") return "zh";
  if (c === "FR") return "fr";
  return "en";
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && dictionaries[saved]) return saved;
    return detectFromBrowser();
  });

  // Refine via IP geolocation on first visit (no saved preference)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("lang")) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const country: string | undefined = data?.country_code || data?.country;
        if (!country || cancelled) return;
        const detected = detectFromCountry(country);
        if (detected) {
          setLangState(detected);
          document.documentElement.lang = detected === "zh" ? "zh-TW" : detected;
        }
      } catch {
        /* network blocked — keep browser-based fallback */
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
    document.documentElement.lang = l === "zh" ? "zh-TW" : l;
  };

  return <Ctx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
};

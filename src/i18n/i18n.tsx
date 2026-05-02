import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "zh" | "en" | "ja" | "fr";

type Dict = {
  siteTitle: string;
  backToTop: string;
  nav: { about: string; features: string; path: string; contact: string; trial: string; courses: string };
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
    errorSubmit: string;
    summaryTitle: string;
    timeHint: string;
    pickDateFirst: string;
    dayUnavailable: string;
    availability: string;
    openForm: string;
  };
  courses: {
    nav: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    sessionsLabel: string;
    items: {
      title: string;
      spec?: string;
      summary?: string;
      sections: { heading: string; bullets: string[] }[];
    }[];
    pricing: {
      eyebrow: string;
      title: string;
      intro: string;
      currencyNote: string;
      groups: {
        heading: string;
        description?: string;
        items: { label: string; price: string; note?: string }[];
      }[];
    };
  };
};

const zh: Dict = {
  siteTitle: "Wendy老师的日语课堂",
  backToTop: "返回顶部",
  nav: { about: "老师介绍", features: "教学特色", path: "学习路径", contact: "联系方式", trial: "免费试听", courses: "课程介绍" },
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
  booking: {
    nav: "预约试听",
    eyebrow: "予約 · 预约试听",
    title: "预约一节免费试听课",
    subtitle: "请选择你方便的日期与时间段，提交后老师会尽快与你确认。",
    back: "← 返回首页",
    name: "姓名",
    email: "邮箱",
    contactLabel: "联系方式（微信 / LINE / WhatsApp）",
    contactPh: "便于老师联系你的账号",
    date: "希望的日期",
    time: "希望的时间段",
    notes: "备注（当前水平、想达到的目标…）",
    notesPh: "选填",
    submit: "提交预约",
    success: "预约已提交！老师会尽快与你确认 ✿",
    errorRequired: "请填写姓名、邮箱、日期与时间段",
    errorSubmit: "预约未发送成功，请稍后再试或直接联系老师。",
    summaryTitle: "你的预约信息",
    timeHint: "时间为日本标准时间 (JST)",
    pickDateFirst: "请先选择日期，可选时间段会根据当天显示。",
    dayUnavailable: "当天暂无可预约时段。可选：周二 / 周三 / 周五 17:30–23:00，周六 15:00–23:00，周日 08:00–23:00。",
    availability: "可预约时间：周二 / 三 / 五 17:30–23:00 · 周六 15:00–23:00 · 周日 08:00–23:00 (JST)",
    openForm: "在新窗口打开表单",
  },
  courses: {
    nav: "课程介绍",
    eyebrow: "課程 · COURSES",
    title: "课程说明及费用",
    subtitle: "从零基础发音到 JLPT 冲刺、再到职场敬语与商务实战，每一门课都为你量身设计。下方附上详细的费用说明。",
    back: "← 返回首页",
    sessionsLabel: "课程明细",
    items: [
      {
        title: "1. 五十音图入门发音特训课",
        spec: "10 节课 / 每节 2 小时 / 共 20 小时",
        summary: "不只是教认读，重点在于发音纠偏与单词记忆。",
        sections: [
          { heading: "第 1 课：日语初见与元音基础", bullets: ["日语构成（平假名、片假名、汉字）与罗马音", "五个元音（あいうえお）的嘴型与舌位纠正", "单词练习：あい（爱）、いえ（家）、うえ（上）"] },
          { heading: "第 2 课：清音第一弹（か・さ行）", bullets: ["送气音与不送气音的区别", "书写规则与记忆口诀", "单词积累：かお（脸）、きく（听）、さけ（酒）"] },
          { heading: "第 3 课：清音第二弹（た・な・は行）", bullets: ["注意「ち、つ、ふ」的特殊发音位", "手写练习：平假名与对应片假名", "场景单词：たかい（高）、にく（肉）、ふね（船）"] },
          { heading: "第 4 课：清音第三弹（ま・や・ら・わ行）", bullets: ["「ら」行弹舌音练习", "「わ、を、ん」的发音逻辑", "单词汇总：みみ、ゆき、さくら"] },
          { heading: "第 5 课：浊音与半浊音", bullets: ["清浊音的变化规律与振动练习", "区分相似音（如 じ/ぢ、ず/づ）", "单词巩固：だいぶ、がんばり"] },
          { heading: "第 6 课：拗音特训（复音结构）", bullets: ["大小字比例的书写规范", "きゅ、しゃ、ちょ等连读技巧", "趣味词汇练习"] },
          { heading: "第 7 课：长音与促音（节奏感训练）", bullets: ["长音的延长规则（あ/い/う段）", "促音（っ）的停顿节拍", "节奏跟读练习"] },
          { heading: "第 8 课：声调（Pitch Accent）入门", bullets: ["0 调、1 调、2 调的高低起伏逻辑", "「桥、筷子、边缘」常用词区分"] },
          { heading: "第 9 课：片假名专项强化", bullets: ["外来语转换规律", "常见生活类片假名背诵（カメラ、パン）"] },
          { heading: "第 10 课：综合演练与自我介绍", bullets: ["发音总复习", "撰写并朗读第一个日语自我介绍"] },
        ],
      },
      {
        title: "2. 敬语特训：打通职场任督二脉",
        summary: "核心：分清场合，学会「换位思考」。",
        sections: [
          { heading: "模块一：敬语三大类", bullets: ["尊他语（Sonkeigo）：提高对方", "自谦语（Kenjougo）：降低自己", "郑重语（Teineigo）：保持距离"] },
          { heading: "模块二：常用动词的敬语变形", bullets: ["特殊变形（如：行く → いらっしゃいます／伺います）", "接头词「お」与「ご」的使用范畴"] },
          { heading: "模块三：常见错误纠正", bullets: ["避免二重敬语", "如何礼貌地拒绝请求"] },
        ],
      },
      {
        title: "3. 商务日语课：全场景应对",
        summary: "核心：实操导向，拒绝「哑巴商务」。",
        sections: [
          { heading: "环节一：电话应对", bullets: ["接听：报上家门、确认意图、转接", "拨打：开场白、预约时间、留话叮嘱"] },
          { heading: "环节二：接待客户", bullets: ["前台接待：寒暄、带路", "会议座次：明确「上座」与「下座」", "交换名片：正确角度与力度"] },
          { heading: "环节三：商务邮件写作", bullets: ["格式标准：主旨、抬头、结语", "催款、道歉、邀请的模版化写作"] },
        ],
      },
      {
        title: "4. 初级口语课：生活不求人",
        summary: "核心：句型模版化，快速开口。",
        sections: [
          { heading: "五大场景", bullets: ["初次见面（兴趣爱好、职业描述）", "购物达人（询问规格、砍价、退换货）", "餐厅点餐（忌口描述、分单结账）", "问路与交通（换乘咨询、步行导航）", "突发状况（医院看病、东西丢失）"] },
        ],
      },
      {
        title: "5. JLPT 冲刺课（N1 / N2 / N3）",
        summary: "核心：套路解析，效率取胜。",
        sections: [
          { heading: "词汇 / 语法", bullets: ["高频考点分类（接续词、拟声拟态词）", "相似语法辨析（如：ことだ／ものだ／わけだ）"] },
          { heading: "阅读", bullets: ["长难句拆解", "快速定位关键词，掌握作者意图"] },
          { heading: "听力", bullets: ["信号词捕捉（可是、但是、结果是）", "题型演练（即时应答、概要理解）"] },
          { heading: "模拟测试", bullets: ["全真模拟，分析薄弱环节并针对性查漏补缺"] },
        ],
      },
    ],
    pricing: {
      eyebrow: "費用 · PRICING",
      title: "Wendy 老师课程费用指南",
      intro: "Wendy 老师准备了多样的上课方案，学生可以根据自己的学习目标挑选合适的安排。",
      currencyNote: "不同语言显示不同的货币，标注价格可能随汇率而变化，以美元为准。",
      groups: [
        {
          heading: "免费试听体验",
          description: "新学生可以预约一次半小时的试听课，感受老师的上课风格。",
          items: [{ label: "30 分钟试听课", price: "免费" }],
        },
        {
          heading: "一对一个人课程",
          description: "两小时的课程会包含 10 分钟的中间休息，让大脑得到放松。",
          items: [
            { label: "1 小时单次课", price: "USD 40" },
            { label: "2 小时单次课", price: "USD 70", note: "含 10 分钟中间休息" },
          ],
        },
        {
          heading: "零基础小班团课",
          description: "专为零基础新手准备的小班课，需满 3 人成班，互动氛围更轻松。",
          items: [{ label: "2 小时团课（3 人）", price: "USD 80", note: "三人总价" }],
        },
        {
          heading: "长期学习套餐",
          description: "适合希望长期跟课的学生，整体价格比单次购买更划算。",
          items: [{ label: "10 次课套餐", price: "USD 750" }],
        },
      ],
    },
  },
};

const en: Dict = {
  siteTitle: "Wendy Sensei's Japanese Classroom",
  backToTop: "Back to top",
  nav: { about: "About", features: "Method", path: "Roadmap", contact: "Contact", trial: "Free Trial", courses: "Courses" },
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
  booking: {
    nav: "Book a trial",
    eyebrow: "BOOKING · 予約",
    title: "Book a free trial lesson",
    subtitle: "Pick a date and time slot that works for you — I'll confirm shortly.",
    back: "← Back to home",
    name: "Name",
    email: "Email",
    contactLabel: "Contact (WeChat / LINE / WhatsApp)",
    contactPh: "Best handle to reach you",
    date: "Preferred date",
    time: "Preferred time slot",
    notes: "Notes (your level, your goals…)",
    notesPh: "Optional",
    submit: "Submit booking",
    success: "Booking received! I'll confirm shortly ✿",
    errorRequired: "Please fill in name, email, date and time slot",
    errorSubmit: "Booking could not be sent. Please try again later or contact me directly.",
    summaryTitle: "Your booking",
    timeHint: "Times are in Japan Standard Time (JST)",
    pickDateFirst: "Please pick a date first — available time slots appear based on the day.",
    dayUnavailable: "No available slots on this day. Available: Tue / Wed / Fri 17:30–23:00, Sat 15:00–23:00, Sun 08:00–23:00 (JST).",
    availability: "Availability: Tue / Wed / Fri 17:30–23:00 · Sat 15:00–23:00 · Sun 08:00–23:00 (JST)",
    openForm: "Open form in a new tab",
  },
  courses: {
    nav: "Courses",
    eyebrow: "COURSES · 課程",
    title: "Courses & Pricing",
    subtitle: "From the very first kana to JLPT prep, business Japanese and keigo for the workplace — each course is built around a real goal. Detailed pricing is shown below.",
    back: "← Back to home",
    sessionsLabel: "Course outline",
    items: [
      {
        title: "1. Gojūon Foundations & Pronunciation Bootcamp",
        spec: "10 lessons / 2 hours each / 20 hours total",
        summary: "Not just reading kana — the real focus is pronunciation correction and vocabulary memory.",
        sections: [
          { heading: "Lesson 1 — First contact and the five vowels", bullets: ["Hiragana, Katakana, Kanji and Romaji", "Mouth shape and tongue position for あいうえお", "Practice: あい, いえ, うえ"] },
          { heading: "Lesson 2 — Seion (か / さ rows)", bullets: ["Aspirated vs unaspirated sounds", "Writing rules and memory hooks", "Words: かお, きく, さけ"] },
          { heading: "Lesson 3 — Seion (た / な / は rows)", bullets: ["Special sounds ち, つ, ふ", "Hiragana ↔ Katakana handwriting", "Words: たかい, にく, ふね"] },
          { heading: "Lesson 4 — Seion (ま / や / ら / わ rows)", bullets: ["Tongue-tap practice for ら-row", "Logic of わ, を, ん", "Words: みみ, ゆき, さくら"] },
          { heading: "Lesson 5 — Dakuon and Handakuon", bullets: ["Voicing patterns and vibration drills", "Distinguishing じ/ぢ and ず/づ", "Words: だいぶ, がんばり"] },
          { heading: "Lesson 6 — Yōon (combined sounds)", bullets: ["Small-kana proportions when writing", "Linking きゅ, しゃ, ちょ smoothly", "Fun vocabulary"] },
          { heading: "Lesson 7 — Long vowels and sokuon (rhythm)", bullets: ["Lengthening rules for あ/い/う rows", "Timing the っ pause", "Rhythmic shadowing"] },
          { heading: "Lesson 8 — Pitch accent basics", bullets: ["Patterns 0, 1, 2 — high/low logic", "Telling 橋 / 箸 / 端 apart"] },
          { heading: "Lesson 9 — Katakana intensive", bullets: ["Loanword conversion rules", "Everyday katakana: カメラ, パン"] },
          { heading: "Lesson 10 — Review and self-introduction", bullets: ["Pronunciation review", "Write and read your first Japanese self-introduction"] },
        ],
      },
      {
        title: "2. Keigo Bootcamp — Master Workplace Politeness",
        summary: "The core idea: read the situation and shift perspective.",
        sections: [
          { heading: "Module 1 — Three families of keigo", bullets: ["Sonkeigo: elevate the other person", "Kenjougo: humble yourself", "Teineigo: maintain polite distance"] },
          { heading: "Module 2 — Verb transformations", bullets: ["Special forms (e.g. 行く → いらっしゃいます / 伺います)", "How to use the prefixes お and ご"] },
          { heading: "Module 3 — Common mistakes", bullets: ["Avoiding double keigo", "How to refuse requests politely"] },
        ],
      },
      {
        title: "3. Business Japanese — All-Scenario Toolkit",
        summary: "Practical first — no more being a silent observer in meetings.",
        sections: [
          { heading: "Phone calls", bullets: ["Receiving: introduce yourself, confirm intent, transfer", "Outbound: opening, scheduling, leaving messages"] },
          { heading: "Hosting clients", bullets: ["Reception: greetings and guiding guests", "Meeting seating: kamiza vs shimoza", "Exchanging business cards correctly"] },
          { heading: "Business email", bullets: ["Standard format: subject, greeting, sign-off", "Templates for chasing payment, apologising, inviting"] },
        ],
      },
      {
        title: "4. Beginner Speaking — Survive Daily Life",
        summary: "Sentence patterns you can reuse — speak from day one.",
        sections: [
          { heading: "Five real-life scenes", bullets: ["First meetings (hobbies, jobs)", "Shopping (sizes, bargaining, returns)", "Restaurants (allergies, splitting the bill)", "Directions and transit (transfers, walking)", "Emergencies (clinic visits, lost items)"] },
        ],
      },
      {
        title: "5. JLPT Prep (N1 / N2 / N3)",
        summary: "Pattern-driven study — efficiency wins exams.",
        sections: [
          { heading: "Vocabulary / Grammar", bullets: ["High-frequency point classification (connectives, mimetics)", "Distinguishing similar grammar (ことだ / ものだ / わけだ)"] },
          { heading: "Reading", bullets: ["Breaking down long sentences", "Locating keywords and intent quickly"] },
          { heading: "Listening", bullets: ["Catching signal words (しかし, でも, 結局)", "Question-type drills (immediate response, gist)"] },
          { heading: "Mock tests", bullets: ["Full-length mocks with targeted weakness analysis"] },
        ],
      },
    ],
    pricing: {
      eyebrow: "PRICING · 費用",
      title: "Wendy Sensei's Pricing Guide",
      intro: "I offer flexible lesson formats so each student can choose what fits their goals.",
      currencyNote: "Prices are listed in USD. Local currency display may vary with exchange rates — USD prices are authoritative.",
      groups: [
        {
          heading: "Free Trial",
          description: "New students can book a 30-minute trial to experience my teaching style.",
          items: [{ label: "30-minute trial lesson", price: "Free" }],
        },
        {
          heading: "One-on-One Private Lessons",
          description: "Two-hour lessons include a 10-minute mid-lesson break to keep your mind fresh.",
          items: [
            { label: "1-hour single lesson", price: "USD 40" },
            { label: "2-hour single lesson", price: "USD 70", note: "Includes 10-min break" },
          ],
        },
        {
          heading: "Beginner Small-Group Class",
          description: "A small group designed for absolute beginners — minimum 3 students to open the class.",
          items: [{ label: "2-hour group lesson (3 students)", price: "USD 80", note: "Total price for 3 people" }],
        },
        {
          heading: "Long-Term Package",
          description: "Best for students planning long-term study — better value than booking single lessons.",
          items: [{ label: "10-lesson package", price: "USD 750" }],
        },
      ],
    },
  },
};

const ja: Dict = {
  siteTitle: "Wendy先生の日本語教室",
  backToTop: "トップへ戻る",
  nav: { about: "講師紹介", features: "教え方", path: "学習プラン", contact: "お問い合わせ", trial: "無料体験", courses: "コース紹介" },
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
  booking: {
    nav: "体験予約",
    eyebrow: "予約 · BOOKING",
    title: "無料体験レッスンを予約する",
    subtitle: "ご希望の日時を選んで送信してください。確認次第ご連絡します。",
    back: "← トップへ戻る",
    name: "お名前",
    email: "メールアドレス",
    contactLabel: "ご連絡先（WeChat / LINE / WhatsApp）",
    contactPh: "連絡しやすいアカウント",
    date: "ご希望の日付",
    time: "ご希望の時間帯",
    notes: "備考（現在のレベル、目標など）",
    notesPh: "任意",
    submit: "予約を送信",
    success: "予約を受け付けました！まもなくご連絡します ✿",
    errorRequired: "お名前・メール・日付・時間帯をご入力ください",
    errorSubmit: "予約を送信できませんでした。後ほど再試行するか、直接ご連絡ください。",
    summaryTitle: "ご予約内容",
    timeHint: "時間はすべて日本時間 (JST) です",
    pickDateFirst: "まず日付を選択してください。曜日に応じて空き枠が表示されます。",
    dayUnavailable: "この日は予約可能な時間帯がありません。対応曜日：火・水・金 17:30–23:00 / 土 15:00–23:00 / 日 08:00–23:00 (JST)。",
    availability: "ご予約可能：火・水・金 17:30–23:00 · 土 15:00–23:00 · 日 08:00–23:00 (JST)",
    openForm: "新しいタブでフォームを開く",
  },
  courses: {
    nav: "コース紹介",
    eyebrow: "コース · COURSES",
    title: "コース紹介と料金",
    subtitle: "ゼロからの発音特訓、JLPT対策、敬語、ビジネス日本語まで、目的別に設計しています。下記に料金もまとめています。",
    back: "← トップへ戻る",
    sessionsLabel: "コース内容",
    items: [
      {
        title: "1. 五十音入門・発音特訓コース",
        spec: "10回 / 1回 2時間 / 計 20 時間",
        summary: "読み方だけでなく、発音矯正と語彙定着を重視します。",
        sections: [
          { heading: "第1回：日本語の概要と母音", bullets: ["ひらがな・カタカナ・漢字・ローマ字", "あいうえおの口形と舌位置", "単語：あい、いえ、うえ"] },
          { heading: "第2回：清音 (か・さ行)", bullets: ["有気音と無気音の違い", "書き方と記憶のコツ", "単語：かお、きく、さけ"] },
          { heading: "第3回：清音 (た・な・は行)", bullets: ["ち・つ・ふの特殊な発音", "ひらがなとカタカナの書き取り", "単語：たかい、にく、ふね"] },
          { heading: "第4回：清音 (ま・や・ら・わ行)", bullets: ["ら行の弾き音練習", "わ・を・んの使い分け", "単語：みみ、ゆき、さくら"] },
          { heading: "第5回：濁音と半濁音", bullets: ["清濁の規則と振動練習", "じ/ぢ、ず/づの聞き分け"] },
          { heading: "第6回：拗音特訓", bullets: ["小書き文字の比率", "きゅ・しゃ・ちょの連音"] },
          { heading: "第7回：長音と促音（リズム）", bullets: ["あ／い／う段の長音規則", "「っ」の停止のタイミング"] },
          { heading: "第8回：アクセント入門", bullets: ["0型・1型・2型の抑揚", "橋／箸／端の聞き分け"] },
          { heading: "第9回：カタカナ強化", bullets: ["外来語変換のパターン", "カメラ、パンなど日常語"] },
          { heading: "第10回：総合演習と自己紹介", bullets: ["発音総復習", "初めての自己紹介を作って読む"] },
        ],
      },
      {
        title: "2. 敬語特訓：職場で通用する話し方",
        summary: "場面に応じた使い分けと相手目線の表現。",
        sections: [
          { heading: "1. 三種の敬語", bullets: ["尊敬語（相手を高める）", "謙譲語（自分を低める）", "丁寧語（適切な距離）"] },
          { heading: "2. 動詞の敬語変形", bullets: ["特殊形（行く→いらっしゃいます／伺います）", "「お」「ご」の使い分け"] },
          { heading: "3. よくある誤りと修正", bullets: ["二重敬語を避ける", "丁寧に断る言い回し"] },
        ],
      },
      {
        title: "3. ビジネス日本語：実務で使える総合コース",
        summary: "実践重視。「黙ってしまう」を卒業。",
        sections: [
          { heading: "電話対応", bullets: ["受電：名乗り・確認・取次", "発信：挨拶・予約・伝言"] },
          { heading: "来客対応", bullets: ["受付・案内", "上座と下座", "名刺交換"] },
          { heading: "ビジネスメール", bullets: ["件名・宛名・結びの定型", "督促・お詫び・招待のテンプレート"] },
        ],
      },
      {
        title: "4. 初級会話：生活で困らない日本語",
        summary: "型を覚えて、すぐ口に出せる。",
        sections: [
          { heading: "5つの場面", bullets: ["初対面（趣味・職業）", "買い物（サイズ・値切り・返品）", "レストラン（アレルギー・割り勘）", "道案内・乗換", "トラブル（病院・紛失）"] },
        ],
      },
      {
        title: "5. JLPT 対策（N1 / N2 / N3）",
        summary: "出題傾向の解析で効率よく合格へ。",
        sections: [
          { heading: "語彙・文法", bullets: ["頻出ポイントの分類", "ことだ／ものだ／わけだの区別"] },
          { heading: "読解", bullets: ["長文の構造把握", "キーワードと筆者の意図"] },
          { heading: "聴解", bullets: ["シグナル語の聞き取り（しかし・でも・結局）", "即時応答・概要理解の演習"] },
          { heading: "模試", bullets: ["本番形式で弱点分析"] },
        ],
      },
    ],
    pricing: {
      eyebrow: "料金 · PRICING",
      title: "Wendy先生のレッスン料金ガイド",
      intro: "目的に合わせて選べる、複数のレッスンプランをご用意しています。",
      currencyNote: "表示通貨は言語によって異なる場合があり、為替により変動することがあります。料金は USD を基準とします。",
      groups: [
        {
          heading: "無料体験レッスン",
          description: "新規の方は 30 分の体験レッスンを 1 回ご予約いただけます。",
          items: [{ label: "30 分体験レッスン", price: "無料" }],
        },
        {
          heading: "マンツーマン個人レッスン",
          description: "2 時間レッスンには 10 分の休憩を含み、集中力を保ちます。",
          items: [
            { label: "1 時間レッスン", price: "USD 40" },
            { label: "2 時間レッスン", price: "USD 70", note: "10 分休憩あり" },
          ],
        },
        {
          heading: "ゼロから始めるグループレッスン",
          description: "初心者向けの少人数クラス。3 名から開講します。",
          items: [{ label: "2 時間グループレッスン（3 名）", price: "USD 80", note: "3 名分の合計" }],
        },
        {
          heading: "長期学習パッケージ",
          description: "長く学びたい方向け。単発購入よりお得です。",
          items: [{ label: "10 回パッケージ", price: "USD 750" }],
        },
      ],
    },
  },
};

const fr: Dict = {
  siteTitle: "Cours de japonais avec Wendy Sensei",
  backToTop: "Retour en haut",
  nav: { about: "Le professeur", features: "Méthode", path: "Parcours", contact: "Contact", trial: "Cours d'essai", courses: "Cours" },
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
  booking: {
    nav: "Réserver",
    eyebrow: "RÉSERVATION · 予約",
    title: "Réserver un cours d'essai gratuit",
    subtitle: "Choisissez la date et le créneau qui vous conviennent — je confirme rapidement.",
    back: "← Retour à l'accueil",
    name: "Nom",
    email: "Email",
    contactLabel: "Contact (WeChat / LINE / WhatsApp)",
    contactPh: "Le meilleur moyen de vous joindre",
    date: "Date souhaitée",
    time: "Créneau horaire souhaité",
    notes: "Notes (niveau actuel, objectifs…)",
    notesPh: "Facultatif",
    submit: "Envoyer la réservation",
    success: "Réservation reçue ! Je confirme rapidement ✿",
    errorRequired: "Veuillez renseigner nom, email, date et créneau",
    errorSubmit: "La réservation n'a pas pu être envoyée. Réessayez plus tard ou contactez-moi directement.",
    summaryTitle: "Votre réservation",
    timeHint: "Heures données en heure du Japon (JST)",
    pickDateFirst: "Choisissez d'abord une date — les créneaux disponibles s'affichent selon le jour.",
    dayUnavailable: "Aucun créneau disponible ce jour-là. Disponibilités : mar / mer / ven 17h30–23h, sam 15h–23h, dim 8h–23h (JST).",
    availability: "Disponibilités : mar / mer / ven 17h30–23h · sam 15h–23h · dim 8h–23h (JST)",
    openForm: "Ouvrir le formulaire dans un nouvel onglet",
  },
  courses: {
    nav: "Cours",
    eyebrow: "COURS · COURSES",
    title: "Cours et tarifs",
    subtitle: "Des kana à la préparation au JLPT, du keigo au japonais des affaires — chaque cours répond à un vrai objectif. Les tarifs détaillés figurent ci-dessous.",
    back: "← Retour à l'accueil",
    sessionsLabel: "Programme du cours",
    items: [
      {
        title: "1. Gojūon — initiation et phonétique intensive",
        spec: "10 séances / 2 h chacune / 20 h au total",
        summary: "Au-delà de la lecture des kana : correction de la prononciation et mémorisation du vocabulaire.",
        sections: [
          { heading: "Séance 1 — Premiers contacts et voyelles", bullets: ["Hiragana, Katakana, Kanji et Romaji", "Forme de la bouche pour あいうえお", "Mots : あい, いえ, うえ"] },
          { heading: "Séance 2 — Seion (か / さ)", bullets: ["Aspirées vs non aspirées", "Règles d'écriture et astuces", "Mots : かお, きく, さけ"] },
          { heading: "Séance 3 — Seion (た / な / は)", bullets: ["Sons spéciaux ち, つ, ふ", "Écriture hiragana ↔ katakana", "Mots : たかい, にく, ふね"] },
          { heading: "Séance 4 — Seion (ま / や / ら / わ)", bullets: ["Roulé du ら-row", "Logique de わ, を, ん", "Mots : みみ, ゆき, さくら"] },
          { heading: "Séance 5 — Dakuon et Handakuon", bullets: ["Sonorisation et vibrations", "Distinguer じ/ぢ et ず/づ"] },
          { heading: "Séance 6 — Yōon (sons combinés)", bullets: ["Proportion des petits caractères", "Lier きゅ, しゃ, ちょ"] },
          { heading: "Séance 7 — Voyelles longues et sokuon", bullets: ["Règles d'allongement", "Tempo de la pause っ"] },
          { heading: "Séance 8 — Accent de hauteur", bullets: ["Schémas 0, 1, 2", "Distinguer 橋 / 箸 / 端"] },
          { heading: "Séance 9 — Katakana intensif", bullets: ["Transposition des emprunts", "Mots du quotidien : カメラ, パン"] },
          { heading: "Séance 10 — Bilan et présentation", bullets: ["Révision phonétique", "Rédiger et lire votre première présentation"] },
        ],
      },
      {
        title: "2. Keigo intensif — la politesse au travail",
        summary: "L'idée clé : lire la situation et changer de point de vue.",
        sections: [
          { heading: "Trois familles de keigo", bullets: ["Sonkeigo : élever l'autre", "Kenjougo : se rabaisser", "Teineigo : maintenir la distance"] },
          { heading: "Transformations verbales", bullets: ["Formes spéciales (行く → いらっしゃいます / 伺います)", "Préfixes お et ご"] },
          { heading: "Erreurs fréquentes", bullets: ["Éviter le double keigo", "Refuser poliment"] },
        ],
      },
      {
        title: "3. Japonais des affaires — boîte à outils",
        summary: "Approche pratique : finis les blocages en réunion.",
        sections: [
          { heading: "Au téléphone", bullets: ["Réception : se présenter, confirmer, transférer", "Émission : ouverture, prise de RDV, message"] },
          { heading: "Recevoir un client", bullets: ["Accueil et accompagnement", "Place d'honneur (kamiza / shimoza)", "Échange de cartes de visite"] },
          { heading: "E-mails professionnels", bullets: ["Format standard : objet, salutation, formule", "Modèles : relance, excuse, invitation"] },
        ],
      },
      {
        title: "4. Conversation débutant — la vie quotidienne",
        summary: "Des structures réutilisables pour parler dès le premier jour.",
        sections: [
          { heading: "Cinq scènes du quotidien", bullets: ["Première rencontre (loisirs, métier)", "Shopping (taille, marchander, retours)", "Restaurant (allergies, addition partagée)", "Direction et transports", "Urgences (clinique, objet perdu)"] },
        ],
      },
      {
        title: "5. Préparation au JLPT (N1 / N2 / N3)",
        summary: "Travail par schémas — l'efficacité prime.",
        sections: [
          { heading: "Vocabulaire / Grammaire", bullets: ["Classification des points fréquents", "Distinguer ことだ / ものだ / わけだ"] },
          { heading: "Compréhension écrite", bullets: ["Décomposer les longues phrases", "Repérer mots-clés et intention"] },
          { heading: "Compréhension orale", bullets: ["Mots signaux (しかし, でも, 結局)", "Entraînement par type de question"] },
          { heading: "Examens blancs", bullets: ["Simulation complète avec analyse des points faibles"] },
        ],
      },
    ],
    pricing: {
      eyebrow: "TARIFS · PRICING",
      title: "Guide des tarifs des cours de Wendy",
      intro: "Plusieurs formats de cours sont proposés afin que chaque élève trouve la formule adaptée à ses objectifs.",
      currencyNote: "Les prix peuvent s'afficher dans différentes devises selon la langue et varier selon le taux de change. Les prix de référence sont en USD.",
      groups: [
        {
          heading: "Cours d'essai gratuit",
          description: "Les nouveaux élèves peuvent réserver un cours d'essai de 30 minutes pour découvrir ma méthode.",
          items: [{ label: "Cours d'essai de 30 min", price: "Gratuit" }],
        },
        {
          heading: "Cours particuliers individuels",
          description: "Les cours de 2 h incluent une pause de 10 min pour rester concentré.",
          items: [
            { label: "Cours unique de 1 h", price: "USD 40" },
            { label: "Cours unique de 2 h", price: "USD 70", note: "Pause de 10 min incluse" },
          ],
        },
        {
          heading: "Petit groupe débutant",
          description: "Petite classe pensée pour les grands débutants. Ouverture à partir de 3 élèves.",
          items: [{ label: "Cours en groupe de 2 h (3 élèves)", price: "USD 80", note: "Prix total pour 3 personnes" }],
        },
        {
          heading: "Pack longue durée",
          description: "Idéal pour un suivi régulier — meilleur rapport qualité-prix qu'à l'unité.",
          items: [{ label: "Pack de 10 cours", price: "USD 750" }],
        },
      ],
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

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-TW" : lang;
    document.title = dictionaries[lang].siteTitle;
  }, [lang]);

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
  };

  return <Ctx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
};

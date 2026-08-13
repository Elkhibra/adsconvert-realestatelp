/* ==================================================================
   AdsConvert.ma — Landing Page (Motion & Branding update)

   NEW IN THIS VERSION
   • LOGO: generated brand mark (red A + silver C) replaces the "AC"
     text box in navbar & footer, paired with a styled wordmark
     (Ads=red / Convert=ink / .ma=red) matching the brand lockup.
   • SCROLL PROGRESS BAR: 3px brand-red bar under the nav (RTL-aware).
   • PARALLAX: hero depth layers (blurred brand blobs + content drift
     + fade) and a slow-drifting "SCALE MORE" watermark in the dark
     final CTA — transform-only, 60fps, disabled for reduced-motion.
   • SMOOTH REVEALS: staggered fade/slide entrances for headings,
     cards, steps & form columns (once, GPU-friendly).
   • MICRO-INTERACTIONS: buttons press-scale, animated mobile menu &
     sticky mobile CTA slide-in/out (AnimatePresence).
   • Keeps: IBM Plex Sans Arabic (AR) + Inter (FR) professional fonts,
     full CRO layer (trust rows, kickers, sticky CTA, short form).
   • CRM SYNC: Live wiring via BroadcastChannel, localStorage queue, 
     and fetch endpoint based on CRM schema.
   ================================================================== */

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ---------- Brand assets ---------- */
const LOGO_URL =
  "https://image.qwenlm.ai/public_source/2eb50763-2273-43a8-adb2-fd0a962096a5/1658336e1-640f-4c8d-a482-3a605cb98209.png";

const EASE = [0.22, 1, 0.36, 1];

/* ---------- Inline SVG icons ---------- */
const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);
const XIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChevronRightIcon = ({ className = "w-5 h-5", flip = false }) => (
  <svg
    className={className}
    style={flip ? { transform: "scaleX(-1)" } : undefined}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ---------- Motion helpers ---------- */
const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const heroItem = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
});

/* ---------- Logo lockup ---------- */
const Wordmark = ({ size = "text-lg" }) => (
  <span className={`font-extrabold ${size} leading-none tracking-tight`}>
    <span className="text-[#FD1843]">Ads</span>
    <span className="text-[#0D0D0F]">Convert</span>
    <span className="text-[#FD1843]">.ma</span>
  </span>
);

const Kicker = ({ text }) => (
  <span className="inline-flex items-center gap-2 text-[#FD1843] font-bold text-sm mb-3">
    <span className="w-6 h-0.5 bg-[#FD1843] inline-block rounded-full" />
    {text}
  </span>
);

/* ---------- Translations ---------- */
const translations = {
  ar: {
    nav: { logo: "AdsConvert.ma", startNow: "ابدأ الآن" },
    hero: {
      subtitle: "Media Buying للقطاع العقاري",
      mainHeadline1: "نحوّل ميزانيتك الإعلانية إلى زيارات حقيقية",
      mainHeadline2: "لمشروعك العقاري",
      description:
        "من خلال استراتيجيات إعلانية مدروسة وحملات موجهة لتحقيق أهداف حقيقية. أساعد المطورين العقاريين والوكالات على جذب المشترين الجادين، بدل إنفاق الميزانية على استفسارات غير مؤهلة.",
      ctaConsultation: "ابدأ استشارة مجانية",
      ctaLearnMore: "تعرف على المزيد",
    },
    solution: {
      description:
        "لا يوجد مشروعان عقاريان متشابهان. لكل مشروع موقعه، جمهوره، سعره، مميزاته، ومراحل مختلفة في رحلة البيع. لهذا، لا نعتمد على استراتيجية واحدة تناسب الجميع.",
      approach:
        "بدلاً من ذلك، نخصص استراتيجية Media Buying لكل مشروع عقاري. نبدأ بفهم عميق لمشروعك وأهدافك، ثم نطلق حملات مدروسة موجهة للجمهور المناسب والرسالة الصحيحة في الوقت المناسب.",
    },
    services: {
      title: "ماذا يمكننا أن نقدم لك؟",
      items: [
        {
          num: "01",
          title: "تحليل شامل",
          desc: "نحلل مشروعك والسوق والمنافسين لفهم الفرص والتحديات",
        },
        {
          num: "02",
          title: "استراتيجية مخصصة",
          desc: "نطور استراتيجية Media Buying موجهة لتحقيق أهداف مشروعك المحددة",
        },
        {
          num: "03",
          title: "جلب عملاء مؤهلين",
          desc: "جلب عملاء محتملين مؤهلين يمكن لفريق المبيعات لديك التواصل معهم وتحويلهم إلى صفقات حقيقية.",
        },
        {
          num: "04",
          title: "الإعلانات الموجهة",
          desc: "نستخدم Meta Ads لاستهداف الجمهور المناسب بالرسائل المخصصة التي تحرك الإجراء",
        },
        {
          num: "05",
          title: "التحسين المستمر",
          desc: "نراقب الأداء وننسق الحملات باستمرار للحصول على أفضل النتائج",
        },
        {
          num: "06",
          title: "التقارير الشاملة",
          desc: "نقدم تقارير واضحة تظهر بالضبط ما تحصل عليه مقابل ميزانيتك",
        },
      ],
    },
    audiences: {
      title: "هذه الخدمة مناسبة لك إذا كنت:",
      items: [
        {
          title: "مطور عقاري",
          desc: "تريد جلب مشترين مؤهلين وتقليل التكلفة لكل عملية بيع",
        },
        {
          title: "وكالة عقارات",
          desc: "تريد زيادة العملاء المحتملين والحفاظ على ميزانية إعلانية فعّالة",
        },
        {
          title: "صاحب مشروع",
          desc: "تريد التأكد من أن ميزانيتك الإعلانية تصل للمشترين الجادين",
        },
      ],
    },
    process: {
      title: "كيف نعمل؟",
      steps: [
        {
          num: "01",
          title: "نبدأ بفهم مشروعك",
          desc: "نتعرف على مشروعك، الوحدات المتوفرة، الأسعار، الموقع والأهداف المطلوب تحقيقها",
        },
        {
          num: "02",
          title: "نطور الاستراتيجية",
          desc: "نحدد الجمهور المستهدف، الرسالة الرئيسية، وقنوات Meta Ads المناسبة",
        },
        {
          num: "03",
          title: "نصمم الإعلانات",
          desc: "نصنع إعلانات احترافية مصورة وفيديوهات جاذبة تعكس هوية مشروعك",
        },
        {
          num: "04",
          title: "نطلق الحملات",
          desc: "نبدأ بإطلاق الحملات الإعلانية واختبار الجماهير والرسائل والإعلانات المختلفة",
        },
        {
          num: "05",
          title: "نراقب الأداء",
          desc: "نراقب الحملات يومياً ونقيس المؤشرات الهامة (CTR, CPC, ROI)",
        },
        {
          num: "06",
          title: "نحسّن النتائج",
          desc: "نحسّن الحملات بناءً على البيانات لزيادة العملاء المؤهلين وخفض التكاليف",
        },
      ],
    },
    form: { buttonSubmit: "ارسل الآن" },
    finalCTA: {
      title: "هل أنت مستعد لجعل ميزانيتك الإعلانية تعمل بذكاء؟",
      description:
        "ابدأ استشارتك المجانية واكتشف كيف يمكننا مساعدتك في جذب المشترين الجادين.",
      buttonText: "ابدأ استشارتك المجانية الآن",
    },
    problem: {
      title: "المشكلة ليست دائماً في مشروعك...",
      subtitle: "ربما المشكلة في الطريقة التي يتم بها تسويقه",
      issues: [
        "هل تستثمر في الإعلانات ولا تحصل على النتائج المتوقعة؟",
        "هل تحصل على استفسارات من أشخاص غير جادين؟",
        "هل تتلقى استفسارات لكن القليل يتحول إلى فرص حقيقية؟",
        "هل الميزانية تُنفق دون معرفة واضحة بالنتائج؟",
      ],
      intro: "في كثير من الأحيان، المشكلة ليست في العقار نفسه. بل في:",
      problems: [
        "استهداف الجمهور الخطأ",
        "رسالة إعلانية غير واضحة",
        "عرض لا يبرز القيمة الحقيقية",
        "إعلانات لا تجذب الانتباه",
        "حملة لا يتم تحليلها وتحسينها",
      ],
    },
    mediaBuying: {
      title: "Media Buying مصمم للقطاع العقاري",
      subtitle: "استراتيجية إعلانية تبدأ من فهم مشروعك",
      beforeLaunch: "قبل إطلاق أي حملة، نعمل على فهم:",
      understandingItems: [
        "طبيعة المشروع العقاري",
        "الموقع والمنطقة المستهدفة",
        "نوع الوحدات المتوفرة",
        "الأسعار والفئات المستهدفة",
        "نقاط القوة التي تميز المشروع",
        "الجمهور الأكثر احتمالاً للاهتمام",
        "المنافسة والعروض الموجودة",
        "أهداف البيع المطلوبة",
      ],
    },
    whyDifferent: {
      title: "لماذا يحتاج التسويق العقاري إلى استراتيجية مختلفة؟",
      subtitle: "لأن قرار شراء العقار ليس قراراً سريعاً.",
      customerNeeds:
        "العميل الذي يبحث عن شقة أو فيلا أو عقار استثماري يحتاج إلى:",
      needs: [
        "الثقة",
        "المعلومات",
        "عرض واضح",
        "قيمة مقنعة",
        "تجربة تواصل مناسبة",
      ],
      successMessage:
        "الإعلان العقاري الناجح لا يركز فقط على الحصول على Lead. بل يبدأ من فهم رحلة العميل: يرى الإعلان → يكتشف المشروع → يهتم بالعرض → يطلب المزيد من المعلومات → يتواصل مع فريق المبيعات.",
    },
    challenge: {
      title: "هل تحصل على عملاء محتملين ولكن ليس بالعملاء الذين تبحث عنهم؟",
      intro: "قد لا تكون المشكلة في حجم ميزانيتك. قد تكون في:",
      issues: [
        "الاستهداف",
        "العرض",
        "الإبداع الإعلاني",
        "الرسالة التسويقية",
        "طريقة جمع العملاء",
        "الاستراتيجية بالكامل",
      ],
      warning:
        "قبل أن تزيد ميزانية الإعلانات... تأكد أولاً من أن استراتيجيتك تعمل في الاتجاه الصحيح.",
    },
    footer: {
      services: "الخدمات",
      contact: "اتصل بنا",
      rights: "جميع الحقوق محفوظة",
      tagline: "استراتيجيات إعلانية ذكية للقطاع العقاري",
      servicesList: [
        "الاستراتيجية والتخطيط",
        "حملات Meta",
        "توليد العملاء",
        "تحسين الأداء",
      ],
      companyTitle: "الشركة",
      companyList: ["عن", "المدونة", "سياسة الخصوصية", "شروط الاستخدام"],
      emailLabel: "البريد الإلكتروني:",
      siteLabel: "الموقع:",
      processLink: "كيف نعمل",
    },
  },
  fr: {
    nav: { logo: "AdsConvert.ma", startNow: "Commencer" },
    hero: {
      subtitle: "Media Buying pour l'immobilier",
      mainHeadline1:
        "Transformez votre budget publicitaire en véritables visites",
      mainHeadline2: "pour votre projet immobilier",
      description:
        "Grâce à des stratégies publicitaires réfléchies et des campagnes ciblées pour atteindre des objectifs réels. J'aide les promoteurs immobiliers et les agences à attirer les vrais acheteurs, plutôt que de gaspiller le budget sur des demandes non qualifiées.",
      ctaConsultation: "Commencer une consultation gratuite",
      ctaLearnMore: "En savoir plus",
    },
    solution: {
      description:
        "Il n'existe pas deux projets immobiliers identiques. Chaque projet a son emplacement, son audience, son prix, ses caractéristiques et des étapes différentes dans le parcours de vente. C'est pourquoi nous n'utilisons pas une stratégie unique pour tous.",
      approach:
        "Au lieu de cela, nous personnalisons la stratégie Media Buying pour chaque projet immobilier. Nous commençons par une compréhension approfondie de votre projet et de vos objectifs, puis nous lançons des campagnes réfléchies ciblées au bon public avec le bon message au bon moment.",
    },
    services: {
      title: "Que pouvons-nous vous offrir?",
      items: [
        {
          num: "01",
          title: "Analyse complète",
          desc: "Nous analysons votre projet, le marché et les concurrents pour identifier les opportunités et les défis",
        },
        {
          num: "02",
          title: "Stratégie personnalisée",
          desc: "Nous développons une stratégie Media Buying ciblée pour atteindre les objectifs spécifiques de votre projet",
        },
        {
          num: "03",
          title: "Génération de prospects qualifiés",
          desc: "Attirer des prospects qualifiés que votre équipe de vente peut contacter et convertir en véritables transactions.",
        },
        {
          num: "04",
          title: "Publicités ciblées",
          desc: "Nous utilisons Meta Ads pour cibler le bon public avec des messages personnalisés qui stimulent l'action",
        },
        {
          num: "05",
          title: "Optimisation continue",
          desc: "Nous surveillons les performances et optimisons les campagnes en permanence pour obtenir les meilleurs résultats",
        },
        {
          num: "06",
          title: "Rapports complets",
          desc: "Nous fournissons des rapports clairs qui montrent exactement ce que vous obtenez pour votre budget",
        },
      ],
    },
    audiences: {
      title: "Ce service est fait pour vous si vous êtes:",
      items: [
        {
          title: "Promoteur immobilier",
          desc: "Vous voulez attirer des acheteurs qualifiés et réduire le coût par vente",
        },
        {
          title: "Agence immobilière",
          desc: "Vous voulez augmenter les prospects tout en maintenant un budget publicitaire efficace",
        },
        {
          title: "Propriétaire de projet",
          desc: "Vous voulez vous assurer que votre budget publicitaire atteint les vrais acheteurs",
        },
      ],
    },
    process: {
      title: "Comment travaillons-nous?",
      steps: [
        {
          num: "01",
          title: "Nous commençons par comprendre votre projet",
          desc: "Nous en apprenons davantage sur votre projet, les unités disponibles, les prix, l'emplacement et les objectifs",
        },
        {
          num: "02",
          title: "Nous développons la stratégie",
          desc: "Nous identifions le public cible, le message clé et les canaux Meta Ads appropriés",
        },
        {
          num: "03",
          title: "Nous créons les publicités",
          desc: "Nous créons des publicités professionnelles avec images et vidéos attrayantes qui reflètent votre projet",
        },
        {
          num: "04",
          title: "Nous lançons les campagnes",
          desc: "Nous commençons à lancer les campagnes publicitaires et testons les audiences, les messages et les publicités différents",
        },
        {
          num: "05",
          title: "Nous surveillons les performances",
          desc: "Nous surveillons les campagnes quotidiennement et mesurons les indicateurs clés (CTR, CPC, ROI)",
        },
        {
          num: "06",
          title: "Nous optimisons les résultats",
          desc: "Nous améliorons les campagnes en fonction des données pour augmenter les prospects qualifiés et réduire les coûts",
        },
      ],
    },
    form: { buttonSubmit: "Envoyer" },
    finalCTA: {
      title:
        "Êtes-vous prêt à faire travailler votre budget publicitaire intelligemment?",
      description:
        "Commencez votre consultation gratuite et découvrez comment nous pouvons vous aider à attirer les vrais acheteurs.",
      buttonText: "Commencer votre consultation gratuite maintenant",
    },
    problem: {
      title: "Le problème n'est pas toujours votre projet...",
      subtitle: "C'est peut-être la façon dont il est commercialisé",
      issues: [
        "Vous investissez dans la publicité mais n'obtenez pas les résultats escomptés?",
        "Vous recevez des demandes de personnes qui ne sont pas sérieuses?",
        "Vous obtenez des demandes mais peu se convertissent en opportunités réelles?",
        "Le budget est dépensé sans comprendre clairement les résultats?",
      ],
      intro:
        "Souvent, le problème n'est pas dans la propriété elle-même. C'est peut-être dans:",
      problems: [
        "Ciblage du mauvais public",
        "Message publicitaire peu clair",
        "Offre qui ne met pas en avant la vraie valeur",
        "Publicités qui n'attirent pas l'attention",
        "Campagne non analysée ni optimisée",
      ],
    },
    mediaBuying: {
      title: "Media Buying conçu pour l'immobilier",
      subtitle:
        "Une stratégie publicitaire qui commence par comprendre votre projet",
      beforeLaunch:
        "Avant de lancer une campagne, nous travaillons pour comprendre:",
      understandingItems: [
        "La nature du projet immobilier",
        "L'emplacement et la zone cible",
        "Le type d'unités disponibles",
        "Les prix et les segments ciblés",
        "Les points forts qui distinguent le projet",
        "Le public le plus susceptible d'être intéressé",
        "La concurrence et les offres existantes",
        "Les objectifs de vente requis",
      ],
    },
    whyDifferent: {
      title:
        "Pourquoi le marketing immobilier nécessite une stratégie différente?",
      subtitle:
        "Parce que la décision d'achat immobilier n'est pas une décision rapide.",
      customerNeeds:
        "Le client qui cherche un appartement, une villa ou un investissement immobilier a besoin de:",
      needs: [
        "Confiance",
        "Information",
        "Offre claire",
        "Valeur convaincante",
        "Expérience de communication appropriée",
      ],
      successMessage:
        "La publicité immobilière réussie ne se concentre pas seulement sur l'obtention de prospects. Elle commence par comprendre le parcours client: voit la publicité → découvre le projet → s'intéresse à l'offre → demande plus d'informations → contacte l'équipe de vente.",
    },
    challenge: {
      title: "Vous obtenez des prospects mais pas les bons?",
      intro:
        "Le problème ne vient peut-être pas de votre budget. Il peut venir de:",
      issues: [
        "Ciblage",
        "Offre",
        "Créativité publicitaire",
        "Message marketing",
        "Méthode de collecte de prospects",
        "Stratégie complète",
      ],
      warning:
        "Avant d'augmenter votre budget publicitaire... assurez-vous d'abord que votre stratégie fonctionne dans la bonne direction.",
    },
    footer: {
      services: "Services",
      contact: "Contactez-nous",
      rights: "Tous droits réservés",
      tagline: "Stratégies publicitaires intelligentes pour l'immobilier",
      servicesList: [
        "Stratégie et planification",
        "Campagnes Meta",
        "Génération de prospects",
        "Optimisation des performances",
      ],
      companyTitle: "Entreprise",
      companyList: [
        "À propos",
        "Blog",
        "Politique de confidentialité",
        "Conditions d'utilisation",
      ],
      emailLabel: "Email:",
      siteLabel: "Site:",
      processLink: "Comment nous travaillons",
    },
  },
};

/* ---------- Form copy ---------- */
const formCopy = {
  ar: {
    title: "(استشارة مجانية) لنتحدث عن مشروعك العقاري",
    desc: "أخبرني ببعض التفاصيل عن مشروعك، وسأراجعها ثم أتواصل معك لمناقشة ما إذا كانت استراتيجية Media Buying مناسبة لأهدافك.",
    choose: "اختر...",
    labelRole: "1 - ما هي صفتك؟",
    labelPropertyType: "2 - نوع العقار",
    labelAdvertising: "3 - هل سبق تشغيل إعلانات؟",
    labelGoal: "4 - ما هو هدفك الرئيسي؟",
    roles: ["مطور عقاري", "وكالة عقارية", "صاحب مشروع أو مستثمر عقاري"],
    types: ["شقق", "فلل", "مشروع إقامة سكنية", "أراض", "عقارات أخرى"],
    otherType: "عقارات أخرى",
    otherTypePlaceholder: "يرجى تحديد نوع العقار",
    ads: ["نعم", "لا", "جربنا ولم نحصل على النتائج"],
    goals: [
      "عملاء محتملين جدد",
      "زيادة الوعي بالمشروع",
      "بيع الوحدات المتبقية",
      "إطلاق مشروع جديد",
      "شي آخر",
    ],
    otherGoal: "شي آخر",
    otherGoalPlaceholder: "يرجى تحديد هدفك",
    placeholderName: "الاسم الكامل",
    placeholderPhone: "رقم الهاتف / WhatsApp",
    placeholderEmail: "البريد الإلكتروني",
    note: "بعد إرسال طلبك، سنراجع المعلومات ونتواصل معك لفهم مشروعك بشكل أفضل",
    nextTitle: "ماذا يحدث بعد الإرسال؟",
    nextSteps: [
      "نراجع معلومات مشروعك",
      "نتواصل معك لفهم أهدافك بشكل أفضل",
      "نناقش معاً الاستراتيجية المناسبة",
    ],
    privacy: "معلوماتك سرية ولن تتم مشاركتها مع أي طرف ثالث.",
    successTitle: "شكراً! تم إرسال طلبك بنجاح",
    successDesc: "سنراجع المعلومات ونتواصل معك قريباً لفهم مشروعك بشكل أفضل.",
    reset: "إرسال طلب آخر",
  },
  fr: {
    title: "(Consultation gratuite) Parlons de votre projet immobilier",
    desc: "Donnez-moi quelques détails sur votre projet. Je les examinerai puis je vous contacterai pour discuter si une stratégie Media Buying convient à vos objectifs.",
    choose: "Choisir...",
    labelRole: "1 - Quel est votre rôle?",
    labelPropertyType: "2 - Type de propriété",
    labelAdvertising: "3 - Avez-vous déjà lancé des publicités?",
    labelGoal: "4 - Quel est votre objectif principal?",
    roles: [
      "Promoteur immobilier",
      "Agence immobilière",
      "Propriétaire de projet ou investisseur",
    ],
    types: [
      "Appartements",
      "Villas",
      "Résidence résidentielle",
      "Terrains",
      "Autre",
    ],
    otherType: "Autre",
    otherTypePlaceholder: "Veuillez préciser le type de propriété",
    ads: ["Oui", "Non", "Nous avons essayé sans résultats"],
    goals: [
      "Nouveaux prospects",
      "Notoriété du projet",
      "Vendre les unités restantes",
      "Lancer un nouveau projet",
      "Autre",
    ],
    otherGoal: "Autre",
    otherGoalPlaceholder: "Veuillez préciser votre objectif",
    placeholderName: "Nom complet",
    placeholderPhone: "Téléphone / WhatsApp",
    placeholderEmail: "Adresse e-mail",
    note: "Après l'envoi de votre demande, nous examinerons les informations et vous contacterons pour mieux comprendre votre projet.",
    nextTitle: "Que se passe-t-il après l'envoi?",
    nextSteps: [
      "Nous examinons les informations de votre projet",
      "Nous vous contactons pour mieux comprendre vos objectifs",
      "Nous discutons ensemble de la stratégie adaptée",
    ],
    privacy:
      "Vos informations sont confidentielles et ne seront jamais partagées.",
    successTitle: "Merci! Votre demande a été envoyée",
    successDesc:
      "Nous examinerons les informations et vous contacterons bientôt pour mieux comprendre votre projet.",
    reset: "Envoyer une autre demande",
  },
};

const trustItems = {
  ar: ["استشارة مجانية 100%", "بدون أي التزام", "خطة مخصصة لمشروعك"],
  fr: [
    "Consultation 100% gratuite",
    "Sans engagement",
    "Plan adapté à votre projet",
  ],
};
const kickers = {
  ar: {
    problem: "المشكلة",
    approach: "منهجيتنا",
    services: "خدماتنا",
    why: "لماذا نحن",
    audiences: "لمن هذه الخدمة",
    process: "خطوات العمل",
    challenge: "التحدي",
    form: "استشارة مجانية",
  },
  fr: {
    problem: "Le problème",
    approach: "Notre approche",
    services: "Nos services",
    why: "Pourquoi nous",
    audiences: "Pour qui",
    process: "Notre méthode",
    challenge: "Le défi",
    form: "Consultation gratuite",
  },
};

/* ---------- Shared classes ---------- */
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all cursor-pointer select-none active:scale-[0.98]";
const btnPrimary = `${btnBase} bg-[#FD1843] hover:bg-[#e0123a] text-white`;
const btnOutline = `${btnBase} border-2 border-[#0D0D0F] text-[#0D0D0F] hover:bg-[#0D0D0F]/5`;
const navLink =
  "text-[#0D0D0F] hover:text-[#FD1843] transition-colors font-medium cursor-pointer text-sm sm:text-base";
const fieldCls =
  "w-full h-12 px-4 text-base border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FD1843] focus:border-transparent";

export default function App() {
  const [language, setLanguageState] = useState("ar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    propertyType: "",
    propertyTypeOther: "",
    hasAdvertising: "",
    goal: "",
    goalOther: "",
    name: "",
    phone: "",
    email: "",
  });

  const reduce = useReducedMotion();

  /* Global scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  /* Hero parallax layers */
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBlobSlow = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 130]);
  const yBlobFast = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -90]);
  const yHeroContent = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 70]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);

  /* Final CTA watermark parallax */
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const yWatermark = useTransform(
    ctaProgress,
    [0, 1],
    [reduce ? 0 : 70, reduce ? 0 : -70]
  );

  useEffect(() => {
    setIsClient(true);
    const fontCss = [
      "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/400.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/500.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/600.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/700.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/400.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/500.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/600.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/700.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/800.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/900.css",
    ];
    fontCss.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
    try {
      const savedLanguage = localStorage.getItem("preferredLanguage") || "ar";
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    } catch (e) {}
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const formEl = document.getElementById("form");
      let formVisible = false;
      if (formEl) {
        const r = formEl.getBoundingClientRect();
        formVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      setShowStickyCTA(window.scrollY > 500 && !formVisible);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isClient]);

  const changeLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("preferredLanguage", lang);
    } catch (e) {}
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const t = translations[language];
  const f = formCopy[language];
  const k = kickers[language];
  const isRTL = language === "ar";

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Extract UTM params from URL to match the example payload
    const urlParams = new URLSearchParams(window.location.search);
    const utm = {
      source: urlParams.get("utm_source") || "",
      campaign: urlParams.get("utm_campaign") || "",
    };

    // AdsConvert.ma LP -> CRM sync
    const payload = {
      ...formData,
      propertyType:
        formData.propertyType === f.otherType && formData.propertyTypeOther
          ? f.otherType + ": " + formData.propertyTypeOther
          : formData.propertyType,
      goal:
        formData.goal === f.otherGoal && formData.goalOther
          ? f.otherGoal + ": " + formData.goalOther
          : formData.goal,
      language,
      submittedAt: new Date().toISOString(),
      __id: Date.now() + "-" + Math.random().toString(36).slice(2),
      ...(utm.source || utm.campaign ? { utm } : {}), // Append utm only if present in URL
    };

    // Live sync (same browser - works today, no backend needed):
    try {
      const q = JSON.parse(
        localStorage.getItem("adsconvert_webhook_queue") || "[]"
      );
      q.push(payload);
      localStorage.setItem(
        "adsconvert_webhook_queue",
        JSON.stringify(q.slice(-20))
      );
      if (window.BroadcastChannel)
        new BroadcastChannel("adsconvert_webhook").postMessage(payload);
    } catch (err) {}

    // Real endpoint (when the backend is ready):
    fetch("https://api.adsconvert.ma/v1/hooks/landing-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Source": "adsconvert-lp",
      },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setSubmitted(true);
    scrollToElement("form");
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      role: "",
      propertyType: "",
      propertyTypeOther: "",
      hasAdvertising: "",
      goal: "",
      goalOther: "",
      name: "",
      phone: "",
      email: "",
    });
  };

  const showOtherType = formData.propertyType === f.otherType;
  const showOtherGoal = formData.goal === f.otherGoal;
  const hItem = heroItem(reduce);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="w-12 h-12"
          animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={LOGO_URL}
            alt="AdsConvert.ma"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${
        isRTL ? "font-ar" : "font-fr"
      } min-h-screen bg-white text-[#0D0D0F] antialiased overflow-x-clip`}
    >
      <style>{`
        .font-ar { font-family: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif; }
        .font-fr { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; letter-spacing: -0.011em; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
        section[id] { scroll-margin-top: 84px; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* Scroll progress bar (RTL-aware) */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-[3px] bg-[#FD1843] z-[60] ${
          isRTL ? "origin-right" : "origin-left"
        }`}
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* ================= Navigation ================= */}
      <nav
        className={`sticky top-0 z-50 bg-white border-b border-[#E5E5E5] transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 cursor-pointer"
              aria-label="AdsConvert.ma"
            >
              <img
                src={LOGO_URL}
                alt="AdsConvert.ma"
                className="h-9 sm:h-10 w-auto object-contain mix-blend-multiply select-none"
                draggable={false}
              />
              <span className="hidden sm:inline">
                <Wordmark size="text-lg" />
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-7 items-center">
              <button
                onClick={() => scrollToElement("services")}
                className={navLink}
              >
                {t.footer.services}
              </button>
              <button
                onClick={() => scrollToElement("process")}
                className={navLink}
              >
                {t.footer.processLink}
              </button>
              <button
                onClick={() => scrollToElement("form")}
                className={navLink}
              >
                {t.footer.contact}
              </button>
              <div
                className={`flex items-center gap-1 ${
                  isRTL ? "border-r pr-6" : "border-l pl-6"
                } border-[#E5E5E5]`}
              >
                <button
                  onClick={() => changeLanguage("ar")}
                  className={`px-1.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                    language === "ar"
                      ? "text-[#FD1843]"
                      : "text-[#7A7A7A] hover:text-[#0D0D0F]"
                  }`}
                >
                  العربية
                </button>
                <span className="text-[#7A7A7A]">|</span>
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`px-1.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                    language === "fr"
                      ? "text-[#FD1843]"
                      : "text-[#7A7A7A] hover:text-[#0D0D0F]"
                  }`}
                >
                  Français
                </button>
              </div>
              <button
                onClick={() => scrollToElement("form")}
                className={`${btnPrimary} h-10 px-5 text-sm`}
              >
                {t.nav.startNow}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeLanguage("ar")}
                  className={`px-1 py-2 text-xs font-bold transition-colors cursor-pointer ${
                    language === "ar" ? "text-[#FD1843]" : "text-[#7A7A7A]"
                  }`}
                >
                  ع
                </button>
                <span className="text-[#7A7A7A] text-xs">|</span>
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`px-1 py-2 text-xs font-bold transition-colors cursor-pointer ${
                    language === "fr" ? "text-[#FD1843]" : "text-[#7A7A7A]"
                  }`}
                >
                  F
                </button>
              </div>
              <button
                onClick={() => scrollToElement("form")}
                className={`${btnPrimary} text-xs h-9 px-4`}
              >
                {t.nav.startNow}
              </button>
              <button
                className="text-[#0D0D0F] cursor-pointer p-2 -m-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#E5E5E5] p-4 space-y-1 shadow-lg"
              >
                {[
                  { label: t.footer.services, target: "services" },
                  { label: t.footer.processLink, target: "process" },
                  { label: t.footer.contact, target: "form" },
                ].map((item) => (
                  <button
                    key={item.target}
                    onClick={() => {
                      scrollToElement(item.target);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full min-h-[44px] px-2 rounded-lg ${
                      isRTL ? "text-right" : "text-left"
                    } text-[#0D0D0F] hover:text-[#FD1843] hover:bg-[#F8F8F8] transition-colors font-medium cursor-pointer`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ================= Hero (parallax layers) ================= */}
      <section
        ref={heroRef}
        className="relative bg-white pt-14 sm:pt-20 pb-14 sm:pb-16 px-4 overflow-hidden"
      >
        {/* Parallax depth blobs */}
        <motion.div
          aria-hidden="true"
          style={{ y: yBlobSlow }}
          className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FD1843]/10 blur-3xl pointer-events-none"
        />
        <motion.div
          aria-hidden="true"
          style={{ y: yBlobFast }}
          className="absolute top-32 -right-28 w-80 h-80 sm:w-[26rem] sm:h-[26rem] rounded-full bg-[#FD1843]/[0.07] blur-3xl pointer-events-none"
        />
        <motion.div
          aria-hidden="true"
          style={{ y: yBlobSlow }}
          className="hidden md:block absolute bottom-10 left-1/4 w-24 h-24 rounded-full border-[10px] border-[#F8F8F8] pointer-events-none"
        />

        <motion.div
          style={{ y: yHeroContent, opacity: heroFade }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.div
              variants={hItem}
              className="inline-block mb-5 px-4 py-1.5 bg-[#FD1843]/10 rounded-full text-sm"
            >
              <span className="font-semibold text-[#FD1843]">
                {t.hero.subtitle}
              </span>
            </motion.div>
            <motion.h1
              variants={hItem}
              className={`text-[clamp(2.1rem,7vw,3.75rem)] font-black text-[#0D0D0F] mb-5 leading-[1.15] ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              <span className="text-[#FD1843]">{t.hero.mainHeadline1}</span>
              <br />
              {t.hero.mainHeadline2}
            </motion.h1>
            <motion.p
              variants={hItem}
              className="text-base sm:text-lg text-[#7A7A7A] mb-9 max-w-2xl mx-auto leading-relaxed"
            >
              {t.hero.description}
            </motion.p>
            <motion.div
              variants={hItem}
              className="flex gap-3 sm:gap-4 justify-center flex-col sm:flex-row max-w-md mx-auto sm:max-w-none"
            >
              <button
                onClick={() => scrollToElement("form")}
                className={`${btnPrimary} w-full sm:w-auto h-12 px-8 text-base font-bold`}
              >
                {t.hero.ctaConsultation}
                <ChevronRightIcon className="w-5 h-5" flip={isRTL} />
              </button>
              <button
                onClick={() => scrollToElement("services")}
                className={`${btnOutline} w-full sm:w-auto h-12 px-8 text-base`}
              >
                {t.hero.ctaLearnMore}
              </button>
            </motion.div>
            <motion.div
              variants={hItem}
              className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2.5"
            >
              {trustItems[language].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-[#7A7A7A]"
                >
                  <CheckIcon className="w-4 h-4 text-[#FD1843]" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= Problem ================= */}
      <section className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Kicker text={k.problem} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] mb-3 leading-tight ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.problem.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-[#7A7A7A] mb-8 sm:mb-10">
              {t.problem.subtitle}
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
            {t.problem.issues.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="flex gap-4 bg-white sm:bg-transparent rounded-lg p-4 sm:p-0 border border-[#E5E5E5] sm:border-0 h-full">
                  <div className="w-1.5 bg-[#FD1843] flex-shrink-0 rounded-full" />
                  <p className="text-[#0D0D0F] leading-relaxed text-sm sm:text-base">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E5E5]">
              <p className="text-[#0D0D0F] mb-6 leading-relaxed">
                {t.problem.intro}
              </p>
              <ul className="space-y-3 text-[#0D0D0F]">
                {t.problem.problems.map((problem, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FD1843] rounded-full flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      <strong>{problem}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Solution / Media Buying ================= */}
      <section className="bg-white py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Kicker text={k.approach} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] mb-3 leading-tight ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.mediaBuying.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-[#7A7A7A] mb-8 sm:mb-10">
              {t.mediaBuying.subtitle}
            </p>
          </Reveal>
          <div className="space-y-7 sm:space-y-8">
            <Reveal>
              <p className="text-[#0D0D0F] leading-relaxed text-sm sm:text-base">
                {t.solution.description}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="bg-[#F8F8F8] rounded-xl p-6 sm:p-8">
                <h3 className="font-bold text-[#0D0D0F] mb-5 sm:mb-6 text-base sm:text-lg">
                  {t.mediaBuying.beforeLaunch}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {t.mediaBuying.understandingItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <ChevronRightIcon
                        className="w-5 h-5 text-[#FD1843] flex-shrink-0"
                        flip={isRTL}
                      />
                      <span className="text-[#0D0D0F] text-sm sm:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-[#0D0D0F] leading-relaxed text-sm sm:text-base">
                {t.solution.approach}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section id="services" className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <Reveal>
              <Kicker text={k.services} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] ${
                  !isRTL ? "tracking-tight" : ""
                }`}
              >
                {t.services.title}
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {t.services.items.map((service, idx) => (
              <Reveal
                key={service.num}
                delay={(idx % 3) * 0.1}
                className="h-full"
              >
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E5] hover:border-[#FD1843]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-3xl font-black text-[#FD1843] mb-3 sm:mb-4">
                    {service.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#0D0D0F] mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#7A7A7A] leading-relaxed text-sm sm:text-base">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Why Different ================= */}
      <section className="bg-white py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Kicker text={k.why} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-[#0D0D0F] leading-tight ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.whyDifferent.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-[#7A7A7A] mb-7 sm:mb-8 leading-relaxed">
              {t.whyDifferent.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="bg-[#F8F8F8] rounded-xl p-6 sm:p-8 mb-7 sm:mb-8">
              <p className="text-[#0D0D0F] mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {t.whyDifferent.customerNeeds}
              </p>
              <div className="space-y-3">
                {t.whyDifferent.needs.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FD1843] rounded-full flex-shrink-0" />
                    <span className="text-[#0D0D0F] text-sm sm:text-base">
                      <strong>{item}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-[#0D0D0F] leading-relaxed text-sm sm:text-base">
              {t.whyDifferent.successMessage}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= Audiences ================= */}
      <section className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-9 sm:mb-12">
            <Reveal>
              <Kicker text={k.audiences} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] ${
                  !isRTL ? "tracking-tight" : ""
                }`}
              >
                {t.audiences.title}
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-7">
            {t.audiences.items.map((audience, idx) => (
              <Reveal key={idx} delay={idx * 0.1} className="h-full">
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E5] hover:border-[#FD1843]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center h-full">
                  <h3 className="text-lg font-bold text-[#0D0D0F] mb-3 sm:mb-4">
                    {audience.title}
                  </h3>
                  <p className="text-[#7A7A7A] leading-relaxed text-sm sm:text-base">
                    {audience.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Process ================= */}
      <section id="process" className="bg-white py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <Reveal>
              <Kicker text={k.process} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] ${
                  !isRTL ? "tracking-tight" : ""
                }`}
              >
                {t.process.title}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-6">
            {t.process.steps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.06}>
                <div className="flex gap-4 sm:gap-6 pb-6 border-b border-[#E5E5E5]/70 last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FD1843] text-white flex items-center justify-center font-black text-base sm:text-lg">
                    {step.num}
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="font-bold text-[#0D0D0F] mb-1.5 sm:mb-2 text-base sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-[#7A7A7A] text-sm sm:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Challenge ================= */}
      <section className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Kicker text={k.challenge} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black mb-5 sm:mb-6 text-[#0D0D0F] leading-tight ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.challenge.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E5E5]">
              <p className="text-[#0D0D0F] mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {t.challenge.intro}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-7 sm:mb-8">
                {t.challenge.issues.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 bg-[#F8F8F8] rounded-lg"
                  >
                    <span className="w-2 h-2 bg-[#FD1843] rounded-full flex-shrink-0" />
                    <span className="text-[#0D0D0F] text-sm sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[#0D0D0F] font-semibold text-sm sm:text-base leading-relaxed">
                {t.challenge.warning}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Form ================= */}
      <section id="form" className="bg-white py-14 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <Reveal className="lg:col-span-2 lg:sticky lg:top-24">
            <Kicker text={k.form} />
            <h2
              className={`text-2xl sm:text-3xl font-black mb-3 text-[#0D0D0F] leading-tight ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {f.title}
            </h2>
            <p className="text-[#7A7A7A] leading-relaxed text-sm sm:text-base mb-6">
              {f.desc}
            </p>
            <h3 className="font-bold text-[#0D0D0F] mb-4 text-sm sm:text-base">
              {f.nextTitle}
            </h3>
            <ol className="space-y-3.5 mb-7">
              {f.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FD1843]/10 text-[#FD1843] text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[#0D0D0F] text-sm sm:text-base leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-[#7A7A7A]">
              <CheckIcon className="w-3.5 h-3.5 text-[#FD1843] flex-shrink-0" />
              {f.privacy}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="bg-[#F8F8F8] rounded-2xl p-5 sm:p-8 border border-[#E5E5E5]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="bg-white rounded-xl p-8 sm:p-10 text-center border border-[#E5E5E5]"
                >
                  <div className="w-16 h-16 bg-[#FD1843] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0D0D0F] mb-3">
                    {f.successTitle}
                  </h3>
                  <p className="text-[#7A7A7A] mb-7 leading-relaxed text-sm sm:text-base">
                    {f.successDesc}
                  </p>
                  <button
                    onClick={resetForm}
                    className={`${btnOutline} h-11 px-6 text-sm`}
                  >
                    {f.reset}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                        {f.labelRole} <span className="text-[#FD1843]">*</span>
                      </label>
                      <select
                        required
                        className={fieldCls}
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      >
                        <option value="">{f.choose}</option>
                        {f.roles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                        {f.labelPropertyType}{" "}
                        <span className="text-[#FD1843]">*</span>
                      </label>
                      <select
                        required
                        className={fieldCls}
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            propertyType: e.target.value,
                          })
                        }
                      >
                        <option value="">{f.choose}</option>
                        {f.types.map((tp) => (
                          <option key={tp} value={tp}>
                            {tp}
                          </option>
                        ))}
                      </select>
                    </div>
                    {showOtherType && (
                      <input
                        type="text"
                        required
                        placeholder={f.otherTypePlaceholder}
                        className={fieldCls}
                        value={formData.propertyTypeOther}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            propertyTypeOther: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                      {f.labelAdvertising}{" "}
                      <span className="text-[#FD1843]">*</span>
                    </label>
                    <select
                      required
                      className={fieldCls}
                      value={formData.hasAdvertising}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hasAdvertising: e.target.value,
                        })
                      }
                    >
                      <option value="">{f.choose}</option>
                      {f.ads.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#0D0D0F]">
                      {f.labelGoal} <span className="text-[#FD1843]">*</span>
                    </label>
                    <select
                      required
                      className={fieldCls}
                      value={formData.goal}
                      onChange={(e) =>
                        setFormData({ ...formData, goal: e.target.value })
                      }
                    >
                      <option value="">{f.choose}</option>
                      {f.goals.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  {showOtherGoal && (
                    <input
                      type="text"
                      required
                      placeholder={f.otherGoalPlaceholder}
                      className={fieldCls}
                      value={formData.goalOther}
                      onChange={(e) =>
                        setFormData({ ...formData, goalOther: e.target.value })
                      }
                    />
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder={f.placeholderName}
                      required
                      className={fieldCls}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      type="tel"
                      placeholder={f.placeholderPhone}
                      required
                      className={fieldCls}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <input
                    type="email"
                    placeholder={f.placeholderEmail}
                    required
                    className={fieldCls}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <button
                    type="submit"
                    className={`${btnPrimary} w-full min-h-[52px] text-base font-bold`}
                  >
                    {t.form.buttonSubmit}
                    <ChevronRightIcon className="w-5 h-5" flip={isRTL} />
                  </button>
                  <p className="text-xs text-[#7A7A7A] text-center leading-relaxed">
                    {f.note}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Final CTA (parallax watermark) ================= */}
      <section
        ref={ctaRef}
        className="relative bg-[#0D0D0F] text-white py-16 sm:py-20 px-4 overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          style={{ y: yWatermark }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-black text-[16vw] leading-none text-white/[0.04] whitespace-nowrap">
            SCALE MORE
          </span>
        </motion.div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.finalCTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
              {t.finalCTA.description}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 mb-8">
              {trustItems[language].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-white/80"
                >
                  <CheckIcon className="w-4 h-4 text-[#FD1843]" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => scrollToElement("form")}
              className={`${btnPrimary} w-full sm:w-auto h-12 px-8 text-base font-bold`}
            >
              {t.finalCTA.buttonText}
              <ChevronRightIcon className="w-5 h-5" flip={isRTL} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ================= Footer (logo lockup) ================= */}
      <footer className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-10 sm:py-12 px-4 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={LOGO_URL}
                  alt="AdsConvert.ma"
                  className="h-11 w-auto object-contain mix-blend-multiply select-none"
                  draggable={false}
                />
                <Wordmark size="text-base" />
              </div>
              <p className="text-sm text-[#7A7A7A] leading-relaxed mb-2">
                {t.footer.tagline}
              </p>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7A7A7A] uppercase">
                Scale More. Sell{" "}
                <span className="text-[#FD1843]">Smarter.</span>
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#0D0D0F] text-sm">
                {t.footer.services}
              </h4>
              <ul className="space-y-2 text-sm text-[#7A7A7A]">
                {t.footer.servicesList.map((s) => (
                  <li
                    key={s}
                    className="hover:text-[#FD1843] transition cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#0D0D0F] text-sm">
                {t.footer.companyTitle}
              </h4>
              <ul className="space-y-2 text-sm text-[#7A7A7A]">
                {t.footer.companyList.map((c) => (
                  <li
                    key={c}
                    className="hover:text-[#FD1843] transition cursor-pointer"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#0D0D0F] text-sm">
                {t.footer.contact}
              </h4>
              <p className="text-sm text-[#7A7A7A] mb-1">
                {t.footer.emailLabel}
              </p>
              <p className="text-sm text-[#0D0D0F] font-medium mb-3">
                hello@adsconvert.ma
              </p>
              <p className="text-sm text-[#7A7A7A] mb-1">
                {t.footer.siteLabel}
              </p>
              <p className="text-sm text-[#0D0D0F] font-medium">
                adsconvert.ma
              </p>
            </div>
          </div>
          <div className="border-t border-[#E5E5E5] pt-6 text-center text-xs sm:text-sm text-[#7A7A7A]">
            <p>
              © 2024 AdsConvert.ma - {t.footer.rights}. Scale More. Sell
              Smarter.
            </p>
          </div>
        </div>
      </footer>

      {/* ================= Sticky mobile CTA ================= */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-[#E5E5E5] px-4 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
            }}
          >
            <button
              onClick={() => scrollToElement("form")}
              className={`${btnPrimary} w-full h-12 text-base font-bold`}
            >
              {t.hero.ctaConsultation}
              <ChevronRightIcon className="w-5 h-5" flip={isRTL} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

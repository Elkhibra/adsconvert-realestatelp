import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRightIcon, CheckIcon } from "../components/icons";
import { EASE, btnPrimary, btnOutline } from "../constants/ui";

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const heroItem = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
});

export default function Hero({ t, trust, isRTL, reduce, scrollToElement }) {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBlobSlow = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 130]);
  const yBlobFast = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -90]);
  const yHeroContent = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 70]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const hItem = heroItem(reduce);

  return (
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
            <span className="font-semibold text-[#FD1843]">{t.hero.subtitle}</span>
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
            {trust.map((item) => (
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
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import { ChevronRightIcon, CheckIcon } from "../components/icons";
import { btnPrimary } from "../constants/ui";

export default function FinalCTA({ t, trust, isRTL, scrollToElement }) {
  const reduce = useReducedMotion();
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const yWatermark = useTransform(
    ctaProgress,
    [0, 1],
    [reduce ? 0 : 70, reduce ? 0 : -70],
  );

  return (
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
            {trust.map((item) => (
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
  );
}

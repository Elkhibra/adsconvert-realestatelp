import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "../components/icons";
import { EASE, btnPrimary } from "../constants/ui";

export default function StickyCTA({ show, t, isRTL, scrollToElement }) {
  return (
    <AnimatePresence>
      {show && (
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
  );
}

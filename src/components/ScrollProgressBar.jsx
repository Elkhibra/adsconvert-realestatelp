import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar({ isRTL }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[3px] bg-[#FD1843] z-[60] ${
        isRTL ? "origin-right" : "origin-left"
      }`}
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  );
}

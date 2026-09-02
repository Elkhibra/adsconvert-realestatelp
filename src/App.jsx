import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "./i18n/LanguageContext.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Problem from "./sections/Problem";
import Solution from "./sections/Solution";
import Services from "./sections/Services";
import WhyDifferent from "./sections/WhyDifferent";
import Audiences from "./sections/Audiences";
import Process from "./sections/Process";
import Challenge from "./sections/Challenge";
import LeadForm from "./sections/LeadForm";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";
import StickyCTA from "./sections/StickyCTA";

export default function App() {
  const { language, changeLanguage, isRTL, t, f, k, trust } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const reduce = useReducedMotion();

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
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      <ScrollProgressBar isRTL={isRTL} />

      <Navigation
        t={t}
        language={language}
        changeLanguage={changeLanguage}
        isRTL={isRTL}
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToElement={scrollToElement}
        reduce={reduce}
      />

      <Hero t={t} trust={trust} isRTL={isRTL} reduce={reduce} scrollToElement={scrollToElement} />
      <Problem t={t} k={k} isRTL={isRTL} />
      <Solution t={t} k={k} isRTL={isRTL} />
      <Services t={t} k={k} isRTL={isRTL} />
      <WhyDifferent t={t} k={k} isRTL={isRTL} />
      <Audiences t={t} k={k} isRTL={isRTL} />
      <Process t={t} k={k} isRTL={isRTL} />
      <Challenge t={t} k={k} isRTL={isRTL} />
      <LeadForm
        t={t}
        f={f}
        k={k}
        isRTL={isRTL}
        language={language}
        scrollToElement={scrollToElement}
      />
      <FinalCTA t={t} trust={trust} isRTL={isRTL} scrollToElement={scrollToElement} />
      <Footer t={t} />
      <StickyCTA
        show={showStickyCTA}
        t={t}
        isRTL={isRTL}
        scrollToElement={scrollToElement}
      />
    </div>
  );
}

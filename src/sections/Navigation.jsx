import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "../components/Brand";
import { MenuIcon, XIcon } from "../components/icons";
import { LOGO_URL, EASE, btnPrimary, navLink } from "../constants/ui";

export default function Navigation({
  t,
  language,
  changeLanguage,
  isRTL,
  scrolled,
  isMenuOpen,
  setIsMenuOpen,
  scrollToElement,
  reduce,
}) {
  return (
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
            <button onClick={() => scrollToElement("services")} className={navLink}>
              {t.footer.services}
            </button>
            <button onClick={() => scrollToElement("process")} className={navLink}>
              {t.footer.processLink}
            </button>
            <button onClick={() => scrollToElement("form")} className={navLink}>
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
  );
}

import { Link } from "react-router-dom";
import { useLanguage } from "./i18n/LanguageContext.jsx";
import RichText from "./i18n/RichText.jsx";

export default function PrivacyPolicy() {
  const { language, changeLanguage, isRTL, p } = useLanguage();

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${
        isRTL ? "font-ar" : "font-fr"
      } min-h-screen bg-[#F4F4F5] py-12 px-4 sm:px-6 lg:px-8`}
    >
      <style>{`
        .font-ar { font-family: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif; }
        .font-fr { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; letter-spacing: -0.011em; }
      `}</style>

      <div className="max-w-4xl mx-auto mb-4 flex justify-end gap-1">
        <button
          onClick={() => changeLanguage("ar")}
          className={`px-2 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
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
          className={`px-2 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
            language === "fr"
              ? "text-[#FD1843]"
              : "text-[#7A7A7A] hover:text-[#0D0D0F]"
          }`}
        >
          Français
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[#FD1843] font-bold text-xs tracking-widest uppercase mb-2 block">
            {p.legalLabel}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D0D0F] tracking-tight mb-4">
            {p.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {p.lastUpdatedLabel}
            {new Date().toLocaleDateString(p.dateLocale)}
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-600 mb-8 leading-relaxed">{p.intro}</p>

        <div className="space-y-8 text-gray-700">
          {p.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
                {section.title}
              </h2>
              {section.intro && <p className="mb-3">{section.intro}</p>}
              {section.paragraphs?.map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.items && (
                <ul
                  className={`list-disc space-y-2 text-gray-600 ${
                    isRTL ? "pr-5" : "pl-5"
                  }`}
                >
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Footer / Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="inline-block bg-[#0D0D0F] text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {p.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

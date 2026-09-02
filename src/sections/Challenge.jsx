import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";

export default function Challenge({ t, k, isRTL }) {
  return (
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
                  <span className="text-[#0D0D0F] text-sm sm:text-base">{item}</span>
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
  );
}

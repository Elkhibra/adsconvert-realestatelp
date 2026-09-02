import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";

export default function WhyDifferent({ t, k, isRTL }) {
  return (
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
  );
}

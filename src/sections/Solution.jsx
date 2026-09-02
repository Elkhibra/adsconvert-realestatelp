import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";
import { ChevronRightIcon } from "../components/icons";

export default function Solution({ t, k, isRTL }) {
  return (
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
                    <span className="text-[#0D0D0F] text-sm sm:text-base">{item}</span>
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
  );
}

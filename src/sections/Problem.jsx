import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";

export default function Problem({ t, k, isRTL }) {
  return (
    <section className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <Kicker text={k.problem} />
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] mb-3 leading-tight ${
              !isRTL ? "tracking-tight" : ""
            }`}
          >
            {t.problem.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base sm:text-lg text-[#7A7A7A] mb-8 sm:mb-10">
            {t.problem.subtitle}
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {t.problem.issues.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="flex gap-4 bg-white sm:bg-transparent rounded-lg p-4 sm:p-0 border border-[#E5E5E5] sm:border-0 h-full">
                <div className="w-1.5 bg-[#FD1843] flex-shrink-0 rounded-full" />
                <p className="text-[#0D0D0F] leading-relaxed text-sm sm:text-base">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E5E5]">
            <p className="text-[#0D0D0F] mb-6 leading-relaxed">{t.problem.intro}</p>
            <ul className="space-y-3 text-[#0D0D0F]">
              {t.problem.problems.map((problem, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#FD1843] rounded-full flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    <strong>{problem}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

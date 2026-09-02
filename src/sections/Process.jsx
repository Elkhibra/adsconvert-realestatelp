import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";

export default function Process({ t, k, isRTL }) {
  return (
    <section id="process" className="bg-white py-14 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Kicker text={k.process} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.process.title}
            </h2>
          </Reveal>
        </div>
        <div className="space-y-6">
          {t.process.steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 0.06}>
              <div className="flex gap-4 sm:gap-6 pb-6 border-b border-[#E5E5E5]/70 last:border-b-0 last:pb-0">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FD1843] text-white flex items-center justify-center font-black text-base sm:text-lg">
                  {step.num}
                </div>
                <div className="flex-1 pt-0.5 sm:pt-1">
                  <h3 className="font-bold text-[#0D0D0F] mb-1.5 sm:mb-2 text-base sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm sm:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

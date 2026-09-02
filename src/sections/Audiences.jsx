import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";

export default function Audiences({ t, k, isRTL }) {
  return (
    <section className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-9 sm:mb-12">
          <Reveal>
            <Kicker text={k.audiences} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.audiences.title}
            </h2>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-7">
          {t.audiences.items.map((audience, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="h-full">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E5] hover:border-[#FD1843]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center h-full">
                <h3 className="text-lg font-bold text-[#0D0D0F] mb-3 sm:mb-4">
                  {audience.title}
                </h3>
                <p className="text-[#7A7A7A] leading-relaxed text-sm sm:text-base">
                  {audience.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

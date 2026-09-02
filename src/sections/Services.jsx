import Reveal from "../components/Reveal";
import { Kicker } from "../components/Brand";

export default function Services({ t, k, isRTL }) {
  return (
    <section id="services" className="bg-[#F8F8F8] py-14 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Kicker text={k.services} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0F] ${
                !isRTL ? "tracking-tight" : ""
              }`}
            >
              {t.services.title}
            </h2>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {t.services.items.map((service, idx) => (
            <Reveal key={service.num} delay={(idx % 3) * 0.1} className="h-full">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E5] hover:border-[#FD1843]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="text-3xl font-black text-[#FD1843] mb-3 sm:mb-4">
                  {service.num}
                </div>
                <h3 className="text-lg font-bold text-[#0D0D0F] mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-[#7A7A7A] leading-relaxed text-sm sm:text-base">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

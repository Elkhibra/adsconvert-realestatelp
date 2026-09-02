export const Wordmark = ({ size = "text-lg" }) => (
  <span className={`font-extrabold ${size} leading-none tracking-tight`}>
    <span className="text-[#FD1843]">Ads</span>
    <span className="text-[#0D0D0F]">Convert</span>
    <span className="text-[#FD1843]">.ma</span>
  </span>
);

export const Kicker = ({ text }) => (
  <span className="inline-flex items-center gap-2 text-[#FD1843] font-bold text-sm mb-3">
    <span className="w-6 h-0.5 bg-[#FD1843] inline-block rounded-full" />
    {text}
  </span>
);

import { Link } from "react-router-dom";
import { Wordmark } from "../components/Brand";
import { LOGO_URL } from "../constants/ui";

export default function Footer({ t }) {
  return (
    <footer className="bg-[#F8F8F8] border-t border-[#E5E5E5] py-10 sm:py-12 px-4 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={LOGO_URL}
                alt="AdsConvert.ma"
                className="h-11 w-auto object-contain mix-blend-multiply select-none"
                draggable={false}
              />
              <Wordmark size="text-base" />
            </div>
            <p className="text-sm text-[#7A7A7A] leading-relaxed mb-2">
              {t.footer.tagline}
            </p>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7A7A7A] uppercase">
              Scale More. Sell <span className="text-[#FD1843]">Smarter.</span>
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#0D0D0F] text-sm">
              {t.footer.services}
            </h4>
            <ul className="space-y-2 text-sm text-[#7A7A7A]">
              {t.footer.servicesList.map((s) => (
                <li key={s} className="hover:text-[#FD1843] transition cursor-pointer">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#0D0D0F] text-sm">
              {t.footer.companyTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#7A7A7A]">
              {t.footer.companyList.map((c) => (
                <li key={c.label} className="hover:text-[#FD1843] transition cursor-pointer">
                  <Link to={c.link}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#0D0D0F] text-sm">
              {t.footer.contact}
            </h4>
            <p className="text-sm text-[#7A7A7A] mb-1">{t.footer.emailLabel}</p>
            <p className="text-sm text-[#0D0D0F] font-medium mb-3">
              hello@adsconvert.ma
            </p>
            <p className="text-sm text-[#7A7A7A] mb-1">{t.footer.siteLabel}</p>
            <p className="text-sm text-[#0D0D0F] font-medium">adsconvert.ma</p>
          </div>
        </div>
        <div className="border-t border-[#E5E5E5] pt-6 text-center text-xs sm:text-sm text-[#7A7A7A]">
          <p>
            © 2024 AdsConvert.ma - {t.footer.rights}. Scale More. Sell Smarter.
          </p>
        </div>
      </div>
    </footer>
  );
}

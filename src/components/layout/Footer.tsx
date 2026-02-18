import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_EMAILS } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navigation");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-text-inverse">
      {/* Large brand section */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="pt-20 pb-12 border-b border-white/10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight leading-none">
            ISA WARPS
          </h2>
          <p className="mt-4 text-sm text-text-inverse/40 max-w-md tracking-wide">
            Professional Footballer — Timnas Putri Indonesia — VfR Warbeyen Frauen
          </p>
        </div>

        {/* Links grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">
          <div>
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-text-inverse/30 mb-6">
              {t("navigation")}
            </h3>
            <ul className="space-y-3">
              {["about", "matches", "updates", "contact"].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key === "contact" ? "contact" : key}`}
                    className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-text-inverse/30 mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/media-kit" className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200">
                  {t("mediaKit")}
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200">
                  {t("partnerships")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-text-inverse/30 mb-6">
              {t("followUs")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200">
                  YouTube
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-text-inverse/30 mb-6">
              {t("contact")}
            </h3>
            <a
              href={"mailto:" + CONTACT_EMAILS.general}
              className="text-sm text-text-inverse/60 hover:text-text-inverse transition-colors duration-200"
            >
              {CONTACT_EMAILS.general}
            </a>
          </div>
        </div>

        {/* Bottom bar - minimal */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-text-inverse/30 uppercase tracking-[0.2em]">
            &copy; {currentYear} Isa Warps. {t("copyright")}.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[10px] text-text-inverse/30 uppercase tracking-[0.2em] hover:text-text-inverse/60 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/cookie-policy" className="text-[10px] text-text-inverse/30 uppercase tracking-[0.2em] hover:text-text-inverse/60 transition-colors">
              {t("cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

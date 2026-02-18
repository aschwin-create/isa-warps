import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: "Cookiebeleid / Cookie Policy",
    description: "Cookie policy for isawarps.com",
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-20">
      <Container size="sm">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent-red font-heading font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Cookiebeleid / Cookie Policy
          </h1>
          <div className="w-16 h-1 bg-accent-red" />
          <p className="mt-4 text-text-muted text-sm">
            Last updated: January 2025 / Laatst bijgewerkt: januari 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-text-light leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              1. What are Cookies? / Wat zijn cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your device
              (computer, tablet, or smartphone) when you visit a website. They
              are widely used to make websites work more efficiently, as well as
              to provide information to the website owners. Cookies can be
              &ldquo;persistent&rdquo; (remaining on your device until they
              expire or you delete them) or &ldquo;session&rdquo; cookies (which
              are deleted when you close your browser).
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              2. Essential Cookies / Essenti&euml;le cookies
            </h2>
            <p className="mb-3">
              These cookies are strictly necessary for the website to function
              properly. They enable basic features such as page navigation and
              access to secure areas. The website cannot function properly
              without these cookies.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Cookie
                    </th>
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Purpose
                    </th>
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-mono text-xs">
                      cookie_consent
                    </td>
                    <td className="p-3 border border-border">
                      Stores your cookie preferences
                    </td>
                    <td className="p-3 border border-border">365 days</td>
                  </tr>
                  <tr className="bg-surface-alt/50">
                    <td className="p-3 border border-border font-mono text-xs">
                      NEXT_LOCALE
                    </td>
                    <td className="p-3 border border-border">
                      Stores your preferred language
                    </td>
                    <td className="p-3 border border-border">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              3. Analytics Cookies / Analytische cookies
            </h2>
            <p className="mb-3">
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously. This
              data helps us improve the website&apos;s performance and user
              experience.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Cookie
                    </th>
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Purpose
                    </th>
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-mono text-xs">
                      _ga
                    </td>
                    <td className="p-3 border border-border">
                      Google Analytics - Distinguishes unique users
                    </td>
                    <td className="p-3 border border-border">2 years</td>
                  </tr>
                  <tr className="bg-surface-alt/50">
                    <td className="p-3 border border-border font-mono text-xs">
                      _ga_*
                    </td>
                    <td className="p-3 border border-border">
                      Google Analytics - Maintains session state
                    </td>
                    <td className="p-3 border border-border">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Analytics cookies are only placed with your explicit consent.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              4. Marketing Cookies / Marketing cookies
            </h2>
            <p className="mb-3">
              Marketing cookies are used to track visitors across websites. The
              intention is to display ads that are relevant and engaging for the
              individual user. These cookies may be set by third-party services
              embedded in our website.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Cookie
                    </th>
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Purpose
                    </th>
                    <th className="text-left p-3 font-heading font-semibold text-primary border border-border">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-mono text-xs">
                      _fbp
                    </td>
                    <td className="p-3 border border-border">
                      Facebook Pixel - Tracks visits for ad targeting
                    </td>
                    <td className="p-3 border border-border">3 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Marketing cookies are only placed with your explicit consent.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              5. Managing Cookies / Cookies beheren
            </h2>
            <p className="mb-3">
              You can manage your cookie preferences in several ways:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Cookie consent banner:</strong> When you first visit our
                website, a cookie consent banner will appear. You can accept all
                cookies, reject all non-essential cookies, or customize your
                preferences.
              </li>
              <li>
                <strong>Browser settings:</strong> Most web browsers allow you
                to control cookies through their settings. You can set your
                browser to refuse cookies, delete cookies, or alert you when a
                cookie is being set. Note that disabling cookies may affect the
                functionality of the website.
              </li>
            </ul>
            <p className="mt-3">
              For more information on how to manage cookies in your specific
              browser, please visit your browser&apos;s help documentation.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              6. Contact
            </h2>
            <p className="mb-3">
              If you have any questions about our use of cookies, please contact
              us:
            </p>
            <div className="bg-surface-alt rounded-xl p-6">
              <p className="font-heading font-semibold text-primary mb-2">
                Isa Warps
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@isawarps.com"
                  className="text-accent-red hover:underline"
                >
                  info@isawarps.com
                </a>
              </p>
              <p>
                Privacy Policy:{" "}
                <Link
                  href="/privacy"
                  className="text-accent-red hover:underline"
                >
                  View our Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: "Privacybeleid / Privacy Policy",
    description: "Privacy policy for isawarps.com",
  };
}

export default async function PrivacyPage({ params }: Props) {
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
            Privacybeleid / Privacy Policy
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
              1. Data Collection / Gegevensverzameling
            </h2>
            <p className="mb-3">
              We collect personal data that you voluntarily provide to us when
              you contact us through our website, subscribe to our newsletter,
              or submit a partnership inquiry. This may include:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Name and contact information (email address)</li>
              <li>Company name (for partnership inquiries)</li>
              <li>Messages and correspondence content</li>
              <li>Cookie preferences</li>
            </ul>
            <p className="mt-3">
              We also automatically collect certain technical data when you visit
              our website, such as IP address, browser type, and pages visited,
              through the use of cookies and similar technologies.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              2. Data Usage / Gegevensgebruik
            </h2>
            <p className="mb-3">We use the collected data for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Responding to your inquiries and messages</li>
              <li>Sending newsletters (only with your explicit consent)</li>
              <li>Processing partnership and sponsorship requests</li>
              <li>Improving our website and user experience</li>
              <li>Analyzing website traffic and usage patterns</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              3. Cookies
            </h2>
            <p className="mb-3">
              Our website uses cookies to enhance your browsing experience. We
              distinguish between the following types of cookies:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Essential cookies:</strong> Required for the basic
                functionality of the website
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how
                visitors use our website
              </li>
              <li>
                <strong>Marketing cookies:</strong> Used to provide relevant
                advertisements
              </li>
            </ul>
            <p className="mt-3">
              You can manage your cookie preferences at any time through our
              cookie consent banner or by adjusting your browser settings. For
              more details, please refer to our{" "}
              <Link
                href="/cookie-policy"
                className="text-accent-red hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              4. Third-party Services / Externe diensten
            </h2>
            <p className="mb-3">
              We may use the following third-party services that process data on
              our behalf:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Vercel:</strong> Website hosting and analytics
              </li>
              <li>
                <strong>Google Analytics:</strong> Website traffic analysis
                (only with your consent)
              </li>
              <li>
                <strong>Social media platforms:</strong> Embedded content from
                Instagram, Facebook, YouTube, and TikTok
              </li>
            </ul>
            <p className="mt-3">
              Each of these services has their own privacy policies. We
              recommend reviewing their respective policies for more
              information.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              5. Your Rights / Uw rechten
            </h2>
            <p className="mb-3">
              Under the General Data Protection Regulation (GDPR), you have the
              following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Right of access:</strong> You can request a copy of your
                personal data
              </li>
              <li>
                <strong>Right to rectification:</strong> You can request
                correction of inaccurate data
              </li>
              <li>
                <strong>Right to erasure:</strong> You can request deletion of
                your personal data
              </li>
              <li>
                <strong>Right to restriction:</strong> You can request
                restriction of data processing
              </li>
              <li>
                <strong>Right to data portability:</strong> You can request your
                data in a portable format
              </li>
              <li>
                <strong>Right to object:</strong> You can object to the
                processing of your personal data
              </li>
              <li>
                <strong>Right to withdraw consent:</strong> You can withdraw
                previously given consent at any time
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              6. Data Retention / Bewaartermijn
            </h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfill the purposes described in this privacy policy, or as
              required by law. Contact form submissions are retained for a
              maximum of 12 months. Newsletter subscriptions are maintained until
              you unsubscribe.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              7. Contact
            </h2>
            <p className="mb-3">
              If you have any questions about this privacy policy or wish to
              exercise your rights, please contact us:
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
                Website:{" "}
                <a
                  href="https://www.isawarps.com"
                  className="text-accent-red hover:underline"
                >
                  www.isawarps.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Building, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { fadeInLeft, fadeInRight } from "@/animations/variants";

const sponsorInquirySchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  tierInterest: z.enum(["premium", "official", "supporting"]),
  message: z.string().min(10),
  gdprConsent: z.literal(true),
});

type SponsorInquiryData = z.infer<typeof sponsorInquirySchema>;

export function SponsorInquiryForm() {
  const t = useTranslations("Partnerships.inquiryForm");
  const tTiers = useTranslations("Partnerships.tiers");
  const tCommon = useTranslations("Common");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SponsorInquiryData>({
    resolver: zodResolver(sponsorInquirySchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      tierInterest: undefined,
      message: "",
      gdprConsent: undefined,
    },
  });

  const onSubmit = async (data: SponsorInquiryData) => {
    try {
      const response = await fetch("/api/partnership-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Er is iets misgegaan. Probeer het later opnieuw of stuur een email naar info@isawarps.com");
    }
  };

  const tierOptions = [
    { value: "premium", label: tTiers("premium.name") },
    { value: "official", label: tTiers("official.name") },
    { value: "supporting", label: tTiers("supporting.name") },
  ];

  return (
    <section id="inquiry-form" className="py-20 bg-surface-alt scroll-mt-20">
      <Container>
        <SectionHeading title={t("title")} />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center bg-surface rounded-2xl p-12 border border-border h-full min-h-[400px]"
              >
                <div className="bg-accent-red/10 p-4 rounded-full mb-6">
                  <Check className="w-8 h-8 text-accent-red" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  {tCommon("success")}
                </h3>
                <p className="text-text-light leading-relaxed max-w-md">
                  {t("success")}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-surface rounded-2xl p-8 border border-border space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label={t("companyName")}
                    placeholder={t("companyName")}
                    error={errors.companyName ? tCommon("required") : undefined}
                    {...register("companyName")}
                  />
                  <Input
                    label={t("contactPerson")}
                    placeholder={t("contactPerson")}
                    error={errors.contactPerson ? tCommon("required") : undefined}
                    {...register("contactPerson")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label={t("email")}
                    type="email"
                    placeholder={t("email")}
                    error={
                      errors.email
                        ? errors.email.type === "invalid_string"
                          ? tCommon("invalidEmail")
                          : tCommon("required")
                        : undefined
                    }
                    {...register("email")}
                  />
                  <Input
                    label={t("phone")}
                    type="tel"
                    placeholder={t("phone")}
                    {...register("phone")}
                  />
                </div>

                <Select
                  label={t("tierInterest")}
                  placeholder={t("selectTier")}
                  options={tierOptions}
                  error={errors.tierInterest ? tCommon("required") : undefined}
                  {...register("tierInterest")}
                />

                <Textarea
                  label={t("message")}
                  placeholder={t("message")}
                  rows={4}
                  error={errors.message ? tCommon("required") : undefined}
                  {...register("message")}
                />

                {/* GDPR consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-border text-accent-red focus:ring-accent-red"
                      {...register("gdprConsent", {
                        setValueAs: (v: boolean) => v || undefined,
                      })}
                    />
                    <span className="text-sm text-text-light">
                      {t("gdprConsent")}
                    </span>
                  </label>
                  {errors.gdprConsent && (
                    <p className="mt-1.5 text-sm text-error" role="alert">
                      {tCommon("required")}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full"
                >
                  {t("submit")}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Info side */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {/* Contact info cards */}
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">
                  Contact
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-accent-red/10 p-2.5 rounded-full">
                      <Mail className="w-5 h-5 text-accent-red" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">E-mail</p>
                      <a
                        href="mailto:sponsor@isawarps.com"
                        className="text-primary font-medium hover:text-accent-red transition-colors"
                      >
                        sponsor@isawarps.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-accent-red/10 p-2.5 rounded-full">
                      <Phone className="w-5 h-5 text-accent-red" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Telefoon</p>
                      <p className="text-primary font-medium">
                        +31 6 12 34 56 78
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-accent-red/10 p-2.5 rounded-full">
                      <Building className="w-5 h-5 text-accent-red" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Management</p>
                      <p className="text-primary font-medium">
                        Isa Warps Management
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual element */}
              <div className="relative rounded-2xl overflow-hidden h-48 lg:h-56">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white/80 text-sm mb-1 font-medium uppercase tracking-wider">
                    Partnership
                  </p>
                  <p className="text-white text-lg font-heading font-bold">
                    Samen scoren, samen groeien
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

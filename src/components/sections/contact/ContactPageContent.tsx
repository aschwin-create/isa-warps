"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SOCIAL_LINKS, CONTACT_EMAILS } from "@/lib/constants";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import {
  Mail,
  Send,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const contactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(10, "Minimum 10 characters"),
  gdprConsent: z.literal(true, "Required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactCards = [
  {
    key: "sponsoring" as const,
    email: CONTACT_EMAILS.sponsoring,
  },
  {
    key: "media" as const,
    email: CONTACT_EMAILS.media,
  },
  {
    key: "general" as const,
    email: CONTACT_EMAILS.general,
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: Instagram,
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white",
  },
  {
    name: "Facebook",
    href: SOCIAL_LINKS.facebook,
    icon: Facebook,
    color: "hover:bg-[#1877F2] hover:text-white",
  },
  {
    name: "YouTube",
    href: SOCIAL_LINKS.youtube,
    icon: Youtube,
    color: "hover:bg-[#FF0000] hover:text-white",
  },
  {
    name: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    icon: null, // TikTok icon placeholder
    color: "hover:bg-black hover:text-white",
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48 6.3 6.3 0 001.86-4.48V8.74a8.18 8.18 0 004.72 1.5v-3.4a4.85 4.85 0 01-1-.15z" />
    </svg>
  );
}

export function ContactPageContent() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setFormSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Er is iets misgegaan. Probeer het later opnieuw of stuur een email naar isa@warps.nl");
    }
  };

  const subjectOptions = [
    { value: "sponsoring", label: t("form.subjects.sponsoring") },
    { value: "media", label: t("form.subjects.media") },
    { value: "fan", label: t("form.subjects.fan") },
    { value: "other", label: t("form.subjects.other") },
  ];

  return (
    <>
      {/* Contact Info Cards */}
      <section className="py-20">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {contactCards.map((card) => (
              <motion.div
                key={card.key}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-surface rounded-xl p-6 border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent-red/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-accent-red" />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-2">
                  {t(`info.${card.key}.title`)}
                </h3>
                <p className="text-text-light text-sm mb-4">
                  {t(`info.${card.key}.description`)}
                </p>
                <a
                  href={`mailto:${card.email}`}
                  className="inline-flex items-center gap-2 text-accent-red font-heading font-semibold text-sm hover:text-accent-red-dark transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {card.email}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Form + Social */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
                {t("form.title")}
              </h2>
              <div className="w-12 h-1 bg-accent-red mb-8" />

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-success/10 border border-success/20 rounded-xl p-8 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <p className="text-lg font-heading font-semibold text-success">
                    {t("form.success")}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 text-sm text-text-muted hover:text-text transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label={t("form.name")}
                      placeholder={t("form.name")}
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <Input
                      label={t("form.email")}
                      type="email"
                      placeholder={t("form.email")}
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <Select
                    label={t("form.subject")}
                    placeholder={t("form.selectSubject")}
                    options={subjectOptions}
                    error={errors.subject?.message}
                    {...register("subject")}
                  />

                  <Textarea
                    label={t("form.message")}
                    placeholder={t("form.message")}
                    rows={5}
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  {/* GDPR Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="gdprConsent"
                      className={cn(
                        "mt-1 h-4 w-4 rounded border-border text-accent-red",
                        "focus:ring-accent-red focus:ring-offset-0",
                        errors.gdprConsent && "border-error"
                      )}
                      {...register("gdprConsent")}
                    />
                    <label
                      htmlFor="gdprConsent"
                      className="text-sm text-text-light"
                    >
                      {t("form.gdprConsent")}{" "}
                      <Link
                        href="/privacy"
                        className="text-accent-red hover:underline"
                      >
                        &rarr;
                      </Link>
                    </label>
                  </div>
                  {errors.gdprConsent && (
                    <p className="text-sm text-error" role="alert">
                      {tCommon("required")}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    {t("form.submit")}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
                {t("social.title")}
              </h2>
              <div className="w-12 h-1 bg-accent-red mb-4" />
              <p className="text-text-light mb-8">
                {t("social.description")}
              </p>

              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className={cn(
                        "flex items-center gap-4 bg-surface-alt rounded-xl p-5 transition-all duration-300",
                        social.color
                      )}
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6" />
                        ) : (
                          <TikTokIcon className="w-6 h-6" />
                        )}
                      </div>
                      <span className="font-heading font-semibold text-lg">
                        {social.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}

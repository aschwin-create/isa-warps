"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { User, Calendar, Building2, Globe, Hash, Target } from "lucide-react";

interface InfoItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function PersonalInfo() {
  const t = useTranslations("About.personalInfo");

  const infoItems: InfoItem[] = [
    { label: t("position"), value: t("positionValue"), icon: <User className="w-5 h-5" /> },
    { label: t("age"), value: t("ageValue"), icon: <Calendar className="w-5 h-5" /> },
    { label: t("currentClub"), value: t("currentClubValue"), icon: <Building2 className="w-5 h-5" /> },
    { label: t("internationalTeam"), value: t("internationalTeamValue"), icon: <Globe className="w-5 h-5" /> },
    { label: t("caps"), value: t("capsValue"), icon: <Hash className="w-5 h-5" /> },
    { label: t("goals"), value: t("goalsValue"), icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-muted">
            {t("sectionTitle")}
          </p>
          <div className="mt-4 w-12 h-[2px] bg-accent-red" />
        </motion.div>

        {/* Stats grid with icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-surface-alt border border-border p-6 hover:border-accent-red transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/5 text-accent-red group-hover:bg-accent-red group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-text-muted mb-2">
                    {item.label}
                  </p>
                  <p className="text-lg md:text-xl font-heading font-black text-primary uppercase tracking-tight leading-tight">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

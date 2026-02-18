"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

export function ClubBadge() {
  return (
    <div className="inline-flex items-center gap-4 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/10">
      <Image
        src="/images/gallery/Logo-Vfr_warbeyen.png"
        alt="VfR Warbeyen Frauen"
        width={28}
        height={28}
        className="object-contain brightness-0 invert"
      />
      <div>
        <p className="text-[11px] font-heading font-bold uppercase tracking-[0.15em] text-text-inverse">
          VfR Warbeyen Frauen
        </p>
        <p className="flex items-center gap-1.5 text-[10px] font-heading uppercase tracking-[0.15em] text-text-inverse/40 mt-0.5">
          <MapPin className="w-3 h-3" />
          2. Bundesliga Frauen
        </p>
      </div>
    </div>
  );
}

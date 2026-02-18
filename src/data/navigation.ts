export interface NavItem {
  translationKey: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  { translationKey: "home", href: "/" },
  { translationKey: "about", href: "/about" },
  { translationKey: "matches", href: "/matches" },
  { translationKey: "mediaKit", href: "/media-kit" },
  { translationKey: "partnerships", href: "/partnerships" },
  { translationKey: "updates", href: "/updates" },
  { translationKey: "contact", href: "/contact" },
];

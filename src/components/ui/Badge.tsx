import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "red" | "blue" | "success" | "gold";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-dark text-text",
  red: "bg-accent-red/10 text-accent-red",
  blue: "bg-accent-blue/10 text-accent-blue",
  success: "bg-success/10 text-success",
  gold: "bg-gold/10 text-gold-dark",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

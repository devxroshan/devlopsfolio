import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2, type LucideIcon } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "transparent"
  | "outline"
  | "danger"
  | "success"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  btnText?: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  iconSize?: string;
  textColor?: string;
  hoverTextColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  isDisabled?: boolean;
  onDisabledText?: string;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  className?: string;
}

interface Palette {
  bg: string;
  hoverBg: string;
  text: string;
  hoverText: string;
  border: string;
  hoverBorder: string;
}

const PALETTES: Record<ButtonVariant, Palette> = {
  primary: {
    bg: "bg-white",
    hoverBg: "hover:bg-white/80",
    text: "text-black",
    hoverText: "hover:text-black",
    border: "border-transparent",
    hoverBorder: "hover:border-transparent",
  },
  secondary: {
    bg: "bg-surface-elevated",
    hoverBg: "hover:bg-surface-hover",
    text: "text-text-secondary",
    hoverText: "hover:text-text-secondary",
    border: "border-border-subtle",
    hoverBorder: "hover:border-border-hover",
  },
  transparent: {
    bg: "bg-transparent",
    hoverBg: "hover:bg-transparent",
    text: "text-white",
    hoverText: "hover:text-text-dimmed",
    border: "border-transparent",
    hoverBorder: "hover:border-transparent",
  },
  outline: {
    bg: "bg-transparent",
    hoverBg: "hover:bg-white/10",
    text: "text-white",
    hoverText: "hover:text-white",
    border: "border-white/30",
    hoverBorder: "hover:border-white/60",
  },
  danger: {
    bg: "bg-red-500",
    hoverBg: "hover:bg-red-600",
    text: "text-white",
    hoverText: "hover:text-white",
    border: "border-transparent",
    hoverBorder: "hover:border-transparent",
  },
  success: {
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-600",
    text: "text-white",
    hoverText: "hover:text-white",
    border: "border-transparent",
    hoverBorder: "hover:border-transparent",
  },
  link: {
    bg: "bg-transparent",
    hoverBg: "hover:bg-transparent",
    text: "text-blue-400",
    hoverText: "hover:text-blue-300",
    border: "border-transparent",
    hoverBorder: "hover:border-transparent",
  },
};

const BARE_VARIANTS: ButtonVariant[] = ["transparent", "link"];
const FILLED_BY_DEFAULT: ButtonVariant[] = ["primary", "secondary"];

const SIZES: Record<ButtonSize, { text: string; box: string; iconOnly: string; icon: string }> = {
  sm: { text: "text-xs", box: "py-1 px-3", iconOnly: "p-1.5", icon: "w-4" },
  md: { text: "text-sm", box: "py-1.5 px-4", iconOnly: "p-2", icon: "w-5" },
  lg: { text: "text-base", box: "py-2.5 px-6", iconOnly: "p-3", icon: "w-6" },
};

const join = (...parts: Array<string | false | undefined | null>) =>
  parts.filter(Boolean).join(" ");

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      btnText,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      iconSize,
      textColor,
      hoverTextColor,
      bgColor,
      hoverBgColor,
      borderColor,
      hoverBorderColor,
      isDisabled = false,
      onDisabledText,
      isLoading = false,
      loadingText,
      fullWidth,
      ariaLabel,
      className,
      type = "button",
      onClick,
      ...rest
    },
    ref,
  ) => {
    const palette = PALETTES[variant];
    const sizing = SIZES[size];
    const isBare = BARE_VARIANTS.includes(variant);
    const isIconOnly = !btnText && !onDisabledText && !loadingText;
    const blocked = isDisabled || isLoading;
    const stretch = fullWidth ?? FILLED_BY_DEFAULT.includes(variant);
    const iconClass = iconSize ?? sizing.icon;

    const label = isLoading
      ? (loadingText ?? btnText)
      : isDisabled
        ? (onDisabledText ?? btnText)
        : btnText;

    const classes = join(
      "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium",
      "transition-all duration-300 outline-none select-none",
      "focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
      stretch ? "w-full" : "w-fit",
      sizing.text,
      isBare ? "h-fit" : isIconOnly ? sizing.iconOnly : sizing.box,
      !isBare && "border",
      bgColor ?? palette.bg,
      textColor ?? palette.text,
      borderColor ?? palette.border,
      blocked
        ? "opacity-60 cursor-not-allowed"
        : join(
            "cursor-pointer hover:font-semibold active:scale-95",
            hoverBgColor ?? palette.hoverBg,
            hoverTextColor ?? palette.hoverText,
            !isBare && (hoverBorderColor ?? palette.hoverBorder),
            variant === "link" && "hover:underline underline-offset-4",
          ),
      className,
    );

    const renderIcon = (Icon?: LucideIcon) =>
      Icon ? <Icon className={iconClass} aria-hidden="true" /> : null;

    return (
      <button
        ref={ref}
        type={type}
        disabled={blocked}
        aria-busy={isLoading || undefined}
        aria-label={ariaLabel}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {isLoading ? (
          <Loader2 className={join(iconClass, "animate-spin")} aria-hidden="true" />
        ) : (
          renderIcon(LeadingIcon)
        )}
        {label && <span>{label}</span>}
        {!isLoading && renderIcon(TrailingIcon)}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;


type IconButtonProps = Omit<ButtonProps, "btnText" | "leadingIcon" | "trailingIcon" | "ariaLabel"> & {
  icon: LucideIcon;
  ariaLabel: string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = "secondary", fullWidth = false, ...props }, ref) => (
    <Button ref={ref} variant={variant} fullWidth={fullWidth} leadingIcon={icon} {...props} />
  ),
);

IconButton.displayName = "IconButton";

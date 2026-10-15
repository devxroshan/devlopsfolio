import { LucideIcon, Variable } from "lucide-react";
import React from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  btnText: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  onClick?: () => void;
}

const Button = ({
  variant,
  btnText,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onClick,
}: ButtonProps) => {
  return (
    <>
      {variant == "primary" && (
        <button
          className="w-full flex items-center justify-center gap-1 cursor-pointer text-sm bg-white rounded-lg py-1.5 text-black font-medium hover:font-semibold transition-all duration-300 outline-none hover:bg-white/80 active:scale-95"
          onClick={onClick}
        >
          {LeadingIcon && <LeadingIcon className="w-5" />}
          <span>{btnText}</span>
          {TrailingIcon && <TrailingIcon className="w-5" />}
        </button>
      )}
    </>
  );
};

export default Button;

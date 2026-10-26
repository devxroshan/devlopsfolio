import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type FocusEventHandler,
  type Ref,
} from "react";
import { ChevronDown, Eye, EyeClosed, type LucideIcon } from "lucide-react";

export type InputSize = "sm" | "md" | "lg";
export interface SelectOption {
  label: string;
  value: string;
}

interface BaseProps {
  label: string;
  hint?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  value: string | number;
  id?: string;
  name?: string;
  required?: boolean;
  isDisabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  onBlur?: FocusEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  className?: string;
}

interface TextInputProps extends BaseProps {
  variant: "primary" | "password";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface NumberInputProps extends BaseProps {
  variant: "number";
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectInputProps extends BaseProps {
  variant: "select";
  options: SelectOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

interface TextareaInputProps extends BaseProps {
  variant: "textarea";
  rows?: number;
  maxLength?: number;
  resize?: "none" | "vertical";
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export type InputProps =
  | TextInputProps
  | NumberInputProps
  | SelectInputProps
  | TextareaInputProps;

const SIZES: Record<InputSize, { box: string; text: string; icon: string }> = {
  sm: { box: "h-7", text: "text-xs", icon: "w-3.5" },
  md: { box: "h-8", text: "text-sm", icon: "w-4" },
  lg: { box: "h-10", text: "text-base", icon: "w-5" },
};

const NO_SPINNERS =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const join = (...parts: Array<string | false | undefined | null>) =>
  parts.filter(Boolean).join(" ");

const Input = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  const {
    variant,
    label,
    hint,
    helperText,
    error,
    size = "md",
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    value,
    id,
    name,
    required,
    isDisabled = false,
    readOnly,
    autoFocus,
    autoComplete,
    onBlur,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;
  const hasMessage = Boolean(error || helperText);

  const sizing = SIZES[size];
  const isTextarea = props.variant === "textarea";

  const maxLength = props.variant === "textarea" ? props.maxLength : undefined;
  const showCount = maxLength !== undefined;
  const length = String(value ?? "").length;

  const iconClass = join(
    sizing.icon,
    "shrink-0 text-text-dimmed",
    isTextarea && "mt-0.5",
  );

  const boxClass = join(
    "w-full flex gap-2 px-2.5 rounded-lg border bg-surface-subtle",
    "transition-all duration-300 focus-within:ring-2 focus-within:ring-white/10",
    isTextarea ? "items-start py-2" : join("items-center", sizing.box),
    error
      ? "border-red-500/60 focus-within:border-red-500"
      : "border-border-subtle focus-within:border-border-hover",
    isDisabled && "opacity-60 cursor-not-allowed",
  );

  const fieldClass = join(
    "min-w-0 flex-1 outline-none border-none text-text-primary",
    !isTextarea && "h-full",
    "placeholder:text-text-dimmed disabled:cursor-not-allowed",
    sizing.text,
  );

  const fieldProps = {
    id: fieldId,
    name,
    required,
    disabled: isDisabled,
    autoFocus,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": hasMessage ? messageId : undefined,
  };

  const focusControl = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    e.currentTarget
      .querySelector<HTMLElement>("input, select, textarea")
      ?.focus();
  };

  const numberProps =
    props.variant === "number"
      ? { min: props.min, max: props.max, step: props.step }
      : undefined;

  return (
    <div
      className={join(
        "w-full h-fit flex flex-col gap-1 items-start justify-center",
        className,
      )}
    >
      <div className="flex w-full items-center gap-1">
        <label
          htmlFor={fieldId}
          className="text-xs text-text-secondary transition-all duration-300"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-red-400">
              *
            </span>
          )}
        </label>
        {error && (
          <span
            id={messageId}
            role="alert"
            className="text-xs text-red-400 transition-all duration-300"
          >
            - {error}
          </span>
        )}
      </div>

      <div className={boxClass} onMouseDown={focusControl}>
        {LeadingIcon && (
          <LeadingIcon className={iconClass} aria-hidden="true" />
        )}

        {props.variant === "select" ? (
          <select
            {...fieldProps}
            ref={ref as Ref<HTMLSelectElement>}
            value={value ?? ""}
            onChange={props.onChange}
            className={join(
              fieldClass,
              "appearance-none cursor-pointer bg-surface-subtle",
              value === "" && "text-text-dimmed",
            )}
          >
            <option value="" disabled>
              {hint ?? `Select ${label.toLowerCase()}`}
            </option>
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : props.variant === "textarea" ? (
          <textarea
            {...fieldProps}
            ref={ref as Ref<HTMLTextAreaElement>}
            rows={props.rows ?? 3}
            maxLength={props.maxLength}
            value={value ?? ""}
            placeholder={hint}
            readOnly={readOnly}
            autoComplete={autoComplete}
            onChange={props.onChange}
            className={join(
              fieldClass,
              "block leading-5",
              props.resize === "none" ? "resize-none" : "resize-y",
            )}
          />
        ) : (
          <input
            {...fieldProps}
            {...numberProps}
            ref={ref as Ref<HTMLInputElement>}
            type={
              variant === "number"
                ? "number"
                : variant === "password" && !showPassword
                  ? "password"
                  : "text"
            }
            value={value ?? ""}
            placeholder={hint}
            readOnly={readOnly}
            autoComplete={autoComplete}
            onChange={props.onChange}
            onWheel={
              variant === "number" ? (e) => e.currentTarget.blur() : undefined
            }
            className={join(fieldClass, variant === "number" && NO_SPINNERS)}
          />
        )}

        {variant === "password" ? (
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="shrink-0 rounded text-text-dimmed hover:text-text-secondary transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed"
          >
            {showPassword ? (
              <Eye className={sizing.icon} aria-hidden="true" />
            ) : (
              <EyeClosed className={sizing.icon} aria-hidden="true" />
            )}
          </button>
        ) : TrailingIcon ? (
          <TrailingIcon className={iconClass} aria-hidden="true" />
        ) : variant === "select" ? (
          <ChevronDown
            className={join(iconClass, "pointer-events-none")}
            aria-hidden="true"
          />
        ) : null}
      </div>

      {((!error && helperText) || showCount) && (
        <div className="flex w-full items-start justify-between gap-2">
          {!error && helperText ? (
            <span id={messageId} className="text-xs text-text-dimmed">
              {helperText}
            </span>
          ) : (
            <span />
          )}
          {showCount && (
            <span
              className={join(
                "text-xs tabular-nums",
                length >= maxLength ? "text-red-400" : "text-text-dimmed",
              )}
            >
              {length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

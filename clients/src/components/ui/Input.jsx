import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";

const Input = forwardRef(function Input(
  { label, placeholder = "", error, endAdornment, className = "", id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={`h-11 w-full rounded-md border bg-surface px-3 text-sm text-ink
            placeholder:text-muted
            focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary
            ${endAdornment ? "pr-20" : ""}
            ${error ? "border-danger" : "border-border"}`}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {endAdornment}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-danger">
          <AlertCircle className="mt-px h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;

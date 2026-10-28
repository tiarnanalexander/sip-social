import type { ComponentPropsWithoutRef } from "react";

const inputClass =
  "w-full rounded-xl border-2 border-cream-edge bg-cream px-4 py-3 text-[0.95rem] text-ink " +
  "placeholder:text-stone/60 transition-colors focus:border-ink focus:outline-none " +
  "aria-[invalid=true]:border-red-700";

export function Field({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold">
        {label}
        {!required && <span className="font-normal text-stone"> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mt-0.5 text-xs text-stone">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  error,
  hint,
  ...props
}: { error?: string; hint?: string } & ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={inputClass}
      aria-invalid={!!error}
      aria-describedby={[hint && `${props.name}-hint`, error && `${props.name}-error`].filter(Boolean).join(" ") || undefined}
    />
  );
}

export function TextArea({
  error,
  hint,
  ...props
}: { error?: string; hint?: string } & ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      {...props}
      className={`${inputClass} resize-y`}
      aria-invalid={!!error}
      aria-describedby={[hint && `${props.name}-hint`, error && `${props.name}-error`].filter(Boolean).join(" ") || undefined}
    />
  );
}

export function Select({
  error,
  hint,
  children,
  ...props
}: { error?: string; hint?: string; children: React.ReactNode } & ComponentPropsWithoutRef<"select">) {
  return (
    <select
      {...props}
      className={`${inputClass} pr-10`}
      aria-invalid={!!error}
      aria-describedby={[hint && `${props.name}-hint`, error && `${props.name}-error`].filter(Boolean).join(" ") || undefined}
    >
      {children}
    </select>
  );
}

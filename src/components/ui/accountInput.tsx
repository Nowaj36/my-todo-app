import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <span className="text-sm font-medium text-[#0C0C0C]">{label}</span>
      )}

      <input
        ref={ref}
        className={`border border-[#D1D5DB] rounded-lg p-2.5 text-sm outline-none text-black caret-black ${className}`}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
);

Input.displayName = "Input";

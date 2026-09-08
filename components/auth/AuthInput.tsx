"use client";

import { InputHTMLAttributes } from "react";

interface AuthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({
  label,
  id,
  ...props
}: AuthInputProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <input id={id} {...props} />
    </div>
  );
}
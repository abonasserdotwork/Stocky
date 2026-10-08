

import { CircleAlert, CircleCheck } from "lucide-react";

export default function Alert({ message, type = "error" }) {
  const isError = type === "error";
  const Icon = isError ? CircleAlert : CircleCheck;
  const alertClass = isError ? "bg-danger-soft" : "bg-success-soft";

  return (
    <div
      className={`flex items-center gap-2 rounded-md px-3 py-2 ${alertClass} text-ink`}
      role="alert"
    >
      <Icon className={` ${isError ? "text-danger" : "text-success"} flex-shrink-0`} size={18} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
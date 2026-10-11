import { forwardRef, useState } from "react";
import Input from "./Input";

const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          className="rounded-sm px-2 py-1 text-xs font-semibold text-primary
            hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-primary"
        >
          {visible ? "Hide" : "Show"}
        </button>
      }
      {...props}
    />
  );
});

export default PasswordInput;
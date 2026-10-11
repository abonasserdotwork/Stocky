const variantClasses = {
  default: {
    container: "",
    input:
      "w-full rounded-lg border-2 border-border-color bg-surface px-3 py-2 my-2 h-11 placeholder:text-muted placeholder:opacity-70",
  },
  search: {
    container:
      "flex h-[26px] min-w-0 max-w-[360px] flex-1 items-center gap-2 rounded-md border border-border-color bg-page px-2",
    input:
      "w-full min-w-0 bg-transparent text-[10px] text-ink outline-none placeholder:text-muted",
  },
};

export default function Input({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  variant = "default",
  labelClassName = "",
  leadingIcon,
}) {
  const styles = variantClasses[variant] ?? variantClasses.default;

  return (
    <div className={styles.container}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-muted mb-1 ${labelClassName}`}
      >
        {name}
      </label>
      {leadingIcon}
      <input
        className={styles.input}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

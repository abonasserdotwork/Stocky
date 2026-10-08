export default function Input({ name, placeholder, type = "text"}) {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {name}
      </label>
      <input
        className="w-full border-solid border-2 border-border-color bg-surface placeholder:text-muted placeholder:opacity-70 rounded-lg my-2 px-3 py-2 h-44px"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}

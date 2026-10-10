import Input from "./Input";

export default function PasswordInput({ name, placeholder }) {
  return (
    <div className="relative">
      <Input
        name={name}
        placeholder={placeholder}
        type="password"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 text-md text-primary hover:text-primary-hover hover:cursor-pointer"
        onClick={() => {
          const input = document.getElementById(name);
          if (input) {
            input.type = input.type === "password" ? "text" : "password";
          }
        }}
      >
        Show
      </button>
    </div>
  );
}

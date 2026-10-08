

export default function AuthCard({ children }) {
  return (
    <div className="p-[32px] flex flex-col gap-4 border-solid border-2 border-border-color max-w-[420px] mx-auto mt-20 bg-surface rounded-2xl shadow-lg">
      {children}
    </div>
  );
}
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 md:w-1/2 md:max-w-sm">
      {children}
    </div>
  );
}

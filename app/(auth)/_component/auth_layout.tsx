export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm rounded-large border border-divider bg-content2 p-6 shadow-large sm:p-8">
        {children}
      </div>
    </div>
  );
}

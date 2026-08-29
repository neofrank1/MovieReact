export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
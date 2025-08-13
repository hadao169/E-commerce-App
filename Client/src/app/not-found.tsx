import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p className="text-destructive">Could not find requested resource</p>
        <Link href="/" className="px-4 py-2 bg-gray-400 rounded-md cursor-pointer hover:opacity-70 transition-all">
          Return Home
        </Link>
      </div>
    </div>
  );
}

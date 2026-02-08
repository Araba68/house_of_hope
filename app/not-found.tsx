import Link from "next/link";
import { Search } from "lucide-react";

export const metadata = {
  title: "Page Not Found — House of Hope",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Search size={64} className="text-yellow-500" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          We&apos;re sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition text-center"
          >
            Go home
          </Link>

          <Link
            href="/gallery"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold transition"
          >
            View gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-8xl font-bold text-accent">404</p>
        <p className="text-xl">找不到您要的頁面</p>
        <p className="text-gray-500">您要找的頁面可能已移動或不存在</p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          回到首頁
        </Link>
      </div>
    </div>
  );
}

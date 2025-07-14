import { ReactNode } from "react";
import Link from "next/link";
import { FaFolder, FaUser, FaCog } from "react-icons/fa";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">

      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">ResearchMate</div>

        <nav className="flex-1 space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 hover:underline">
            <FaFolder /> Projects
          </Link>
          <Link href="/profile" className="flex items-center gap-2 hover:underline">
            <FaUser /> Profile
          </Link>
          <Link href="/settings" className="flex items-center gap-2 hover:underline">
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

    
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

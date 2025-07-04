'use client';

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b">
      <div className="text-xl font-bold">ResearchMate</div>
      <Button variant="outline">Login</Button>
    </nav>
  );
}

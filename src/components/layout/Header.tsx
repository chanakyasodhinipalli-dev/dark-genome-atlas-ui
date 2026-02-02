"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { RESOURCES } from "@/lib/constants";

interface HeaderProps {
  userName?: string;
  onLogout: () => void;
  currentPage?: "dashboard" | "chat";
}

export function Header({ userName, onLogout, currentPage = "dashboard" }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-slate-200 bg-black shadow-sm">
      <div className="flex h-full w-full items-center justify-between px-6">
        <div className="flex h-full items-center py-2">
          <Image
            src={RESOURCES.darkGenomeAtlasLogo}
            alt="Deep Genome Atlas"
            width={800}
            height={48}
            className="h-full w-auto"
            unoptimized
            priority
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white">
            Welcome, {userName}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="border-white bg-white text-slate-900 hover:bg-slate-100"
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/chat")}
            className="border-white bg-white text-slate-900 hover:bg-slate-100"
          >
            Smart Chat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-white bg-white text-slate-900 hover:bg-slate-100"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

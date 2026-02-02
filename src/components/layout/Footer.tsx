import Image from "next/image";
import { RESOURCES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full border-t border-slate-200 bg-white py-4 z-40">
      <div className="w-full px-6 text-center">
        <Image
          src={RESOURCES.poweredByLogo}
          alt="Deep Gene Atlas — Powered by AI.MeD"
          width={200}
          height={20}
          className="mx-auto opacity-60"
          style={{ width: "auto", height: "20px" }}
          unoptimized
          priority
        />
      </div>
    </footer>
  );
}

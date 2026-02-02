"use client";

import Image from "next/image";
import { LoginForm } from "@/components/auth";
import { RESOURCES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${RESOURCES.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content - Login Card positioned to right center */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-12 py-12">
        {/* Login Card */}
        <main className="animate-fadeIn w-full max-w-md">
          <LoginForm />
        </main>
      </div>

      {/* Footer - Bottom Center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Image
          src={RESOURCES.poweredByLogo}
          alt="Deep Genome Atlas  — Powered by AI.MeD"
          width={200}
          height={20}
          className="h-5 w-auto opacity-70"
          unoptimized
          priority
        />
      </div>

      {/* AI.MeD Logo - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Image
          src={RESOURCES.aimedLogo}
          alt="AI.MeD"
          width={100}
          height={40}
          className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}

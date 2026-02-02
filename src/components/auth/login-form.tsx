"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, CardHeader, Separator } from "@/components/ui";
import { GoogleIcon, BuildingIcon, LoaderIcon } from "@/components/ui/icons";
import { useAuthStore } from "@/stores/auth-store";
import { RESOURCES } from "@/lib/constants";

/**
 * ===========================================
 * LOGIN CARD SIZE CONFIGURATION
 * ===========================================
 * Adjust these values to change the card dimensions:
 * - CARD_WIDTH_PERCENT: Width as percentage of viewport width (vw)
 * - CARD_HEIGHT_PERCENT: Minimum height as percentage of viewport height (vh)
 * - CARD_MIN_WIDTH: Minimum width in pixels (prevents card from being too narrow)
 * - CARD_MAX_WIDTH: Maximum width in pixels (prevents card from being too wide)
 *
 * Examples:
 *   30vw = 30% of screen width
 *   50vh = 50% of screen height
 */
const CARD_WIDTH_PERCENT = 30;   // Change this to adjust width (e.g., 25, 30, 35, 40)
const CARD_HEIGHT_PERCENT = 50;  // Change this to adjust height (e.g., 40, 50, 60, 70)
const CARD_MIN_WIDTH = 380;      // Minimum width in pixels
const CARD_MAX_WIDTH = 500;      // Maximum width in pixels

export function LoginForm() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { login, setLoading } = useAuthStore();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    setLoading(true);
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
    // Simulating login for demo
    setTimeout(() => {
      login({
        id: "1",
        email: "user@gmail.com",
        name: "Demo User",
        provider: "google",
      });
      setIsLoading(false);
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    }, 1000);
  };

  const handleEnterpriseLogin = () => {
    setErrorMessage("MVP is limited to Google SSO login only. Please use 'Continue with Google' to sign in.");
  };

  const handleEmailLogin = () => {
    setErrorMessage("MVP is limited to Google SSO login only. Please use 'Continue with Google' to sign in.");
  };

  const dismissError = () => {
    setErrorMessage(null);
  };

  return (
    <Card
      className="relative overflow-hidden bg-white shadow-xl flex flex-col"
      style={{
        width: `${CARD_WIDTH_PERCENT}vw`,
        minWidth: `${CARD_MIN_WIDTH}px`,
        maxWidth: `${CARD_MAX_WIDTH}px`,
        minHeight: `${CARD_HEIGHT_PERCENT}vh`,
      }}
    >
      {/* Background Logo 
      <div className="absolute inset-0 z-0 flex items-center justify-center p-8">
        <Image
          src={RESOURCES.darkGenomeAtlasLogoOnly}
          alt=""
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>*/}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col flex-grow">
        <CardHeader className="space-y-4 text-center px-8 pt-10 pb-4 flex-shrink-0">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-slate-900">
            Deep Genome Atlas
          </h1>
          {/*<div className="relative w-full h-[30%] min-h-[80px]">
              <Image
                src={RESOURCES.darkGenomeAtlasLogo}
                alt="Deep Genome Atlas"
                fill
                className="object-contain"
                unoptimized
                priority
              />
          </div>*/}
          <p className="text-sm text-slate-500">
            Sign in to access your research.
          </p>
        </CardHeader>

      <CardContent className="px-8 pb-10 pt-4 flex-grow flex flex-col justify-center">
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-amber-800">{errorMessage}</p>
                <button
                  onClick={dismissError}
                  className="mt-2 text-xs text-amber-600 hover:text-amber-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center space-y-8">
          {/* Google Sign In */}
          <Button
            variant="google"
            size="lg"
            className="w-4/5"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderIcon size={20} />
                Signing in...
              </>
            ) : (
              <>
                <GoogleIcon size={20} />
                Continue with Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative w-full py-2">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Enterprise Login */}
          <Button
            variant="outline"
            size="lg"
            className="w-4/5"
            onClick={handleEnterpriseLogin}
          >
            <BuildingIcon size={20} />
            Enterprise / Institutional Login
          </Button>

          {/* Email Login Link */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleEmailLogin}
              className="text-sm text-slate-500 hover:text-slate-700 underline-offset-4 hover:underline transition-colors"
            >
              Or sign in with email
            </button>
          </div>
        </div>
      </CardContent>
      </div>
    </Card>
  );
}

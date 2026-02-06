"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RESOURCES } from "@/lib/constants";
import { useAnalytics } from "@/hooks/useAnalytics";
import { AnalyticsDashboard } from "@/components/analytics";
import { Header, Footer } from "@/components/layout";

export default function DashboardPage() {
  const { user, isAuthenticated, logout, hasHydrated } = useAuthStore();
  const router = useRouter();
  const { data: analyticsData, loading: analyticsLoading, error: analyticsError, usingFallback } = useAnalytics();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (hasHydrated && !isAuthenticated) {
      router.push("/");
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Show nothing while hydrating or if not authenticated
  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header userName={user?.name} onLogout={handleLogout} currentPage="dashboard" />

      {/* Main Content */}
      <main
        className="fixed left-0 right-0 top-16 bottom-0 overflow-auto"
        style={{
          backgroundImage: `url(${RESOURCES.dashboardBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex flex-col items-center px-6 pt-10 pb-16">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 text-transparent bg-clip-text drop-shadow-sm">
            Welcome to Deep Genome Atlas
          </h1>

          <h2 className="text-2xl font-semibold mt-2">
            <span className="text-purple-900">Explore</span> <span className="text-rose-800">the Deep</span> <span className="text-indigo-900">Proteome</span>
          </h2>

          <p className="mt-6 text-lg max-w-4xl text-center text-slate-800">
            An <strong className="text-violet-900">Agentic AI-Powered Interactive Atlas</strong> for <span className="text-cyan-800">Non-Expressed DNA</span>,{" "}
            <span className="text-blue-900">Non-Translating RNA</span>, <span className="text-purple-900">Novel Proteins</span>, and <span className="text-indigo-900">Pseudogenes</span>
          </p>

          <p className="mt-4 text-base max-w-4xl text-center text-slate-800">
            <span className="text-amber-800">Uncover</span> the <span className="text-purple-900">hidden functional potential</span> of the <span className="text-indigo-900">genome</span>.
          </p>

          <p className="mt-2 text-base max-w-4xl text-center text-slate-800">
            <span className="text-cyan-800">Explore, analyze, and understand</span> <em className="text-purple-900">deep</em> (formerly termed &quot;<em className="text-purple-900">dark</em>&quot;){" "}
            <span className="text-indigo-900">genomic and proteomic elements</span>—including <span className="text-blue-900">non-expressed and non-translating sequences</span>—through{" "}
            <strong className="text-violet-900">AI-driven discovery, reasoning, and biological insight</strong>.
          </p>

          <p className="mt-2 mb-16 text-base max-w-4xl text-center text-slate-800">
            In this atlas, &quot;<em className="text-purple-900">dark</em>&quot; or &quot;<em className="text-purple-900">deep</em>&quot; genome refers specifically to{" "}
            <span className="text-cyan-800">non-expressed DNA</span> and <span className="text-blue-900">non-translating RNA</span>, consistent with our original and recent publications.
          </p>

          {/* Divider */}
          <div className="w-full max-w-4xl mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Analytics Dashboard */}
          {analyticsLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-700">Loading analytics...</p>
            </div>
          )}

          {analyticsError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Analytics</h3>
              <p className="text-red-600">{analyticsError}</p>
            </div>
          )}

          {usingFallback && !analyticsError && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> API server is unavailable. Displaying sample analytics data.
                </p>
              </div>
            </div>
          )}

          {analyticsData && <AnalyticsDashboard data={analyticsData} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

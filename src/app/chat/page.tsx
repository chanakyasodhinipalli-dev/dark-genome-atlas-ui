"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RESOURCES } from "@/lib/constants";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { useChat } from "@/hooks/useChat";
import { ChatResponse } from "@/components/chat";

export default function ChatPage() {
  const { user, isAuthenticated, logout, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { response, loading, error, usingFallback, sendMessage, reset: resetChat } = useChat();

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

  const handleSendMessage = async () => {
    if (message.trim()) {
      await sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessage("");
    resetChat();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header userName={user?.name} onLogout={handleLogout} currentPage="chat" />

      <br></br>

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
        <div className="w-full h-full flex flex-col px-6 pt-10 pb-20">
          <div className="w-full">
          {/* Chat Interface */}
          
          <br></br>

          <div className="mt-2 w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-6">
            <div className="flex gap-4 items-center">
              {/* Text Area */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about the deep genome, proteins, or genomic elements..."
                className="flex-1 min-h-[60px] p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                rows={2}
              />

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Send Button */}
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || loading}
                  className="w-40 px-6 py-3 h-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2 justify-center">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                    <span>{loading ? "Sending..." : "Send"}</span>
                  </div>
                </Button>

                {/* Reset Button */}
                <Button
                  onClick={handleReset}
                  disabled={!message.trim()}
                  className="w-40 px-6 py-3 h-auto bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Reset</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Helper Text */}
            <p className="mt-4 text-sm text-gray-500 text-center">
              Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd> to send, <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
          </div>

          <br></br>

          {/* Error Message */}
          {error && (
            <div className="mt-8 w-full bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-800">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            </div>
          )}

          {/* Fallback Warning */}
          {usingFallback && !error && (
            <div className="mt-8 w-full bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> API server is unavailable. Displaying sample response data for TP53.
                </p>
              </div>
            </div>
          )}

          {/* Chat Response */}
          {response && (
            <div className="mt-10">
              <ChatResponse response={response} />
            </div>
          )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

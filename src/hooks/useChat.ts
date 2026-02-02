import { useState } from "react";
import type { ChatResponse } from "@/types";
import { API_ENDPOINTS } from "@/lib/constants";

export function useChat() {
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const sendMessage = async (message: string, sessionId?: string) => {
    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      const response = await fetch(API_ENDPOINTS.chat.run, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          session_id: sessionId || `sess_${Date.now()}`,
        }),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const chatResponse: ChatResponse = await response.json();
      setResponse(chatResponse);
      return chatResponse;
    } catch (err) {
      console.warn("Failed to fetch from API, falling back to sample data:", err);

      // Fallback to sample JSON data
      try {
        const fallbackResponse = await fetch("/sample-chat-response.json");

        if (!fallbackResponse.ok) {
          throw new Error("Failed to load fallback data");
        }

        const fallbackData: ChatResponse = await fallbackResponse.json();
        setResponse(fallbackData);
        setError(null);
        setUsingFallback(true);
        console.log("Chat response loaded from sample JSON (fallback)");
        return fallbackData;
      } catch (fallbackErr) {
        const errorMessage =
          fallbackErr instanceof Error ? fallbackErr.message : "Failed to send message";
        setError(errorMessage);
        console.error("Failed to load fallback data:", fallbackErr);
        return null;
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResponse(null);
    setError(null);
    setUsingFallback(false);
  };

  return { response, loading, error, usingFallback, sendMessage, reset };
}

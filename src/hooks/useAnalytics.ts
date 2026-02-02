import { useEffect, useState } from "react";
import type { AnalyticsData } from "@/types";
import { API_ENDPOINTS } from "@/lib/constants";

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);

        // Try to fetch from the API endpoint
        const response = await fetch(API_ENDPOINTS.analytics.dashboard, {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const analyticsData = await response.json();
        setData(analyticsData);
        setError(null);
        setUsingFallback(false);
        console.log("Analytics data loaded from API");
      } catch (err) {
        console.warn("Failed to fetch from API, falling back to sample data:", err);

        // Fallback to sample JSON data
        try {
          const fallbackResponse = await fetch("/sample-analytics.json");

          if (!fallbackResponse.ok) {
            throw new Error("Failed to load fallback data");
          }

          const fallbackData = await fallbackResponse.json();
          setData(fallbackData);
          setError(null);
          setUsingFallback(true);
          console.log("Analytics data loaded from sample JSON (fallback)");
        } catch (fallbackErr) {
          setError(
            fallbackErr instanceof Error
              ? fallbackErr.message
              : "Failed to load analytics data"
          );
          console.error("Failed to load fallback data:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  return { data, loading, error, usingFallback };
}

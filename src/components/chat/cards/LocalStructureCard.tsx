"use client";

import { useState, useEffect } from "react";
import type { UICard, CardField, LocalAssets } from "@/types";
import { API_ENDPOINTS, SESSION_LIMITS } from "@/lib/constants";

interface LocalStructureCardProps {
  data: UICard;
  localAssets?: LocalAssets | null;
}

// Session storage keys for tracking usage
const DOWNLOAD_COUNT_KEY = "deepGenomeAtlas_downloadCount";
const VIEW_COUNT_KEY = "deepGenomeAtlas_viewCount";

function getSessionCount(key: string): number {
  if (typeof window === "undefined") return 0;
  const count = sessionStorage.getItem(key);
  return count ? parseInt(count, 10) : 0;
}

function incrementSessionCount(key: string): number {
  const current = getSessionCount(key);
  const newCount = current + 1;
  sessionStorage.setItem(key, newCount.toString());
  return newCount;
}

function getRemainingCount(key: string, limit: number): number {
  return Math.max(0, limit - getSessionCount(key));
}

export function LocalStructureCard({ data, localAssets }: LocalStructureCardProps) {
  const fields = data.fields as CardField[];

  // State for image modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // State for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"download" | "view" | null>(null);
  const [remainingDownloads, setRemainingDownloads] = useState<number>(SESSION_LIMITS.freeDownloadsPerSession);
  const [remainingViews, setRemainingViews] = useState<number>(SESSION_LIMITS.freeViewsPerSession);

  // Update remaining counts on mount and after actions
  useEffect(() => {
    setRemainingDownloads(getRemainingCount(DOWNLOAD_COUNT_KEY, SESSION_LIMITS.freeDownloadsPerSession));
    setRemainingViews(getRemainingCount(VIEW_COUNT_KEY, SESSION_LIMITS.freeViewsPerSession));
  }, []);

  // Build full URLs using configurable base URL
  const buildFullUrl = (relativePath: string | undefined): string | undefined => {
    if (!relativePath) return undefined;
    // If already a full URL, return as-is
    if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
      return relativePath;
    }
    // Build from base URL
    return `${API_ENDPOINTS.localStructure.baseUrl}${relativePath}`;
  };

  // Extract URLs from fields or use localAssets
  const rawPdbUrl = localAssets?.pdb_url || fields.find(f => f.label === "PDB File")?.value;
  const rawImageUrl = localAssets?.image_url || fields.find(f => f.label === "Structure Image")?.value;

  const pdbUrl = buildFullUrl(rawPdbUrl);
  const imageUrl = buildFullUrl(rawImageUrl);
  const proteinId = localAssets?.protein_id;
  const description = localAssets?.description;

  const handleDownloadPdb = () => {
    const remaining = getRemainingCount(DOWNLOAD_COUNT_KEY, SESSION_LIMITS.freeDownloadsPerSession);
    setRemainingDownloads(remaining);

    if (remaining <= 0) {
      // No free downloads remaining - show pay-per-view message
      setConfirmAction("download");
      setShowConfirmDialog(true);
      return;
    }

    // Show confirmation with remaining balance
    setConfirmAction("download");
    setShowConfirmDialog(true);
  };

  const handleViewImage = () => {
    const remaining = getRemainingCount(VIEW_COUNT_KEY, SESSION_LIMITS.freeViewsPerSession);
    setRemainingViews(remaining);

    if (remaining <= 0) {
      // No free views remaining - show pay-per-view message
      setConfirmAction("view");
      setShowConfirmDialog(true);
      return;
    }

    // Show confirmation with remaining balance
    setConfirmAction("view");
    setShowConfirmDialog(true);
  };

  const confirmDownload = () => {
    if (pdbUrl && remainingDownloads > 0) {
      incrementSessionCount(DOWNLOAD_COUNT_KEY);
      setRemainingDownloads(prev => prev - 1);

      // Create a download link
      const link = document.createElement("a");
      link.href = pdbUrl;
      link.download = `${proteinId || "structure"}.pdb`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const confirmView = () => {
    if (imageUrl && remainingViews > 0) {
      incrementSessionCount(VIEW_COUNT_KEY);
      setRemainingViews(prev => prev - 1);
      setIsImageModalOpen(true);
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const handleConfirm = () => {
    if (confirmAction === "download") {
      confirmDownload();
    } else if (confirmAction === "view") {
      confirmView();
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const isOutOfFreeUsage = confirmAction === "download"
    ? remainingDownloads <= 0
    : remainingViews <= 0;

  return (
    <>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-md p-6 border border-amber-200">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
          <div className="flex gap-2">
            {data.source_badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}

        {/* Fields */}
        <div className="space-y-3 mb-4">
          {fields.map((field, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-sm font-medium text-gray-600 w-40">
                {field.label}:
              </span>
              <div className="flex-1">
                {field.type === "link" && field.url ? (
                  <a
                    href={field.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {field.value}
                  </a>
                ) : (
                  <span className="text-sm text-gray-900 break-all">{field.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Info */}
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800">
            <strong>Session Balance:</strong> {remainingDownloads} free download{remainingDownloads !== 1 ? "s" : ""} | {remainingViews} free view{remainingViews !== 1 ? "s" : ""} remaining
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-amber-200">
          {pdbUrl && (
            <button
              onClick={handleDownloadPdb}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDB File
            </button>
          )}
          {imageUrl && (
            <button
              onClick={handleViewImage}
              className="px-4 py-2 text-sm font-medium text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Full Image
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              {isOutOfFreeUsage ? (
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {isOutOfFreeUsage ? "Free Limit Reached" : "Confirm Action"}
              </h3>
            </div>

            {isOutOfFreeUsage ? (
              <div className="mb-6">
                <p className="text-gray-700 mb-3">
                  You have used all your free {confirmAction === "download" ? "downloads" : "image views"} for this session.
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-sm text-indigo-800 font-medium mb-2">
                    🚀 Upgrade to Pay-Per-View
                  </p>
                  <p className="text-sm text-indigo-700">
                    Continue accessing PDB files and structure images with our flexible pay-per-view model.
                    Only pay for what you use.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-gray-700 mb-3">
                  {confirmAction === "download"
                    ? "You are about to download a PDB file."
                    : "You are about to view the full structure image."}
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    <strong>Remaining balance:</strong>{" "}
                    {confirmAction === "download"
                      ? `${remainingDownloads} free download${remainingDownloads !== 1 ? "s" : ""}`
                      : `${remainingViews} free view${remainingViews !== 1 ? "s" : ""}`}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    After using your free allowance, you&apos;ll need to use our pay-per-view model.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              {!isOutOfFreeUsage && (
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {confirmAction === "download" ? "Download" : "View Image"}
                </button>
              )}
              {isOutOfFreeUsage && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Learn About Pay-Per-View
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Modal/Popup */}
      {isImageModalOpen && imageUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image container */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
                <h4 className="text-lg font-semibold text-gray-900">
                  {proteinId ? `Structure: ${proteinId}` : "Protein Structure"}
                </h4>
                {description && (
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}
              </div>
              <div className="p-4 bg-gray-50">
                <img
                  src={imageUrl}
                  alt={`Full structure visualization for ${proteinId || "protein"}`}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

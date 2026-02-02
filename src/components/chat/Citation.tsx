import type { Citation as CitationType } from "@/types";

interface CitationProps {
  citation: CitationType;
  index: number;
}

export function Citation({ citation, index }: CitationProps) {
  const getSourceColor = () => {
    switch (citation.source) {
      case "UniProt":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "AlphaFold DB":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "PDB":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ChEMBL":
        return "bg-green-100 text-green-800 border-green-200";
      case "Local":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "RAG":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-medium text-gray-700">
            {index + 1}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded border ${getSourceColor()}`}
            >
              {citation.source}
            </span>
            {citation.evidence_id && (
              <span className="text-xs text-gray-500 font-mono">
                {citation.evidence_id}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 mb-2">{citation.snippet}</p>
          {citation.url && (
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-800 underline"
            >
              View Source →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

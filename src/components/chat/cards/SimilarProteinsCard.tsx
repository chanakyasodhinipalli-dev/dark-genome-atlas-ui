import type { UICard, SimilarProteinField } from "@/types";

interface SimilarProteinsCardProps {
  data: UICard;
}

export function SimilarProteinsCard({ data }: SimilarProteinsCardProps) {
  const proteins = data.fields as SimilarProteinField[];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-md p-6 border border-pink-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {proteins.map((protein, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-4 border border-pink-100 hover:border-pink-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">
                    {protein.gene_symbol}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({protein.accession})
                  </span>
                  <span
                    className={`ml-auto px-2 py-1 text-xs font-medium rounded ${
                      protein.similarity_score >= 0.9
                        ? "bg-green-100 text-green-800"
                        : protein.similarity_score >= 0.7
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {(protein.similarity_score * 100).toFixed(1)}% similar
                  </span>
                </div>
                <p className="text-sm text-gray-700">{protein.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Method: {protein.method.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

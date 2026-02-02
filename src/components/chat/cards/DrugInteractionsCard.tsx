import type { UICard, DrugInteractionField } from "@/types";

interface DrugInteractionsCardProps {
  data: UICard;
}

export function DrugInteractionsCard({ data }: DrugInteractionsCardProps) {
  const drugs = data.fields as DrugInteractionField[];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-md p-6 border border-emerald-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {drugs.map((drug, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-4 border border-emerald-100 hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <a
                  href={drug.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-emerald-600 hover:text-emerald-800"
                >
                  {drug.compound_name}
                </a>
                <span className="ml-2 text-sm text-gray-500">
                  ({drug.chembl_id})
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${
                  drug.phase.includes("Phase 3") || drug.phase.includes("Phase 2")
                    ? "bg-green-100 text-green-800"
                    : drug.phase.includes("Phase 1")
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {drug.phase}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{drug.activity}</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="font-medium">{drug.target_activity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

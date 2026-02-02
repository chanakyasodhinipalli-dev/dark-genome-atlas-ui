import type { UICard, CardField } from "@/types";

interface ProteinSummaryCardProps {
  data: UICard;
}

export function ProteinSummaryCard({ data }: ProteinSummaryCardProps) {
  const fields = data.fields as CardField[];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {fields.map((field, idx) => (
          <div key={idx} className="flex items-start">
            <span className="text-sm font-medium text-gray-600 w-48">
              {field.label}:
            </span>
            <div className="flex-1">
              {field.type === "link" && field.url ? (
                <a
                  href={field.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 underline"
                >
                  {field.value}
                </a>
              ) : field.type === "badge" ? (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    field.color === "blue"
                      ? "bg-blue-100 text-blue-800"
                      : field.color === "green"
                      ? "bg-green-100 text-green-800"
                      : field.color === "red"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {field.value}
                </span>
              ) : field.type === "badge_list" && field.badges ? (
                <div className="flex gap-2 flex-wrap">
                  {field.badges.map((badge, badgeIdx) => (
                    <span
                      key={badgeIdx}
                      className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-900">{field.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

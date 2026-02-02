import type { UICard, CardField } from "@/types";

interface StructureSummaryCardProps {
  data: UICard;
}

export function StructureSummaryCard({ data }: StructureSummaryCardProps) {
  const fields = data.fields as CardField[];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-md p-6 border border-purple-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
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
              {field.type === "status" ? (
                <span
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    field.status === "success"
                      ? "bg-green-100 text-green-800"
                      : field.status === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {field.value}
                </span>
              ) : field.type === "percentage" ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {field.value}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                    <div
                      className={`h-full ${
                        field.color === "green"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: field.value }}
                    ></div>
                  </div>
                </div>
              ) : field.type === "metric" ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {field.value}
                  </span>
                  {field.description && (
                    <span className="text-xs text-gray-500">
                      ({field.description})
                    </span>
                  )}
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

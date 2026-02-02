import type { UICard, CardField } from "@/types";

interface GenomicLocationCardProps {
  data: UICard;
}

export function GenomicLocationCard({ data }: GenomicLocationCardProps) {
  const fields = data.fields as CardField[];

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg shadow-md p-6 border border-violet-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-violet-100 text-violet-800 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-4 border border-violet-100"
          >
            <div className="text-sm font-medium text-gray-600 mb-1">
              {field.label}
            </div>
            <div className="text-lg font-bold text-gray-900">{field.value}</div>
            {field.genome_build && (
              <p className="text-xs text-gray-500 mt-1">
                Build: {field.genome_build}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

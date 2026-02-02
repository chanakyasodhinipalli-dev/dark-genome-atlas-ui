import type { UICard, CardField } from "@/types";

interface PhysicochemicalCardProps {
  data: UICard;
}

export function PhysicochemicalCard({ data }: PhysicochemicalCardProps) {
  const fields = data.fields as CardField[];

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-md p-6 border border-teal-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded"
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
            className="bg-white rounded-lg p-4 border border-teal-100"
          >
            <div className="text-sm font-medium text-gray-600 mb-1">
              {field.label}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {field.value}
              </span>
              {field.type === "badge" && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    field.color === "green"
                      ? "bg-green-100 text-green-800"
                      : field.color === "red"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {field.value}
                </span>
              )}
            </div>
            {field.description && (
              <p className="text-xs text-gray-500 mt-2">{field.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

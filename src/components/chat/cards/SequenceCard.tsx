import type { UICard, CardField } from "@/types";

interface SequenceCardProps {
  data: UICard;
}

export function SequenceCard({ data }: SequenceCardProps) {
  const fields = data.fields as CardField[];

  // Find the sequence field (usually the longest text value)
  const sequenceField = fields.find(f => f.label?.toLowerCase().includes("sequence"));
  const otherFields = fields.filter(f => f !== sequenceField);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-200">
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

      {/* Other fields (length, type, etc.) */}
      {otherFields.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {otherFields.map((field, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="text-xs font-medium text-gray-600 mb-1">
                {field.label}
              </div>
              <div className="text-sm font-bold text-gray-900">{field.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sequence display */}
      {sequenceField && (
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {sequenceField.label}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(sequenceField.value);
                alert("Sequence copied to clipboard!");
              }}
              className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
            >
              Copy Sequence
            </button>
          </div>
          <div className="bg-gray-50 rounded p-3 overflow-x-auto">
            <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap break-all">
              {sequenceField.value}
            </pre>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Length: {sequenceField.value.length} characters
          </div>
        </div>
      )}
    </div>
  );
}

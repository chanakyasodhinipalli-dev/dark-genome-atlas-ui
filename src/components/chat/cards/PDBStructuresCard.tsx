import type { UICard, PDBStructureField } from "@/types";

interface PDBStructuresCardProps {
  data: UICard;
}

export function PDBStructuresCard({ data }: PDBStructuresCardProps) {
  const structures = data.fields as PDBStructureField[];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md p-6 border border-orange-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <div className="flex gap-2">
          {data.source_badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {structures.map((structure, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-4 border border-orange-100 hover:border-orange-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <a
                  href={structure.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-orange-600 hover:text-orange-800"
                >
                  {structure.pdb_id}
                </a>
                <p className="text-sm text-gray-700 mt-1">{structure.title}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                {structure.method}
              </span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 mt-3">
              <span>
                <span className="font-medium">Resolution:</span>{" "}
                {structure.resolution}
              </span>
              <span>
                <span className="font-medium">Released:</span>{" "}
                {structure.release_date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

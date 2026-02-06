import type { ChatResponse as ChatResponseType } from "@/types";
import { ProteinSummaryCard } from "./cards/ProteinSummaryCard";
import { PhysicochemicalCard } from "./cards/PhysicochemicalCard";
import { StructureSummaryCard } from "./cards/StructureSummaryCard";
import { PDBStructuresCard } from "./cards/PDBStructuresCard";
import { SimilarProteinsCard } from "./cards/SimilarProteinsCard";
import { DrugInteractionsCard } from "./cards/DrugInteractionsCard";
import { GenomicLocationCard } from "./cards/GenomicLocationCard";
import { SequenceCard } from "./cards/SequenceCard";
import { LocalStructureCard } from "./cards/LocalStructureCard";
import { ActionButton } from "./ActionButton";
import { Citation } from "./Citation";

interface ChatResponseProps {
  response: ChatResponseType;
}

export function ChatResponse({ response }: ChatResponseProps) {
  // Check for refusal
  if (response.refusal) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 w-full overflow-hidden">
        <h3 className="text-red-800 font-semibold mb-2 flex items-center gap-2">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Query Blocked
        </h3>
        <p className="text-red-700 break-words whitespace-pre-wrap">{response.refusal.message}</p>
        {response.refusal.details && (
          <pre className="mt-3 text-xs text-red-600 bg-red-100 p-3 rounded overflow-x-auto whitespace-pre-wrap break-words">
            {JSON.stringify(response.refusal.details, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  // Define all expected card types with their default titles
  const expectedCards = [
    { type: "protein_summary", title: "Protein Summary" },
    { type: "sequence", title: "Protein Sequence" },
    { type: "physicochemical_properties", title: "Physicochemical Properties" },
    { type: "structure_summary", title: "3D Structure Information" },
    { type: "pdb_structures", title: "Experimental Structures (PDB)" },
    { type: "genomic_location", title: "Genomic Location" },
    { type: "similar_proteins", title: "Similar Proteins" },
    { type: "drug_interactions", title: "Drug Interactions & Bioactive Compounds" },
  ];

  // Create a map of available cards by type
  const availableCardsMap = new Map(
    (response.cards || []).map((card) => [card.type, card])
  );

  const renderCard = (cardType: string, cardTitle: string, index: number) => {
    const card = availableCardsMap.get(cardType);

    // If card data is not available, show unavailable message
    if (!card) {
      return (
        <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-300 border-dashed w-full overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-500">{cardTitle}</h3>
            <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded">
              No Data
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm italic">
              No {cardTitle.toLowerCase()} data available for this query.
            </p>
          </div>
        </div>
      );
    }

    // Render the appropriate card component based on type
    switch (card.type) {
      case "protein_summary":
        return <ProteinSummaryCard key={index} data={card} />;
      case "physicochemical_properties":
        return <PhysicochemicalCard key={index} data={card} />;
      case "structure_summary":
        return <StructureSummaryCard key={index} data={card} />;
      case "pdb_structures":
        return <PDBStructuresCard key={index} data={card} />;
      case "similar_proteins":
        return <SimilarProteinsCard key={index} data={card} />;
      case "drug_interactions":
        return <DrugInteractionsCard key={index} data={card} />;
      case "genomic_location":
        return <GenomicLocationCard key={index} data={card} />;
      case "sequence":
        return <SequenceCard key={index} data={card} />;
      case "local_structure":
        return <LocalStructureCard key={index} data={card} localAssets={response.local_assets} />;
      default:
        // Generic fallback for unknown card types
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
              <div className="flex gap-2">
                {card.source_badges.map((badge, badgeIdx) => (
                  <span
                    key={badgeIdx}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {card.fields.map((field: any, fieldIdx: number) => (
                <div key={fieldIdx} className="text-sm">
                  <span className="font-medium text-gray-600">
                    {field.label || field.pdb_id || field.gene_symbol || "Field"}:
                  </span>{" "}
                  <span className="text-gray-900">
                    {field.value || field.title || field.description || JSON.stringify(field)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Card type: {card.type}
            </p>
          </div>
        );
    }
  };

  // Get entity badge styles based on category
  const getEntityBadgeStyles = () => {
    if (response.entity_category === "dark_genome") {
      return {
        container: "bg-gradient-to-r from-purple-600 to-indigo-700",
        text: "text-white",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        description: "Novel or understudied genomic element",
      };
    }
    return {
      container: "bg-gradient-to-r from-emerald-500 to-teal-600",
      text: "text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Well-characterized protein with extensive research",
    };
  };

  const entityBadge = getEntityBadgeStyles();

  return (
    <div className="w-full space-y-10">

      {/* Entity Category Badge */}
      {response.entity_label && (
        <section className="w-full">
          <div className={`${entityBadge.container} rounded-lg shadow-lg p-4 w-full`}>
            <div className="flex items-center gap-3">
              <div className={`${entityBadge.text} flex-shrink-0`}>
                {entityBadge.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`${entityBadge.text} font-bold text-lg`}>
                    {response.entity_label}
                  </span>
                </div>
                <p className={`${entityBadge.text} text-sm opacity-90 mt-1`}>
                  {entityBadge.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <br></br>

      {/* Assistant Text */}
      {response.assistant_text && (
        <section className="w-full">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-full overflow-hidden">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-800">
              {response.assistant_text}
            </div>
          </div>
        </div>
        </section>
      )}

      <br></br>

      {/* Local Assets - Shows when local structure files are available */}
      {response.local_assets && (
        <section className="w-full">
          <LocalStructureCard
            data={{
              type: "local_structure",
              title: "Local Structure Available",
              source_badges: [response.local_assets.source === "local_prediction" ? "Local Prediction" : response.local_assets.source],
              fields: []
            }}
            localAssets={response.local_assets}
          />
        </section>
      )}

      <br></br>
 
      {/* Cards - Always show all expected card types */}
      <section className="w-full">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {expectedCards.map((cardDef, index) =>
          renderCard(cardDef.type, cardDef.title, index)
        )}
      </div>
      </section>

      <br></br>
 
      {/* Actions */}
      {response.actions && response.actions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Available Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            {response.actions.map((action, index) => (
              <ActionButton key={index} action={action} />
            ))}
          </div>
        </div>
      )}

      <br></br>
 
      {/* Citations */}
      {response.citations && response.citations.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Sources & Citations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {response.citations.map((citation, index) => (
              <Citation key={index} citation={citation} index={index} />
            ))}
          </div>
        </div>
      )}

      <br></br>

      {/* Trace Info (Optional - for debugging) */}
      {response.trace && (
        <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            Execution Trace (Debug Info)
          </summary>
          <div className="mt-4 text-xs">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Duration:</span>{" "}
              {response.trace.duration_ms}ms
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Agents:</span>{" "}
              {response.trace.agents.length}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Tools:</span>{" "}
              {response.trace.tools.length}
            </p>
            <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-96 text-xs">
              {JSON.stringify(response.trace, null, 2)}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
}

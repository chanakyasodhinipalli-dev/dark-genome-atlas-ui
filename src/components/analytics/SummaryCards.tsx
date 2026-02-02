import React from "react";

interface SummaryCardsProps {
  totalProteins: number;
  totalPeptides: number;
  totalEntities: number;
  organismCount: number;
}

export function SummaryCards({
  totalProteins,
  totalPeptides,
  totalEntities,
  organismCount,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Entities",
      value: totalEntities.toLocaleString(),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Proteins",
      value: totalProteins.toLocaleString(),
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Peptides",
      value: totalPeptides.toLocaleString(),
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Organisms",
      value: organismCount.toLocaleString(),
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.color} rounded-lg shadow-lg p-6 text-white text-center`}
        >
          <h3 className="text-sm font-medium opacity-90">{card.title}</h3>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

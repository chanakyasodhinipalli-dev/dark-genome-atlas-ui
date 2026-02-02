"use client";

import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { AnalyticsData, DistributionItem } from "@/types";
import { SummaryCards } from "./SummaryCards";

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#14B8A6", // teal
  "#F97316", // orange
];

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  // Take only top 7 organisms and group rest as "Others"
  const topOrganisms = data.organism_distribution.slice(0, 7);
  const othersCount = data.organism_distribution
    .slice(7)
    .reduce((sum, item) => sum + item.count, 0);
  const othersPercentage = data.organism_distribution
    .slice(7)
    .reduce((sum, item) => sum + item.percentage, 0);

  const organismData =
    othersCount > 0
      ? [
          ...topOrganisms.map((item, index) => ({
            ...item,
            fill: COLORS[index % COLORS.length],
          })),
          {
            label: "Others",
            count: othersCount,
            percentage: othersPercentage,
            fill: COLORS[7 % COLORS.length],
          },
        ]
      : topOrganisms.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }));

  // Prepare stability data with colors
  const stabilityData = data.stability_distribution.map((item) => ({
    ...item,
    fill:
      item.label.toLowerCase() === "stable"
        ? "#10B981"
        : item.label.toLowerCase() === "unstable"
          ? "#EF4444"
          : "#9CA3AF",
  }));

  // Sort localization by count descending
  const sortedLocalization = [...data.localization_distribution].sort(
    (a, b) => b.count - a.count
  );

  // Add colors to gene type distribution
  const geneTypeData = data.gene_type_distribution.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 pb-8 mt-8">
      {/* Summary Cards */}
      <SummaryCards
        totalProteins={data.total_proteins}
        totalPeptides={data.total_peptides}
        totalEntities={data.total_entities}
        organismCount={data.organism_distribution.length}
      />
      
      <br />
      
      {/* Row 1: Organism Distribution & Stability Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Organism Distribution - Pie Chart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Organism Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={organismData}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
              />
              <Tooltip
                formatter={(value: number | undefined, name: string | undefined, props: any) => [
                  `${(value ?? 0).toLocaleString()} (${(props.payload.percentage ?? 0).toFixed(1)}%)`,
                  name ?? "",
                ]}
              />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stability Distribution - Donut Chart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-teal-600 to-cyan-600 text-transparent bg-clip-text">
            Stability Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stabilityData}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
              />
              <Tooltip
                formatter={(value: number | undefined, name: string | undefined, props: any) => [
                  `${(value ?? 0).toLocaleString()} (${(props.payload.percentage ?? 0).toFixed(1)}%)`,
                  name ?? "",
                ]}
              />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <br />
      
      {/* Row 2: Localization Distribution - Full Width Bar Chart */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Subcellular Localization Distribution
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={sortedLocalization}
            layout="vertical"
            margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              dataKey="label"
              type="category"
              width={160}
              tick={{ fontSize: 10 }}
              tickFormatter={(value: string) =>
                value.length > 22 ? `${value.substring(0, 22)}...` : value
              }
            />
            <Tooltip
              formatter={(value: number | undefined, _name: string | undefined, props: any) => [
                `${(value ?? 0).toLocaleString()} (${(props.payload.percentage ?? 0).toFixed(1)}%)`,
                "Count",
              ]}
            />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <br />
      
      {/* Row 3: Protein Length & Gene Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Protein Length Distribution - Histogram */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Protein Length Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.protein_length_distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip
                formatter={(value: number | undefined, _name: string | undefined, props: any) => [
                  `${(value ?? 0).toLocaleString()} (${(props.payload.percentage ?? 0).toFixed(1)}%)`,
                  "Count",
                ]}
              />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gene Type Distribution - Pie Chart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
            Gene Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={geneTypeData}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
              />
              <Tooltip
                formatter={(value: number | undefined, name: string | undefined, props: any) => [
                  `${(value ?? 0).toLocaleString()} (${(props.payload.percentage ?? 0).toFixed(1)}%)`,
                  name ?? "",
                ]}
              />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <br />
      
      {/* Physicochemical Properties Summary */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text">
          Physicochemical Properties Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(data.physicochemical)
            .filter(([, stats]) => stats != null)
            .map(([key, stats]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2 capitalize text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                {key.replace(/_/g, " ")}
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Mean:</span>
                  <span className="font-semibold text-blue-700">{stats.mean?.toFixed(2) ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">Median:</span>
                  <span className="font-semibold text-purple-700">{stats.median?.toFixed(2) ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium bg-gradient-to-r from-teal-600 to-cyan-600 text-transparent bg-clip-text">Range:</span>
                  <span className="font-semibold text-teal-700">
                    {stats.min?.toFixed(1) ?? "N/A"} - {stats.max?.toFixed(1) ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <br />

    </div>
  );
}

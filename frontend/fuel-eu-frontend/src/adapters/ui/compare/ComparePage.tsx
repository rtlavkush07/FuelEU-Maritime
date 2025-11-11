import { useEffect } from "react";
import { useCompareService } from "../../../core/application/useCompareService";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export function ComparePage() {
  const { comparison, loading, loadComparison } = useCompareService();

  useEffect(() => {
    loadComparison();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Compare Routes Against Baseline
      </h2>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        {loading ? (
          <p className="text-gray-600">Loading comparison...</p>
        ) : comparison.length === 0 ? (
          <p className="text-gray-600">No comparison data found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-700">
                  <th className="p-3">Route ID</th>
                  <th className="p-3">Baseline Intensity</th>
                  <th className="p-3">Actual Intensity</th>
                  <th className="p-3">% Difference</th>
                  <th className="p-3">Compliant</th>
                </tr>
              </thead>

              <tbody>
                {comparison.map((c) => (
                  <tr
                    key={c.routeId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{c.routeId}</td>
                    <td className="p-3">{c.baselineIntensity}</td>
                    <td className="p-3">{c.comparisonIntensity}</td>
                    <td className="p-3">{c.percentDiff.toFixed(2)}%</td>
                    <td className="p-3">
                      {c.compliant ? (
                        <span className="text-green-600 font-semibold">
                          ✅ Yes
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          ❌ No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">
          GHG Intensity Comparison Chart
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="routeId" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Baseline bars */}
            <Bar
              dataKey="baselineIntensity"
              fill="#4F46E5"
              name="Baseline"
            />
            {/* Actual bars */}
            <Bar
              dataKey="comparisonIntensity"
              fill="#10B981"
              name="Actual"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useRoutesService } from "../../../core/application/useRoutesService";
import type { Route } from "../../../core/domain/Route";

export function RoutesPage() {
  const { routes, loading, loadRoutes, setBaseline } = useRoutesService();

  const [filters, setFilters] = useState({
    vesselType: "",
    fuelType: "",
    year: "",
  });

  useEffect(() => {
    loadRoutes();
  }, []);

  // Filtered routes
  const filteredRoutes = useMemo(() => {
    return routes.filter((r: Route) => {
      return (
        (filters.vesselType === "" ||
          r.vesselType === filters.vesselType) &&
        (filters.fuelType === "" || r.fuelType === filters.fuelType) &&
        (filters.year === "" || r.year === Number(filters.year))
      );
    });
  }, [routes, filters]);

  // Helpers for unique filters
  const vesselTypes = [...new Set(routes.map((r) => r.vesselType))];
  const fuelTypes = [...new Set(routes.map((r) => r.fuelType))];
  const years = [...new Set(routes.map((r) => r.year))];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Routes Overview
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={filters.vesselType}
          onChange={(e) =>
            setFilters({ ...filters, vesselType: e.target.value })
          }
        >
          <option value="">All Vessel Types</option>
          {vesselTypes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filters.fuelType}
          onChange={(e) =>
            setFilters({ ...filters, fuelType: e.target.value })
          }
        >
          <option value="">All Fuel Types</option>
          {fuelTypes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filters.year}
          onChange={(e) =>
            setFilters({ ...filters, year: e.target.value })
          }
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        {loading ? (
          <p className="text-gray-600">Loading routes...</p>
        ) : filteredRoutes.length === 0 ? (
          <p className="text-gray-600">No routes found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-700">
                  <th className="p-3">Route ID</th>
                  <th className="p-3">Vessel Type</th>
                  <th className="p-3">Fuel Type</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">GHG Intensity</th>
                  <th className="p-3">Fuel Consumption</th>
                  <th className="p-3">Distance</th>
                  <th className="p-3">Total Emissions</th>
                  <th className="p-3">Baseline</th>
                </tr>
              </thead>

              <tbody>
                {filteredRoutes.map((r) => (
                  <tr
                    key={r.routeId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{r.routeId}</td>
                    <td className="p-3">{r.vesselType}</td>
                    <td className="p-3">{r.fuelType}</td>
                    <td className="p-3">{r.year}</td>
                    <td className="p-3">{r.ghgIntensity}</td>
                    <td className="p-3">{r.fuelConsumption}</td>
                    <td className="p-3">{r.distance}</td>
                    <td className="p-3">{r.totalEmissions}</td>
                    <td className="p-3">
                      {r.isBaseline ? (
                        <span className="text-green-600 font-semibold">
                          Baseline
                        </span>
                      ) : (
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          onClick={() => setBaseline(r.routeId)}
                        >
                          Set Baseline
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

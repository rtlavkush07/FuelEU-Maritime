import { useEffect, useState } from "react";
import { usePoolingService } from "../../../core/application/usePoolingService";
import { API_BASE_URL } from "../../../shared/config";
import { toast } from "react-toastify";

export function PoolingPage() {
  const { pool, loading, createPool } = usePoolingService();

  const [year, setYear] = useState("");
  const [ships, setShips] = useState<{ shipId: string; adjustedCb: number }[]>([]);
  const [selectedShips, setSelectedShips] = useState<string[]>([]);

  async function loadAdjustedCB() {
    if (!year) return;

    const res = await fetch(`${API_BASE_URL}/compliance/adjusted-cb?year=${year}`);
    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error);
      return;
    }

    const data = await res.json();
    setShips(data);
  }

  function toggleShip(id: string) {
    setSelectedShips((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  }

  async function handleCreatePool() {
    if (!year || selectedShips.length === 0) {
      toast.error("Select year and ships first");
      return;
    }
    await createPool(Number(year), selectedShips);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Pooling — Article 21</h2>

      {/* Inputs */}
      <div className="bg-white p-4 rounded-lg shadow border flex items-center gap-4">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border px-3 py-2 rounded w-32"
        />
        <button
          onClick={loadAdjustedCB}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Load Ships
        </button>
      </div>

      {/* Ship list */}
      {ships.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Available Ships</h3>

          <div className="space-y-2">
            {ships.map((s) => (
              <label key={s.shipId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedShips.includes(s.shipId)}
                  onChange={() => toggleShip(s.shipId)}
                />
                <span className="font-medium">{s.shipId}</span>
                <span className={s.adjustedCb >= 0 ? "text-green-600" : "text-red-600"}>
                  {s.adjustedCb.toLocaleString()} gCO₂e
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Create Pool */}
      {ships.length > 0 && (
        <button
          onClick={handleCreatePool}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          disabled={loading}
        >
          Create Pool
        </button>
      )}

      {/* Pool result */}
      {pool && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Pool Result</h3>
          <p className="mb-3">
            <strong>Total CB:</strong>{" "}
            <span
              className={
                pool.totalCB >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
              }
            >
              {pool.totalCB.toLocaleString()}
            </span>
          </p>

          <table className="min-w-full text-sm mt-3">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-2">Ship</th>
                <th className="p-2">Before</th>
                <th className="p-2">After</th>
              </tr>
            </thead>
            <tbody>
              {pool.members.map((m) => (
                <tr key={m.shipId} className="border-b">
                  <td className="p-2 font-medium">{m.shipId}</td>
                  <td className="p-2 text-gray-600">{m.cbBefore.toLocaleString()}</td>
                  <td
                    className={`p-2 font-semibold ${
                      m.cbAfter >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {m.cbAfter.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useComplianceService } from "../../../core/application/useComplianceService";
import { useBankingService } from "../../../core/application/useBankingService";
import { toast } from "react-toastify";

export function BankingPage() {
    const { cb, loadCB, loading: loadingCB, error: cbError } = useComplianceService();
    const {
        records,
        loadRecords,
        bankSurplus,
        applyBank,
        loading: loadingRecords,
        error: bankingError
    } = useBankingService();

    const [shipId, setShipId] = useState("");
    const [year, setYear] = useState("");
    const [applyAmount, setApplyAmount] = useState("");

    // If errors occur, show toast on the screen
    useEffect(() => {
        if (cbError) toast.error(cbError);
        if (bankingError) toast.error(bankingError);
    }, [cbError, bankingError]);

    async function handleLoadCB() {
        if (!shipId || !year) return;

        await loadCB(shipId, Number(year));
        await loadRecords(shipId, Number(year));
    }

    async function handleBank() {
        if (!shipId || !year) return;

        const res = await bankSurplus(shipId, Number(year));
        if (!res) return; // error already handled

        toast.success("Surplus banked successfully");
        await handleLoadCB();
    }

    async function handleApply() {
        if (!shipId || !year || !applyAmount) return;

        const res = await applyBank(shipId, Number(year), Number(applyAmount));
        if (!res) return;

        toast.success("Bank amount applied successfully");
        await handleLoadCB();
        setApplyAmount("");
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">
                Banking — Article 20
            </h2>

            {/* INPUTS */}
            <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-6 items-center">
                <input
                    type="text"
                    placeholder="Ship ID (e.g., R001)"
                    className="border px-3 py-2 rounded w-40"
                    value={shipId}
                    onChange={(e) => setShipId(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Year"
                    className="border px-3 py-2 rounded w-32"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <button
                    onClick={handleLoadCB}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Load Compliance
                </button>
            </div>

            {/* CB DISPLAY */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3">Compliance Balance</h3>

                {loadingCB ? (
                    <p className="text-gray-600">Loading CB...</p>
                ) : cb ? (
                    <p className="text-gray-800 text-lg">
                        CB:{" "}
                        <span
                            className={cb.cb >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
                        >
                            {cb.cb?.toLocaleString() ?? "—"} gCO₂e
                        </span>
                    </p>
                ) : (
                    <p className="text-gray-600">Enter ship and year to load CB.</p>
                )}
            </div>

            {/* BANKING ACTIONS */}
            {cb && (
                <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
                    <h3 className="text-lg font-semibold">Banking Actions</h3>

                    {/* Bank button / no positive CB */}
                    {cb.cb > 0 ? (
                        <div className="space-y-2">
                            <button
                                onClick={handleBank}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Bank Positive CB
                            </button>

                            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded">
                                 This ship has surplus CB available for banking.
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded">
                             This ship has no positive CB available to bank.
                        </div>
                    )}

                    {/* APPLY SECTION */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                placeholder="Amount to apply"
                                className="border px-3 py-2 rounded w-52"
                                value={applyAmount}
                                onChange={(e) => setApplyAmount(e.target.value)}
                            />

                            <button
                                onClick={handleApply}
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            >
                                Apply Banked Surplus
                            </button>
                        </div>

                        {/* If no banked amount exists */}
                        {records.length === 0 && (
                            <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 px-4 py-2 rounded">
                                No previously banked CB found for this ship.
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* BANKING RECORDS */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3">Banking Records</h3>

                {loadingRecords ? (
                    <p className="text-gray-600">Loading records...</p>
                ) : records.length === 0 ? (
                    <p className="text-gray-600">No banking records found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b text-gray-700">
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Amount (gCO₂e)</th>
                                    <th className="p-3">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record) => (
                                    <tr key={record.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-3">
                                            {record.amountGco2eq > 0 ? (
                                                <span className="text-green-600 font-semibold">Banked</span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">Applied</span>
                                            )}
                                        </td>
                                        <td className="p-3">{record.amountGco2eq?.toLocaleString() ?? "—"}</td>
                                        <td className="p-3">{record.year}</td>
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

import type { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function Layout({ children, onTabChange, activeTab }: LayoutProps) {
  const tabs = [
    { id: "routes", label: "Routes" },
    { id: "compare", label: "Compare" },
    { id: "banking", label: "Banking" },
    { id: "pooling", label: "Pooling" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          FuelEU Maritime Dashboard
        </h1>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b">
        <div className="flex space-x-6 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3 border-b-2 font-medium transition
                ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
}

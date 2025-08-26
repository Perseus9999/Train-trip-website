"use client";

import { useState } from "react";

interface TravellerSelectorProps {
  theme: boolean;
  onChange?: (summary: string) => void;
}

type TravellerCounts = {
  child: number;
  youth: number;
  adult: number;
  senior: number;
};

export default function TravellerSelector({theme, onChange}: TravellerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState<TravellerCounts>({
    child: 0,
    youth: 0,
    adult: 1,
    senior: 0,
  });
  const [discount, setDiscount] = useState("No Discount");
  const [summary, setSummary] = useState("1 Adult, No Discount");

  const handleChange = (key: keyof TravellerCounts, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta), // prevent negative
    }));
  };

  const handleApply = () => {
    const parts: string[] = [];

    if (counts.child > 0) parts.push(`${counts.child} Child${counts.child > 1 ? "ren" : ""}`);
    if (counts.youth > 0) parts.push(`${counts.youth} Youth`);
    if (counts.adult > 0) parts.push(`${counts.adult} Adult${counts.adult > 1 ? "s" : ""}`);
    if (counts.senior > 0) parts.push(`${counts.senior} Senior`);

    const text = parts.length > 0 ? parts.join(", ") : "No Travellers";
    setSummary(`${text}, ${discount}`);
    if (onChange) onChange(`${text}, ${discount}`);
    setOpen(false);
  };

  return (
    <div className="relative w-40">
      {/* Top summary */}
      <button
        className={`w-full h-[36px] p-1 text-base text-left truncate whitespace-nowrap overflow-hidden border-1 rounded-md ${theme ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-white"}`}
        onClick={() => setOpen(!open)}
        
      >
        {summary}
      </button>

      {/* Dropdown */}
      {open && (
        <div className={`absolute mt-2 w-60 sm:w-80 border rounded shadow-lg p-4 z-10 space-y-3 ${theme ? "bg-gray-700" : "bg-white"}`}>
          {/* Traveller items */}
          {[
            { label: "Child (0–15)", key: "child" as const },
            { label: "Youth (16–25)", key: "youth" as const },
            { label: "Adult (26–59)", key: "adult" as const },
            { label: "Senior (60+)", key: "senior" as const },
          ].map((item) => (
            <div key={item.key} className={`flex justify-between items-center ${theme ? "bg-gray-700" : "bg-white"}`}>
              <span>{item.label}</span>
              <div className={`flex items-center gap-2 ${theme ? "bg-gray-700" : "bg-white"}`}>
                <button
                  className={`px-2 py-1 rounded ${theme ? "bg-gray-700" : "bg-white"}`}
                  onClick={() => handleChange(item.key, -1)}
                >
                  -
                </button>
                <span className="w-6 text-center">{counts[item.key]}</span>
                <button
                  className={`px-2 py-1 rounded ${theme ? "bg-gray-700" : "bg-white"}`}
                  onClick={() => handleChange(item.key, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Discount dropdown */}
          <div>
            <label className={`block mb-1 text-sm text-gray-100 ${theme ? "bg-gray-700" : "bg-white"}`}>Discount</label>
            <select
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className={`w-full border rounded p-2 ${theme ? "bg-gray-700" : "bg-white"}`}
            >
              <option>No Discount</option>
              <option>Student Discount</option>
              <option>Group Discount</option>
              <option>Promo Code</option>
            </select>
          </div>

          {/* Apply button */}
          <button
            className={`w-full py-2 rounded animation duration-300 ease-in-out ${theme ? "bg-primary text-gray-700 hover:text-white hover:bg-secondary" : "bg-primary text-white hover:text-gray-700 hover:bg-secondary"}`}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

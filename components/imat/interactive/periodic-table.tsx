"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ELEMENTS, CATEGORY_COLORS, type ElementData } from "./element-data";

interface PeriodicTableProps {
  onElementClick?: (element: ElementData) => void;
}

function ElementCell({
  element,
  isSelected,
  onClick,
}: {
  element: ElementData;
  isSelected: boolean;
  onClick: () => void;
}) {
  const colors = CATEGORY_COLORS[element.category] ?? {
    bg: "#f3f4f6",
    text: "#374151",
  };

  return (
    <motion.button
      data-element
      data-atomic-number={element.number}
      data-category={element.category}
      onClick={onClick}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center justify-center rounded-md border border-black/10 p-0.5 text-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{
        backgroundColor: isSelected ? colors.text : colors.bg,
        color: isSelected ? "#fff" : colors.text,
        gridColumn: element.group,
        gridRow: element.period,
        minHeight: "3rem",
        minWidth: 0,
      }}
      aria-label={`${element.name} (${element.symbol})`}
    >
      <span className="text-[0.55rem] leading-tight opacity-70">
        {element.number}
      </span>
      <span className="text-sm font-bold leading-tight">{element.symbol}</span>
      <span className="text-[0.45rem] leading-tight truncate w-full hidden sm:block">
        {element.name}
      </span>
    </motion.button>
  );
}

export function PeriodicTable({ onElementClick }: PeriodicTableProps) {
  const [selected, setSelected] = useState<ElementData | null>(null);

  const handleClick = (element: ElementData) => {
    setSelected((prev) => (prev?.number === element.number ? null : element));
    onElementClick?.(element);
  };

  const mainTableElements = ELEMENTS.filter(
    (e) => e.category !== "lanthanide" && e.category !== "actinide"
  );
  const lanthanides = ELEMENTS.filter((e) => e.category === "lanthanide");
  const actinides = ELEMENTS.filter((e) => e.category === "actinide");

  return (
    <div className="w-full overflow-x-auto p-2">
      <div
        className="grid gap-0.5 min-w-[700px]"
        style={{
          gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
          gridTemplateRows: "repeat(7, auto) 1fr 1fr",
        }}
      >
        {mainTableElements.map((element) => (
          <ElementCell
            key={element.number}
            element={element}
            isSelected={selected?.number === element.number}
            onClick={() => handleClick(element)}
          />
        ))}

        <div
          className="col-span-18 flex justify-center items-center text-xs text-gray-500 py-1"
          style={{ gridColumn: "1 / -1", gridRow: 8 }}
        >
          Lanthanides
        </div>
        <div
          className="col-span-18 flex justify-center items-center text-xs text-gray-500 py-1"
          style={{ gridColumn: "1 / -1", gridRow: 9 }}
        >
          Actinides
        </div>

        {lanthanides.map((element) => (
          <div
            key={element.number}
            style={{ gridColumn: element.group, gridRow: 8 }}
          >
            <ElementCell
              element={element}
              isSelected={selected?.number === element.number}
              onClick={() => handleClick(element)}
            />
          </div>
        ))}

        {actinides.map((element) => (
          <div
            key={element.number}
            style={{ gridColumn: element.group, gridRow: 9 }}
          >
            <ElementCell
              element={element}
              isSelected={selected?.number === element.number}
              onClick={() => handleClick(element)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="element-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 rounded-lg border p-4 bg-white shadow-md"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold"
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[selected.category]?.bg ?? "#f3f4f6",
                  color: CATEGORY_COLORS[selected.category]?.text ?? "#374151",
                }}
              >
                {selected.symbol}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                <p className="text-sm text-gray-500">
                  Atomic #{selected.number} &middot;{" "}
                  {CATEGORY_COLORS[selected.category]?.label ??
                    selected.category}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              <div>
                <span className="text-gray-500">Electron Config</span>
                <p className="font-mono">{selected.electronConfig}</p>
              </div>
              <div>
                <span className="text-gray-500">Electronegativity</span>
                <p>{selected.electronegativity ?? "N/A"}</p>
              </div>
              <div>
                <span className="text-gray-500">Atomic Radius</span>
                <p>
                  {selected.atomicRadius
                    ? `${selected.atomicRadius} pm`
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Category</span>
                <p>
                  {CATEGORY_COLORS[selected.category]?.label ??
                    selected.category}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div data-testid="legend" className="mt-4 flex flex-wrap gap-2">
        {Object.entries(CATEGORY_COLORS).map(([key, { bg, text, label }]) => (
          <div
            key={key}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs"
            style={{ backgroundColor: bg, color: text }}
          >
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: bg, border: `1px solid ${text}` }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

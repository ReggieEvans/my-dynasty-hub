"use client";

import React from "react";

import { getAllModules } from "../modules/getAllModules";

type ModulePickerProps = {
  visibleModules: string[];
  onAdd: (moduleId: string) => void;
};

export default function ModulePicker({
  visibleModules,
  onAdd,
}: ModulePickerProps) {
  const allModules = getAllModules();

  return (
    <div className="mb-4 bg-background-secondary rounded p-4 border border-border">
      <h4 className="font-bold mb-2 text-muted-foreground">Add Modules</h4>
      <div className="flex flex-wrap gap-2">
        {allModules.map((mod) => {
          const isVisible = visibleModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => onAdd(mod.id)}
              disabled={isVisible}
              className={`px-3 py-1 rounded text-sm border ${
                isVisible
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "btn-primary w-auto"
              }`}
            >
              {mod.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

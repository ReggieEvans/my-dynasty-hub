"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  LayoutDashboard,
  Puzzle,
  Save,
  SquareArrowRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { RootState } from "@/store";

import {
  type DashboardMode,
  dashboardModules,
} from "../modules/dashboardModules";
import { getAllModules } from "../modules/getAllModules";
import ModulePicker from "./ModulePicker";

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const rowHeight = 30;

type DashboardLayoutProps = {
  mode: DashboardMode;
};

export default function DashboardLayout({ mode }: DashboardLayoutProps) {
  const [customizeMode, setCustomizeMode] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [mounted, setMounted] = useState(false);
  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: [],
  });
  const [visibleModules, setVisibleModules] = useState<string[]>(
    dashboardModules[mode].map((m) => m.id),
  );
  const userDynastyTeam = useSelector(
    (state: RootState) => state.dynasty.userDynastyTeam,
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  const allModules = getAllModules();

  const toggleCustomize = () => {
    setCustomizeMode((prev) => !prev);
  };

  const removeModule = (id: string) => {
    setVisibleModules((prev) => prev.filter((m) => m !== id));
  };

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    });
  };

  const layoutItems = useMemo(() => {
    const colWidth = 12;
    let currentX = 0;
    let currentY = 0;
    let maxRowHeight = 0;

    return visibleModules
      .map((id) => {
        const mod = allModules.find((m) => m.id === id)!;
        const w = mod.defaultWidth ?? 6;
        const h = mod.defaultHeight;

        // Wrap to new row
        if (currentX + w > colWidth) {
          currentX = 0;
          currentY += maxRowHeight;
          maxRowHeight = 0;
        }

        const layoutItem = {
          i: mod.id,
          x: currentX,
          y: currentY,
          w,
          h,
          static: !mod.draggable,
        };

        currentX += w;
        maxRowHeight = Math.max(maxRowHeight, h);

        return layoutItem;
      })
      .filter(Boolean);
  }, [visibleModules, allModules]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2 px-4">
        <h2 className="flex items-center gap-2 text-xl font-black uppercase">
          <LayoutDashboard size={16} /> Dashboard
        </h2>
        <button
          onClick={toggleCustomize}
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="px-4 py-2 text-white rounded"
        >
          {customizeMode ? <Save size={16} /> : <Puzzle size={16} />}
        </button>
      </div>

      {customizeMode && (
        <div className="px-2">
          <ModulePicker
            visibleModules={visibleModules}
            onAdd={(id) => {
              if (!visibleModules.includes(id)) {
                setVisibleModules((prev) => [...prev, id]);
              }
            }}
          />
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        breakpoints={breakpoints}
        cols={cols}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        rowHeight={rowHeight}
        isDraggable={customizeMode}
        isResizable={false}
        onBreakpointChange={onBreakpointChange}
        draggableHandle=".drag-handle"
      >
        {layoutItems.map(({ i, ...dataGrid }) => {
          const mod = allModules.find((m) => m.id === i);
          if (!mod) return null;
          const Component = mod.component;

          return (
            <div
              key={i}
              data-grid={dataGrid}
              className={cn(
                "bg-card border rounded shadow",
                "border-border",
                customizeMode &&
                  mod.removable &&
                  "border-primary-gradient border-2 border-dashed hover:border-primary",
              )}
            >
              <div className="flex justify-between items-center">
                <div
                  // style={{ backgroundColor: teamColor }}
                  className="flex items-center justify-between w-full pr-2 rounded-t bg-background-secondary"
                >
                  <div className="drag-handle p-2 w-full">
                    <h3 className="text-xs uppercase font-bold">{mod.name}</h3>
                  </div>

                  {customizeMode && mod.removable ? (
                    <button
                      onClick={() => removeModule(i)}
                      className="text-sm rounded-md p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    mod.navLink && (
                      <Link href={mod.navLink}>
                        <SquareArrowRight className="w-4 h-4" />
                      </Link>
                    )
                  )}
                </div>
              </div>
              <div className="drag-handle min-h-[calc(100%-38px)]">
                <Component />
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
}

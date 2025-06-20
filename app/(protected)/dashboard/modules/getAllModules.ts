import { type DashboardModule, dashboardModules } from "./dashboardModules";

export function getAllModules(): DashboardModule[] {
  const all: DashboardModule[] = [
    ...dashboardModules.immersive,
    ...dashboardModules.essentials,
  ];

  // Remove duplicates by ID
  return all.filter(
    (mod, index, self) => index === self.findIndex((m) => m.id === mod.id),
  );
}

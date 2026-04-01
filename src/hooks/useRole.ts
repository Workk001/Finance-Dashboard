import { useStore } from "@/store/useStore";

export function useRole() {
  const role = useStore((s) => s.role);

  return {
    role,
    isAdmin: role === "admin",
    isViewer: role === "viewer",
    canCreate: role === "admin",
    canEdit: role === "admin",
    canDelete: role === "admin",
  };
}

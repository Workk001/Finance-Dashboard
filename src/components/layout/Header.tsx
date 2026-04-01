import { useLocation } from "react-router-dom";
import { Moon, Sun, Menu, Shield, Eye } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import type { Role } from "@/types";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

export function Header() {
  const { pathname } = useLocation();
  const theme = useStore((s) => s.theme);
  const role = useStore((s) => s.role);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const setRole = useStore((s) => s.setRole);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className="w-[140px] h-9">
            <div className="flex items-center gap-2">
              {role === "admin" ? (
                <Shield className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Switch to {theme === "light" ? "dark" : "light"} mode
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}

import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStore } from "@/store/useStore";

export function Layout() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && !isDesktop) {
      useStore.setState({ sidebarOpen: false });
    }
    initialized.current = true;
  }, [isDesktop]);

  return (
    <div className="flex min-h-screen bg-background">
      {isDesktop && <Sidebar />}
      {!isDesktop && <MobileNav />}

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <p className="text-7xl font-bold text-muted-foreground/30">404</p>
      <h2 className="text-xl font-semibold mt-4">Page not found</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-6" size="sm">
        <Link to="/">
          <Home className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}

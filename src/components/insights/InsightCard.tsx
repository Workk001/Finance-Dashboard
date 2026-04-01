import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/ui/card";

interface InsightCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  colorClass?: string;
  index?: number;
}

export function InsightCard({ title, value, subtitle, icon, colorClass = "text-primary", index = 0 }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted ${colorClass}`}>
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-xl font-bold mt-0.5">{value}</p>
              {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

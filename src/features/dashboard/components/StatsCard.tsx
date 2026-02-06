import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeLabel = "from last month",
  icon: Icon,
  trend = "up" 
}: StatsCardProps) => {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            trend === "up" && "text-emerald-600",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-muted-foreground"
          )}>
            {change} {changeLabel}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

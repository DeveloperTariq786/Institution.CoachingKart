import { cn } from "@/lib/utils";
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "emerald" | "blue" | "orange";
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeLabel = "from last month",
  icon: Icon,
  trend = "up",
  color = "primary"
}: StatsCardProps) => {
  const getIconColor = () => {
    switch(color) {
      case "emerald": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "blue": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "orange": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      default: return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50">
      {/* Background Decorative Gradient */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-2xl",
        color === "primary" ? "bg-primary" : `bg-${color}-500`
      )} />
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground tracking-tight">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
          </div>
        </div>
        
        {Icon && (
          <div className={cn(
            "h-12 w-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
            getIconColor()
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
            trend === "up" && "text-emerald-600 bg-emerald-500/10",
            trend === "down" && "text-destructive bg-destructive/10",
            trend === "neutral" && "text-muted-foreground bg-muted"
          )}>
            {trend === "up" && <ArrowUpRight className="h-3 w-3" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3" />}
            {trend === "neutral" && <Minus className="h-3 w-3" />}
            {change}
          </div>
        )}
        <p className="text-[11px] text-muted-foreground font-medium">
          {change ? changeLabel : (
             <span className="flex items-center gap-1 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live update
             </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;

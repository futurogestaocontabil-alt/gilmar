import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color?: "blue" | "red" | "green" | "orange" | "purple";
  alert?: boolean;
}

const colorMap = {
  blue: { bg: "bg-[#EAF3FF]", icon: "text-[#0057B8]", border: "border-[#0057B8]/20" },
  red: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-200" },
  green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
};

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
  alert = false,
}: KpiCardProps) {
  const c = colorMap[color];
  return (
    <Card className={cn("relative overflow-hidden", alert && "border-red-300 bg-red-50/30")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#334155]/70 mb-1">{title}</p>
            <p className={cn("text-2xl font-bold", alert ? "text-red-700" : "text-[#334155]")}>
              {value}
            </p>
            {subtitle && <p className="text-xs text-[#334155]/60 mt-1">{subtitle}</p>}
            {trendValue && (
              <p
                className={cn(
                  "text-xs mt-1 font-medium",
                  trend === "up" ? "text-red-600" : trend === "down" ? "text-green-600" : "text-gray-500"
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </p>
            )}
          </div>
          <div className={cn("rounded-lg p-2.5", c.bg)}>
            <Icon className={cn("h-5 w-5", c.icon)} />
          </div>
        </div>
        {alert && (
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-red-500" />
        )}
      </CardContent>
    </Card>
  );
}

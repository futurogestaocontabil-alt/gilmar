import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  icon: Icon,
  children,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="bg-[#EAF3FF] p-2 rounded-lg">
            <Icon className="h-5 w-5 text-[#0057B8]" />
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-[#334155]">{title}</h1>
          {description && <p className="text-sm text-[#334155]/60 mt-0.5">{description}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

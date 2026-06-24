"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Activity,
  Pill,
  ShoppingCart,
  Handshake,
  Factory,
  Bell,
  FileText,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Database,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard Geral", icon: LayoutDashboard },
  { href: "/epidemiologico", label: "Radar Epidemiológico", icon: Activity },
  { href: "/medicamentos", label: "Medicamentos Estratégicos", icon: Pill },
  { href: "/compras", label: "Compras Públicas", icon: ShoppingCart },
  { href: "/parcerias", label: "Parcerias e PDPs", icon: Handshake },
  { href: "/viabilidade", label: "Viabilidade Industrial", icon: Factory },
  { href: "/alertas", label: "Central de Alertas", icon: Bell },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
  { href: "/admin/dados", label: "Gestão de Dados", icon: Database },
  { href: "/admin", label: "Administração", icon: Shield },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-[#0057B8] min-h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
        <div className="bg-white rounded-lg p-1.5 shrink-0">
          <Shield className="h-5 w-5 text-[#0057B8]" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-white text-sm leading-tight">FarmaGOIE</p>
            <p className="text-white/60 text-[10px] leading-tight">Inteligência em Saúde</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all",
                active
                  ? "bg-white text-[#0057B8] shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-white/10">
          <p className="text-white/40 text-[10px]">SES-GO / IQUEGO</p>
          <p className="text-white/40 text-[10px]">Versão 1.0 MVP</p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-0.5 shadow-sm hover:shadow-md transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-[#0057B8]" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-[#0057B8]" />
        )}
      </button>
    </aside>
  );
}

"use client";

import { Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ALERTAS } from "@/lib/mock-data";

const criticos = ALERTAS.filter((a) => a.nivel === "critico" && (a.status as string) !== "resolvido").length;

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0057B8]/30 focus:border-[#0057B8]"
          placeholder="Buscar medicamento, doença, processo..."
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Alertas */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="h-4 w-4 text-gray-600" />
          {criticos > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
              {criticos}
            </span>
          )}
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="h-7 w-7 bg-[#0057B8] rounded-full flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-[#334155]">Gestor Estadual</p>
              <p className="text-[10px] text-gray-400">SES-GO</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-[#334155]">gestor@ses.go.gov.br</p>
                <p className="text-[10px] text-gray-400">Gestor Estadual</p>
              </div>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => setDropdownOpen(false)}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

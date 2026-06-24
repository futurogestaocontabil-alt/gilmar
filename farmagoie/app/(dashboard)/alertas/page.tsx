"use client";

import { Bell, AlertTriangle, CheckCircle2, Clock, Filter } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { RiskBadge } from "@/components/shared/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALERTAS } from "@/lib/mock-data";
import type { NivelRisco, StatusAlerta } from "@/types";

const NIVEL_LABELS: Record<string, string> = {
  critico: "Crítico",
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
};

const STATUS_LABELS: Record<string, string> = {
  ativo: "Ativo",
  em_analise: "Em Análise",
  resolvido: "Resolvido",
};

const STATUS_COLORS: Record<string, string> = {
  ativo: "bg-red-100 text-red-700",
  em_analise: "bg-yellow-100 text-yellow-700",
  resolvido: "bg-green-100 text-green-700",
};

const MODULO_COLORS: Record<string, string> = {
  "Epidemiológico": "bg-blue-100 text-blue-700",
  "Medicamentos": "bg-orange-100 text-orange-700",
  "Compras": "bg-purple-100 text-purple-700",
  "PDPs": "bg-green-100 text-green-700",
  "Viabilidade": "bg-yellow-100 text-yellow-700",
};

export default function AlertasPage() {
  const [filtroNivel, setFiltroNivel] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  const criticos = ALERTAS.filter((a) => a.nivel === "critico" && (a.status as string) !== "resolvido").length;
  const altos = ALERTAS.filter((a) => a.nivel === "alto" && (a.status as string) !== "resolvido").length;
  const ativos = ALERTAS.filter((a) => a.status === "ativo").length;
  const resolvidos = ALERTAS.filter((a) => a.status === "resolvido").length;

  const alertasFiltrados = ALERTAS.filter((a) => {
    const passaNivel = filtroNivel === "todos" || a.nivel === filtroNivel;
    const passaStatus = filtroStatus === "todos" || a.status === filtroStatus;
    return passaNivel && passaStatus;
  }).sort((a, b) => {
    const ord = { critico: 0, alto: 1, medio: 2, baixo: 3 };
    return ord[a.nivel as keyof typeof ord] - ord[b.nivel as keyof typeof ord];
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Central de Alertas"
        description="Monitoramento e gestão de alertas estratégicos — Estado de Goiás"
        icon={Bell}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Alertas Críticos"
          value={criticos}
          subtitle="Ação imediata necessária"
          icon={AlertTriangle}
          color="red"
          alert={criticos > 0}
        />
        <KpiCard
          title="Alertas Altos"
          value={altos}
          subtitle="Monitoramento intensivo"
          icon={Bell}
          color="orange"
          alert={altos > 0}
        />
        <KpiCard
          title="Alertas Ativos"
          value={ativos}
          subtitle="Aguardando resolução"
          icon={Clock}
          color="blue"
        />
        <KpiCard
          title="Resolvidos"
          value={resolvidos}
          subtitle="Total acumulado"
          icon={CheckCircle2}
          color="green"
        />
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filtrar por:
            </span>
            <div className="flex gap-2">
              {["todos", "critico", "alto", "medio", "baixo"].map((n) => (
                <button
                  key={n}
                  onClick={() => setFiltroNivel(n)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    filtroNivel === n
                      ? "bg-[#0057B8] text-white border-[#0057B8]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#0057B8]"
                  }`}
                >
                  {n === "todos" ? "Todos os níveis" : NIVEL_LABELS[n]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["todos", "ativo", "em_analise", "resolvido"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFiltroStatus(s)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    filtroStatus === s
                      ? "bg-[#334155] text-white border-[#334155]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#334155]"
                  }`}
                >
                  {s === "todos" ? "Todos os status" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de alertas */}
      <div className="space-y-3">
        {alertasFiltrados.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Nenhum alerta encontrado com os filtros selecionados.</p>
            </CardContent>
          </Card>
        ) : (
          alertasFiltrados.map((a) => (
            <Card
              key={a.id}
              className={`transition-all hover:shadow-md ${
                a.nivel === "critico" && (a.status as string) !== "resolvido"
                  ? "border-red-200 bg-red-50/30"
                  : a.nivel === "alto" && (a.status as string) !== "resolvido"
                  ? "border-orange-200 bg-orange-50/20"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <RiskBadge nivel={a.nivel as NivelRisco} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#334155]">{a.titulo}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_COLORS[a.status]}`}>
                        {STATUS_LABELS[a.status]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{a.descricao}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${MODULO_COLORS[a.modulo] || "bg-gray-100 text-gray-600"}`}>
                        {a.modulo}
                      </span>
                      <span className="text-[10px] text-gray-400">{a.data}</span>
                      {a.responsavel && (
                        <span className="text-[10px] text-gray-400">Resp.: {a.responsavel}</span>
                      )}
                    </div>
                    {a.acao_recomendada && (
                      <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-[10px] text-blue-700">
                          <span className="font-semibold">Ação recomendada:</span> {a.acao_recomendada}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

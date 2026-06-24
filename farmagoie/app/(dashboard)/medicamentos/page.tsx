"use client";

import { Pill, AlertTriangle, Package, TrendingDown, Globe } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { RiskBadge } from "@/components/shared/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MEDICAMENTOS_ESTRATEGICOS, INDICADORES_DASHBOARD } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

export default function MedicamentosPage() {
  const ind = INDICADORES_DASHBOARD;
  const criticos = MEDICAMENTOS_ESTRATEGICOS.filter((m) => m.risco === "critico");
  const altos = MEDICAMENTOS_ESTRATEGICOS.filter((m) => m.risco === "alto");

  const scatterData = MEDICAMENTOS_ESTRATEGICOS.map((m) => ({
    x: m.dependencia_importacao,
    y: m.estoque_meses,
    z: m.consumo_medio_mensal / 100,
    nome: m.nome,
    risco: m.risco,
  }));

  const estoqueData = MEDICAMENTOS_ESTRATEGICOS.map((m) => ({
    nome: m.nome.split(" ")[0],
    estoque: m.estoque_meses,
    minimo: 3,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Radar de Medicamentos Estratégicos"
        description="Monitoramento de estoque, risco e dependência — Estado de Goiás"
        icon={Pill}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Total Monitorados"
          value={ind.total_medicamentos_estrategicos}
          subtitle="Medicamentos estratégicos"
          icon={Pill}
          color="blue"
        />
        <KpiCard
          title="Risco Crítico"
          value={criticos.length}
          subtitle="Ação imediata necessária"
          icon={AlertTriangle}
          color="red"
          alert={criticos.length > 0}
        />
        <KpiCard
          title="Risco Alto"
          value={altos.length}
          subtitle="Monitoramento intensivo"
          icon={Package}
          color="orange"
          alert={altos.length > 0}
        />
        <KpiCard
          title="Dep. Importação Média"
          value={`${Math.round(MEDICAMENTOS_ESTRATEGICOS.reduce((s, m) => s + m.dependencia_importacao, 0) / MEDICAMENTOS_ESTRATEGICOS.length)}%`}
          subtitle="Vulnerabilidade de fornecimento"
          icon={Globe}
          color="orange"
        />
      </div>

      {/* Tabela principal */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155]">
            Medicamentos Estratégicos — Painel Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Medicamento</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Doença</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Consumo Mensal</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Custo Unitário</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Estoque</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Dep. Import.</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Fornecedor</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Risco</th>
                </tr>
              </thead>
              <tbody>
                {MEDICAMENTOS_ESTRATEGICOS.map((m) => (
                  <tr key={m.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${m.risco === "critico" ? "bg-red-50/50" : ""}`}>
                    <td className="py-2.5 px-3 font-medium text-[#334155]">{m.nome}</td>
                    <td className="py-2.5 px-3 text-gray-500">{m.doenca}</td>
                    <td className="py-2.5 px-3 text-right">{formatNumber(m.consumo_medio_mensal)} un/mês</td>
                    <td className="py-2.5 px-3 text-right">{formatCurrency(m.custo_unitario)}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full min-w-[48px]">
                          <div
                            className={`h-1.5 rounded-full ${m.estoque_meses <= 2 ? "bg-red-500" : m.estoque_meses <= 4 ? "bg-yellow-500" : "bg-green-500"}`}
                            style={{ width: `${Math.min((m.estoque_meses / 12) * 100, 100)}%` }}
                          />
                        </div>
                        <span className={`font-medium ${m.estoque_meses <= 2 ? "text-red-600" : m.estoque_meses <= 4 ? "text-yellow-600" : "text-green-600"}`}>
                          {m.estoque_meses}m
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`font-medium ${m.dependencia_importacao >= 80 ? "text-red-600" : m.dependencia_importacao >= 50 ? "text-yellow-600" : "text-green-600"}`}>
                        {m.dependencia_importacao}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 max-w-[140px] truncate">{m.fornecedor_principal}</td>
                    <td className="py-2.5 px-3 text-center">
                      <RiskBadge nivel={m.risco} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Estoque (meses) vs. Mínimo Recomendado (3 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={estoqueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="nome" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v, name) => [name === "estoque" ? `${v} meses` : `${v} meses (mínimo)`, name === "estoque" ? "Estoque Atual" : "Estoque Mínimo"]} />
                <Bar dataKey="estoque" fill="#0057B8" radius={[4, 4, 0, 0]} name="Estoque Atual" />
                <Bar dataKey="minimo" fill="#ef4444" radius={[4, 4, 0, 0]} name="Mínimo" opacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Dependência de Importação por Medicamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MEDICAMENTOS_ESTRATEGICOS.sort((a, b) => b.dependencia_importacao - a.dependencia_importacao).map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-600 w-28 truncate shrink-0">{m.nome.split(" ")[0]}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full">
                    <div
                      className={`h-2 rounded-full ${m.dependencia_importacao >= 80 ? "bg-red-500" : m.dependencia_importacao >= 50 ? "bg-yellow-500" : "bg-green-500"}`}
                      style={{ width: `${m.dependencia_importacao}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#334155] w-8 text-right">{m.dependencia_importacao}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards críticos detalhados */}
      {criticos.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Medicamentos em Situação Crítica — Requer Ação Imediata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticos.map((m) => (
              <Card key={m.id} className="border-red-200 bg-red-50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#334155]">{m.nome}</p>
                      <p className="text-xs text-gray-500">{m.doenca}</p>
                    </div>
                    <RiskBadge nivel={m.risco} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-[10px] text-gray-500">Estoque</p>
                      <p className="text-base font-bold text-red-600">{m.estoque_meses}m</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-[10px] text-gray-500">Dep. Import.</p>
                      <p className="text-base font-bold text-red-600">{m.dependencia_importacao}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-[10px] text-gray-500">Custo Unit.</p>
                      <p className="text-base font-bold text-[#334155]">{formatCurrency(m.custo_unitario)}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">Fornecedor: {m.fornecedor_principal}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

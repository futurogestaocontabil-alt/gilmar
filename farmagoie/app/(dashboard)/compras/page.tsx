"use client";

import { ShoppingCart, Clock, AlertTriangle, CheckCircle2, DollarSign } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPRAS_PUBLICAS, INDICADORES_DASHBOARD } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_LABELS: Record<string, string> = {
  em_andamento: "Em Andamento",
  concluido: "Concluído",
  atrasado: "Atrasado",
  cancelado: "Cancelado",
  planejado: "Planejado",
};

const STATUS_COLORS: Record<string, string> = {
  em_andamento: "bg-blue-100 text-blue-700",
  concluido: "bg-green-100 text-green-700",
  atrasado: "bg-red-100 text-red-700",
  cancelado: "bg-gray-100 text-gray-700",
  planejado: "bg-yellow-100 text-yellow-700",
};

const MODALIDADE_COLORS = ["#0057B8", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function ComprasPage() {
  const ind = INDICADORES_DASHBOARD;
  const total = COMPRAS_PUBLICAS.reduce((s, c) => s + c.valor_estimado, 0);
  const atrasados = COMPRAS_PUBLICAS.filter((c) => c.risco_atraso === "alto" || c.status === "atrasado").length;
  const concluidos = COMPRAS_PUBLICAS.filter((c) => c.status === "concluido").length;

  const modalidadeData = Object.entries(
    COMPRAS_PUBLICAS.reduce((acc, c) => {
      acc[c.modalidade] = (acc[c.modalidade] || 0) + c.valor_estimado;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value: Math.round(value / 1_000_000) }));

  const barData = COMPRAS_PUBLICAS.map((c) => ({
    nome: c.objeto.split(" ").slice(0, 3).join(" "),
    estimado: Math.round(c.valor_estimado / 1000),
    economizado: Math.round((c.valor_estimado - (c.valor_homologado || c.valor_estimado)) / 1000),
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Radar de Compras Públicas"
        description="Monitoramento de processos licitatórios e contratos — Estado de Goiás"
        icon={ShoppingCart}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Volume Total"
          value={formatCurrency(ind.valor_total_compras_ano)}
          subtitle="Estimativa anual 2024"
          icon={DollarSign}
          color="blue"
        />
        <KpiCard
          title="Processos Monitorados"
          value={COMPRAS_PUBLICAS.length}
          subtitle="Licitações ativas"
          icon={ShoppingCart}
          color="blue"
        />
        <KpiCard
          title="Com Risco de Atraso"
          value={atrasados}
          subtitle="Requer atenção"
          icon={AlertTriangle}
          color="orange"
          alert={atrasados > 0}
        />
        <KpiCard
          title="Economia Gerada"
          value={formatCurrency(ind.economia_gerada_ano)}
          subtitle="Processos otimizados"
          icon={DollarSign}
          color="green"
          trend="down"
          trendValue="12,5% vs 2023"
        />
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155]">
            Processos Licitatórios — Painel de Controle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Objeto / Licitação</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Modalidade</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Valor Estimado</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Valor Homologado</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Data Abertura</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Status</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Risco Atraso</th>
                </tr>
              </thead>
              <tbody>
                {COMPRAS_PUBLICAS.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3">
                      <p className="font-medium text-[#334155] max-w-[220px] truncate">{c.objeto}</p>
                      <p className="text-[10px] text-gray-400">{c.numero_processo}</p>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">{c.modalidade}</td>
                    <td className="py-2.5 px-3 text-right font-medium">{formatCurrency(c.valor_estimado)}</td>
                    <td className="py-2.5 px-3 text-right">
                      {c.valor_homologado ? (
                        <span className="text-green-700 font-medium">{formatCurrency(c.valor_homologado)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center text-gray-500">{c.data_abertura}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>
                        {STATUS_LABELS[c.status]}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        c.risco_atraso === "alto" ? "bg-red-100 text-red-700" :
                        c.risco_atraso === "medio" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {c.risco_atraso === "alto" ? "Alto" : c.risco_atraso === "medio" ? "Médio" : "Baixo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 bg-gray-50">
                  <td colSpan={2} className="py-2 px-3 text-xs font-semibold text-[#334155]">Total</td>
                  <td className="py-2 px-3 text-right text-xs font-bold text-[#334155]">{formatCurrency(total)}</td>
                  <td colSpan={4} />
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Volume por Modalidade (R$ Mi)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={modalidadeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: R$${value}Mi`} labelLine={false}>
                  {modalidadeData.map((_, i) => (
                    <Cell key={i} fill={MODALIDADE_COLORS[i % MODALIDADE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`R$ ${v}Mi`, "Valor"]} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Valor Estimado vs. Homologado (R$ mil)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="nome" tick={{ fontSize: 8 }} angle={-20} textAnchor="end" />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v, name) => [`R$ ${v}k`, name === "estimado" ? "Estimado" : "Economia"]} />
                <Bar dataKey="estimado" fill="#0057B8" radius={[4, 4, 0, 0]} name="Estimado" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

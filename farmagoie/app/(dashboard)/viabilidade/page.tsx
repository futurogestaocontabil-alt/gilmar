"use client";

import { Factory, TrendingUp, Globe, Wrench, DollarSign } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VIABILIDADE_INDUSTRIAL } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  viavel: "bg-green-100 text-green-700",
  em_estudo: "bg-blue-100 text-blue-700",
  inviavel: "bg-red-100 text-red-700",
  prospeccao: "bg-yellow-100 text-yellow-700",
};

const STATUS_LABELS: Record<string, string> = {
  viavel: "Viável",
  em_estudo: "Em Estudo",
  inviavel: "Inviável",
  prospeccao: "Prospecção",
};

const COLORS = ["#0057B8", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function ViabilidadePage() {
  const viaveis = VIABILIDADE_INDUSTRIAL.filter((v) => v.status === "viavel").length;
  const emEstudo = VIABILIDADE_INDUSTRIAL.filter((v) => v.status === "em_estudo").length;
  const scoreMedia = Math.round(
    VIABILIDADE_INDUSTRIAL.reduce((s, v) => s + v.score_geral, 0) / VIABILIDADE_INDUSTRIAL.length
  );

  const barData = VIABILIDADE_INDUSTRIAL.map((v) => ({
    nome: v.produto.split(" ")[0],
    tecnica: v.viabilidade_tecnica,
    economica: v.viabilidade_economica,
    regulatoria: v.viabilidade_regulatoria,
    mercado: v.potencial_mercado,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Radar de Viabilidade Industrial"
        description="Análise de viabilidade para produção farmacêutica nacional — IQUEGO"
        icon={Factory}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Produtos Analisados"
          value={VIABILIDADE_INDUSTRIAL.length}
          subtitle="Em avaliação IQUEGO"
          icon={Factory}
          color="blue"
        />
        <KpiCard
          title="Viáveis"
          value={viaveis}
          subtitle="Prontos para produção"
          icon={TrendingUp}
          color="green"
        />
        <KpiCard
          title="Em Estudo"
          value={emEstudo}
          subtitle="Análise em andamento"
          icon={Wrench}
          color="orange"
        />
        <KpiCard
          title="Score Médio"
          value={`${scoreMedia}/100`}
          subtitle="Viabilidade consolidada"
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Cards de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VIABILIDADE_INDUSTRIAL.map((v, i) => {
          const radarData = [
            { dim: "Técnica", valor: v.viabilidade_tecnica },
            { dim: "Econômica", valor: v.viabilidade_economica },
            { dim: "Regulatória", valor: v.viabilidade_regulatoria },
            { dim: "Mercado", valor: v.potencial_mercado },
          ];

          return (
            <Card key={v.id} className="overflow-hidden">
              <div className="h-1" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#334155]">{v.produto}</p>
                    <p className="text-[10px] text-gray-500">{v.classe_terapeutica}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_COLORS[v.status]}`}>
                    {STATUS_LABELS[v.status]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500">Score Geral</p>
                    <p className="text-2xl font-bold" style={{ color: COLORS[i % COLORS.length] }}>{v.score_geral}</p>
                  </div>
                  <ResponsiveContainer width={120} height={100}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#f0f0f0" />
                      <PolarAngleAxis dataKey="dim" tick={{ fontSize: 7 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} />
                      <Radar dataKey="valor" stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: "Técnica", val: v.viabilidade_tecnica },
                    { label: "Econômica", val: v.viabilidade_economica },
                    { label: "Regulatória", val: v.viabilidade_regulatoria },
                    { label: "Mercado", val: v.potencial_mercado },
                  ].map((dim) => (
                    <div key={dim.label} className="bg-gray-50 rounded-lg p-1.5">
                      <p className="text-[9px] text-gray-500">{dim.label}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full">
                          <div className="h-1 rounded-full" style={{ width: `${dim.val}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                        </div>
                        <span className="text-[9px] font-bold text-[#334155]">{dim.val}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[10px] pt-1 border-t border-gray-100">
                  <span className="text-gray-500">Investimento: {formatCurrency(v.investimento_necessario)}</span>
                  <span className="text-gray-500">ROI: {v.prazo_retorno_anos}a</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparativo de dimensões */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155]">
            Comparativo de Dimensões de Viabilidade (0–100)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="nome" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="tecnica" name="Técnica" fill="#0057B8" radius={[2, 2, 0, 0]} />
              <Bar dataKey="economica" name="Econômica" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="regulatoria" name="Regulatória" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="mercado" name="Mercado" fill="#f59e0b" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

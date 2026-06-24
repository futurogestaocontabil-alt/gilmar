"use client";

import { Handshake, Trophy, TrendingDown, Building2, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDPS, INDICADORES_DASHBOARD } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const STATUS_LABELS: Record<string, string> = {
  aprovada: "Aprovada",
  em_negociacao: "Em Negociação",
  prospeccao: "Prospecção",
  encerrada: "Encerrada",
};

const STATUS_COLORS: Record<string, string> = {
  aprovada: "bg-green-100 text-green-700 border-green-200",
  em_negociacao: "bg-yellow-100 text-yellow-700 border-yellow-200",
  prospeccao: "bg-blue-100 text-blue-700 border-blue-200",
  encerrada: "bg-gray-100 text-gray-700 border-gray-200",
};

const FASE_COLORS: Record<string, string> = {
  aprovada: "#10b981",
  em_negociacao: "#f59e0b",
  prospeccao: "#0057B8",
  encerrada: "#94a3b8",
};

export default function ParceriasPage() {
  const ind = INDICADORES_DASHBOARD;
  const economiaTotal = PDPS.reduce((s, p) => s + p.valor_contrato * (p.economia_prevista / 100), 0);

  const radarData = [
    { criterio: "Inovação", valor: 95 },
    { criterio: "Impacto Social", valor: 92 },
    { criterio: "Abrangência", valor: 88 },
    { criterio: "Replicabilidade", valor: 85 },
    { criterio: "Viabilidade", valor: 90 },
  ];

  const economiaBarData = PDPS.map((p) => ({
    nome: p.medicamento.split(" ")[0],
    economia: p.economia_prevista,
    contratoMi: Math.round(p.valor_contrato / 1_000_000),
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Radar de Parcerias e PDPs"
        description="Parcerias para Desenvolvimento Produtivo — IQUEGO e parceiros"
        icon={Handshake}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="PDPs Ativas"
          value={ind.pdps_ativas}
          subtitle="Em andamento ou negociação"
          icon={Handshake}
          color="purple"
        />
        <KpiCard
          title="Em Prospecção"
          value={ind.pdps_prospeccao}
          subtitle="Avaliação preliminar"
          icon={Building2}
          color="blue"
        />
        <KpiCard
          title="Economia Prevista"
          value={formatCurrency(economiaTotal)}
          subtitle="Estimativa consolidada"
          icon={TrendingDown}
          color="green"
        />
        <KpiCard
          title="Score Prêmio GO"
          value="92,1 / 100"
          subtitle="Inovação em Saúde"
          icon={Trophy}
          color="orange"
        />
      </div>

      {/* Cards de PDP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PDPS.map((p) => (
          <Card key={p.id} className={`border-l-4`} style={{ borderLeftColor: FASE_COLORS[p.status] }}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#334155]">{p.medicamento}</p>
                  <p className="text-xs text-gray-500">{p.doenca}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border shrink-0 ${STATUS_COLORS[p.status]}`}>
                  {STATUS_LABELS[p.status]}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Valor Contrato</p>
                  <p className="text-xs font-bold text-[#334155]">{formatCurrency(p.valor_contrato)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Economia</p>
                  <p className="text-sm font-bold text-green-700">-{p.economia_prevista}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Vigência</p>
                  <p className="text-xs font-bold text-[#334155]">{p.vigencia_anos}a</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-500">Fase: {p.fase}</span>
                  <span className="text-gray-500">Parceiro: {p.laboratorio_parceiro}</span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-gray-500">Progresso</span>
                    <span className="font-medium text-[#334155]">{p.progresso_pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${p.progresso_pct}%`, backgroundColor: FASE_COLORS[p.status] }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Economia Prevista por PDP (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={economiaBarData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="nome" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [`${v}%`, "Economia Prevista"]} />
                <Bar dataKey="economia" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aderência Prêmio */}
        <Card className="bg-gradient-to-br from-[#0057B8] to-[#003d82] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-300" />
              Aderência — Prêmio Inovação GO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { criterio: "Inovação", peso: 40, score: 95 },
              { criterio: "Impacto Social", peso: 30, score: 92 },
              { criterio: "Abrangência", peso: 20, score: 88 },
              { criterio: "Replicabilidade", peso: 10, score: 85 },
            ].map((c) => (
              <div key={c.criterio}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/80">{c.criterio} ({c.peso}%)</span>
                  <span className="text-white font-bold">{c.score}%</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full">
                  <div className="h-1.5 bg-yellow-300 rounded-full" style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-white/20">
              <div className="flex justify-between text-xs">
                <span className="text-white/80">Score Ponderado</span>
                <span className="text-yellow-300 font-bold text-base">92,1 / 100</span>
              </div>
              <p className="text-white/50 text-[10px] mt-1">
                Calculado: 0,4×95 + 0,3×92 + 0,2×88 + 0,1×85
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline de fases */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155]">
            Cronograma e Fases das PDPs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {PDPS.map((p) => (
              <div key={p.id} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: FASE_COLORS[p.status] }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-[#334155]">{p.medicamento}</p>
                    <span className="text-[10px] text-gray-400">{p.data_inicio} → {p.data_fim_previsto}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1">{p.fase} · {p.laboratorio_parceiro}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${p.progresso_pct}%`, backgroundColor: FASE_COLORS[p.status] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Activity, TrendingUp, TrendingDown, Minus, MapPin, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { RiskBadge, TendenciaBadge } from "@/components/shared/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DOENCAS_PRIORITARIAS, EVOLUCAO_TEMPORAL, REGIONAIS_SAUDE, INDICADORES_DASHBOARD } from "@/lib/mock-data";
import { formatNumber, formatCurrency } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#0057B8", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b", "#06b6d4"];

export default function EpidemiologicoPage() {
  const ind = INDICADORES_DASHBOARD;

  const radarData = DOENCAS_PRIORITARIAS.map((d) => ({
    doenca: d.nome.split("/")[0].trim().split(" ")[0],
    casos: Math.round(d.casos_estimados / 1000),
    custo: Math.round(d.custo_anual_estimado / 1_000_000),
    mortalidade: d.taxa_mortalidade * 10,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Radar Epidemiológico"
        description="Monitoramento de doenças prioritárias — Estado de Goiás"
        icon={Activity}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Doenças Monitoradas"
          value={ind.total_doencas_monitoradas}
          subtitle="6 grupos prioritários"
          icon={Activity}
          color="blue"
        />
        <KpiCard
          title="Casos Estimados"
          value={formatNumber(DOENCAS_PRIORITARIAS.reduce((s, d) => s + d.casos_estimados, 0))}
          subtitle="Total consolidado"
          icon={Users}
          color="orange"
        />
        <KpiCard
          title="Municípios Monitorados"
          value={`${ind.municipios_monitorados}/246`}
          subtitle="Cobertura territorial"
          icon={MapPin}
          color="blue"
        />
        <KpiCard
          title="Cobertura Populacional"
          value={`${ind.cobertura_populacao_pct}%`}
          subtitle="Acesso epidemiológico"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Tabela de Doenças */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155]">
            Doenças Prioritárias — Indicadores Consolidados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Doença / Grupo</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Casos Estimados</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Taxa Mortalidade</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Custo Anual</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Tendência</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Risco</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">CID-10</th>
                </tr>
              </thead>
              <tbody>
                {DOENCAS_PRIORITARIAS.map((d, i) => (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <span className="font-medium text-[#334155]">{d.nome}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium">{formatNumber(d.casos_estimados)}</td>
                    <td className="py-2.5 px-3 text-right">{d.taxa_mortalidade.toFixed(1)}%</td>
                    <td className="py-2.5 px-3 text-right">{formatCurrency(d.custo_anual_estimado)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <TendenciaBadge tendencia={d.tendencia} />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <RiskBadge nivel={d.nivel_risco} />
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-500">{d.cid10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Evolução Temporal — Casos por Doença (mil pacientes) 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={EVOLUCAO_TEMPORAL} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  {["cardiovascular","diabetes","mental","oncologico","respiratorio"].map((key, i) => (
                    <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[i]} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [`${v}k`, ""]} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="cardiovascular" stroke={COLORS[0]} fill={`url(#grad-cardiovascular)`} name="Cardiovascular" strokeWidth={2} />
                <Area type="monotone" dataKey="diabetes" stroke={COLORS[1]} fill={`url(#grad-diabetes)`} name="Diabetes" strokeWidth={2} />
                <Area type="monotone" dataKey="mental" stroke={COLORS[2]} fill={`url(#grad-mental)`} name="Saúde Mental" strokeWidth={2} />
                <Area type="monotone" dataKey="oncologico" stroke={COLORS[3]} fill={`url(#grad-oncologico)`} name="Oncológico" strokeWidth={2} />
                <Area type="monotone" dataKey="respiratorio" stroke={COLORS[4]} fill={`url(#grad-respiratorio)`} name="Respiratório" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar multidimensional */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Perfil de Risco — Casos (mil) por Grupo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="doenca" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis tick={{ fontSize: 8 }} />
                <Radar name="Casos (mil)" dataKey="casos" stroke="#0057B8" fill="#0057B8" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regionais */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Regionais de Saúde — Cobertura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {REGIONAIS_SAUDE.slice(0, 8).map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 w-24 truncate">{r.nome.replace("Regional de Saúde de ", "").replace("Regional de Saúde do ", "")}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 rounded-full bg-[#0057B8]"
                    style={{ width: `${r.cobertura_pct}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-[#334155] w-8 text-right">{r.cobertura_pct}%</span>
                <span className="text-[10px] text-gray-400 w-12 text-right">{r.municipios} mun.</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cards por doença */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOENCAS_PRIORITARIAS.map((d, i) => (
          <Card key={d.id} className="border-l-4" style={{ borderLeftColor: COLORS[i % COLORS.length] }}>
            <CardHeader className="pb-1">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-[#334155]">{d.nome.split("/")[0].trim()}</CardTitle>
                  <p className="text-[10px] text-gray-500 mt-0.5">{d.cid10}</p>
                </div>
                <TendenciaBadge tendencia={d.tendencia} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Casos Estimados</p>
                  <p className="text-sm font-bold text-[#334155]">{formatNumber(d.casos_estimados)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">Mortalidade</p>
                  <p className="text-sm font-bold text-[#334155]">{d.taxa_mortalidade.toFixed(1)}%</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Custo Anual Estimado</p>
                <p className="text-sm font-bold text-[#334155]">{formatCurrency(d.custo_anual_estimado)}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <RiskBadge nivel={d.nivel_risco} />
                <p className="text-[10px] text-gray-400">{d.medicamentos_associados} medicamentos</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

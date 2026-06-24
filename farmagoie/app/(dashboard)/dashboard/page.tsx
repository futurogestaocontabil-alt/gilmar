"use client";

import {
  Activity,
  Pill,
  ShoppingCart,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Handshake,
  DollarSign,
  Building2,
  Trophy,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { RiskBadge, TendenciaBadge } from "@/components/shared/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  INDICADORES_DASHBOARD,
  DOENCAS_PRIORITARIAS,
  MEDICAMENTOS_ESTRATEGICOS,
  ALERTAS,
  EVOLUCAO_TEMPORAL,
  PDPS,
} from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  const ind = INDICADORES_DASHBOARD;
  const criticos = MEDICAMENTOS_ESTRATEGICOS.filter((m) => m.risco === "critico");
  const alertasCriticos = ALERTAS.filter((a) => a.nivel === "critico" && (a.status as string) !== "resolvido");

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard Geral"
        description="Visão estratégica integrada — Estado de Goiás"
        icon={Activity}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs Linha 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Doenças Monitoradas"
          value={ind.total_doencas_monitoradas}
          subtitle="6 grupos prioritários"
          icon={Activity}
          color="blue"
        />
        <KpiCard
          title="Medicamentos Estratégicos"
          value={ind.total_medicamentos_estrategicos}
          subtitle={`${ind.medicamentos_criticos} críticos`}
          icon={Pill}
          color="orange"
          alert={ind.medicamentos_criticos > 0}
        />
        <KpiCard
          title="Alertas Ativos"
          value={ind.alertas_total}
          subtitle={`${ind.alertas_criticos} críticos`}
          icon={Bell}
          color="red"
          alert={ind.alertas_criticos > 0}
        />
        <KpiCard
          title="PDPs em Andamento"
          value={ind.pdps_ativas}
          subtitle={`${ind.pdps_prospeccao} em prospecção`}
          icon={Handshake}
          color="purple"
        />
      </div>

      {/* KPIs Linha 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Compras / Ano"
          value={formatCurrency(ind.valor_total_compras_ano)}
          subtitle="Estimativa 2024"
          icon={ShoppingCart}
          color="blue"
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
        <KpiCard
          title="Municípios Monitorados"
          value={`${ind.municipios_monitorados}/246`}
          subtitle="Cobertura territorial"
          icon={Building2}
          color="blue"
        />
        <KpiCard
          title="Cobertura Populacional"
          value={`${ind.cobertura_populacao_pct}%`}
          subtitle="Acesso a dados epidemiológicos"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Linha Central */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Evolução Epidemiológica */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Evolução de Casos por Doença (mil pacientes) — 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={EVOLUCAO_TEMPORAL} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [`${v}k`, ""]} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="cardiovascular" stroke="#0057B8" name="Cardiovascular" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="diabetes" stroke="#10b981" name="Diabetes" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="mental" stroke="#8b5cf6" name="Saúde Mental" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="oncologico" stroke="#ef4444" name="Oncológico" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="respiratorio" stroke="#f59e0b" name="Respiratório" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ranking Doenças */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Ranking — Casos Estimados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {DOENCAS_PRIORITARIAS.sort((a, b) => b.casos_estimados - a.casos_estimados).map((d, i) => (
              <div key={d.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#334155] truncate">{d.nome.split("/")[0].trim()}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div
                      className="h-1.5 rounded-full bg-[#0057B8]"
                      style={{ width: `${(d.casos_estimados / 310000) * 100}%`, maxWidth: "100%" }}
                    />
                    <span className="text-[10px] text-gray-400">{formatNumber(d.casos_estimados)}</span>
                  </div>
                </div>
                <TendenciaBadge tendencia={d.tendencia} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Linha 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Medicamentos Críticos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Medicamentos Críticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {criticos.map((m) => (
              <div key={m.id} className="flex items-start justify-between gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#334155] truncate">{m.nome}</p>
                  <p className="text-[10px] text-gray-500">{m.doenca}</p>
                  <p className="text-[10px] font-medium text-red-700 mt-0.5">
                    Estoque: {m.estoque_meses} meses · Dep. Importação: {m.dependencia_importacao}%
                  </p>
                </div>
                <RiskBadge nivel={m.risco} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alertas Recentes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
              <Bell className="h-4 w-4 text-orange-500" />
              Alertas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ALERTAS.filter((a) => (a.status as string) !== "resolvido").slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <RiskBadge nivel={a.nivel} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#334155] truncate">{a.titulo}</p>
                  <p className="text-[10px] text-gray-500">{a.modulo} · {a.data}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PDPs e Critérios do Prêmio */}
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
                  <div
                    className="h-1.5 bg-yellow-300 rounded-full transition-all"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-white/20">
              <div className="flex justify-between text-xs">
                <span className="text-white/80">Score Ponderado</span>
                <span className="text-yellow-300 font-bold text-base">92,1 / 100</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compras por Modalidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Gastos por Categoria de Doença (R$ Mi)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={DOENCAS_PRIORITARIAS.map((d) => ({
                  nome: d.nome.split(" ")[0],
                  valor: d.custo_anual_estimado / 1_000_000,
                }))}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="nome" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [`R$ ${Number(v).toFixed(1)}Mi`, "Custo"]} />
                <Bar dataKey="valor" fill="#0057B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Status das PDPs — Resumo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PDPS.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#334155] truncate">{p.medicamento}</p>
                  <p className="text-[10px] text-gray-500">{p.fase}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-green-700">-{p.economia_prevista}%</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      p.status === "aprovada"
                        ? "bg-green-100 text-green-700"
                        : p.status === "em_negociacao"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {p.status === "aprovada" ? "Aprovada" : p.status === "em_negociacao" ? "Negociação" : "Prospecção"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

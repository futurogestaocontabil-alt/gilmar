"use client";

import { FileText, Download, Calendar, Filter, BarChart2, Activity, Pill, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RELATORIOS = [
  {
    id: "r1",
    titulo: "Boletim Epidemiológico Mensal",
    descricao: "Consolidado de casos, tendências e alertas por doença prioritária no Estado de Goiás.",
    modulo: "Epidemiológico",
    periodicidade: "Mensal",
    ultima_geracao: "20/06/2024",
    formato: ["PDF", "XLSX"],
    icon: Activity,
    color: "#0057B8",
  },
  {
    id: "r2",
    titulo: "Relatório de Estoque Crítico",
    descricao: "Medicamentos com estoque abaixo do mínimo recomendado e risco de desabastecimento.",
    modulo: "Medicamentos",
    periodicidade: "Semanal",
    ultima_geracao: "17/06/2024",
    formato: ["PDF", "XLSX", "CSV"],
    icon: Pill,
    color: "#ef4444",
  },
  {
    id: "r3",
    titulo: "Painel de Compras Públicas",
    descricao: "Status de processos licitatórios, economia gerada e riscos de atraso por modalidade.",
    modulo: "Compras",
    periodicidade: "Quinzenal",
    ultima_geracao: "15/06/2024",
    formato: ["PDF", "XLSX"],
    icon: ShoppingCart,
    color: "#8b5cf6",
  },
  {
    id: "r4",
    titulo: "Relatório de PDPs e Parcerias",
    descricao: "Andamento das Parcerias para Desenvolvimento Produtivo, economia prevista e cronogramas.",
    modulo: "PDPs",
    periodicidade: "Trimestral",
    ultima_geracao: "01/06/2024",
    formato: ["PDF"],
    icon: BarChart2,
    color: "#10b981",
  },
  {
    id: "r5",
    titulo: "Relatório de Viabilidade Industrial",
    descricao: "Análise de viabilidade técnica, econômica e regulatória para produção farmacêutica local.",
    modulo: "Viabilidade",
    periodicidade: "Semestral",
    ultima_geracao: "01/01/2024",
    formato: ["PDF", "XLSX"],
    icon: BarChart2,
    color: "#f59e0b",
  },
  {
    id: "r6",
    titulo: "Relatório Executivo — Dashboard Geral",
    descricao: "Visão estratégica integrada para gestores: KPIs, alertas críticos, economia e PDPs.",
    modulo: "Geral",
    periodicidade: "Mensal",
    ultima_geracao: "20/06/2024",
    formato: ["PDF"],
    icon: FileText,
    color: "#334155",
  },
];

const PERIODOS = ["Último mês", "Último trimestre", "Último semestre", "Último ano"];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("Último mês");
  const [modulo, setModulo] = useState("Todos");

  const modulos = ["Todos", ...Array.from(new Set(RELATORIOS.map((r) => r.modulo)))];
  const relatoriosFiltrados = RELATORIOS.filter(
    (r) => modulo === "Todos" || r.modulo === modulo
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Relatórios e Exportações"
        description="Geração e exportação de relatórios estratégicos — Estado de Goiás"
        icon={FileText}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">Período:</span>
              <div className="flex gap-2">
                {PERIODOS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriodo(p)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      periodo === p
                        ? "bg-[#0057B8] text-white border-[#0057B8]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#0057B8]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">Módulo:</span>
              <div className="flex gap-2 flex-wrap">
                {modulos.map((m) => (
                  <button
                    key={m}
                    onClick={() => setModulo(m)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      modulo === m
                        ? "bg-[#334155] text-white border-[#334155]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#334155]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatoriosFiltrados.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${r.color}15` }}>
                    <Icon className="h-5 w-5" style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#334155]">{r.titulo}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{r.modulo}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">{r.descricao}</p>

                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Periodicidade: {r.periodicidade}</span>
                  <span>Última geração: {r.ultima_geracao}</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <div className="flex gap-1 flex-1">
                    {r.formato.map((f) => (
                      <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                    <Download className="h-3 w-3" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Nota */}
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-4">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Nota:</strong> Os relatórios são gerados com base em dados simulados para fins de demonstração.
            Em ambiente de produção, os dados seriam extraídos diretamente das bases do SISREMUME, BNAFAR, COMPRASNET-GO e sistemas da SES-GO.
            A exportação em PDF/XLSX estará disponível após integração com os sistemas de origem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

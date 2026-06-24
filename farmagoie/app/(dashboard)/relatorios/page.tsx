"use client";

import { FileText, Download, Calendar, Filter, BarChart2, Activity, Pill, ShoppingCart, Handshake, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  exportDoencasCSV,
  exportDoencasPDF,
  exportMedicamentosCSV,
  exportMedicamentosPDF,
  exportComprasCSV,
  exportComprasPDF,
  exportPDPsCSV,
  exportAlertasCSV,
  exportExecutivoPDF,
} from "@/lib/export";

const RELATORIOS = [
  {
    id: "r1",
    titulo: "Boletim Epidemiológico Mensal",
    descricao: "Consolidado de casos, tendências e alertas por doença prioritária no Estado de Goiás.",
    modulo: "Epidemiológico",
    periodicidade: "Mensal",
    ultima_geracao: "20/06/2024",
    formato: ["PDF", "CSV"],
    icon: Activity,
    color: "#0057B8",
    onCSV: exportDoencasCSV,
    onPDF: exportDoencasPDF,
  },
  {
    id: "r2",
    titulo: "Relatório de Estoque Crítico",
    descricao: "Medicamentos com estoque abaixo do mínimo recomendado e risco de desabastecimento.",
    modulo: "Medicamentos",
    periodicidade: "Semanal",
    ultima_geracao: "17/06/2024",
    formato: ["PDF", "CSV"],
    icon: Pill,
    color: "#ef4444",
    onCSV: exportMedicamentosCSV,
    onPDF: exportMedicamentosPDF,
  },
  {
    id: "r3",
    titulo: "Painel de Compras Públicas",
    descricao: "Status de processos licitatórios, economia gerada e riscos de atraso por modalidade.",
    modulo: "Compras",
    periodicidade: "Quinzenal",
    ultima_geracao: "15/06/2024",
    formato: ["PDF", "CSV"],
    icon: ShoppingCart,
    color: "#8b5cf6",
    onCSV: exportComprasCSV,
    onPDF: exportComprasPDF,
  },
  {
    id: "r4",
    titulo: "Relatório de PDPs e Parcerias",
    descricao: "Andamento das Parcerias para Desenvolvimento Produtivo, economia prevista e cronogramas.",
    modulo: "PDPs",
    periodicidade: "Trimestral",
    ultima_geracao: "01/06/2024",
    formato: ["CSV"],
    icon: Handshake,
    color: "#10b981",
    onCSV: exportPDPsCSV,
    onPDF: null,
  },
  {
    id: "r5",
    titulo: "Central de Alertas — Export",
    descricao: "Todos os alertas ativos e resolvidos com nível de criticidade e responsável.",
    modulo: "Alertas",
    periodicidade: "Diário",
    ultima_geracao: "24/06/2024",
    formato: ["CSV"],
    icon: BarChart2,
    color: "#f59e0b",
    onCSV: exportAlertasCSV,
    onPDF: null,
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
    onCSV: null,
    onPDF: exportExecutivoPDF,
  },
];

const PERIODOS = ["Último mês", "Último trimestre", "Último semestre", "Último ano"];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("Último mês");
  const [modulo, setModulo] = useState("Todos");
  const [exportando, setExportando] = useState<string | null>(null);

  const modulos = ["Todos", ...Array.from(new Set(RELATORIOS.map((r) => r.modulo)))];
  const relatoriosFiltrados = RELATORIOS.filter(
    (r) => modulo === "Todos" || r.modulo === modulo
  );

  async function handleExport(id: string, fn: (() => void) | null) {
    if (!fn) return;
    setExportando(id);
    await new Promise((r) => setTimeout(r, 300));
    fn();
    setExportando(null);
  }

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
              <div className="flex gap-2 flex-wrap">
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
          const isExporting = exportando === r.id + "-csv" || exportando === r.id + "-pdf";
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
                  <span>Última: {r.ultima_geracao}</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <div className="flex gap-1 flex-1">
                    {r.formato.map((f) => (
                      <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {r.onCSV && (
                      <button
                        onClick={() => handleExport(r.id + "-csv", r.onCSV)}
                        disabled={isExporting}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium border border-gray-200 rounded hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors disabled:opacity-50"
                      >
                        <Download className="h-3 w-3" />
                        CSV
                      </button>
                    )}
                    {r.onPDF && (
                      <button
                        onClick={() => handleExport(r.id + "-pdf", r.onPDF)}
                        disabled={isExporting}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors disabled:opacity-50"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </button>
                    )}
                  </div>
                </div>

                {isExporting && (
                  <div className="flex items-center gap-2 text-[10px] text-blue-600">
                    <div className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Gerando arquivo...
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Status */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 flex items-start gap-3">
          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <p className="text-xs text-green-700 leading-relaxed">
            <strong>Exportação ativa:</strong> Os botões CSV e PDF geram arquivos reais com os dados do sistema.
            CSV abre diretamente no Excel. PDF abre uma janela de impressão formatada.
            Em produção, os dados seriam extraídos do SISREMUME, BNAFAR, COMPRASNET-GO e sistemas da SES-GO.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

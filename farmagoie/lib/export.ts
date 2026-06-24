// Utilitários de exportação — FarmaGOIE
// Exportação CSV (nativa, sem dependências) e PDF (via janela de impressão)

export function exportCSV(filename: string, headers: string[], rows: (string | number | null | undefined)[][]) {
  const escape = (v: string | number | null | undefined) => {
    const s = v == null ? "" : String(v);
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const lines = [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))];
  const bom = "﻿"; // UTF-8 BOM para Excel abrir corretamente
  const blob = new Blob([bom + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPDF(titulo: string, htmlContent: string) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>${titulo} — FarmaGOIE</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 11px; color: #334155; padding: 24px; }
    h1 { font-size: 16px; color: #0057B8; margin-bottom: 4px; }
    .subtitle { font-size: 10px; color: #94a3b8; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th { background: #0057B8; color: white; padding: 6px 8px; text-align: left; font-size: 10px; }
    td { padding: 5px 8px; border-bottom: 1px solid #f1f5f9; font-size: 10px; }
    tr:nth-child(even) td { background: #f8fafc; }
    .badge-critico { background:#fee2e2; color:#dc2626; padding:1px 6px; border-radius:9px; font-size:9px; font-weight:bold; }
    .badge-alto { background:#ffedd5; color:#ea580c; padding:1px 6px; border-radius:9px; font-size:9px; font-weight:bold; }
    .badge-medio { background:#fef9c3; color:#ca8a04; padding:1px 6px; border-radius:9px; font-size:9px; font-weight:bold; }
    .badge-baixo { background:#dcfce7; color:#16a34a; padding:1px 6px; border-radius:9px; font-size:9px; font-weight:bold; }
    .footer { margin-top:20px; padding-top:10px; border-top:1px solid #e2e8f0; font-size:9px; color:#94a3b8; }
    @media print { body { padding: 12px; } }
  </style>
</head>
<body>
  <h1>${titulo}</h1>
  <p class="subtitle">FarmaGOIE — Inteligência Estratégica em Saúde · Estado de Goiás · Gerado em ${new Date().toLocaleDateString("pt-BR")} · DADOS SIMULADOS PARA DEMONSTRAÇÃO</p>
  ${htmlContent}
  <div class="footer">
    FarmaGOIE © ${new Date().getFullYear()} · SES-GO / IQUEGO · Dados fictícios para fins de demonstração · Não substituem decisão técnica humana
  </div>
</body>
</html>`);
  win.document.close();
  setTimeout(() => { win.print(); }, 500);
}

// ─── Exportadores específicos por módulo ───────────────────────────────────

import {
  DOENCAS_PRIORITARIAS,
  MEDICAMENTOS_ESTRATEGICOS,
  COMPRAS_PUBLICAS,
  PDPS,
  ALERTAS,
} from "./mock-data";
import { formatCurrency, formatNumber } from "./utils";

export function exportDoencasCSV() {
  exportCSV("farmagoie_doencas", [
    "Nome", "CID-10", "Casos Estimados", "Taxa Mortalidade (%)", "Custo Anual (R$)", "Tendência", "Risco"
  ], DOENCAS_PRIORITARIAS.map((d) => [
    d.nome, d.cid10, d.casos_estimados, d.taxa_mortalidade, d.custo_anual_estimado, d.tendencia, d.nivel_risco
  ]));
}

export function exportDoencasPDF() {
  const rows = DOENCAS_PRIORITARIAS.map((d) => `
    <tr>
      <td>${d.nome}</td>
      <td>${d.cid10}</td>
      <td>${formatNumber(d.casos_estimados)}</td>
      <td>${d.taxa_mortalidade.toFixed(1)}%</td>
      <td>${formatCurrency(d.custo_anual_estimado)}</td>
      <td>${d.tendencia}</td>
      <td><span class="badge-${d.nivel_risco}">${d.nivel_risco.toUpperCase()}</span></td>
    </tr>`).join("");
  exportPDF("Boletim Epidemiológico", `
    <table>
      <thead><tr><th>Doença</th><th>CID-10</th><th>Casos</th><th>Mortalidade</th><th>Custo Anual</th><th>Tendência</th><th>Risco</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`);
}

export function exportMedicamentosCSV() {
  exportCSV("farmagoie_medicamentos", [
    "Medicamento", "Doença", "Estoque (meses)", "Consumo Mensal", "Custo Unitário (R$)", "Dep. Importação (%)", "Fornecedor", "Risco"
  ], MEDICAMENTOS_ESTRATEGICOS.map((m) => [
    m.nome, m.doenca, m.estoque_meses, m.consumo_medio_mensal, m.custo_unitario, m.dependencia_importacao, m.fornecedor_principal, m.risco
  ]));
}

export function exportMedicamentosPDF() {
  const rows = MEDICAMENTOS_ESTRATEGICOS.map((m) => `
    <tr>
      <td>${m.nome}</td>
      <td>${m.doenca}</td>
      <td style="color:${m.estoque_meses <= 2 ? '#dc2626' : m.estoque_meses <= 4 ? '#ca8a04' : '#16a34a'};font-weight:bold">${m.estoque_meses}m</td>
      <td>${formatNumber(m.consumo_medio_mensal)}</td>
      <td>${formatCurrency(m.custo_unitario)}</td>
      <td>${m.dependencia_importacao}%</td>
      <td>${m.fornecedor_principal}</td>
      <td><span class="badge-${m.risco}">${m.risco.toUpperCase()}</span></td>
    </tr>`).join("");
  exportPDF("Relatório de Medicamentos Estratégicos", `
    <table>
      <thead><tr><th>Medicamento</th><th>Doença</th><th>Estoque</th><th>Consumo/Mês</th><th>Custo Unit.</th><th>Dep. Import.</th><th>Fornecedor</th><th>Risco</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`);
}

export function exportComprasCSV() {
  exportCSV("farmagoie_compras", [
    "Processo", "Objeto", "Modalidade", "Valor Estimado (R$)", "Valor Homologado (R$)", "Status", "Risco Atraso", "Data Abertura", "Economia (%)"
  ], COMPRAS_PUBLICAS.map((c) => [
    c.numero_processo, c.objeto, c.modalidade, c.valor_estimado, c.valor_homologado ?? "", c.status, c.risco_atraso, c.data_abertura, c.economia_estimada
  ]));
}

export function exportComprasPDF() {
  const rows = COMPRAS_PUBLICAS.map((c) => `
    <tr>
      <td>${c.numero_processo}</td>
      <td>${c.objeto}</td>
      <td>${c.modalidade}</td>
      <td>${formatCurrency(c.valor_estimado)}</td>
      <td>${c.valor_homologado ? formatCurrency(c.valor_homologado) : "—"}</td>
      <td>${c.status}</td>
      <td><span class="badge-${c.risco_atraso === 'alto' ? 'critico' : c.risco_atraso === 'medio' ? 'medio' : 'baixo'}">${c.risco_atraso.toUpperCase()}</span></td>
    </tr>`).join("");
  exportPDF("Painel de Compras Públicas", `
    <table>
      <thead><tr><th>Processo</th><th>Objeto</th><th>Modalidade</th><th>Valor Est.</th><th>Homologado</th><th>Status</th><th>Risco</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`);
}

export function exportPDPsCSV() {
  exportCSV("farmagoie_pdps", [
    "Medicamento", "Doença", "Laboratório Parceiro", "Status", "Fase", "Economia Prevista (%)", "Valor Contrato (R$)", "Progresso (%)", "Início", "Fim Previsto"
  ], PDPS.map((p) => [
    p.medicamento, p.doenca, p.laboratorio_parceiro, p.status, p.fase, p.economia_prevista, p.valor_contrato, p.progresso_pct, p.data_inicio, p.data_fim_previsto
  ]));
}

export function exportAlertasCSV() {
  exportCSV("farmagoie_alertas", [
    "Título", "Módulo", "Nível", "Status", "Data", "Responsável"
  ], ALERTAS.map((a) => [
    a.titulo, a.modulo, a.nivel, a.status, a.data, a.responsavel
  ]));
}

export function exportExecutivoPDF() {
  const totalCasos = DOENCAS_PRIORITARIAS.reduce((s, d) => s + d.casos_estimados, 0);
  const criticos = MEDICAMENTOS_ESTRATEGICOS.filter((m) => m.risco === "critico");
  const alertasAtivos = ALERTAS.filter((a) => (a.status as string) !== "resolvido");

  exportPDF("Relatório Executivo — Dashboard Geral", `
    <table>
      <thead><tr><th>Indicador</th><th>Valor</th><th>Observação</th></tr></thead>
      <tbody>
        <tr><td>Doenças Monitoradas</td><td>${DOENCAS_PRIORITARIAS.length}</td><td>6 grupos prioritários</td></tr>
        <tr><td>Casos Estimados (total)</td><td>${formatNumber(totalCasos)}</td><td>Consolidado 2024</td></tr>
        <tr><td>Medicamentos Estratégicos</td><td>${MEDICAMENTOS_ESTRATEGICOS.length}</td><td>${criticos.length} em risco crítico</td></tr>
        <tr><td>Alertas Ativos</td><td>${alertasAtivos.length}</td><td>Requer monitoramento</td></tr>
        <tr><td>PDPs em Andamento</td><td>${PDPS.length}</td><td>Parcerias ativas ou em negociação</td></tr>
      </tbody>
    </table>
    <h1 style="margin-top:16px;font-size:13px">Medicamentos em Risco Crítico</h1>
    <table style="margin-top:8px">
      <thead><tr><th>Medicamento</th><th>Doença</th><th>Estoque</th><th>Dep. Importação</th></tr></thead>
      <tbody>${criticos.map((m) => `<tr><td>${m.nome}</td><td>${m.doenca}</td><td style="color:#dc2626;font-weight:bold">${m.estoque_meses}m</td><td>${m.dependencia_importacao}%</td></tr>`).join("")}</tbody>
    </table>`);
}

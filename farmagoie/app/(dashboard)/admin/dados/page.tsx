"use client";

import { useState } from "react";
import { Database, Plus, Save, Trash2, CheckCircle2, AlertTriangle, Pill, Activity, ShoppingCart, Handshake } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Tab = "doencas" | "medicamentos" | "compras" | "pdps" | "alertas";

// Formulário de Doença
function DoencaForm({ onSave }: { onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState({ nome: "", cid10: "", casos_estimados: "", taxa_mortalidade: "", custo_anual_estimado: "", tendencia: "estavel", nivel_risco: "medio", medicamentos_associados: "" });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Nome da Doença *" value={f.nome} onChange={(v) => set("nome", v)} placeholder="Ex: Diabetes Mellitus" />
        <Field label="CID-10" value={f.cid10} onChange={(v) => set("cid10", v)} placeholder="Ex: E10-E14" />
        <Field label="Casos Estimados" value={f.casos_estimados} onChange={(v) => set("casos_estimados", v)} placeholder="Ex: 310000" type="number" />
        <Field label="Taxa de Mortalidade (%)" value={f.taxa_mortalidade} onChange={(v) => set("taxa_mortalidade", v)} placeholder="Ex: 1.5" type="number" />
        <Field label="Custo Anual Estimado (R$)" value={f.custo_anual_estimado} onChange={(v) => set("custo_anual_estimado", v)} placeholder="Ex: 95000000" type="number" />
        <Field label="Medicamentos Associados" value={f.medicamentos_associados} onChange={(v) => set("medicamentos_associados", v)} placeholder="Ex: 12" type="number" />
        <SelectField label="Tendência" value={f.tendencia} onChange={(v) => set("tendencia", v)} options={[["crescente","Crescente"],["estavel","Estável"],["decrescente","Decrescente"]]} />
        <SelectField label="Nível de Risco" value={f.nivel_risco} onChange={(v) => set("nivel_risco", v)} options={[["critico","Crítico"],["alto","Alto"],["medio","Médio"],["baixo","Baixo"]]} />
      </div>
      <SaveButton onClick={() => { if (f.nome) { onSave(f); setF({ nome: "", cid10: "", casos_estimados: "", taxa_mortalidade: "", custo_anual_estimado: "", tendencia: "estavel", nivel_risco: "medio", medicamentos_associados: "" }); } }} />
    </div>
  );
}

// Formulário de Medicamento
function MedicamentoForm({ onSave }: { onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState({ nome: "", principio_ativo: "", doenca: "", estoque_meses: "", consumo_medio_mensal: "", custo_unitario: "", dependencia_importacao: "", fornecedor_principal: "", risco: "medio", fabricante_nacional: "false" });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Nome do Medicamento *" value={f.nome} onChange={(v) => set("nome", v)} placeholder="Ex: Metformina 850mg" />
        <Field label="Princípio Ativo" value={f.principio_ativo} onChange={(v) => set("principio_ativo", v)} placeholder="Ex: Cloridrato de Metformina" />
        <Field label="Doença Associada" value={f.doenca} onChange={(v) => set("doenca", v)} placeholder="Ex: Diabetes Mellitus" />
        <Field label="Estoque Atual (meses)" value={f.estoque_meses} onChange={(v) => set("estoque_meses", v)} placeholder="Ex: 4.8" type="number" />
        <Field label="Consumo Médio Mensal (unid.)" value={f.consumo_medio_mensal} onChange={(v) => set("consumo_medio_mensal", v)} placeholder="Ex: 120000" type="number" />
        <Field label="Custo Unitário (R$)" value={f.custo_unitario} onChange={(v) => set("custo_unitario", v)} placeholder="Ex: 0.18" type="number" />
        <Field label="Dependência de Importação (%)" value={f.dependencia_importacao} onChange={(v) => set("dependencia_importacao", v)} placeholder="Ex: 40" type="number" />
        <Field label="Fornecedor Principal" value={f.fornecedor_principal} onChange={(v) => set("fornecedor_principal", v)} placeholder="Ex: EMS S.A." />
        <SelectField label="Nível de Risco" value={f.risco} onChange={(v) => set("risco", v)} options={[["critico","Crítico"],["alto","Alto"],["medio","Médio"],["baixo","Baixo"]]} />
        <SelectField label="Fabricante Nacional?" value={f.fabricante_nacional} onChange={(v) => set("fabricante_nacional", v)} options={[["true","Sim"],["false","Não"]]} />
      </div>
      <SaveButton onClick={() => { if (f.nome) { onSave(f); setF({ nome: "", principio_ativo: "", doenca: "", estoque_meses: "", consumo_medio_mensal: "", custo_unitario: "", dependencia_importacao: "", fornecedor_principal: "", risco: "medio", fabricante_nacional: "false" }); } }} />
    </div>
  );
}

// Formulário de Compra
function CompraForm({ onSave }: { onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState({ numero_processo: "", objeto: "", modalidade: "Pregão Eletrônico", valor_estimado: "", status: "planejado", risco_atraso: "medio", data_abertura: "", economia_estimada: "" });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Nº do Processo *" value={f.numero_processo} onChange={(v) => set("numero_processo", v)} placeholder="Ex: SES-GO/2024-001247" />
        <Field label="Objeto da Licitação *" value={f.objeto} onChange={(v) => set("objeto", v)} placeholder="Ex: Aquisição de Medicamentos Cardiovasculares" />
        <SelectField label="Modalidade" value={f.modalidade} onChange={(v) => set("modalidade", v)} options={[["Pregão Eletrônico","Pregão Eletrônico"],["Ata SUS/MS","Ata SUS/MS"],["Dispensação Direta","Dispensação Direta"],["Concorrência","Concorrência"]]} />
        <Field label="Valor Estimado (R$)" value={f.valor_estimado} onChange={(v) => set("valor_estimado", v)} placeholder="Ex: 8500000" type="number" />
        <Field label="Data de Abertura (DD/MM/AAAA)" value={f.data_abertura} onChange={(v) => set("data_abertura", v)} placeholder="Ex: 15/09/2024" />
        <Field label="Economia Estimada (%)" value={f.economia_estimada} onChange={(v) => set("economia_estimada", v)} placeholder="Ex: 12.5" type="number" />
        <SelectField label="Status" value={f.status} onChange={(v) => set("status", v)} options={[["planejado","Planejado"],["em_andamento","Em Andamento"],["concluido","Concluído"],["atrasado","Atrasado"],["cancelado","Cancelado"]]} />
        <SelectField label="Risco de Atraso" value={f.risco_atraso} onChange={(v) => set("risco_atraso", v)} options={[["alto","Alto"],["medio","Médio"],["baixo","Baixo"]]} />
      </div>
      <SaveButton onClick={() => { if (f.numero_processo && f.objeto) { onSave(f); setF({ numero_processo: "", objeto: "", modalidade: "Pregão Eletrônico", valor_estimado: "", status: "planejado", risco_atraso: "medio", data_abertura: "", economia_estimada: "" }); } }} />
    </div>
  );
}

// Formulário de PDP
function PDPForm({ onSave }: { onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState({ medicamento: "", doenca: "", laboratorio_parceiro: "", status: "prospeccao", fase: "", economia_prevista: "", valor_contrato: "", vigencia_anos: "", progresso_pct: "", data_inicio: "", data_fim_previsto: "" });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Medicamento *" value={f.medicamento} onChange={(v) => set("medicamento", v)} placeholder="Ex: Insulina Glargina" />
        <Field label="Doença" value={f.doenca} onChange={(v) => set("doenca", v)} placeholder="Ex: Diabetes Mellitus" />
        <Field label="Laboratório Parceiro" value={f.laboratorio_parceiro} onChange={(v) => set("laboratorio_parceiro", v)} placeholder="Ex: LAFERGS / Sanofi" />
        <Field label="Fase Atual" value={f.fase} onChange={(v) => set("fase", v)} placeholder="Ex: Fase II — Transferência Tecnológica" />
        <Field label="Economia Prevista (%)" value={f.economia_prevista} onChange={(v) => set("economia_prevista", v)} placeholder="Ex: 35" type="number" />
        <Field label="Valor do Contrato (R$)" value={f.valor_contrato} onChange={(v) => set("valor_contrato", v)} placeholder="Ex: 45000000" type="number" />
        <Field label="Vigência (anos)" value={f.vigencia_anos} onChange={(v) => set("vigencia_anos", v)} placeholder="Ex: 5" type="number" />
        <Field label="Progresso (%)" value={f.progresso_pct} onChange={(v) => set("progresso_pct", v)} placeholder="Ex: 40" type="number" />
        <Field label="Data de Início" value={f.data_inicio} onChange={(v) => set("data_inicio", v)} placeholder="Ex: Jan/2023" />
        <Field label="Previsão de Término" value={f.data_fim_previsto} onChange={(v) => set("data_fim_previsto", v)} placeholder="Ex: Dez/2028" />
        <SelectField label="Status" value={f.status} onChange={(v) => set("status", v)} options={[["aprovada","Aprovada"],["em_negociacao","Em Negociação"],["prospeccao","Prospecção"],["encerrada","Encerrada"]]} />
      </div>
      <SaveButton onClick={() => { if (f.medicamento) { onSave(f); setF({ medicamento: "", doenca: "", laboratorio_parceiro: "", status: "prospeccao", fase: "", economia_prevista: "", valor_contrato: "", vigencia_anos: "", progresso_pct: "", data_inicio: "", data_fim_previsto: "" }); } }} />
    </div>
  );
}

// Formulário de Alerta
function AlertaForm({ onSave }: { onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState({ titulo: "", descricao: "", modulo: "Medicamentos", nivel: "medio", responsavel: "", acao_recomendada: "" });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Título do Alerta *" value={f.titulo} onChange={(v) => set("titulo", v)} placeholder="Ex: Estoque crítico — Bevacizumabe" />
        <SelectField label="Módulo" value={f.modulo} onChange={(v) => set("modulo", v)} options={[["Medicamentos","Medicamentos"],["Compras","Compras"],["Epidemiológico","Epidemiológico"],["PDPs","PDPs"],["Viabilidade","Viabilidade"]]} />
        <SelectField label="Nível de Criticidade" value={f.nivel} onChange={(v) => set("nivel", v)} options={[["critico","Crítico"],["alto","Alto"],["medio","Médio"],["baixo","Baixo"]]} />
        <Field label="Responsável" value={f.responsavel} onChange={(v) => set("responsavel", v)} placeholder="Ex: Setor de Farmácia / SES-GO" />
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Descrição</label>
          <textarea value={f.descricao} onChange={(e) => set("descricao", e.target.value)} rows={2} className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057B8]/30 focus:border-[#0057B8]" placeholder="Descreva o problema identificado..." />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Ação Recomendada</label>
          <textarea value={f.acao_recomendada} onChange={(e) => set("acao_recomendada", e.target.value)} rows={2} className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057B8]/30 focus:border-[#0057B8]" placeholder="Descreva a ação recomendada..." />
        </div>
      </div>
      <SaveButton onClick={() => { if (f.titulo) { onSave(f); setF({ titulo: "", descricao: "", modulo: "Medicamentos", nivel: "medio", responsavel: "", acao_recomendada: "" }); } }} />
    </div>
  );
}

// ─── Componentes auxiliares ────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057B8]/30 focus:border-[#0057B8]" />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057B8]/30 focus:border-[#0057B8] bg-white">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-[#0057B8] text-white text-xs font-medium rounded-lg hover:bg-[#004a9e] transition-colors">
      <Save className="h-3.5 w-3.5" />
      Salvar Registro
    </button>
  );
}

function SuccessToast({ msg }: { msg: string }) {
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-600 text-white text-xs px-4 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4">
      <CheckCircle2 className="h-4 w-4" />
      {msg}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: typeof Activity }[] = [
  { id: "doencas", label: "Doenças", icon: Activity },
  { id: "medicamentos", label: "Medicamentos", icon: Pill },
  { id: "compras", label: "Compras", icon: ShoppingCart },
  { id: "pdps", label: "PDPs", icon: Handshake },
  { id: "alertas", label: "Alertas", icon: AlertTriangle },
];

export default function DadosPage() {
  const [tab, setTab] = useState<Tab>("doencas");
  const [registros, setRegistros] = useState<Record<Tab, Record<string, string>[]>>({ doencas: [], medicamentos: [], compras: [], pdps: [], alertas: [] });
  const [toast, setToast] = useState("");

  function salvar(tipo: Tab, dados: Record<string, string>) {
    setRegistros((p) => ({ ...p, [tipo]: [{ id: Date.now().toString(), ...dados }, ...p[tipo]] }));
    setToast(`Registro salvo! Copie o SQL abaixo e insira no Supabase.`);
    setTimeout(() => setToast(""), 4000);
  }

  const lista = registros[tab];
  const Icon = TABS.find((t) => t.id === tab)?.icon ?? Activity;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestão de Dados"
        description="Inserção e gerenciamento de dados reais — FarmaGOIE"
        icon={Database}
      />

      {/* Aviso de integração */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4 space-y-2">
          <p className="text-xs font-semibold text-blue-800 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Como conectar ao Supabase
          </p>
          <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
            <li>Acesse <strong>supabase.com</strong> → seu projeto → SQL Editor</li>
            <li>Execute o arquivo <code className="bg-blue-100 px-1 rounded">supabase/schema.sql</code> para criar as tabelas</li>
            <li>Configure as variáveis de ambiente no Vercel: <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> e <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
            <li>Use a aba <strong>Table Editor</strong> do Supabase para inserir dados, ou preencha o formulário abaixo e copie o SQL gerado</li>
          </ol>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map((t) => {
          const TIcon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors ${tab === t.id ? "border-[#0057B8] text-[#0057B8]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              <TIcon className="h-3.5 w-3.5" />
              {t.label}
              {registros[t.id].length > 0 && (
                <span className="ml-1 h-4 min-w-4 px-1 bg-[#0057B8] text-white rounded-full text-[9px] flex items-center justify-center">
                  {registros[t.id].length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Formulário ativo */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
            <Plus className="h-4 w-4 text-[#0057B8]" />
            Novo registro — {TABS.find((t) => t.id === tab)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tab === "doencas" && <DoencaForm onSave={(d) => salvar("doencas", d)} />}
          {tab === "medicamentos" && <MedicamentoForm onSave={(d) => salvar("medicamentos", d)} />}
          {tab === "compras" && <CompraForm onSave={(d) => salvar("compras", d)} />}
          {tab === "pdps" && <PDPForm onSave={(d) => salvar("pdps", d)} />}
          {tab === "alertas" && <AlertaForm onSave={(d) => salvar("alertas", d)} />}
        </CardContent>
      </Card>

      {/* Registros inseridos na sessão */}
      {lista.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#334155]">
              Registros inseridos nesta sessão ({lista.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {lista.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs font-semibold text-[#334155]">
                    {r.nome || r.titulo || r.medicamento || r.numero_processo || r.objeto || "—"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(r).filter(([k]) => k !== "id" && k !== "nome" && k !== "titulo" && k !== "medicamento").slice(0, 4).map(([k, v]) => (
                      <span key={k} className="text-[10px] text-gray-500">{k}: <strong>{v || "—"}</strong></span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setRegistros((p) => ({ ...p, [tab]: p[tab].filter((x) => x.id !== r.id) }))}
                  className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {/* SQL para Supabase */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">SQL para inserir no Supabase:</p>
              <pre className="text-[10px] bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto leading-relaxed">
                {lista.map((r) => {
                  const { id, ...rest } = r;
                  const tbl = tab === "doencas" ? "doencas_prioritarias" : tab === "medicamentos" ? "medicamentos_estrategicos" : tab === "compras" ? "compras_publicas" : tab === "pdps" ? "pdps" : "alertas";
                  const cols = Object.keys(rest).join(", ");
                  const vals = Object.values(rest).map((v) => `'${String(v).replace(/'/g, "''")}'`).join(", ");
                  return `INSERT INTO ${tbl} (${cols}) VALUES (${vals});\n`;
                }).join("")}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {toast && <SuccessToast msg={toast} />}
    </div>
  );
}

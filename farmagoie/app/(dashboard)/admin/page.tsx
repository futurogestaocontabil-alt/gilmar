"use client";

import { Shield, Users, Building2, Key, Activity, Lock } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { KpiCard } from "@/components/shared/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const USUARIOS_MOCK = [
  { id: "u1", nome: "Dr. Carlos Mendonça", email: "carlos.mendonca@ses.go.gov.br", perfil: "Gestor Estadual", orgao: "SES-GO", ativo: true, ultimo_acesso: "24/06/2024 09:15" },
  { id: "u2", nome: "Ana Paula Rocha", email: "ana.rocha@iquego.go.gov.br", perfil: "Técnico IQUEGO", orgao: "IQUEGO", ativo: true, ultimo_acesso: "24/06/2024 08:42" },
  { id: "u3", nome: "Marcos Vieira", email: "marcos.vieira@ses.go.gov.br", perfil: "Analista de Compras", orgao: "SES-GO", ativo: true, ultimo_acesso: "23/06/2024 17:30" },
  { id: "u4", nome: "Dra. Fernanda Lima", email: "fernanda.lima@ses.go.gov.br", perfil: "Epidemiologista", orgao: "SES-GO", ativo: true, ultimo_acesso: "24/06/2024 10:05" },
  { id: "u5", nome: "Roberto Santos", email: "roberto.santos@regional-go.gov.br", perfil: "Gestor Municipal", orgao: "Regional Goiânia", ativo: false, ultimo_acesso: "10/06/2024 14:00" },
  { id: "u6", nome: "Sistema Audit", email: "audit@ses.go.gov.br", perfil: "Auditor Externo", orgao: "TCE-GO", ativo: true, ultimo_acesso: "20/06/2024 11:22" },
];

const PERFIS = [
  { nome: "Gestor Estadual", descricao: "Acesso completo a todos os módulos e configurações", usuarios: 2, cor: "#0057B8" },
  { nome: "Técnico IQUEGO", descricao: "Viabilidade industrial, PDPs e medicamentos", usuarios: 3, cor: "#10b981" },
  { nome: "Analista de Compras", descricao: "Radar de compras públicas e contratos", usuarios: 4, cor: "#8b5cf6" },
  { nome: "Epidemiologista", descricao: "Radar epidemiológico e alertas", usuarios: 5, cor: "#f59e0b" },
  { nome: "Gestor Municipal", descricao: "Visão dos dados da sua regional", usuarios: 12, cor: "#06b6d4" },
  { nome: "Auditor Externo", descricao: "Somente leitura — relatórios e logs", usuarios: 2, cor: "#94a3b8" },
];

const LOGS_MOCK = [
  { id: "l1", usuario: "carlos.mendonca@ses.go.gov.br", acao: "Login bem-sucedido", modulo: "Auth", data: "24/06/2024 09:15", ip: "189.xxx.xxx.1" },
  { id: "l2", usuario: "ana.rocha@iquego.go.gov.br", acao: "Exportou relatório PDF", modulo: "Relatórios", data: "24/06/2024 08:50", ip: "201.xxx.xxx.2" },
  { id: "l3", usuario: "fernanda.lima@ses.go.gov.br", acao: "Visualizou alerta crítico #A001", modulo: "Alertas", data: "24/06/2024 10:05", ip: "189.xxx.xxx.3" },
  { id: "l4", usuario: "marcos.vieira@ses.go.gov.br", acao: "Acessou módulo de Compras", modulo: "Compras", data: "23/06/2024 17:30", ip: "189.xxx.xxx.4" },
  { id: "l5", usuario: "roberto.santos@regional-go.gov.br", acao: "Tentativa de login — conta inativa", modulo: "Auth", data: "24/06/2024 07:00", ip: "200.xxx.xxx.5" },
];

export default function AdminPage() {
  const ativos = USUARIOS_MOCK.filter((u) => u.ativo).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Administração"
        description="Gestão de usuários, perfis e auditoria — Acesso restrito"
        icon={Shield}
      >
        <DataDisclaimer />
      </SectionHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Usuários Cadastrados" value={USUARIOS_MOCK.length} subtitle={`${ativos} ativos`} icon={Users} color="blue" />
        <KpiCard title="Perfis de Acesso" value={PERFIS.length} subtitle="Grupos configurados" icon={Key} color="purple" />
        <KpiCard title="Órgãos Vinculados" value={4} subtitle="SES-GO, IQUEGO, Regionais, TCE" icon={Building2} color="blue" />
        <KpiCard title="Logs de Auditoria" value={LOGS_MOCK.length} subtitle="Últimas 24h" icon={Activity} color="green" />
      </div>

      {/* Usuários */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Nome</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">E-mail</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Perfil</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Órgão</th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">Status</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Último Acesso</th>
                </tr>
              </thead>
              <tbody>
                {USUARIOS_MOCK.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-[#334155]">{u.nome}</td>
                    <td className="py-2.5 px-3 text-gray-500">{u.email}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                        {u.perfil}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">{u.orgao}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${u.ativo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {u.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-400">{u.ultimo_acesso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Perfis */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
            <Key className="h-4 w-4" />
            Perfis de Acesso e Permissões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PERFIS.map((p) => (
              <div key={p.nome} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-3 h-3 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: p.cor }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#334155]">{p.nome}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{p.descricao}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{p.usuarios} usuário(s)</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs de auditoria */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Logs de Auditoria — Últimas Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {LOGS_MOCK.map((l) => (
              <div key={l.id} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-[#334155]">{l.acao}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 shrink-0">{l.modulo}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{l.usuario} · {l.data} · IP: {l.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* LGPD */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-800">Conformidade LGPD</p>
              <p className="text-xs text-green-700 mt-1 leading-relaxed">
                Este sistema processa exclusivamente <strong>dados agregados e anonimizados</strong>. Não há armazenamento de dados pessoais de pacientes.
                Row Level Security (RLS) está ativo em todas as tabelas. Logs de auditoria são retidos por 12 meses conforme política interna da SES-GO.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Settings, Bell, Shield, Database, Globe, Palette } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { DataDisclaimer } from "@/components/shared/data-disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ConfiguracoesPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [alertaCritico, setAlertaCritico] = useState(true);
  const [alertaAlto, setAlertaAlto] = useState(true);
  const [alertaMedio, setAlertaMedio] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Configurações"
        description="Preferências do sistema e notificações"
        icon={Settings}
      >
        <DataDisclaimer />
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          {/* Perfil */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Dados do Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" defaultValue="Gestor Estadual" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" defaultValue="Coordenador de Assistência Farmacêutica" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail institucional</Label>
                  <Input id="email" type="email" defaultValue="gestor@ses.go.gov.br" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="orgao">Órgão</Label>
                  <Input id="orgao" defaultValue="SES-GO" disabled />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="regional">Regional de Saúde</Label>
                <Input id="regional" defaultValue="Sede — Goiânia" disabled />
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Canais</p>
                {[
                  { label: "E-mail institucional", desc: "Receber alertas por e-mail", state: emailNotif, setter: setEmailNotif },
                  { label: "Push no navegador", desc: "Notificações em tempo real", state: pushNotif, setter: setPushNotif },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs font-medium text-[#334155]">{n.label}</p>
                      <p className="text-[10px] text-gray-500">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => n.setter(!n.state)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${n.state ? "bg-[#0057B8]" : "bg-gray-200"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${n.state ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Níveis de Alerta</p>
                {[
                  { label: "Alertas Críticos", desc: "Sempre notificar — recomendado", state: alertaCritico, setter: setAlertaCritico },
                  { label: "Alertas Altos", desc: "Notificar em horário comercial", state: alertaAlto, setter: setAlertaAlto },
                  { label: "Alertas Médios", desc: "Resumo diário consolidado", state: alertaMedio, setter: setAlertaMedio },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs font-medium text-[#334155]">{n.label}</p>
                      <p className="text-[10px] text-gray-500">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => n.setter(!n.state)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${n.state ? "bg-[#0057B8]" : "bg-gray-200"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${n.state ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Salvar */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="min-w-[140px]">
              {saved ? "✓ Salvo!" : "Salvar Configurações"}
            </Button>
          </div>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-4">
          {/* Sistema */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
                <Database className="h-4 w-4" />
                Informações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Versão", value: "1.0.0 MVP" },
                { label: "Ambiente", value: "Demonstração" },
                { label: "Última atualização", value: "24/06/2024" },
                { label: "Banco de dados", value: "Supabase (PostgreSQL)" },
                { label: "Frontend", value: "Next.js 15 + TypeScript" },
                { label: "Deploy", value: "Vercel" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] text-gray-500">{item.label}</span>
                  <span className="text-[10px] font-medium text-[#334155]">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fontes de dados */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#334155] flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Fontes de Dados (Futuras)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { nome: "SISREMUME", desc: "Remume estadual", status: "Planejado" },
                { nome: "BNAFAR", desc: "Banco Nacional de Preços", status: "Planejado" },
                { nome: "COMPRASNET-GO", desc: "Portal de compras GO", status: "Planejado" },
                { nome: "DATASUS", desc: "Dados epidemiológicos", status: "Planejado" },
                { nome: "ANVISA", desc: "Registro de medicamentos", status: "Planejado" },
              ].map((f) => (
                <div key={f.nome} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-[10px] font-semibold text-[#334155]">{f.nome}</p>
                    <p className="text-[9px] text-gray-400">{f.desc}</p>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700">{f.status}</span>
                </div>
              ))}
              <p className="text-[9px] text-gray-400 text-center pt-1">
                Integrações sujeitas a convênios e APIs oficiais
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo: aceita qualquer login não vazio
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      setError("Preencha e-mail e senha.");
      setLoading(false);
      return;
    }

    // Em produção: usar Supabase Auth
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Painel Esquerdo — Identidade */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0057B8] flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur rounded-xl p-2">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl tracking-tight">FarmaGOIE</p>
            <p className="text-white/60 text-xs">Inteligência Estratégica em Saúde</p>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Inteligência Farmacêutica<br />para Goiás
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Monitore doenças prioritárias, medicamentos estratégicos, compras públicas e
            oportunidades de PDPs em uma única plataforma.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Doenças Monitoradas", value: "6" },
              { label: "Medicamentos Estratégicos", value: "42" },
              { label: "Alertas Ativos", value: "7" },
              { label: "Municípios", value: "246" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/40 text-xs">
          <span>SES-GO</span>
          <span>·</span>
          <span>IQUEGO</span>
          <span>·</span>
          <span>Estado de Goiás</span>
        </div>
      </div>

      {/* Painel Direito — Formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F5F7FA]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="bg-[#0057B8] rounded-lg p-2">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-[#334155]">FarmaGOIE</p>
              <p className="text-xs text-gray-500">Inteligência em Saúde Pública</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#334155]">Acesso ao Sistema</h2>
              <p className="text-sm text-gray-500 mt-1">
                Plataforma restrita — uso exclusivo SES-GO
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@ses.go.gov.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Autenticando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button className="text-xs text-[#0057B8] hover:underline">
                Esqueci minha senha
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                Sistema de uso exclusivo de servidores autorizados da SES-GO e órgãos vinculados.
                O acesso não autorizado é crime (Lei nº 12.737/2012).
              </p>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400 mt-4">
            Demo: use qualquer e-mail e senha para acessar
          </p>
        </div>
      </div>
    </div>
  );
}

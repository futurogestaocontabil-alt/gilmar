import { Badge } from "@/components/ui/badge";
import { NivelRisco } from "@/types";

const labels: Record<NivelRisco, string> = {
  critico: "Crítico",
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
};

export function RiskBadge({ nivel }: { nivel: NivelRisco }) {
  return <Badge variant={nivel}>{labels[nivel]}</Badge>;
}

export function TendenciaBadge({ tendencia }: { tendencia: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    crescente: { label: "↑ Crescente", cls: "bg-red-100 text-red-700 border-red-200" },
    estavel: { label: "→ Estável", cls: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    decrescente: { label: "↓ Decrescente", cls: "bg-green-100 text-green-700 border-green-200" },
  };
  const t = map[tendencia] ?? { label: tendencia, cls: "bg-gray-100 text-gray-700" };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${t.cls}`}>
      {t.label}
    </span>
  );
}

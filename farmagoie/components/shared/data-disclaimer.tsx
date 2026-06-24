import { AlertTriangle } from "lucide-react";

export function DataDisclaimer() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-md text-xs text-yellow-800">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      <span>
        <strong>DADOS SIMULADOS</strong> — Esta demonstração utiliza dados fictícios para fins de
        prototipação. Não representam informações reais de pacientes ou sistemas oficiais.
      </span>
    </div>
  );
}

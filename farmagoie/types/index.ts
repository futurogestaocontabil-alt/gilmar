export type NivelRisco = "critico" | "alto" | "medio" | "baixo";
export type StatusAlerta = "ativo" | "em_analise" | "resolvido";
export type Tendencia = "crescente" | "estavel" | "decrescente";
export type StatusPDP = "aprovada" | "em_negociacao" | "prospeccao" | "encerrada";
export type StatusCompra = "planejado" | "em_andamento" | "concluido" | "atrasado" | "cancelado";
export type StatusViabilidade = "viavel" | "em_estudo" | "inviavel" | "prospeccao";

export interface UserProfile {
  id: string;
  email: string;
  nome: string;
  perfil: "administrador" | "gestor_estadual" | "tecnico_saude" | "equipe_compras" | "consultor" | "leitura";
  orgao: string;
  ativo: boolean;
}

export interface DoencaPrioritaria {
  id: string;
  nome: string;
  codigo: string;
  casos_estimados: number;
  mortalidade_estimada: number;
  custo_anual_estimado: number;
  tendencia: Tendencia;
  criticidade: NivelRisco;
  medicamentos_vinculados: number;
}

export interface MedicamentoEstrategico {
  id: string;
  nome: string;
  principio_ativo: string;
  doenca: string;
  estoque_meses: number;
  consumo_mensal: number;
  risco: NivelRisco;
  dependencia_importacao: number;
  preco_unitario: number;
  fabricante_nacional: boolean;
}

export interface CompraPublica {
  id: string;
  numero_processo: string;
  objeto: string;
  modalidade: string;
  valor_estimado: number;
  status: StatusCompra;
  risco_atraso: NivelRisco;
  fornecedores_habilitados: number;
  data_abertura: string;
  economia_estimada: number;
}

export interface PDP {
  id: string;
  medicamento: string;
  laboratorio_publico: string;
  empresa_privada: string;
  ict: string;
  status: StatusPDP;
  fase: string;
  economia_prevista: number;
  dependencia_externa: number;
  prazo_autonomia: string;
  investimento_estimado: number;
}

export interface ViabilidadeIndustrial {
  id: string;
  medicamento: string;
  viabilidade_tecnica: number;
  viabilidade_regulatoria: number;
  viabilidade_economica: number;
  viabilidade_produtiva: number;
  dependencia_externa: number;
  potencial_producao_local: number;
  score_total: number;
  prioridade: number;
  status: StatusViabilidade;
}

export interface Alerta {
  id: string;
  titulo: string;
  modulo: string;
  nivel: NivelRisco;
  descricao: string;
  data: string;
  responsavel: string;
  status: StatusAlerta;
  acao_recomendada: string;
}

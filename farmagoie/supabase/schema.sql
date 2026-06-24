-- ============================================================
-- FarmaGOIE — Schema Supabase
-- Execute este SQL no painel do Supabase > SQL Editor
-- Dados reais do SISREMUME, BNAFAR, SES-GO, IQUEGO
-- ============================================================

-- Extensões
create extension if not exists "uuid-ossp";

-- ─── Doenças Prioritárias ──────────────────────────────────────────────────
create table if not exists doencas_prioritarias (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  cid10 text,
  casos_estimados integer default 0,
  taxa_mortalidade numeric(5,2) default 0,
  custo_anual_estimado bigint default 0,
  tendencia text check (tendencia in ('crescente','estavel','decrescente')) default 'estavel',
  nivel_risco text check (nivel_risco in ('critico','alto','medio','baixo')) default 'medio',
  medicamentos_associados integer default 0,
  observacoes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Medicamentos Estratégicos ─────────────────────────────────────────────
create table if not exists medicamentos_estrategicos (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  principio_ativo text,
  doenca text,
  estoque_meses numeric(4,1) default 0,
  consumo_medio_mensal integer default 0,
  custo_unitario numeric(10,2) default 0,
  dependencia_importacao integer default 0 check (dependencia_importacao between 0 and 100),
  fabricante_nacional boolean default false,
  fornecedor_principal text,
  risco text check (risco in ('critico','alto','medio','baixo')) default 'medio',
  observacoes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Compras Públicas ──────────────────────────────────────────────────────
create table if not exists compras_publicas (
  id uuid primary key default uuid_generate_v4(),
  numero_processo text unique,
  objeto text not null,
  modalidade text,
  valor_estimado bigint default 0,
  valor_homologado bigint,
  status text check (status in ('planejado','em_andamento','concluido','atrasado','cancelado')) default 'planejado',
  risco_atraso text check (risco_atraso in ('alto','medio','baixo')) default 'baixo',
  fornecedores_habilitados integer default 0,
  data_abertura date,
  data_homologacao date,
  economia_estimada numeric(5,2) default 0,
  observacoes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── PDPs (Parcerias para Desenvolvimento Produtivo) ───────────────────────
create table if not exists pdps (
  id uuid primary key default uuid_generate_v4(),
  medicamento text not null,
  doenca text,
  laboratorio_parceiro text,
  status text check (status in ('aprovada','em_negociacao','prospeccao','encerrada')) default 'prospeccao',
  fase text,
  economia_prevista integer default 0 check (economia_prevista between 0 and 100),
  valor_contrato bigint default 0,
  vigencia_anos integer default 0,
  progresso_pct integer default 0 check (progresso_pct between 0 and 100),
  data_inicio text,
  data_fim_previsto text,
  observacoes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Alertas ───────────────────────────────────────────────────────────────
create table if not exists alertas (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  descricao text,
  modulo text,
  nivel text check (nivel in ('critico','alto','medio','baixo')) default 'medio',
  status text check (status in ('ativo','em_analise','resolvido')) default 'ativo',
  responsavel text,
  acao_recomendada text,
  data date default current_date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Viabilidade Industrial ────────────────────────────────────────────────
create table if not exists viabilidade_industrial (
  id uuid primary key default uuid_generate_v4(),
  produto text not null,
  classe_terapeutica text,
  viabilidade_tecnica integer default 0 check (viabilidade_tecnica between 0 and 100),
  viabilidade_economica integer default 0 check (viabilidade_economica between 0 and 100),
  viabilidade_regulatoria integer default 0 check (viabilidade_regulatoria between 0 and 100),
  impacto_social integer default 0 check (impacto_social between 0 and 100),
  score_geral integer default 0,
  potencial_mercado bigint default 0,
  investimento_necessario bigint default 0,
  prazo_retorno_anos integer default 0,
  status text check (status in ('viavel','em_estudo','inviavel','prospeccao')) default 'em_estudo',
  observacoes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Row Level Security ────────────────────────────────────────────────────
alter table doencas_prioritarias enable row level security;
alter table medicamentos_estrategicos enable row level security;
alter table compras_publicas enable row level security;
alter table pdps enable row level security;
alter table alertas enable row level security;
alter table viabilidade_industrial enable row level security;

-- Políticas: leitura pública (para demo); em produção restringir por role
create policy "Leitura pública" on doencas_prioritarias for select using (true);
create policy "Leitura pública" on medicamentos_estrategicos for select using (true);
create policy "Leitura pública" on compras_publicas for select using (true);
create policy "Leitura pública" on pdps for select using (true);
create policy "Leitura pública" on alertas for select using (true);
create policy "Leitura pública" on viabilidade_industrial for select using (true);

-- Escrita apenas para usuários autenticados
create policy "Escrita autenticada" on doencas_prioritarias for all using (auth.role() = 'authenticated');
create policy "Escrita autenticada" on medicamentos_estrategicos for all using (auth.role() = 'authenticated');
create policy "Escrita autenticada" on compras_publicas for all using (auth.role() = 'authenticated');
create policy "Escrita autenticada" on pdps for all using (auth.role() = 'authenticated');
create policy "Escrita autenticada" on alertas for all using (auth.role() = 'authenticated');
create policy "Escrita autenticada" on viabilidade_industrial for all using (auth.role() = 'authenticated');

-- ─── Trigger updated_at ────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger trg_doencas before update on doencas_prioritarias for each row execute function update_updated_at();
create trigger trg_med before update on medicamentos_estrategicos for each row execute function update_updated_at();
create trigger trg_compras before update on compras_publicas for each row execute function update_updated_at();
create trigger trg_pdps before update on pdps for each row execute function update_updated_at();
create trigger trg_alertas before update on alertas for each row execute function update_updated_at();
create trigger trg_viab before update on viabilidade_industrial for each row execute function update_updated_at();

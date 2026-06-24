import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, AlertTriangle, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { roupasApi } from "@/lib/api";
import { CATEGORIAS, type Roupa } from "@/lib/types";

export const Route = createFileRoute("/roupas")({
  head: () => ({
    meta: [
      { title: "Roupas cadastradas — StyleStock" },
      { name: "description", content: "Lista de todas as peças cadastradas no estoque." },
    ],
  }),
  component: RoupasPage,
});

function RoupasPage() {
  const navigate = useNavigate();
  const [roupas, setRoupas] = useState<Roupa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroCat, setFiltroCat] = useState<string>("TODAS");

  const carregar = () => {
    setCarregando(true);
    roupasApi
      .listar()
      .then((d) => {
        setRoupas(d);
        setErro(null);
      })
      .catch(() => setErro("Falha ao carregar roupas. Backend offline?"))
      .finally(() => setCarregando(false));
  };

  useEffect(carregar, []);

  const visiveis = useMemo(() => {
    if (filtroCat === "TODAS") return roupas;
    return roupas.filter((r) => r.categoria === filtroCat);
  }, [roupas, filtroCat]);

  const excluir = async (id: number, nome: string) => {
    if (!confirm(`Excluir "${nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await roupasApi.excluir(id);
      setRoupas((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Erro ao excluir.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">StyleStock · Estoque</p>
            <h1 className="mt-2 font-serif text-4xl text-foreground">Roupas cadastradas</h1>
          </div>
          <Link
            to="/cadastrar"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Nova peça
          </Link>
        </div>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap gap-2">
          <FiltroChip
            label="Todas"
            active={filtroCat === "TODAS"}
            onClick={() => setFiltroCat("TODAS")}
          />
          {CATEGORIAS.map((c) => (
            <FiltroChip
              key={c}
              label={c.toUpperCase()}
              active={filtroCat === c}
              onClick={() => setFiltroCat(c)}
            />
          ))}
        </div>

        {erro && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {erro}
          </div>
        )}

        {carregando ? (
          <p className="mt-10 text-sm text-muted-foreground">Carregando…</p>
        ) : visiveis.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">Nenhuma peça cadastrada ainda.</p>
            <button
              onClick={() => navigate({ to: "/cadastrar" })}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Cadastrar primeira peça
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visiveis.map((r) => (
              <RoupaCard key={r.id} roupa={r} onExcluir={excluir} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function FiltroChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function RoupaCard({
  roupa,
  onExcluir,
}: {
  roupa: Roupa;
  onExcluir: (id: number, nome: string) => void;
}) {
  const baixoEstoque = roupa.quantidade <= 5;
  return (
    <article className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-serif text-lg leading-tight text-foreground">{roupa.nome}</h2>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {roupa.categoria}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-y-3 border-t border-border pt-4 text-xs">
        <Field label="Tamanho" value={roupa.tamanho} />
        <Field label="Cor" value={roupa.cor} />
        <Field
          label="Preço"
          value={`R$ ${roupa.preco?.toFixed(2).replace(".", ",")}`}
          accent
        />
        <Field
          label="Estoque"
          value={
            <span className="inline-flex items-center gap-1">
              {roupa.quantidade} un.
              {baixoEstoque && <AlertTriangle className="h-3 w-3 text-destructive" />}
            </span>
          }
        />
      </dl>

      {roupa.descricao && (
        <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {roupa.descricao}
        </p>
      )}

      <div className="mt-5 flex gap-2 border-t border-border pt-4">
        <Link
          to="/editar/$id"
          params={{ id: String(roupa.id) }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          <Pencil className="h-3.5 w-3.5" /> Editar
        </Link>
        <button
          onClick={() => onExcluir(roupa.id!, roupa.nome)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive transition hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-3.5 w-3.5" /> Excluir
        </button>
      </div>
    </article>
  );
}

function Field({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-sm font-medium ${accent ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </dd>
    </div>
  );
}

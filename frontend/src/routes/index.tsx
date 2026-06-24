import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, LayoutGrid, ChevronRight, Package, Search, Diamond } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { roupasApi } from "@/lib/api";
import type { Roupa } from "@/lib/types";
import heroStore from "@/assets/hero-store.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StyleStock — Sistema de gestão de moda" },
      {
        name: "description",
        content:
          "Cadastre, busque e controle o estoque de peças da sua loja de moda em uma única interface.",
      },
      { property: "og:title", content: "StyleStock — Sistema de gestão de moda" },
      {
        property: "og:description",
        content: "Cadastro e controle de roupas para lojas — masculina, feminina e unissex.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [roupas, setRoupas] = useState<Roupa[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    roupasApi
      .listar()
      .then(setRoupas)
      .catch(() => setErro("Não foi possível conectar ao backend."));
  }, []);

  const totalPecas = roupas.length;
  const categorias = new Set(roupas.map((r) => r.categoria)).size;
  const estoque = roupas.reduce((acc, r) => acc + (r.quantidade ?? 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative isolate overflow-hidden">
        <img
          src={heroStore}
          alt="Interior de loja de moda com araras iluminadas"
          width={1792}
          height={1024}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />

        <div className="mx-auto max-w-6xl px-6 pb-28 pt-24 md:pb-40 md:pt-32">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="eyebrow text-primary">Sistema de gestão · Moda</span>
          </div>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] text-white md:text-8xl">
            Style<span className="italic text-primary">Stock</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80">
            Sistema de cadastro e controle de roupas para lojas de moda — masculina, feminina e
            unissex.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/roupas"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-black/40 transition hover:opacity-90"
            >
              <LayoutGrid className="h-4 w-4" /> Ver roupas
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/cadastrar"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              <Plus className="h-4 w-4" /> Cadastrar roupa
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10 bg-black/60 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-3 px-6">
            <Stat label="Peças cadastradas" value={totalPecas} />
            <Stat label="Categorias" value={categorias} divider />
            <Stat label="Itens em estoque" value={estoque} divider />
          </div>
        </div>
      </section>

      {erro && (
        <div className="mx-auto mt-6 max-w-6xl px-6">
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {erro} Inicie o servidor Spring Boot em <code>http://localhost:8080</code>.
          </div>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-border" />
          <span className="eyebrow">Funcionalidades</span>
          <span className="h-px w-12 bg-border" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            Icon={Plus}
            title="Cadastro de peças"
            desc="Rápido e organizado"
            to="/cadastrar"
          />
          <Feature
            Icon={Package}
            title="Controle de estoque"
            desc="Quantidades em tempo real"
            to="/roupas"
          />
          <Feature
            Icon={Search}
            title="Busca precisa"
            desc="Busque por nome"
            to="/buscar"
          />
          <Feature
            Icon={Diamond}
            title="Masc. & Fem."
            desc="Gestão unissex completa"
            to="/roupas"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ label, value, divider }: { label: string; value: number; divider?: boolean }) {
  return (
    <div
      className={`py-8 text-center ${divider ? "border-l border-white/10" : ""}`}
    >
      <p className="font-serif text-4xl text-primary md:text-5xl">{value}</p>
      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/60">{label}</p>
    </div>
  );
}

function Feature({
  Icon,
  title,
  desc,
  to,
}: {
  Icon: typeof Plus;
  title: string;
  desc: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center text-center transition"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-accent text-primary transition group-hover:scale-105">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-primary">{desc}</p>
    </Link>
  );
}

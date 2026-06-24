import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Pencil } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { roupasApi } from "@/lib/api";
import type { Roupa } from "@/lib/types";

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar roupa — StyleStock" },
      { name: "description", content: "Encontre peças do estoque pelo nome." },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState<Roupa[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [pesquisou, setPesquisou] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termo.trim()) return;
    setBuscando(true);
    setErro(null);
    try {
      const dados = await roupasApi.buscarPorNome(termo.trim());
      setResultados(dados);
      setPesquisou(true);
    } catch {
      setErro("Erro ao buscar. Verifique o backend.");
    } finally {
      setBuscando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-center">
          <p className="eyebrow">StyleStock · Busca</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground">Buscar peça pelo nome</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Filtra automaticamente por trechos do nome (case-insensitive).
          </p>
        </div>

        <form onSubmit={buscar} className="mt-8 flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Ex: Camisa Oxford"
              className="w-full rounded-md border border-border bg-input/40 py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={buscando}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {buscando ? "Buscando…" : "Buscar"}
          </button>
        </form>

        {erro && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {erro}
          </div>
        )}

        {pesquisou && !erro && (
          <div className="mt-8">
            <p className="text-xs text-muted-foreground">
              {resultados.length} resultado{resultados.length === 1 ? "" : "s"} para{" "}
              <strong className="text-foreground">"{termo}"</strong>
            </p>

            <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
              {resultados.length === 0 && (
                <li className="px-5 py-6 text-center text-sm text-muted-foreground">
                  Nenhuma peça encontrada.
                </li>
              )}
              {resultados.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-serif text-lg text-foreground">{r.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.categoria} · {r.tamanho} · {r.cor} ·{" "}
                      <span className="text-primary">
                        R$ {r.preco?.toFixed(2).replace(".", ",")}
                      </span>{" "}
                      · {r.quantidade} un.
                    </p>
                  </div>
                  <Link
                    to="/editar/$id"
                    params={{ id: String(r.id) }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

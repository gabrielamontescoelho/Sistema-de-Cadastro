import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoupaForm } from "@/components/RoupaForm";
import { roupasApi } from "@/lib/api";
import type { Roupa } from "@/lib/types";

export const Route = createFileRoute("/editar/$id")({
  head: () => ({
    meta: [
      { title: "Editar roupa — StyleStock" },
      { name: "description", content: "Atualize os dados de uma peça do estoque." },
    ],
  }),
  component: EditarPage,
});

function EditarPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [roupa, setRoupa] = useState<Roupa | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    roupasApi
      .buscarPorId(Number(id))
      .then(setRoupa)
      .catch(() => setErro("Peça não encontrada."))
      .finally(() => setCarregando(false));
  }, [id]);

  const onSubmit = async (atualizada: Roupa) => {
    setSalvando(true);
    setErro(null);
    try {
      await roupasApi.atualizar(Number(id), atualizada);
      navigate({ to: "/roupas" });
    } catch {
      setErro("Erro ao atualizar.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/roupas"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar para listagem
        </Link>

        <div className="mt-6 text-center">
          <p className="eyebrow">StyleStock · Estoque</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground">Editar peça</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Atualize as informações e salve para refletir no estoque.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 md:p-8">
          {erro && (
            <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
              {erro}
            </div>
          )}
          {carregando ? (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          ) : roupa ? (
            <RoupaForm
              initial={roupa}
              onSubmit={onSubmit}
              submitting={salvando}
              submitLabel="Salvar alterações"
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

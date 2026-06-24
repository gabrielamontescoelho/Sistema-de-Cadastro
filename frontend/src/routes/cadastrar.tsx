import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { RoupaForm } from "@/components/RoupaForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { roupasApi } from "@/lib/api";
import type { Roupa } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cadastrar")({
  head: () => ({
    meta: [
      { title: "Cadastrar nova roupa — StyleStock" },
      { name: "description", content: "Adicione uma nova peça ao estoque do StyleStock." },
    ],
  }),
  component: CadastrarPage,
});

function CadastrarPage() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const onSubmit = async (roupa: Roupa) => {
    setSalvando(true);
    setErro(null);
    try {
      await roupasApi.cadastrar(roupa);
      navigate({ to: "/roupas" });
    } catch {
      setErro("Não foi possível cadastrar. Verifique o backend.");
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
          <h1 className="mt-2 font-serif text-4xl text-foreground">Cadastrar nova roupa</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Preencha os dados da peça para adicioná-la ao estoque.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 md:p-8">
          {erro && (
            <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
              {erro}
            </div>
          )}
          <RoupaForm onSubmit={onSubmit} submitting={salvando} submitLabel="Salvar peça" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

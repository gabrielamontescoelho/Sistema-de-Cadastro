import { Link } from "@tanstack/react-router";
import { Shirt, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card">
            <Shirt className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </span>
          <span className="text-sm font-semibold tracking-[0.28em] text-foreground">
            STYLESTOCK
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link
            to="/"
            className="text-muted-foreground transition hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground" }}
          >
            Início
          </Link>
          <Link
            to="/roupas"
            className="text-muted-foreground transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Roupas
          </Link>
          <Link
            to="/cadastrar"
            className="text-muted-foreground transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Cadastrar
          </Link>
          <Link
            to="/buscar"
            className="text-muted-foreground transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Buscar
          </Link>
        </nav>

        <Link
          to="/cadastrar"
          className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          <Plus className="h-3.5 w-3.5" /> Nova peça
        </Link>
      </div>
    </header>
  );
}

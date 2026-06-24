export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center text-xs text-muted-foreground">
        <p className="tracking-[0.28em]">STYLESTOCK · 2026</p>
        <p>
          Sistema de cadastro e controle de roupas — React + Spring Boot ·
          <span className="ml-1">API em http://localhost:8080</span>
        </p>
      </div>
    </footer>
  );
}

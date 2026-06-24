import { useState, type FormEvent } from "react";
import { CATEGORIAS, TAMANHOS, type Roupa } from "@/lib/types";
import {
  Tag,
  Layers,
  Users,
  Ruler,
  Palette,
  DollarSign,
  Boxes,
  FileText,
  Check,
} from "lucide-react";

type Props = {
  initial?: Roupa;
  onSubmit: (roupa: Roupa) => void | Promise<void>;
  submitting?: boolean;
  submitLabel: string;
};

const PUBLICOS = ["Masculino", "Feminino", "Unissex"];

const blank: Roupa = {
  nome: "",
  categoria: "",
  tamanho: "",
  cor: "",
  preco: 0,
  quantidade: 0,
  descricao: "",
};

export function RoupaForm({ initial, onSubmit, submitting, submitLabel }: Props) {
  const [form, setForm] = useState<Roupa>(initial ?? blank);
  // "publico" não existe no backend — guardado como prefixo na descricao opcionalmente.
  // Aqui exibimos só visualmente como um select extra (estado local).
  const [publico, setPublico] = useState<string>("Unissex");

  const update = <K extends keyof Roupa>(key: K, value: Roupa[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...form, preco: Number(form.preco), quantidade: Number(form.quantidade) });
  };

  return (
    <form onSubmit={handle} className="space-y-5">
      <Field Icon={Tag} label="Nome da peça">
        <input
          required
          value={form.nome}
          onChange={(e) => update("nome", e.target.value)}
          placeholder="Ex: Camisa Social Oxford"
          className={inputCls}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field Icon={Layers} label="Categoria">
          <select
            required
            value={form.categoria}
            onChange={(e) => update("categoria", e.target.value)}
            className={inputCls}
          >
            <option value="">Selecione…</option>
            {CATEGORIAS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field Icon={Users} label="Público">
          <select
            value={publico}
            onChange={(e) => setPublico(e.target.value)}
            className={inputCls}
          >
            {PUBLICOS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field Icon={Ruler} label="Tamanho">
          <select
            required
            value={form.tamanho}
            onChange={(e) => update("tamanho", e.target.value)}
            className={inputCls}
          >
            <option value="">Selecione…</option>
            {TAMANHOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field Icon={Palette} label="Cor">
          <input
            required
            value={form.cor}
            onChange={(e) => update("cor", e.target.value)}
            placeholder="Ex: Preto, Grafite, Camel…"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field Icon={DollarSign} label="Preço (R$)">
          <input
            required
            type="number"
            step="0.01"
            min={0}
            value={form.preco}
            onChange={(e) => update("preco", e.target.valueAsNumber || 0)}
            placeholder="0,00"
            className={inputCls}
          />
        </Field>

        <Field Icon={Boxes} label="Quantidade em estoque">
          <input
            required
            type="number"
            min={0}
            value={form.quantidade}
            onChange={(e) => update("quantidade", e.target.valueAsNumber || 0)}
            placeholder="0"
            className={inputCls}
          />
        </Field>
      </div>

      <Field Icon={FileText} label="Descrição">
        <textarea
          rows={3}
          value={form.descricao}
          onChange={(e) => update("descricao", e.target.value)}
          placeholder="Descreva a peça brevemente…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      <div className="flex items-center justify-between border-t border-border pt-5">
        <span className="text-xs text-muted-foreground">
          {publico} · {form.categoria || "—"}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => history.back()}
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            <Check className="h-4 w-4" />
            {submitting ? "Salvando…" : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-input/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none";

function Field({
  Icon,
  label,
  children,
}: {
  Icon: typeof Tag;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </span>
      {children}
    </label>
  );
}

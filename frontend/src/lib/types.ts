export type Roupa = {
  id?: number;
  nome: string;
  categoria: string;
  tamanho: string;
  cor: string;
  preco: number;
  quantidade: number;
  descricao: string;
};

export const CATEGORIAS = [
  "Camisas",
  "Calcas",
  "Blazers",
  "Jaquetas",
  "Camisetas",
  "Vestidos",
  "Casacos",
  "Saias",
  "Tenis",
  "Sapatos",
] as const;

export const TAMANHOS = ["PP", "P", "M", "G", "GG", "36", "38", "40", "42", "44"] as const;

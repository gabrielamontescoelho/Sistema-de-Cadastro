import axios from "axios";
import type { Roupa } from "./types";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

const ensureArray = <T,>(data: unknown): T[] => {
  if (!Array.isArray(data)) {
    throw new Error("Resposta inesperada do backend (não é uma lista).");
  }
  return data as T[];
};

export const roupasApi = {
  listar: async (): Promise<Roupa[]> => {
    const { data } = await api.get("/roupas");
    return ensureArray<Roupa>(data);
  },
  buscarPorId: async (id: number): Promise<Roupa> => {
    const { data } = await api.get<Roupa>(`/roupas/${id}`);
    return data;
  },
  buscarPorNome: async (nome: string): Promise<Roupa[]> => {
    const { data } = await api.get("/roupas/buscar", { params: { nome } });
    return ensureArray<Roupa>(data);
  },
  cadastrar: async (roupa: Roupa): Promise<Roupa> => {
    const { data } = await api.post<Roupa>("/roupas", roupa);
    return data;
  },
  atualizar: async (id: number, roupa: Roupa): Promise<Roupa> => {
    const { data } = await api.put<Roupa>(`/roupas/${id}`, roupa);
    return data;
  },
  excluir: async (id: number): Promise<void> => {
    await api.delete(`/roupas/${id}`);
  },
};

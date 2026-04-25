import type { Empreendedor } from "./types";
import rawData from "../data/empreendedores.json";

const empreendedores: Empreendedor[] = rawData as Empreendedor[];

export function getAll(): Empreendedor[] {
  return empreendedores;
}

export function getById(id: string): Empreendedor | undefined {
  return empreendedores.find((e) => e.id === id);
}

export function getStats() {
  const cidades = new Set(empreendedores.map((e) => e.cidade));
  const cooperativas = new Set(empreendedores.map((e) => e.cooperativa));
  const estados = new Set(empreendedores.map((e) => e.estado));
  return {
    total: empreendedores.length,
    cidades: cidades.size,
    cooperativas: cooperativas.size,
    estados: estados.size,
  };
}

export function getCategorias(): string[] {
  return Array.from(new Set(empreendedores.map((e) => e.categoria))).sort();
}

export function getEstados(): string[] {
  return Array.from(new Set(empreendedores.map((e) => e.estado))).sort();
}

export function filterEmpreendedores(
  list: Empreendedor[],
  query: string,
  categoria: string,
  estado: string
): Empreendedor[] {
  const q = query.toLowerCase().trim();
  return list.filter((e) => {
    const matchQuery =
      !q ||
      e.nome.toLowerCase().includes(q) ||
      e.negocio.toLowerCase().includes(q) ||
      e.cidade.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q));
    const matchCategoria = !categoria || e.categoria === categoria;
    const matchEstado = !estado || e.estado === estado;
    return matchQuery && matchCategoria && matchEstado;
  });
}

export function getAvatarUrl(nome: string): string {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(nome)}`;
}

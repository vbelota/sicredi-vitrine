"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  query: string;
  categoria: string;
  estado: string;
  total: number;
  filtered: number;
  categorias: string[];
  estados: string[];
  onQuery: (v: string) => void;
  onCategoria: (v: string) => void;
  onEstado: (v: string) => void;
  onClear: () => void;
}

export function Filters({
  query,
  categoria,
  estado,
  total,
  filtered,
  categorias,
  estados,
  onQuery,
  onCategoria,
  onEstado,
  onClear,
}: FiltersProps) {
  const hasFilters = query || categoria || estado;

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, negócio, cidade ou tag..."
              className="pl-9"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
            />
          </div>

          <Select value={categoria || "all"} onValueChange={(v: string | null) => onCategoria(!v || v === "all" ? "" : v)}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              {categorias.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={estado || "all"} onValueChange={(v: string | null) => onEstado(!v || v === "all" ? "" : v)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos estados</SelectItem>
              {estados.map((e) => (
                <SelectItem key={e} value={e}>{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="outline" size="icon" onClick={onClear} title="Limpar filtros">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {hasFilters ? (
            <>Mostrando <strong>{filtered}</strong> de <strong>{total}</strong> empreendedores</>
          ) : (
            <><strong>{total}</strong> empreendedores cadastrados</>
          )}
        </p>
      </div>
    </div>
  );
}

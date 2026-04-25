import { SearchX } from "lucide-react";
import { EntrepreneurCard } from "./entrepreneur-card";
import type { Empreendedor } from "@/lib/types";

interface EntrepreneurGridProps {
  empreendedores: Empreendedor[];
}

export function EntrepreneurGrid({ empreendedores }: EntrepreneurGridProps) {
  if (empreendedores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <SearchX className="h-12 w-12 text-muted-foreground/50" />
        <div>
          <p className="font-semibold text-[var(--texto)]">Nenhum empreendedor encontrado</p>
          <p className="text-sm text-muted-foreground mt-1">Tente outros filtros ou limpe a busca.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {empreendedores.map((e) => (
        <EntrepreneurCard key={e.id} empreendedor={e} />
      ))}
    </div>
  );
}

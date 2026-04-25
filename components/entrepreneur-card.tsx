import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORIA_COLORS, type Empreendedor } from "@/lib/types";
import { getAvatarUrl } from "@/lib/data";

interface EntrepreneurCardProps {
  empreendedor: Empreendedor;
}

export function EntrepreneurCard({ empreendedor: e }: EntrepreneurCardProps) {
  const badgeClass = CATEGORIA_COLORS[e.categoria] ?? "bg-gray-100 text-gray-800";

  return (
    <Link
      href={`/empreendedor/${e.id}`}
      className="group flex flex-col bg-white rounded-xl border border-border hover:border-[var(--verde-sicredi)] hover:shadow-lg transition-all duration-200"
    >
      <div className="p-5 flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 rounded-full bg-[var(--suave)] overflow-hidden border-2 border-[var(--verde-claro)]">
          <Image
            src={getAvatarUrl(e.nome)}
            alt={e.nome}
            width={56}
            height={56}
            className="w-full h-full"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--texto)] truncate leading-tight">{e.nome}</h3>
          <p className="text-sm text-muted-foreground truncate">{e.negocio}</p>
          <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
            {e.categoria}
          </span>
        </div>
      </div>

      <div className="px-5 pb-4 flex-1">
        <p className="text-sm text-[var(--texto)] line-clamp-2 leading-relaxed">{e.historia}</p>

        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{e.cidade}, {e.estado}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {e.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-[var(--suave)] text-muted-foreground px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Desde {e.ano_inicio}</span>
        <span className="text-sm font-medium text-[var(--verde-sicredi)] flex items-center gap-1 group-hover:gap-2 transition-all">
          Conhecer <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import type { Empreendedor } from "@/lib/types";

const GEO_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

interface BrazilMapProps {
  empreendedores: Empreendedor[];
  estadoAtivo: string;
  onEstadoClick: (uf: string) => void;
}

const STATE_ABBR: Record<string, string> = {
  Acre: "AC", Alagoas: "AL", Amapá: "AP", Amazonas: "AM", Bahia: "BA",
  Ceará: "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", Goiás: "GO",
  Maranhão: "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG", Pará: "PA", Paraíba: "PB", Paraná: "PR",
  Pernambuco: "PE", Piauí: "PI", "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS", Rondônia: "RO",
  Roraima: "RR", "Santa Catarina": "SC", "São Paulo": "SP", Sergipe: "SE",
  Tocantins: "TO",
};

export function BrazilMap({ empreendedores, estadoAtivo, onEstadoClick }: BrazilMapProps) {
  const estadosComEmpreendedores = new Set(empreendedores.map((e) => e.estado));

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <p className="text-sm font-medium text-[var(--texto)] mb-1">
        Mapa de empreendedores
      </p>
      <p className="text-xs text-muted-foreground mb-3">
        Clique num estado para filtrar. Clique novamente para limpar.
      </p>
      <div className="w-full max-w-2xl mx-auto">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-54, -15], scale: 700 }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name: string = geo.properties.name;
                const uf = STATE_ABBR[name] ?? name;
                const hasEmpreendedor = estadosComEmpreendedores.has(uf);
                const isActive = estadoAtivo === uf;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => hasEmpreendedor && onEstadoClick(uf)}
                    style={{
                      default: {
                        fill: isActive
                          ? "#00965E"
                          : hasEmpreendedor
                          ? "#A8D8B9"
                          : "#E5E7EB",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: hasEmpreendedor ? "#00965E" : "#E5E7EB",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: hasEmpreendedor ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {empreendedores.map((e) => (
            <Marker key={e.id} coordinates={[e.coordenadas.lng, e.coordenadas.lat]}>
              <circle
                r={4}
                fill="#E5471A"
                stroke="#FFFFFF"
                strokeWidth={1.5}
                className="cursor-pointer"
                onClick={() => onEstadoClick(e.estado === estadoAtivo ? "" : e.estado)}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground justify-center">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[var(--verde-claro)] inline-block" />
          Estados com empreendedores
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[var(--coral)] inline-block" />
          Empreendedor
        </span>
      </div>
    </div>
  );
}

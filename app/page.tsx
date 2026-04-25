"use client";

import { useState, useMemo } from "react";
import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { Filters } from "@/components/filters";
import { EntrepreneurGrid } from "@/components/entrepreneur-grid";
import { BrazilMap } from "@/components/brazil-map";
import { Footer } from "@/components/footer";
import { getAll, getCategorias, getEstados, filterEmpreendedores } from "@/lib/data";

const allEmpreendedores = getAll();
const categorias = getCategorias();
const estados = getEstados();

export default function Home() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("");

  const filtered = useMemo(
    () => filterEmpreendedores(allEmpreendedores, query, categoria, estado),
    [query, categoria, estado]
  );

  function handleClear() {
    setQuery("");
    setCategoria("");
    setEstado("");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsBar />

      <main id="vitrine" className="flex-1 bg-[var(--suave)]">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          <BrazilMap
            empreendedores={allEmpreendedores}
            estadoAtivo={estado}
            onEstadoClick={(uf) => setEstado(uf === estado ? "" : uf)}
          />
        </div>

        <Filters
          query={query}
          categoria={categoria}
          estado={estado}
          total={allEmpreendedores.length}
          filtered={filtered.length}
          categorias={categorias}
          estados={estados}
          onQuery={setQuery}
          onCategoria={setCategoria}
          onEstado={setEstado}
          onClear={handleClear}
        />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <EntrepreneurGrid empreendedores={filtered} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

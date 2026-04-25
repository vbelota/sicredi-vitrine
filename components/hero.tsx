import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--verde-sicredi)] text-white py-20 px-4">
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />

      {/* logo no topo */}
      <div className="relative max-w-4xl mx-auto flex justify-center mb-8">
        <Image
          src="/sicredi-logo.png"
          alt="Sicredi"
          width={120}
          height={40}
          className="brightness-0 invert"
          priority
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-[var(--verde-claro)] text-sm font-semibold uppercase tracking-widest mb-4">
          Summit Jovem Sicredi 2026
        </p>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Vitrine dos Jovens Empreendedores Sicredi
        </h1>

        <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          A rede de jovens que criam, produzem e crescem dentro do cooperativismo.
          Filtre, conheça e conecte-se.
        </p>

        <a
          href="#vitrine"
          className="inline-flex items-center gap-2 bg-white text-[var(--verde-sicredi)] hover:bg-[var(--verde-claro)] font-semibold rounded-full px-8 py-3 transition-colors"
        >
          Explorar <ChevronDown className="h-4 w-4" />
        </a>

        <p className="mt-10 text-white/60 text-sm">
          Uma ideia da Nayssara (Sicredi Fronteira, Summit Jovem 2024). Realizada em 2026.
        </p>
      </div>
    </section>
  );
}

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, MapPin, Building2, Calendar, MessageCircle, ExternalLink, Share2 } from "lucide-react";
import { getById, getAll, getAvatarUrl } from "@/lib/data";
import { CATEGORIA_COLORS } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAll().map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const e = getById(id);
  if (!e) return {};
  return {
    title: `${e.nome} — ${e.negocio} | Vitrine Sicredi`,
    description: e.historia,
    openGraph: {
      title: `${e.nome} — ${e.negocio}`,
      description: e.historia,
    },
  };
}

export default async function EmpreendedorPage({ params }: Props) {
  const { id } = await params;
  const e = getById(id);
  if (!e) notFound();

  const badgeClass = CATEGORIA_COLORS[e.categoria] ?? "bg-gray-100 text-gray-800";
  const whatsappNumber = e.whatsapp.replace(/\D/g, "");
  const shareText = encodeURIComponent(
    `Conheci ${e.nome} (${e.negocio}) pela Vitrine dos Jovens Empreendedores Sicredi!`
  );

  return (
    <div className="min-h-screen bg-[var(--suave)]">
      {/* top nav */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[var(--texto)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar à vitrine
          </Link>
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--verde-sicredi)] font-medium hover:underline"
          >
            <Share2 className="h-4 w-4" /> Compartilhar
          </a>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* profile header */}
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="shrink-0 w-24 h-24 rounded-full bg-[var(--suave)] overflow-hidden border-4 border-[var(--verde-claro)]">
              <Image
                src={getAvatarUrl(e.nome)}
                alt={e.nome}
                width={96}
                height={96}
                className="w-full h-full"
                unoptimized
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-[var(--texto)]">{e.nome}</h1>
              <p className="text-lg font-medium text-[var(--verde-sicredi)] mt-0.5">{e.negocio}</p>
              <span className={`inline-block mt-2 text-sm font-medium px-3 py-1 rounded-full ${badgeClass}`}>
                {e.categoria}
              </span>
            </div>
          </div>

          {/* meta info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-[var(--verde-sicredi)] shrink-0" />
              <span>{e.cidade}, {e.estado}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 text-[var(--verde-sicredi)] shrink-0" />
              <span className="truncate">{e.cooperativa}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-[var(--verde-sicredi)] shrink-0" />
              <span>Empreende desde {e.ano_inicio}</span>
            </div>
          </div>
        </div>

        {/* história */}
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-[var(--texto)] mb-3">A história</h2>
          <p className="text-[var(--texto)] leading-relaxed">{e.historia}</p>
        </div>

        {/* oferece */}
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-[var(--texto)] mb-3">O que oferece</h2>
          <p className="text-[var(--texto)] leading-relaxed">{e.oferece}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {e.tags.map((tag) => (
              <span key={tag} className="text-sm bg-[var(--suave)] text-muted-foreground px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* contato */}
        <div className="bg-[var(--verde-sicredi)] rounded-2xl p-6 md:p-8 text-white">
          <h2 className="text-lg font-semibold mb-1">Conecte-se</h2>
          <p className="text-white/80 text-sm mb-5">
            Quer comprar, fazer parceria ou só trocar ideia? Entre em contato.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/55${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-[var(--verde-sicredi)] font-semibold px-5 py-3 rounded-xl hover:bg-[var(--verde-claro)] transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <a
              href={`https://instagram.com/${e.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="h-5 w-5" /> {e.instagram}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { CATEGORIA_COLORS } from "@/lib/types";
import { getCategorias } from "@/lib/data";

const ESTADOS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT",
  "PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

const FORMS_URL = process.env.NEXT_PUBLIC_FORMS_URL ?? "";

type Status = "idle" | "loading" | "success" | "error";

export default function CadastrarPage() {
  const categorias = getCategorias();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    negocio: "",
    categoria: "",
    cidade: "",
    estado: "",
    cooperativa: "",
    historia: "",
    oferece: "",
    tags: "",
    instagram: "",
    whatsapp: "",
    ano_inicio: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!FORMS_URL) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await fetch(FORMS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          idade: Number(form.idade),
          ano_inicio: Number(form.ano_inicio),
          tags: form.tags.split(",").map((t) => t.trim().toLowerCase().replace(/\s+/g, "-")),
          submetido_em: new Date().toISOString(),
        }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[var(--suave)] flex flex-col items-center justify-center px-4 text-center gap-6">
        <CheckCircle className="h-16 w-16 text-[var(--verde-sicredi)]" />
        <div>
          <h1 className="text-2xl font-bold text-[var(--texto)]">Cadastro enviado!</h1>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Recebemos suas informações. Nossa equipe vai revisar e em breve seu negócio aparece na vitrine.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--verde-sicredi)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--verde-escuro)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar à vitrine
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--suave)]">
      {/* header */}
      <div className="bg-[var(--verde-sicredi)] px-4 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar à vitrine
          </Link>
          <Image src="/sicredi-logo.png" alt="Sicredi" width={90} height={30} className="brightness-0 invert" />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--texto)]">Cadastre seu negócio</h1>
          <p className="text-muted-foreground mt-1">
            Preencha o formulário abaixo. Nossa equipe revisa e publica na vitrine em até 48h.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* dados pessoais */}
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-[var(--texto)]">Sobre você</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">Nome completo *</label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => set("nome", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                  placeholder="Ex: Maria da Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">Idade *</label>
                <input
                  required
                  type="number"
                  min={16}
                  max={35}
                  value={form.idade}
                  onChange={(e) => set("idade", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                  placeholder="Ex: 24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">Ano que começou *</label>
                <input
                  required
                  type="number"
                  min={2000}
                  max={new Date().getFullYear()}
                  value={form.ano_inicio}
                  onChange={(e) => set("ano_inicio", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                  placeholder="Ex: 2022"
                />
              </div>
            </div>
          </div>

          {/* dados do negócio */}
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-[var(--texto)]">Sobre o negócio</h2>

            <div>
              <label className="block text-sm font-medium text-[var(--texto)] mb-1">Nome do negócio *</label>
              <input
                required
                value={form.negocio}
                onChange={(e) => set("negocio", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                placeholder="Ex: Café da Serra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--texto)] mb-1">Categoria *</label>
              <select
                required
                value={form.categoria}
                onChange={(e) => set("categoria", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)] bg-white"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--texto)] mb-1">Sua história *</label>
              <textarea
                required
                rows={3}
                value={form.historia}
                onChange={(e) => set("historia", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)] resize-none"
                placeholder="Conte como surgiu o negócio, o que te motivou, como está hoje..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--texto)] mb-1">O que você oferece *</label>
              <input
                required
                value={form.oferece}
                onChange={(e) => set("oferece", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                placeholder="Ex: Café especial em grãos, moído e cápsulas biodegradáveis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--texto)] mb-1">
                Tags <span className="text-muted-foreground font-normal">(separadas por vírgula)</span>
              </label>
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                placeholder="Ex: cafe-especial, agro, sustentavel"
              />
            </div>
          </div>

          {/* localização */}
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-[var(--texto)]">Localização e cooperativa</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">Cidade *</label>
                <input
                  required
                  value={form.cidade}
                  onChange={(e) => set("cidade", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                  placeholder="Ex: Pato Branco"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">Estado *</label>
                <select
                  required
                  value={form.estado}
                  onChange={(e) => set("estado", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)] bg-white"
                >
                  <option value="">UF</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--texto)] mb-1">Cooperativa Sicredi *</label>
              <input
                required
                value={form.cooperativa}
                onChange={(e) => set("cooperativa", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                placeholder="Ex: Sicredi Fronteira PR/SC"
              />
            </div>
          </div>

          {/* contato */}
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-[var(--texto)]">Contato</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">WhatsApp *</label>
                <input
                  required
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                  placeholder="Ex: (46) 99812-4410"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--texto)] mb-1">Instagram</label>
                <input
                  value={form.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--verde-sicredi)]"
                  placeholder="Ex: @cafedaserra"
                />
              </div>
            </div>
          </div>

          {status === "error" && (
            <p className="text-sm text-destructive text-center">
              {!FORMS_URL
                ? "Formulário ainda não configurado. Tente novamente em breve."
                : "Erro ao enviar. Tente novamente."}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[var(--verde-sicredi)] text-white font-semibold py-3 rounded-full hover:bg-[var(--verde-escuro)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "loading" ? "Enviando..." : "Enviar cadastro"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Suas informações serão revisadas antes de aparecerem na vitrine.
          </p>
        </form>
      </main>
    </div>
  );
}

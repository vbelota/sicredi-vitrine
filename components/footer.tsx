export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--verde-escuro)] text-white/80 py-10 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="text-2xl font-bold text-white">
          S<span className="text-yellow-400">i</span>credi
        </div>
        <p className="text-sm">
          Construído em um fim de semana com Claude Code no Summit Jovem Sicredi 2026.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href="https://www.sicredi.com.br/comite-jovem"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Comitê Jovem Sicredi
          </a>
          <a href="#vitrine" className="hover:text-white transition-colors">
            Explorar vitrine
          </a>
          <a href="mailto:comitejovem@sicredi.com.br" className="hover:text-white transition-colors">
            Cadastre seu negócio
          </a>
        </div>
        <p className="text-xs text-white/40">© {year} Sicredi. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

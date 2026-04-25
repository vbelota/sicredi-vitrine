# Vitrine Jovens Empreendedores Sicredi

## Contexto
Plataforma web pública que mostra jovens empreendedores da rede Sicredi.
Parte do toolkit do Summit Jovem Sicredi 2026.
Ideia original: Nayssara, Sicredi Fronteira, Summit Jovem 2024.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + shadcn/ui
- lucide-react
- react-simple-maps + prop-types
- Dados em JSON estático (data/empreendedores.json)
- Deploy: Vercel

## Convenções
- Todos os componentes em PascalCase, arquivos em kebab-case.
- Tailwind sempre, nunca CSS modules.
- TypeScript strict, nunca 'any'.
- Cores sempre via CSS variables (definidas em globals.css), nunca hardcoded.
- Mobile-first: começa pelo estilo mobile, depois adiciona md:/lg:.
- Todo componente recebe props tipadas.
- Commits em português, imperativo, prefixo: "feat:", "fix:", "style:", "refactor:".

## Paleta Sicredi (use via CSS vars)
--verde-sicredi: #00965E
--verde-escuro: #005A39
--verde-claro: #A8D8B9
--coral: #E5471A
--texto: #2D2D2D
--suave: #F4F4F1

## Regras
- Antes de escrever código novo, descreve em 3-5 linhas o que vai fazer.
- Após terminar uma feature, rode 'npm run build' e informe se passou.
- Nunca crie README.md sem ser pedido.
- Se uma decisão de design for ambígua, perguntar antes de implementar.
- Stats (total, cidades, cooperativas) sempre calculadas dinamicamente do JSON — nunca hardcoded.

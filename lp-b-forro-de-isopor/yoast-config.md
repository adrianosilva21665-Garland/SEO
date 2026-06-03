# Yoast SEO — Configuração LP B (Forro de Isopor)

## Aba "SEO"

| Campo | Valor |
|-------|-------|
| **Título SEO** | `Forro de Isopor para Teto \| Fábrica Direta SP \| EME` |
| **Slug (URL)** | `forro-de-isopor` |
| **Meta description** | `Isopor para forro de teto direto da fábrica. EPS antichamas com laudo IPT, entrega rápida para SP e Brasil. Distribuidores e construtoras. Solicite orçamento.` |

## Aba "Schema"

| Campo | Valor |
|-------|-------|
| **Tipo de página** | `Web Page` |
| **Tipo de artigo** | `(nenhum)` |

Inserir o schema WebPage + FAQPage combinado via bloco de código personalizado
(ver arquivo `index.html`, seção `<script type="application/ld+json">`).

## Breadcrumb

Verificar que o Yoast gera automaticamente:
`Início > Produtos > Forro de Isopor`

Se não gerar, configurar manualmente em **Yoast → Aparência de pesquisa → Breadcrumbs**.

## Sitemap

Após publicar a página:
1. Verificar que aparece em `https://emeindustria.ind.br/sitemap_index.xml`
2. Submeter no **Google Search Console → Sitemaps**
3. Solicitar indexação via **Inspecionar URL** no GSC

## Google Ads — Atualizar destino dos grupos de keywords genéricos

Grupos que hoje apontam para a página genérica (QS 2–3) devem passar a apontar
para `https://emeindustria.ind.br/produtos/forro-de-isopor/`:

- `forro de isopor para teto` (exata)
- `isopor para forro` (exata)
- `forro de EPS` (frase)
- `forro de isopor` (frase)
- `eps para teto` (exata variante)
- `forro isopor` (exata)
- `placas de eps para forro 30mm` (frase variante)
- Keywords secundárias B2B listadas no briefing

# SEO — EME Indústria (Forro de Isopor)

Entregáveis de SEO para melhoria de Quality Score no Google Ads e rankeamento orgânico.

## Estrutura

```
lp-a-forrocryl/
  correcoes.html        — Correções pontuais para a LP existente (QS 7 → 8+)

lp-b-forro-de-isopor/
  index.html            — Conteúdo completo da nova LP genérica (QS 2-3 → 7+)
  yoast-config.md       — Configurações Yoast + checklist pós-publicação
```

## LP A — Forrocryl (`/produtos/forrocryl/`)

Status: QS 7. Aplicar as 5 correções em `lp-a-forrocryl/correcoes.html`:

1. **Title tag** — remover "- EME" duplicado, adicionar "Fábrica Direta"
2. **"antichamas"** — inserir no texto corrido (bullet ou parágrafo)
3. **"isopor para forro" / "eps para teto"** — inserir parágrafo na seção "Indicado para"
4. **FAQ** — adicionar seção `<details>/<summary>` antes do formulário (CSS já existe)
5. **Alt text hero** — adicionar `aria-label` na `<section>` do hero

## LP B — Forro de Isopor (`/produtos/forro-de-isopor/`)

Status: não existe. Criar página WordPress replicando o template da LP A.
Conteúdo completo em `lp-b-forro-de-isopor/index.html`.

Após publicar: seguir checklist em `yoast-config.md` e atualizar URLs de destino
no Google Ads para os grupos de keywords genéricos.

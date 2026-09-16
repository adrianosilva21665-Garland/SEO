# SEO

Landing page da campanha **Construção Inteligente** — curso presencial de
ICF da EME, na fábrica EME (Itapecerica da Serra/SP), 14/11/2026.

Conceito da campanha: *"Da teoria à prática, direto na fábrica."*
Mensagem principal: *"ICF não se aprende apenas assistindo. Aprende-se
construindo."*

## Estrutura

- `index.html` — página única com todas as seções (introdução, diferencial
  teoria+prática na fábrica, diferenciais da experiência — café, almoço,
  networking, palestra —, especificações, vídeo, galeria, formulário).
- `assets/css/style.css` — estilos.
- `assets/js/main.js` — comportamento do formulário (envia os dados para o
  WhatsApp via link `wa.me`).
- `assets/img/` — fotos da galeria (atualmente com placeholders visuais).

## Antes de publicar

Data (14/11/2026) e local (Fábrica EME — Itapecerica da Serra/SP) já estão
preenchidos. Ainda faltam:

1. **Carga horária e investimento** na tabela de especificações
   (`index.html`, blocos com `class="placeholder"`).
2. **Endereço completo da fábrica**: preencher `streetAddress` no bloco
   JSON-LD no `<head>` de `index.html`.
3. **Vídeo**: trocar `SEU_VIDEO_ID` pelo ID real do vídeo do YouTube na
   seção `#video`.
4. **Fotos**: adicionar 4–6 fotos reais e comprimidas (WebP/JPG) em
   `assets/img/` mostrando a experiência na fábrica, e trocar os blocos
   placeholder da seção `#galeria`.
5. **WhatsApp**: definir o número real em `WHATSAPP_NUMERO`
   (`assets/js/main.js`).
6. **Domínio**: atualizar `<link rel="canonical">` e as tags `og:` em
   `index.html`.

## Como visualizar localmente

Basta abrir `index.html` num navegador, ou servir a pasta com qualquer
servidor estático (ex.: `python3 -m http.server`).

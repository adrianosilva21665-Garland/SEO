# SEO

Landing page do Curso ICF (presencial).

## Estrutura

- `index.html` — página única com todas as seções (introdução, benefícios,
  especificações, vídeo, galeria, formulário).
- `assets/css/style.css` — estilos.
- `assets/js/main.js` — comportamento do formulário (envia os dados para o
  WhatsApp via link `wa.me`).
- `assets/img/` — fotos da galeria (atualmente com placeholders visuais).

## Antes de publicar

1. **Dados do curso**: preencher data, carga horária, local e investimento
   na tabela de especificações (`index.html`, blocos com `class="placeholder"`).
2. **Vídeo**: trocar `SEU_VIDEO_ID` pelo ID real do vídeo do YouTube na
   seção `#video`.
3. **Fotos**: adicionar 4–6 fotos reais e comprimidas (WebP/JPG) em
   `assets/img/` e trocar os blocos placeholder da seção `#galeria`.
4. **WhatsApp**: definir o número real em `WHATSAPP_NUMERO`
   (`assets/js/main.js`).
5. **Domínio**: atualizar `<link rel="canonical">` e as tags `og:` em
   `index.html`.
6. **Dados estruturados**: preencher `startDate` e `location` no bloco
   JSON-LD no `<head>` de `index.html`.

## Como visualizar localmente

Basta abrir `index.html` num navegador, ou servir a pasta com qualquer
servidor estático (ex.: `python3 -m http.server`).

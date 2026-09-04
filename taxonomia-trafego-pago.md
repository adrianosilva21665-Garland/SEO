# Taxonomia de Tráfego Pago — Nomenclatura de Campanhas, Grupos e Anúncios

## 1. Diagnóstico da nomenclatura atual

Nomenclatura atual: `[EME] [LEADS] PMAX | GERAL`

Problemas identificados:

1. **"GERAL" mata o principal alavancador do PMax.** Performance Max otimiza por sinais de público e por grupo de recursos (asset group). Uma campanha única "GERAL" mistura produtos, públicos e etapas de funil diferentes no mesmo pool de aprendizado de máquina — o algoritmo não consegue diferenciar um lead de engenheiro especificador de um lead de curioso de varejo, e a qualidade do lead cai.
2. **Sem campo de geografia/idioma.** Impossível escalar por região (ex. Sudeste vs Nordeste) ou por idioma sem reescrever a nomenclatura inteira.
3. **Sem campo de segmento de produto.** EPS industrial, painel EPS, drywall e isolamento térmico são ofertas com ciclo de compra e ICP diferentes — não deveriam competir pelo mesmo orçamento e pelos mesmos sinais dentro de uma campanha "GERAL".
4. **Sem controle de versão/teste.** Não dá para saber se é a primeira estrutura, um V2 pós-otimização, ou um teste A/B, e o Looker Studio/Data Studio não consegue separar historicamente.
5. **Separadores inconsistentes** (colchete + espaço + pipe). Dificulta parsing automático em scripts, filtros de regex e regras de automação (Ads Scripts, Editor, relatórios).
6. **Não escala para Grupo de Anúncios/Recursos e Anúncio.** A convenção para até aqui, então cada pessoa nomeia os níveis abaixo do seu jeito — isso já deve estar acontecendo na conta.

## 2. Princípios da nova taxonomia

- **Um campo = um propósito.** Nunca misturar duas informações no mesmo token.
- **Ordem fixa e delimitador único e previsível** — facilita filtro, pivot table e regex.
- **A nomenclatura reflete a hierarquia real da conta:** Conta → Campanha → Grupo de Anúncios/Grupo de Recursos → Anúncio/Recurso.
- **Colchetes separam os campos, hífen une palavras dentro do mesmo campo.** Formato: `[CAMPO-1] [CAMPO-2] [CAMPO-3]`. Nunca usar `_` nem `|` — colchete é o único delimitador entre campos, em todos os níveis (campanha, grupo, anúncio).
- **PMax não tem "Grupo de Anúncios" nem "Anúncio"** no sentido tradicional — tem **Grupo de Recursos (Asset Group)** e **Recursos (Assets: headlines, descrições, imagens, vídeos)**. A taxonomia abaixo respeita essa diferença em vez de forçar uma estrutura de Search dentro do PMax.

## 3. Estrutura de Campanha

```
[MARCA] [OBJETIVO] [TIPO] [SEGMENTO-PRODUTO] [GEO] [IDIOMA] [VERSAO]
```

| Campo | Significado | Exemplo |
|---|---|---|
| MARCA | Unidade de negócio/marca | `EME` |
| OBJETIVO | Meta de conversão | `LEADS`, `VENDAS`, `BRANDING` |
| TIPO | Tipo/plataforma de campanha | `PMAX`, `SEARCH`, `DISPLAY`, `META`, `LINKEDIN` |
| SEGMENTO-PRODUTO | Linha de produto/ICP — nunca "GERAL" | `EPS-INDUSTRIAL`, `PAINEL-EPS`, `DRYWALL`, `ISOLAMENTO-TERMICO` |
| GEO | Escopo geográfico | `BR`, `SP`, `SUDESTE` |
| IDIOMA | Idioma do público | `PT` |
| VERSAO | Controle de iteração/teste | `V1`, `V2`, `TESTE-A` |

**Antes (1 campanha, tudo misturado):**
```
[EME] [LEADS] PMAX | GERAL
```

**Depois (segmentado por linha de produto, sinal de público limpo):**
```
[EME] [LEADS] [PMAX] [EPS-INDUSTRIAL] [BR] [PT] [V1]
[EME] [LEADS] [PMAX] [PAINEL-EPS] [BR] [PT] [V1]
[EME] [LEADS] [PMAX] [DRYWALL] [BR] [PT] [V1]
[EME] [LEADS] [PMAX] [ISOLAMENTO-TERMICO] [BR] [PT] [V1]
```

Cada campanha agora pode ter público-alvo, orçamento, feed de sinais de audiência e metas de CPA próprios — o que é exatamente o que o PMax precisa para aprender rápido e bem.

## 4. Nível de Grupo de Recursos (equivalente ao Grupo de Anúncios no PMax)

```
[FUNIL] [PUBLICO] [PRODUTO-ESPECIFICO]
```

Exemplo dentro de `[EME] [LEADS] [PMAX] [EPS-INDUSTRIAL] [BR] [PT] [V1]`:

```
[PROSPECCAO] [ENGENHEIRO] [EPS-INDUSTRIAL]
[PROSPECCAO] [CONSTRUTORA] [EPS-INDUSTRIAL]
[REMARKETING] [VISITANTE-SITE] [EPS-INDUSTRIAL]
[REMARKETING] [LEAD-NAO-CONVERTIDO] [EPS-INDUSTRIAL]
```

Regras:

- **Nunca mais de um público/produto por grupo de recursos.** É o que carrega o sinal de audiência (customer match, público personalizado por intenção, público similar).
- Separar sempre **prospecção** de **remarketing** — CPA-alvo, criativo e mensagem são diferentes (topo de funil = dor técnica/autoridade; remarketing = prova social/oferta).
- Se o volume de conversões por grupo for baixo (<15/mês), consolidar públicos próximos em vez de fragmentar demais — PMax precisa de volume para sair do aprendizado.

## 5. Nível de Recurso/Anúncio

O PMax não permite nomear cada asset individualmente na interface, mas o controle interno (planilha de criativos, teste A/B, histórico) deve seguir a mesma sequência de colchetes do grupo, com mais campos no final:

```
[GRUPO] [TIPO-RECURSO] [TEMA/ANGULO] [VERSAO]
```

Exemplos:

```
[PROSPECCAO] [ENGENHEIRO] [EPS-INDUSTRIAL] [HEADLINE] [DOR-TECNICA] [V1]
[PROSPECCAO] [ENGENHEIRO] [EPS-INDUSTRIAL] [IMAGEM] [APLICACAO-OBRA] [V2]
[REMARKETING] [VISITANTE-SITE] [EPS-INDUSTRIAL] [VIDEO] [PROVA-SOCIAL] [V1]
```

Isso permite rastrear, na planilha mestre de criativos, qual ângulo de copy/imagem está performando por público — mesmo sem poder nomear o asset dentro do Google Ads.

## 6. Se também houver Search/Display (estrutura complementar, mesma lógica)

Campanha:
```
[EME] [LEADS] [SEARCH] [EPS-INDUSTRIAL] [BR] [PT] [V1]
```

Grupo de Anúncios (por intenção/tema de palavra-chave, não por "geral"):
```
[ALTA-INTENCAO] [COMPRA-EPS-INDUSTRIAL]
[COMPARACAO] [EPS-VS-XPS]
[INFORMACIONAL] [O-QUE-E-EPS-INDUSTRIAL]
```

Anúncio (RSA):
```
[ALTA-INTENCAO] [COMPRA-EPS-INDUSTRIAL] [RSA] [ENTREGA-RAPIDA] [V1]
[ALTA-INTENCAO] [COMPRA-EPS-INDUSTRIAL] [RSA] [CERTIFICACAO-TECNICA] [V1]
```

## 7. Exemplo aplicado: Impulsionamento de Vídeo — 4 Grupos de Anúncios por Tipo de Segmentação

Campanha de vídeo (YouTube Ads/Google Ads) tem Grupo de Anúncios de verdade — diferente do PMax — então aqui a segmentação acontece dentro da campanha. Neste caso os 4 grupos **não são personas diferentes, são 4 métodos de segmentação diferentes testados em paralelo** (colocação, público personalizado, palavra-chave, demografia) para o mesmo vídeo/oferta. A regra é a mesma: **1 método de segmentação = 1 grupo**, nunca misturar dois métodos no mesmo grupo — se misturar, o relatório não mostra qual forma de achar audiência trouxe o lead mais barato.

**Campanha** (mesmo padrão da seção 3, `TIPO` = `VIDEO`):
```
[EME] [LEADS] [VIDEO] [INSTITUCIONAL] [BR] [PT] [V1]
```
> Troque `INSTITUCIONAL` pelo tema real do vídeo se for específico de produto (ex. `EPS-INDUSTRIAL`, `PAINEL-EPS`).

**Grupo de Anúncios** — `[FUNIL] [TIPO-SEGMENTACAO]`, um método de segmentação por grupo, nunca um grupo "GERAL":
```
[PROSPECCAO] [COLOCACAO-CANAIS-CONSTRUCAO]
[PROSPECCAO] [PUBLICO-PERSONALIZADO]
[PROSPECCAO] [PALAVRA-CHAVE]
[PROSPECCAO] [DEMOGRAFICO-A-DEFINIR]
```

| Grupo | Tipo de segmentação (targeting no Ads) | O que configurar |
|---|---|---|
| `[PROSPECCAO] [COLOCACAO-CANAIS-CONSTRUCAO]` | **Colocações (Placements)** | Lista curada de canais do YouTube sobre construção/reforma/engenharia onde o anúncio pode aparecer |
| `[PROSPECCAO] [PUBLICO-PERSONALIZADO]` | **Público-alvo personalizado (Custom Segment)** | Público criado a partir de palavras/termos de busca recentes, apps ou sites que o público-alvo usa/visita |
| `[PROSPECCAO] [PALAVRA-CHAVE]` | **Palavras-chave** | Lista de keywords relacionadas ao vídeo/canal onde o anúncio deve aparecer (igual lógica de Search, mas para conteúdo de vídeo) |
| `[PROSPECCAO] [DEMOGRAFICO-A-DEFINIR]` | **Demografia** | Idade, gênero, status parental e/ou renda familiar — troque `A-DEFINIR` pelo recorte real assim que definir (ex. `[PROSPECCAO] [DEMOGRAFICO-35-54-DECISOR]`) |

**Anúncio de vídeo** — `[GRUPO] [FORMATO] [TEMA] [VERSAO]`:
```
[PROSPECCAO] [COLOCACAO-CANAIS-CONSTRUCAO] [INSTREAM-SKIP] [DOR-TECNICA] [V1]
[PROSPECCAO] [PUBLICO-PERSONALIZADO] [INSTREAM-SKIP] [DOR-TECNICA] [V1]
[PROSPECCAO] [PALAVRA-CHAVE] [INFEED] [DOR-TECNICA] [V1]
[PROSPECCAO] [DEMOGRAFICO-A-DEFINIR] [BUMPER] [DOR-TECNICA] [V1]
```
> Como é o mesmo vídeo/oferta rodando em 4 métodos de segmentação diferentes, o `TEMA` do anúncio pode ficar igual entre os grupos — o que muda é só o `GRUPO` (a forma de encontrar a audiência). Se cada grupo tiver um corte de vídeo diferente, ajuste o `TEMA` também.

**Quando é o mesmo anúncio servindo em vários formatos ao mesmo tempo** (caso mais comum: você sobe 1 vídeo numa campanha de Vídeo e o Google serve automaticamente como in-stream pulável + in-feed + shorts, sem você criar 3 anúncios separados), **não crie um `[FORMATO]` por anúncio** — é um único anúncio, então esse campo sai do nome:

`[GRUPO] [TEMA] [VERSAO]`

Exemplo real (produto = EPS para núcleo de telhas, vídeo gravado no escritório, rodando in-stream pulável + in-feed + shorts de uma vez só):
```
[PROSPECCAO] [COLOCACAO-CANAIS-CONSTRUCAO] [EPS-NUCLEO-TELHAS-ESCRITORIO] [V1]
[PROSPECCAO] [PUBLICO-PERSONALIZADO] [EPS-NUCLEO-TELHAS-ESCRITORIO] [V1]
[PROSPECCAO] [PALAVRA-CHAVE] [EPS-NUCLEO-TELHAS-ESCRITORIO] [V1]
[PROSPECCAO] [DEMOGRAFICO-A-DEFINIR] [EPS-NUCLEO-TELHAS-ESCRITORIO] [V1]
```

Regra: **só usa `[FORMATO]` no nome quando existir mais de uma peça/anúncio diferente por grupo** (ex. você testar um corte in-stream contra um corte shorts como criativos distintos). Se é um anúncio único cobrindo vários formatos automaticamente, o formato não entra no nome — quem já sabe que aquela campanha serve nos 3 formatos não precisa repetir isso no nome de cada anúncio.

Regras específicas deste teste:

- **Não misture os 4 métodos no mesmo grupo.** Cada um usa um mecanismo de leilão/alcance diferente — juntar tudo impede saber se colocação, público personalizado, palavra-chave ou demografia é o que traz o CPL mais barato.
- Mantenha o **mesmo orçamento inicial** nos 4 grupos por pelo menos 1–2 semanas antes de realocar verba — senão o teste fica viciado (o grupo com mais budget sempre "ganha" por volume, não por eficiência).
- No grupo de **Demografia**, depois de preencher o recorte real, documente na planilha mestre por que aquele recorte foi escolhido (ex. idade típica de decisor de compra B2B).
- Definir **frequency cap** por grupo e excluir convertidos via lista de remarketing, para não desperdiçar impressão em quem já converteu.
- Se o objetivo for geração de leads (não só views), usar **Video Action Campaign** com CTA e formulário de lead, mantendo a mesma nomenclatura de campanha/grupo/anúncio acima.
- Depois de 2–4 semanas, compare CPL/qualidade de lead entre os 4 grupos e realoque orçamento para o(s) método(s) que performam melhor — é esse o objetivo do teste.

## 8. Meta Ads (Facebook/Instagram) — Estrutura por Tipo de Campanha

A hierarquia do Meta é **Campanha (objetivo) → Conjunto de Anúncios (público/segmentação/orçamento) → Anúncio (criativo)**. Desde a reestruturação ODAX, o Meta só permite 6 objetivos de campanha — a nomenclatura usa exatamente esses 6 no campo `OBJETIVO`, em vez de "GERAL":

`RECONHECIMENTO`, `TRAFEGO`, `ENGAJAMENTO`, `CADASTROS`, `VENDAS`, `PROMOCAO-APP`

**Campanha** (mesmo padrão da seção 3, `TIPO` = `META`):
```
[MARCA] [OBJETIVO-ODAX] [META] [SEGMENTO-PRODUTO] [GEO] [IDIOMA] [VERSAO]
```

**Conjunto de Anúncios** — `[FUNIL-OU-TIPO-SEGMENTACAO] [PUBLICO]`, mesma regra: 1 público/segmentação por conjunto, nunca "GERAL".

**Anúncio** — `[CONJUNTO] [FORMATO] [TEMA] [VERSAO]`, onde `FORMATO` é `IMAGEM-UNICA`, `CARROSSEL`, `VIDEO`, `COLECAO`, `STORIES` ou `REELS` — só entra no nome quando distingue peças diferentes, mesma lógica da seção 7.

Um exemplo por objetivo:

**RECONHECIMENTO** (alcance/topo de funil, marca)
```
Campanha:  [EME] [RECONHECIMENTO] [META] [INSTITUCIONAL] [BR] [PT] [V1]
Conjunto:  [ALCANCE-AMPLO] [INTERESSE-CONSTRUCAO-CIVIL]
Anúncio:   [ALCANCE-AMPLO] [INTERESSE-CONSTRUCAO-CIVIL] [VIDEO] [MARCA-EME] [V1]
```

**TRAFEGO** (levar para site/blog técnico)
```
Campanha:  [EME] [TRAFEGO] [META] [BLOG-TECNICO] [BR] [PT] [V1]
Conjunto:  [PROSPECCAO] [INTERESSE-ENGENHARIA-CIVIL]
Anúncio:   [PROSPECCAO] [INTERESSE-ENGENHARIA-CIVIL] [CARROSSEL] [ARTIGOS-TECNICOS] [V1]
```

**ENGAJAMENTO** (mensagens no WhatsApp/Direct, vídeo views, interação)
```
Campanha:  [EME] [ENGAJAMENTO] [META] [MENSAGENS-WHATSAPP] [BR] [PT] [V1]
Conjunto:  [LOOKALIKE-1PORCENTO] [LEADS-CONVERTIDOS]
Anúncio:   [LOOKALIKE-1PORCENTO] [LEADS-CONVERTIDOS] [IMAGEM-UNICA] [FALE-CONOSCO] [V1]
```

**CADASTROS** (geração de leads — formulário instantâneo ou site)
```
Campanha:  [EME] [CADASTROS] [META] [EPS-INDUSTRIAL] [BR] [PT] [V1]
Conjunto:  [PUBLICO-PERSONALIZADO] [VISITANTES-SITE-90D]
Anúncio:   [PUBLICO-PERSONALIZADO] [VISITANTES-SITE-90D] [FORMULARIO-INSTANTANEO] [ORCAMENTO] [V1]
```

**VENDAS** (conversão/catálogo)
```
Campanha:  [EME] [VENDAS] [META] [CATALOGO-PRODUTOS] [BR] [PT] [V1]
Conjunto:  [REMARKETING] [CARRINHO-ABANDONADO]
Anúncio:   [REMARKETING] [CARRINHO-ABANDONADO] [COLECAO] [CATALOGO-DINAMICO] [V1]
```

**PROMOCAO-APP** (só se houver app — não se aplica hoje a esse negócio, template para o futuro)
```
Campanha:  [EME] [PROMOCAO-APP] [META] [APP-ORCAMENTO] [BR] [PT] [V1]
Conjunto:  [LOOKALIKE] [USUARIOS-APP-ATIVOS]
Anúncio:   [LOOKALIKE] [USUARIOS-APP-ATIVOS] [VIDEO] [DEMO-APP] [V1]
```

Regras específicas do Meta:

- **Nunca misturar objetivo com segmento no mesmo campo.** `OBJETIVO-ODAX` é sempre um dos 6 valores acima — segmento de produto vai no campo `SEGMENTO-PRODUTO`, nunca junto (ex. não fazer `[EME] [LEADS-EPS] [META] ...`).
- **Cadastros ≠ Vendas ≠ Tráfego** mesmo que todos "gerem lead" na prática — cada objetivo otimiza o leilão para um evento diferente; escolher o objetivo errado (ex. Tráfego para gerar lead) faz o algoritmo otimizar para clique barato, não para conversão.
- Público no Conjunto de Anúncios segue a mesma lógica da seção 4/7: **1 tipo de público por conjunto** — interesse, lookalike, público personalizado (custom audience) e remarketing não devem estar no mesmo conjunto.
- Exclua sempre o público de remarketing/convertidos dos conjuntos de prospecção, para não pagar duas vezes pelo mesmo lead.
- Ative a **Vantagem+ (Advantage+ placements/audience)** apenas depois de já ter validado manualmente qual público/segmento converte melhor — usar Vantagem+ direto no público "GERAL" reproduz o mesmo problema de diluição de sinal do PMax (seção 1).

## 9. Regras de governança

- Padronizar a taxonomia em uma **planilha mestre** antes de criar qualquer campanha nova — ninguém cria campanha "no olho".
- **Nunca reaproveitar** o nome de uma campanha pausada; nova estrutura = nova versão (`V2`, `V3`).
- Nome de campanha com até ~60 caracteres visíveis (o limite técnico do Google Ads é maior, mas nomes longos quebram a leitura em relatório e Looker Studio).
- Auditoria mensal de aderência à taxonomia (checklist rápido: campo por campo, campanha por campanha).

## 10. Plano de ação

**Imediato (0–7 dias)**
- Documentar a taxonomia acima na planilha mestre da conta.
- Segmentar a campanha `[EME] [LEADS] PMAX | GERAL` em campanhas por linha de produto (seção 3), mantendo o orçamento total agregado no início para não perder volume de aprendizado.

**Curto prazo (7–30 dias)**
- Estruturar os grupos de recursos por público dentro de cada nova campanha (seção 4), separando prospecção de remarketing.
- Migrar sinais de audiência (customer match, públicos no site, públicos similares) para os grupos de recursos correspondentes.
- Acompanhar CPA e volume de leads por campanha segmentada vs. a antiga "GERAL"; só pausar a "GERAL" depois de confirmar volume/CPA equivalente ou melhor.

**Médio prazo (30–90 dias)**
- Replicar a mesma lógica de campos (`[MARCA] [OBJETIVO] [TIPO] [SEGMENTO] [GEO] [IDIOMA] [VERSAO]`) em Meta Ads e LinkedIn Ads, para consolidar relatório cross-plataforma por linha de produto.
- Revisar mensalmente performance por segmento de produto e realocar orçamento para os segmentos com melhor CPA/qualidade de lead.

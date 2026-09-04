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
7. **Não identifica a plataforma de origem.** `PMAX` só é reconhecível como Google Ads por quem já sabe o jargão — alguém do time olhando o relatório precisa identificar Google vs. Meta vs. LinkedIn sem precisar decorar nomes de produto.

## 2. Princípios da nova taxonomia

- **Um campo = um propósito.** Nunca misturar duas informações no mesmo token.
- **Ordem fixa e delimitador único e previsível** — facilita filtro, pivot table e regex.
- **A nomenclatura reflete a hierarquia real da conta:** Conta → Campanha → Grupo de Anúncios/Grupo de Recursos → Anúncio/Recurso.
- **Colchetes separam os campos, hífen une palavras dentro do mesmo campo.** Formato: `[CAMPO-1] [CAMPO-2] [CAMPO-3]`. Nunca usar `_` nem `|` — colchete é o único delimitador entre campos, em todos os níveis (campanha, grupo, anúncio).
- **`PLATAFORMA` é um campo obrigatório e nunca abreviado** (`GOOGLE`, `META`, `LINKEDIN`, ...) — é o primeiro campo depois da marca, exatamente para que qualquer pessoa do time identifique a origem da campanha sem precisar saber o que é `PMX` ou `CAD`.
- **Objetivo e tipo de campanha são abreviados** seguindo o Glossário oficial (seção 3) — evita nomes gigantes sem perder padronização.
- **PMax não tem "Grupo de Anúncios" nem "Anúncio"** no sentido tradicional — tem **Grupo de Recursos (Asset Group)** e **Recursos (Assets: headlines, descrições, imagens, vídeos)**. A taxonomia abaixo respeita essa diferença em vez de forçar uma estrutura de Search dentro do PMax.

## 3. Glossário Oficial de Abreviações

> Referência única para todo o time de marketing. Qualquer sigla nova (novo objetivo, novo tipo de campanha, nova plataforma) precisa ser adicionada aqui antes de virar campanha — sem sigla "inventada na hora".

### Plataforma (campo `PLATAFORMA`) — sempre por extenso, nunca abreviar

| Valor | Onde usar |
|---|---|
| `GOOGLE` | Google Ads (Search, PMax, Display, Vídeo/YouTube) |
| `META` | Meta Ads (Facebook/Instagram) |
| `LINKEDIN` | LinkedIn Ads |

### Objetivo (campo `OBJETIVO`) — abreviado

| Sigla | Significado | Plataforma |
|---|---|---|
| `LED` | Leads | Google |
| `VND` | Vendas | Google e Meta |
| `BRD` | Branding | Google |
| `RCH` | Reconhecimento | Meta |
| `TRF` | Tráfego | Meta |
| `ENG` | Engajamento | Meta |
| `CAD` | Cadastros (= geração de leads no Meta) | Meta |
| `PAP` | Promoção de App | Meta |

### Tipo de campanha (campo `TIPO`) — abreviado, só existe no Google Ads

No Meta, o objetivo já define o tipo de campanha (não existe um segundo eixo como no Google) — por isso o campo `TIPO` **não aparece** em campanhas `META`.

| Sigla | Significado |
|---|---|
| `PMX` | Performance Max |
| `SRC` | Search |
| `DSP` | Display |
| `VID` | Vídeo (YouTube Ads) |

### Formato de anúncio (campo `FORMATO`) — usado quando há mais de uma peça por grupo/conjunto

| Sigla/valor | Significado |
|---|---|
| `RSA` | Responsive Search Ad (Search) |
| `INSTREAM-SKIP` | In-stream pulável (Vídeo) |
| `INFEED` | In-feed/Discovery (Vídeo) |
| `BUMPER` | Bumper ad (Vídeo) |
| `SHORTS` | Shorts (Vídeo) |
| `IMAGEM-UNICA` | Imagem única (Meta) |
| `CARROSSEL` | Carrossel (Meta) |
| `VIDEO` | Vídeo (Meta) |
| `COLECAO` | Coleção (Meta) |
| `STORIES` | Stories (Meta) |
| `REELS` | Reels (Meta) |

### Canal de conversão (campo `CANAL`) — usado no Conjunto de Anúncios do Meta

No Meta, "local de conversão" (WhatsApp, formulário, site, ligação) é escolhido **no Conjunto de Anúncios**, não na campanha — por isso é campo próprio, separado do público, nos objetivos que oferecem mais de um destino (`ENG`, `CAD`, `TRF`, `VND`). Só entra no nome quando a campanha tem mais de uma opção de canal para escolher; se só existe um canal possível, omitir.

| Sigla | Significado |
|---|---|
| `WHATSAPP` | Conversas no WhatsApp |
| `MESSENGER` | Conversas no Messenger |
| `INSTAGRAM-DIRECT` | Conversas no Direct do Instagram |
| `FORMULARIO-INSTANTANEO` | Instant Form dentro do Meta |
| `SITE` | Formulário/checkout no site |
| `LIGACAO` | Clique para ligar |

## 4. Estrutura de Campanha (Google Ads)

```
[MARCA] [PLATAFORMA] [OBJETIVO] [TIPO] [SEGMENTO-PRODUTO] [GEO] [IDIOMA] [VERSAO]
```

| Campo | Significado | Exemplo |
|---|---|---|
| MARCA | Unidade de negócio/marca | `EME` |
| PLATAFORMA | Origem da campanha, sempre por extenso | `GOOGLE` |
| OBJETIVO | Meta de conversão (sigla — seção 3) | `LED`, `VND`, `BRD` |
| TIPO | Tipo de campanha no Google (sigla — seção 3) | `PMX`, `SRC`, `DSP`, `VID` |
| SEGMENTO-PRODUTO | Linha de produto/ICP — nunca "GERAL" | `EPS-INDUSTRIAL`, `PAINEL-EPS`, `DRYWALL`, `ISOLAMENTO-TERMICO` |
| GEO | Escopo geográfico | `BR`, `SP`, `SUDESTE` |
| IDIOMA | Idioma do público | `PT` |
| VERSAO | Controle de iteração/teste | `V1`, `V2`, `TESTE-A` |

**Antes (1 campanha, tudo misturado):**
```
[EME] [LEADS] PMAX | GERAL
```

**Depois (plataforma identificada, segmentado por linha de produto):**
```
[EME] [GOOGLE] [LED] [PMX] [EPS-INDUSTRIAL] [BR] [PT] [V1]
[EME] [GOOGLE] [LED] [PMX] [PAINEL-EPS] [BR] [PT] [V1]
[EME] [GOOGLE] [LED] [PMX] [DRYWALL] [BR] [PT] [V1]
[EME] [GOOGLE] [LED] [PMX] [ISOLAMENTO-TERMICO] [BR] [PT] [V1]
```

Cada campanha agora pode ter público-alvo, orçamento, feed de sinais de audiência e metas de CPA próprios — o que é exatamente o que o PMax precisa para aprender rápido e bem.

## 5. Nível de Grupo de Recursos (equivalente ao Grupo de Anúncios no PMax)

```
[FUNIL] [PUBLICO] [PRODUTO-ESPECIFICO]
```

Exemplo dentro de `[EME] [GOOGLE] [LED] [PMX] [EPS-INDUSTRIAL] [BR] [PT] [V1]`:

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

## 6. Nível de Recurso/Anúncio

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

## 7. Se também houver Search/Display (estrutura complementar, mesma lógica)

Campanha:
```
[EME] [GOOGLE] [LED] [SRC] [EPS-INDUSTRIAL] [BR] [PT] [V1]
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

## 8. Exemplo aplicado: Impulsionamento de Vídeo — 4 Grupos de Anúncios por Tipo de Segmentação

Campanha de vídeo (YouTube Ads/Google Ads) tem Grupo de Anúncios de verdade — diferente do PMax — então aqui a segmentação acontece dentro da campanha. Neste caso os 4 grupos **não são personas diferentes, são 4 métodos de segmentação diferentes testados em paralelo** (colocação, público personalizado, palavra-chave, demografia) para o mesmo vídeo/oferta. A regra é a mesma: **1 método de segmentação = 1 grupo**, nunca misturar dois métodos no mesmo grupo — se misturar, o relatório não mostra qual forma de achar audiência trouxe o lead mais barato.

**Campanha** (mesmo padrão da seção 4, `TIPO` = `VID`):
```
[EME] [GOOGLE] [LED] [VID] [INSTITUCIONAL] [BR] [PT] [V1]
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

## 9. Meta Ads (Facebook/Instagram) — Estrutura por Tipo de Campanha

A hierarquia do Meta é **Campanha (objetivo) → Conjunto de Anúncios (público/segmentação/orçamento) → Anúncio (criativo)**. Desde a reestruturação ODAX, o Meta só permite 6 objetivos de campanha, e o objetivo já define o tipo de campanha — por isso **não existe campo `TIPO` separado no Meta**, diferente do Google:

```
[MARCA] [PLATAFORMA] [OBJETIVO] [SEGMENTO-PRODUTO] [GEO] [IDIOMA] [VERSAO]
```

**Conjunto de Anúncios** — `[FUNIL-OU-TIPO-SEGMENTACAO] [PUBLICO] [CANAL]`, mesma regra: 1 público/segmentação por conjunto, nunca "GERAL". `PUBLICO` e `CANAL` **nunca vão no mesmo token** — são dois eixos independentes (quem eu alcanço vs. onde a conversão acontece) — e `CANAL` (seção 3) só entra quando a campanha realmente tem mais de um destino pra escolher.

**Anúncio** — `[CONJUNTO] [FORMATO] [TEMA] [VERSAO]` — `FORMATO` (seção 3) é sempre o formato criativo (imagem/carrossel/vídeo), nunca o canal de conversão, e só entra no nome quando distingue peças diferentes, mesma lógica da seção 8.

Um exemplo por objetivo:

**RCH — Reconhecimento** (alcance/topo de funil, marca)
```
Campanha:  [EME] [META] [RCH] [INSTITUCIONAL] [BR] [PT] [V1]
Conjunto:  [ALCANCE-AMPLO] [INTERESSE-CONSTRUCAO-CIVIL]
Anúncio:   [ALCANCE-AMPLO] [INTERESSE-CONSTRUCAO-CIVIL] [VIDEO] [MARCA-EME] [V1]
```

**TRF — Tráfego** (levar para site/blog técnico)
```
Campanha:  [EME] [META] [TRF] [BLOG-TECNICO] [BR] [PT] [V1]
Conjunto:  [PROSPECCAO] [INTERESSE-ENGENHARIA-CIVIL]
Anúncio:   [PROSPECCAO] [INTERESSE-ENGENHARIA-CIVIL] [CARROSSEL] [ARTIGOS-TECNICOS] [V1]
```

**ENG — Engajamento** (mensagens no WhatsApp/Direct, vídeo views, interação)
```
Campanha:  [EME] [META] [ENG] [INSTITUCIONAL] [BR] [PT] [V1]
Conjunto:  [LOOKALIKE-1PORCENTO] [LEADS-CONVERTIDOS] [WHATSAPP]
Anúncio:   [LOOKALIKE-1PORCENTO] [LEADS-CONVERTIDOS] [WHATSAPP] [IMAGEM-UNICA] [FALE-CONOSCO] [V1]
```
> O canal (`WHATSAPP`) mora no Conjunto, não na campanha — é lá que o Meta deixa escolher o destino da conversa.

**CAD — Cadastros** (mesmo público, testando 2 canais de conversão em paralelo)
```
Campanha:  [EME] [META] [CAD] [EPS-INDUSTRIAL] [BR] [PT] [V1]
Conjunto:  [PUBLICO-PERSONALIZADO] [VISITANTES-SITE-90D] [FORMULARIO-INSTANTANEO]
Conjunto:  [PUBLICO-PERSONALIZADO] [VISITANTES-SITE-90D] [WHATSAPP]
Anúncio:   [PUBLICO-PERSONALIZADO] [VISITANTES-SITE-90D] [FORMULARIO-INSTANTANEO] [IMAGEM-UNICA] [ORCAMENTO] [V1]
Anúncio:   [PUBLICO-PERSONALIZADO] [VISITANTES-SITE-90D] [WHATSAPP] [IMAGEM-UNICA] [ORCAMENTO] [V1]
```
> Mesmo público (`VISITANTES-SITE-90D`) rodando em 2 conjuntos, cada um com um canal — assim dá pra comparar CPL de lead por WhatsApp vs. formulário instantâneo sem misturar os dois no mesmo conjunto.

**VND — Vendas** (conversão/catálogo)
```
Campanha:  [EME] [META] [VND] [CATALOGO-PRODUTOS] [BR] [PT] [V1]
Conjunto:  [REMARKETING] [CARRINHO-ABANDONADO]
Anúncio:   [REMARKETING] [CARRINHO-ABANDONADO] [COLECAO] [CATALOGO-DINAMICO] [V1]
```

**PAP — Promoção de App** (só se houver app — não se aplica hoje a esse negócio, template para o futuro)
```
Campanha:  [EME] [META] [PAP] [APP-ORCAMENTO] [BR] [PT] [V1]
Conjunto:  [LOOKALIKE] [USUARIOS-APP-ATIVOS]
Anúncio:   [LOOKALIKE] [USUARIOS-APP-ATIVOS] [VIDEO] [DEMO-APP] [V1]
```

Regras específicas do Meta:

- **Nunca misturar objetivo com segmento no mesmo campo.** `OBJETIVO` é sempre uma das siglas da seção 3 — segmento de produto vai no campo `SEGMENTO-PRODUTO`, nunca junto (ex. não fazer `[EME] [META] [CAD-EPS] ...`).
- **Cadastros ≠ Vendas ≠ Tráfego** mesmo que todos "gerem lead" na prática — cada objetivo otimiza o leilão para um evento diferente; escolher o objetivo errado (ex. Tráfego para gerar lead) faz o algoritmo otimizar para clique barato, não para conversão.
- Público no Conjunto de Anúncios segue a mesma lógica da seção 5/8: **1 tipo de público por conjunto** — interesse, lookalike, público personalizado (custom audience) e remarketing não devem estar no mesmo conjunto.
- **Público e canal são eixos diferentes, nunca junte os dois num "conjunto genérico".** Testar 2 canais (ex. WhatsApp vs. formulário) para o mesmo público é 2 conjuntos, cada um com o mesmo `PUBLICO` e um `CANAL` diferente — nunca 1 conjunto com os 2 canais ligados ao mesmo tempo, porque aí não dá pra saber qual canal converteu.
- Exclua sempre o público de remarketing/convertidos dos conjuntos de prospecção, para não pagar duas vezes pelo mesmo lead.
- Ative a **Vantagem+ (Advantage+ placements/audience)** apenas depois de já ter validado manualmente qual público/segmento converte melhor — usar Vantagem+ direto no público "GERAL" reproduz o mesmo problema de diluição de sinal do PMax (seção 1).

## 10. Regras de governança

- Padronizar a taxonomia e o Glossário (seção 3) em uma **planilha mestre** antes de criar qualquer campanha nova — ninguém cria campanha "no olho" nem inventa sigla nova sem documentar.
- **Nunca reaproveitar** o nome de uma campanha pausada; nova estrutura = nova versão (`V2`, `V3`).
- Nome de campanha com até ~60 caracteres visíveis (o limite técnico do Google Ads é maior, mas nomes longos quebram a leitura em relatório e Looker Studio).
- Auditoria mensal de aderência à taxonomia (checklist rápido: campo por campo, campanha por campanha).
- Toda sigla nova (objetivo, tipo de campanha, plataforma, formato) só entra em produção depois de adicionada ao Glossário oficial (seção 3).

## 11. Plano de ação

**Imediato (0–7 dias)**
- Documentar a taxonomia e o Glossário (seção 3) na planilha mestre da conta.
- Segmentar a campanha `[EME] [LEADS] PMAX | GERAL` em campanhas por linha de produto (seção 4), mantendo o orçamento total agregado no início para não perder volume de aprendizado.

**Curto prazo (7–30 dias)**
- Estruturar os grupos de recursos por público dentro de cada nova campanha (seção 5), separando prospecção de remarketing.
- Migrar sinais de audiência (customer match, públicos no site, públicos similares) para os grupos de recursos correspondentes.
- Acompanhar CPA e volume de leads por campanha segmentada vs. a antiga "GERAL"; só pausar a "GERAL" depois de confirmar volume/CPA equivalente ou melhor.

**Médio prazo (30–90 dias)**
- Replicar a mesma lógica de campos (`[MARCA] [PLATAFORMA] [OBJETIVO] [TIPO] [SEGMENTO] [GEO] [IDIOMA] [VERSAO]`) em LinkedIn Ads, para consolidar relatório cross-plataforma por linha de produto.
- Revisar mensalmente performance por segmento de produto e realocar orçamento para os segmentos com melhor CPA/qualidade de lead.

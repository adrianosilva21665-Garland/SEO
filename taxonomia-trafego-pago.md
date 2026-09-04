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
- **Grupo carrega `[NUMERACAO] [PRODUTO] [PUBLICO]`; anúncio carrega `[NUMERACAO] [NOME-CRIATIVO]`.** O anúncio não repete o prefixo do grupo — a hierarquia da própria plataforma (e a coluna "Grupo" no relatório) já faz essa ligação. `NUMERACAO` aqui é só ordem/contagem dentro do nível — não confundir com `VERSAO`, que controla iteração/teste no nível de campanha.

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
[NUMERACAO] [PRODUTO] [PUBLICO]
```

| Campo | Significado |
|---|---|
| NUMERACAO | Ordem sequencial do grupo dentro da campanha (`01`, `02`, `03`...) — facilita referenciar "grupo 03" em briefing/planilha sem repetir o nome inteiro. Reinicia a cada campanha nova; **não é a mesma coisa que `VERSAO`** (que controla iteração da campanha, não ordem de grupo). |
| PRODUTO | Linha de produto que o grupo atende — normalmente repete o `SEGMENTO-PRODUTO` da campanha, dá pra identificar o grupo sem abrir a campanha |
| PUBLICO | Audiência do grupo. A etapa de funil vai dentro do próprio valor (sufixo `-PROSPECCAO` ou `-REMARKETING`), não é campo separado |

Exemplo dentro de `[EME] [GOOGLE] [LED] [PMX] [EPS-INDUSTRIAL] [BR] [PT] [V1]`:

```
[01] [EPS-INDUSTRIAL] [ENGENHEIRO-PROSPECCAO]
[02] [EPS-INDUSTRIAL] [CONSTRUTORA-PROSPECCAO]
[03] [EPS-INDUSTRIAL] [VISITANTE-SITE-REMARKETING]
[04] [EPS-INDUSTRIAL] [LEAD-NAO-CONVERTIDO-REMARKETING]
```

Regras:

- **Nunca mais de um público por grupo de recursos.** É o que carrega o sinal de audiência (customer match, público personalizado por intenção, público similar).
- Separar sempre **prospecção** de **remarketing** (visível no sufixo do `PUBLICO`) — CPA-alvo, criativo e mensagem são diferentes (topo de funil = dor técnica/autoridade; remarketing = prova social/oferta).
- Se o volume de conversões por grupo for baixo (<15/mês), consolidar públicos próximos em vez de fragmentar demais — PMax precisa de volume para sair do aprendizado.

## 6. Nível de Recurso/Anúncio

O PMax não permite nomear cada asset individualmente na interface, mas o controle interno (planilha de criativos, teste A/B, histórico) deve seguir:

```
[NUMERACAO] [NOME-CRIATIVO]
```

| Campo | Significado |
|---|---|
| NUMERACAO | Ordem do criativo dentro do grupo (`01`, `02`...) — usada quando há mais de um corte/variação do mesmo ângulo |
| NOME-CRIATIVO | Nome coerente e legível do que o criativo mostra — não precisa repetir o grupo no nome, a própria planilha/hierarquia já mostra a qual grupo o anúncio pertence |

Exemplos (dentro dos grupos da seção 5):

```
[01] [DOR-TECNICA-ENGENHEIRO]
[02] [APLICACAO-OBRA-ENGENHEIRO]
[01] [PROVA-SOCIAL-VISITANTE-SITE]
```

Isso permite rastrear, na planilha mestre de criativos, qual ângulo de copy/imagem está performando por público — mesmo sem poder nomear o asset dentro do Google Ads. Mantenha uma coluna "Grupo" na planilha/relatório para cruzar cada criativo com seu grupo quando exportar um CSV plano.

## 7. Se também houver Search/Display (estrutura complementar, mesma lógica)

Campanha:
```
[EME] [GOOGLE] [LED] [SRC] [EPS-INDUSTRIAL] [BR] [PT] [V1]
```

Grupo de Anúncios — `[NUMERACAO] [PRODUTO] [PUBLICO]`, aqui `PUBLICO` é a intenção/tema de palavra-chave (não por "geral"):
```
[01] [EPS-INDUSTRIAL] [ALTA-INTENCAO-COMPRA]
[02] [EPS-INDUSTRIAL] [COMPARACAO-EPS-VS-XPS]
[03] [EPS-INDUSTRIAL] [INFORMACIONAL]
```

Anúncio (RSA) — `[NUMERACAO] [NOME-CRIATIVO]`:
```
[01] [ENTREGA-RAPIDA]
[01] [CERTIFICACAO-TECNICA]
```

## 8. Exemplo aplicado: Impulsionamento de Vídeo — 4 Grupos de Anúncios por Tipo de Segmentação

Campanha de vídeo (YouTube Ads/Google Ads) tem Grupo de Anúncios de verdade — diferente do PMax — então aqui a segmentação acontece dentro da campanha. Neste caso os 4 grupos **não são personas diferentes, são 4 métodos de segmentação diferentes testados em paralelo** (colocação, público personalizado, palavra-chave, demografia) para o mesmo vídeo/oferta. A regra é a mesma: **1 método de segmentação = 1 grupo**, nunca misturar dois métodos no mesmo grupo — se misturar, o relatório não mostra qual forma de achar audiência trouxe o lead mais barato.

**Campanha** (mesmo padrão da seção 4, `TIPO` = `VID`):
```
[EME] [GOOGLE] [LED] [VID] [INSTITUCIONAL] [BR] [PT] [V1]
```
> Troque `INSTITUCIONAL` pelo tema real do vídeo se for específico de produto (ex. `EPS-INDUSTRIAL`, `PAINEL-EPS`).

**Grupo de Anúncios** — `[NUMERACAO] [PRODUTO] [METODO-SEGMENTACAO]` (aqui o campo de segmentação carrega o método, não um público de pessoa — ver seção 5 para o caso padrão de grupo por público), um método por grupo, nunca um grupo "GERAL":
```
[01] [EPS-NUCLEO-TELHAS] [COLOCACAO-CANAIS-CONSTRUCAO]
[02] [EPS-NUCLEO-TELHAS] [PUBLICO-PERSONALIZADO]
[03] [EPS-NUCLEO-TELHAS] [PALAVRA-CHAVE]
[04] [EPS-NUCLEO-TELHAS] [DEMOGRAFICO-A-DEFINIR]
```

| Grupo | Tipo de segmentação (targeting no Ads) | O que configurar |
|---|---|---|
| `[01] [EPS-NUCLEO-TELHAS] [COLOCACAO-CANAIS-CONSTRUCAO]` | **Colocações (Placements)** | Lista curada de canais do YouTube sobre construção/reforma/engenharia onde o anúncio pode aparecer |
| `[02] [EPS-NUCLEO-TELHAS] [PUBLICO-PERSONALIZADO]` | **Público-alvo personalizado (Custom Segment)** | Público criado a partir de palavras/termos de busca recentes, apps ou sites que o público-alvo usa/visita |
| `[03] [EPS-NUCLEO-TELHAS] [PALAVRA-CHAVE]` | **Palavras-chave** | Lista de keywords relacionadas ao vídeo/canal onde o anúncio deve aparecer (igual lógica de Search, mas para conteúdo de vídeo) |
| `[04] [EPS-NUCLEO-TELHAS] [DEMOGRAFICO-A-DEFINIR]` | **Demografia** | Idade, gênero, status parental e/ou renda familiar — troque `A-DEFINIR` pelo recorte real assim que definir |

**Anúncio de vídeo** — `[NUMERACAO] [NOME-CRIATIVO]` (o mesmo vídeo rodando nos 4 grupos leva o mesmo nome — o grupo já mostra qual método de segmentação está sendo testado):
```
[01] [EPS-NUCLEO-TELHAS-ESCRITORIO]
```
> Esse anúncio `01` é criado dentro de cada um dos 4 grupos — é o mesmo corte de vídeo testado nos 4 métodos ao mesmo tempo. Se depois você gravar um segundo corte (ex. no galpão em vez do escritório), ele entra como `[01] [EPS-NUCLEO-TELHAS-GALPAO]` ou, se for uma variação do mesmo tema, `[02] [EPS-NUCLEO-TELHAS-ESCRITORIO]`.

O Google serve esse anúncio único automaticamente como in-stream pulável + in-feed + shorts, sem você precisar criar peça separada por formato — por isso `FORMATO` não aparece no nome aqui. Só volta a aparecer (`[NUMERACAO] [NOME-CRIATIVO] [FORMATO]`) se você cortar peças diferentes por formato de propósito (ex. um corte vertical dedicado pra Shorts).

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

**Conjunto de Anúncios** — `[NUMERACAO] [PRODUTO] [PUBLICO] [CANAL]`, mesma regra: 1 público/segmentação por conjunto, nunca "GERAL". `PUBLICO` e `CANAL` **nunca vão no mesmo token** — são dois eixos independentes (quem eu alcanço vs. onde a conversão acontece) — e `CANAL` (seção 3) só entra quando a campanha realmente tem mais de um destino pra escolher.

**Anúncio** — `[NUMERACAO] [NOME-CRIATIVO]` — não precisa repetir o conjunto no nome, a hierarquia da conta já mostra isso; `FORMATO` (seção 3) só volta a entrar (`[NUMERACAO] [NOME-CRIATIVO] [FORMATO]`) quando o mesmo criativo existe em mais de um formato como peças distintas.

Um exemplo por objetivo:

**RCH — Reconhecimento** (alcance/topo de funil, marca)
```
Campanha:  [EME] [META] [RCH] [INSTITUCIONAL] [BR] [PT] [V1]
Conjunto:  [01] [INSTITUCIONAL] [INTERESSE-CONSTRUCAO-CIVIL]
Anúncio:   [01] [MARCA-EME]
```

**TRF — Tráfego** (levar para site/blog técnico)
```
Campanha:  [EME] [META] [TRF] [BLOG-TECNICO] [BR] [PT] [V1]
Conjunto:  [01] [BLOG-TECNICO] [INTERESSE-ENGENHARIA-CIVIL]
Anúncio:   [01] [ARTIGOS-TECNICOS]
```

**ENG — Engajamento** (mensagens no WhatsApp/Direct, vídeo views, interação)
```
Campanha:  [EME] [META] [ENG] [INSTITUCIONAL] [BR] [PT] [V1]
Conjunto:  [01] [INSTITUCIONAL] [LOOKALIKE-1PORCENTO-LEADS-CONVERTIDOS] [WHATSAPP]
Anúncio:   [01] [FALE-CONOSCO]
```
> O canal (`WHATSAPP`) mora no Conjunto, não na campanha — é lá que o Meta deixa escolher o destino da conversa.

**CAD — Cadastros** (mesmo público, testando 2 canais de conversão em paralelo)
```
Campanha:  [EME] [META] [CAD] [EPS-INDUSTRIAL] [BR] [PT] [V1]
Conjunto:  [01] [EPS-INDUSTRIAL] [VISITANTES-SITE-90D] [FORMULARIO-INSTANTANEO]
Conjunto:  [02] [EPS-INDUSTRIAL] [VISITANTES-SITE-90D] [WHATSAPP]
Anúncio (grupo 01): [01] [ORCAMENTO]
Anúncio (grupo 02): [01] [ORCAMENTO]
```
> Mesmo público (`VISITANTES-SITE-90D`) rodando em 2 conjuntos, cada um com um canal — assim dá pra comparar CPL de lead por WhatsApp vs. formulário instantâneo sem misturar os dois no mesmo conjunto. `NUMERACAO` do anúncio é sempre relativa ao seu próprio grupo — os dois começam em `01`.

**VND — Vendas** (conversão/catálogo)
```
Campanha:  [EME] [META] [VND] [CATALOGO-PRODUTOS] [BR] [PT] [V1]
Conjunto:  [01] [CATALOGO-PRODUTOS] [CARRINHO-ABANDONADO-REMARKETING]
Anúncio:   [01] [CATALOGO-DINAMICO]
```

**PAP — Promoção de App** (só se houver app — não se aplica hoje a esse negócio, template para o futuro)
```
Campanha:  [EME] [META] [PAP] [APP-ORCAMENTO] [BR] [PT] [V1]
Conjunto:  [01] [APP-ORCAMENTO] [USUARIOS-APP-ATIVOS-LOOKALIKE]
Anúncio:   [01] [DEMO-APP]
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

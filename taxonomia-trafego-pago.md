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
- **Siglas curtas, maiúsculas, sem acento**, hífen dentro do token, underscore entre tokens.
- **PMax não tem "Grupo de Anúncios" nem "Anúncio"** no sentido tradicional — tem **Grupo de Recursos (Asset Group)** e **Recursos (Assets: headlines, descrições, imagens, vídeos)**. A taxonomia abaixo respeita essa diferença em vez de forçar uma estrutura de Search dentro do PMax.

## 3. Estrutura de Campanha

```
[MARCA]_[OBJETIVO]_[TIPO]_[SEGMENTO-PRODUTO]_[GEO]_[IDIOMA]_[VERSAO]
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
EME_LEADS_PMAX_EPS-INDUSTRIAL_BR_PT_V1
EME_LEADS_PMAX_PAINEL-EPS_BR_PT_V1
EME_LEADS_PMAX_DRYWALL_BR_PT_V1
EME_LEADS_PMAX_ISOLAMENTO-TERMICO_BR_PT_V1
```

Cada campanha agora pode ter público-alvo, orçamento, feed de sinais de audiência e metas de CPA próprios — o que é exatamente o que o PMax precisa para aprender rápido e bem.

## 4. Nível de Grupo de Recursos (equivalente ao Grupo de Anúncios no PMax)

```
[FUNIL]_[PUBLICO]_[PRODUTO-ESPECIFICO]
```

Exemplo dentro de `EME_LEADS_PMAX_EPS-INDUSTRIAL_BR_PT_V1`:

```
PROSPECCAO_ENGENHEIRO_EPS-INDUSTRIAL
PROSPECCAO_CONSTRUTORA_EPS-INDUSTRIAL
REMARKETING_VISITANTE-SITE_EPS-INDUSTRIAL
REMARKETING_LEAD-NAO-CONVERTIDO_EPS-INDUSTRIAL
```

Regras:

- **Nunca mais de um público/produto por grupo de recursos.** É o que carrega o sinal de audiência (customer match, público personalizado por intenção, público similar).
- Separar sempre **prospecção** de **remarketing** — CPA-alvo, criativo e mensagem são diferentes (topo de funil = dor técnica/autoridade; remarketing = prova social/oferta).
- Se o volume de conversões por grupo for baixo (<15/mês), consolidar públicos próximos em vez de fragmentar demais — PMax precisa de volume para sair do aprendizado.

## 5. Nível de Recurso/Anúncio

O PMax não permite nomear cada asset individualmente na interface, mas o controle interno (planilha de criativos, teste A/B, histórico) deve seguir:

```
[GRUPO]_[TIPO-RECURSO]_[TEMA/ANGULO]_[VERSAO]
```

Exemplos:

```
PROSPECCAO_ENGENHEIRO_EPS-INDUSTRIAL_HEADLINE_DOR-TECNICA_V1
PROSPECCAO_ENGENHEIRO_EPS-INDUSTRIAL_IMAGEM_APLICACAO-OBRA_V2
REMARKETING_VISITANTE-SITE_EPS-INDUSTRIAL_VIDEO_PROVA-SOCIAL_V1
```

Isso permite rastrear, na planilha mestre de criativos, qual ângulo de copy/imagem está performando por público — mesmo sem poder nomear o asset dentro do Google Ads.

## 6. Se também houver Search/Display (estrutura complementar, mesma lógica)

Campanha:
```
EME_LEADS_SEARCH_EPS-INDUSTRIAL_BR_PT_V1
```

Grupo de Anúncios (por intenção/tema de palavra-chave, não por "geral"):
```
ALTA-INTENCAO_COMPRA-EPS-INDUSTRIAL
COMPARACAO_EPS-VS-XPS
INFORMACIONAL_O-QUE-E-EPS-INDUSTRIAL
```

Anúncio (RSA):
```
ALTA-INTENCAO_COMPRA-EPS-INDUSTRIAL_RSA_ENTREGA-RAPIDA_V1
ALTA-INTENCAO_COMPRA-EPS-INDUSTRIAL_RSA_CERTIFICACAO-TECNICA_V1
```

## 7. Regras de governança

- Padronizar a taxonomia em uma **planilha mestre** antes de criar qualquer campanha nova — ninguém cria campanha "no olho".
- **Nunca reaproveitar** o nome de uma campanha pausada; nova estrutura = nova versão (`V2`, `V3`).
- Nome de campanha com até ~60 caracteres visíveis (o limite técnico do Google Ads é maior, mas nomes longos quebram a leitura em relatório e Looker Studio).
- Auditoria mensal de aderência à taxonomia (checklist rápido: campo por campo, campanha por campanha).

## 8. Plano de ação

**Imediato (0–7 dias)**
- Documentar a taxonomia acima na planilha mestre da conta.
- Segmentar a campanha `[EME] [LEADS] PMAX | GERAL` em campanhas por linha de produto (seção 3), mantendo o orçamento total agregado no início para não perder volume de aprendizado.

**Curto prazo (7–30 dias)**
- Estruturar os grupos de recursos por público dentro de cada nova campanha (seção 4), separando prospecção de remarketing.
- Migrar sinais de audiência (customer match, públicos no site, públicos similares) para os grupos de recursos correspondentes.
- Acompanhar CPA e volume de leads por campanha segmentada vs. a antiga "GERAL"; só pausar a "GERAL" depois de confirmar volume/CPA equivalente ou melhor.

**Médio prazo (30–90 dias)**
- Replicar a mesma lógica de campos (MARCA_OBJETIVO_TIPO_SEGMENTO_GEO_IDIOMA_VERSAO) em Meta Ads e LinkedIn Ads, para consolidar relatório cross-plataforma por linha de produto.
- Revisar mensalmente performance por segmento de produto e realocar orçamento para os segmentos com melhor CPA/qualidade de lead.

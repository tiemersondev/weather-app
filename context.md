# Weather Now - Contexto do Projeto

## Objetivo
Construir um aplicativo de clima responsivo baseado no brief visual do desafio Weather app, reproduzindo os estados desktop e mobile com busca de localização, clima atual, previsao diaria, previsao horaria e troca entre unidades metricas e imperiais.

## Stack utilizada
- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- API REST Open-Meteo

## Resumo do brief visual
Interface escura com fundo `Neutral 900`, cabecalho simples com logo Weather Now, controle de unidades no canto superior direito, titulo central, busca destacada e dashboard de previsao. O layout desktop usa duas colunas na area de dados: resumo/diario a esquerda e previsao horaria a direita. No mobile, tudo empilha em uma coluna.

## Telas e estados identificados
- Dashboard principal em unidades metricas.
- Dashboard principal em unidades imperiais.
- Menu de unidades aberto.
- Campo de busca com sugestoes e busca em progresso.
- Estado de foco em controles interativos.
- Estado de carregamento com skeletons.
- Estado vazio para busca sem resultado.
- Estado de erro de API com acao de retry.

## Componentes identificados
- Header com logo.
- Dropdown de unidades.
- Formulario de busca.
- Lista de sugestoes de cidades.
- Card principal do clima atual.
- Cards de metricas.
- Lista de previsao diaria.
- Painel de previsao horaria com seletor de dia.
- Estado de loading.
- Estado de erro.
- Estado sem resultados.

## Fluxos principais do usuario
- Digitar uma cidade e acionar busca.
- Ver sugestoes durante a busca por cidade.
- Selecionar uma sugestao para carregar o clima.
- Alternar entre metricas e imperiais.
- Escolher o dia exibido no painel de previsao horaria.
- Tentar novamente apos erro de API.

## Informacoes da API
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
- A API nao exige chave.
- Dados necessarios: temperatura atual, sensacao termica, umidade, vento, precipitacao, weather code, max/min diaria e previsao horaria.

## Decisoes tecnicas importantes
- Usar camada `services/weather.ts` para isolar chamadas e transformacao dos dados da API.
- Usar dados iniciais de Berlin via Open-Meteo, alinhados ao visual do brief.
- Usar assets locais fornecidos para logo, icones climaticos e background do card principal.
- Manter uma camada de tipos em `types/weather.ts`.
- Ao trocar unidades, preservar a localizacao selecionada e buscar novamente a previsao na unidade escolhida.

## Padroes visuais extraidos
- Fundo principal: `hsl(243, 96%, 9%)`.
- Cards: `hsl(243, 27%, 20%)` e `hsl(243, 23%, 24%)`.
- Botao primario: `hsl(233, 67%, 56%)`, hover mais escuro.
- Texto principal branco e texto secundario `hsl(250, 6%, 84%)`.
- Bordas sutis em `hsl(243, 23%, 30%)`.
- Raios de borda moderados: 8px em controles, 16px em paineis grandes.
- Tipografia: DM Sans para corpo e Bricolage Grotesque para titulo principal.

## Suposicoes
- O brief nao fornece contrato proprio alem do README; portanto a API oficial usada e Open-Meteo.
- Como a API retorna datas reais, o app mostra datas reais da resposta, nao a data fixa de 5 de agosto de 2025 usada nos mockups.
- Quando a busca nao retorna cidade, o estado vazio ocupa a area principal sem preservar dados antigos.
- Durante falhas de rede/API, o estado de erro global e exibido com botao de retry.
- A lista horaria prioriza o intervalo de 3 PM a 10 PM para espelhar os layouts fornecidos.

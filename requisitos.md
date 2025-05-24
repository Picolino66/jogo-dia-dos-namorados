# 💘 **Prompt Completo para Agente de IA – Jogo Web "Pixel Love: A Jornada de Isaías por Helena"**

## 🎮 **Visão Geral do Projeto**

Crie um jogo web em HTML5 no estilo 2D, dividido em **três fases distintas**, com mecânicas personalizadas baseadas na história real de um casal (Isaías e Helena). As duas primeiras fases serão em estilo **plataforma lateral (side-scroller)** e a última será **top-down (estilo Pokémon)**.

O objetivo do jogo é ser um presente de Dia dos Namorados, com narrativa romântica, momentos de humor e uma mensagem final emocionante.

---

## 🧩 **História Base do Jogo**

Isaías conheceu Helena há quase 3 anos como amiga, mas o romance começou de forma inesperada após uma festa. O maior obstáculo é a distância (Isaías é de BH e Helena de Lavras), mas ele viajava todo fim de semana para vê-la. Eles têm memórias marcantes: situações engraçadas com amigos, o amor dela por cachorros, piadas internas com Davi Brito (ex-BBB), e o pedido de namoro feito em um rodeio.

A jornada no jogo representa essas fases do relacionamento, com Isaías enfrentando desafios metafóricos para provar seu amor e, no fim, reencontrar Helena.

---

## 📚 **Especificações Técnicas**

* **Linguagem:** HTML5 + JavaScript
* **Engine:** Phaser.js v3 (obrigatório)
* **Sprites Temporários:** Quadrados coloridos (placeholder)
* **Estilo artístico:** Pixel Art (pode ser implementado posteriormente)
* **Hospedagem:** Netlify, Vercel ou Firebase Hosting
* **Responsividade:** Compatível com celular e desktop
* **Estrutura modular por cenas**

---

## 🧱 **Cenas do Jogo**

1. Tela de início com título e botão “Começar jornada”
2. Fase 1 – **Os Cães do Destino** (plataforma lateral)
3. Fase 2 – **De Gue o Amor?** (plataforma lateral)
4. Fase 3 – **O Namoro do Touro** (visual top-down)
5. Tela final com mensagem de Dia dos Namorados

---

## 🔄 **Checklist Geral de Desenvolvimento**

### 📁 Setup Inicial

* [ ] Inicializar projeto com Phaser.js
* [ ] Estrutura de pastas: `/src`, `/assets`, `/scenes`, `/utils`
* [ ] Adicionar placeholders para sprites (retângulos coloridos)
* [ ] Criar sistema de troca de cenas

---

### 🖥️ Tela Inicial

* [ ] Tela com título: *"Pixel Love – A Jornada de Isaías por Helena"*
* [ ] Botão: *"Começar jornada"*
* [ ] Créditos discretos: *"Feito por Isaías para Helena"*
* [ ] Música de fundo chip tune

---

### 🐶 Fase 1 – *Os Cães do Destino*

**Estilo:** Plataforma lateral

**Objetivo:** Salvar 5 cachorros antes que sejam chutados por um "mendigo" ou pegos pelo fogo.

**Mecânicas:**

* [ ] Isaías pode andar e pular
* [ ] Cachorros se movem aleatoriamente
* [ ] "Mendigo" (sprite vermelho) anda em direção a eles
* [ ] Fogo (sprite laranja) aparece em áreas fixas
* [ ] Cada cachorro salvo soma um ponto
* [ ] Temporizador de 60 segundos
* [ ] Cena termina com mensagem: *“Por você, até brigo com um mendigo…”*

---

### 🧢 Fase 2 – *De Gue o Amor?*

**Estilo:** Plataforma lateral

**Objetivo:** Derrotar exércitos de Davi Brito pulando em suas cabeças.

**Mecânicas:**

* [ ] Inimigos surgem em ondas (1, 2, 3 por vez...)
* [ ] Quando se aproximam, dizem "de gue?"
* [ ] Se encostam em Isaías, ele perde vida
* [ ] Pular na cabeça derrota o inimigo
* [ ] HUD com "Palavras ouvidas: X"
* [ ] Final da fase: *“Nem o Davi me impediu de te amar, Helena.”*

---

### 🐂 Fase 3 – *O Namoro do Touro*

**Estilo:** Top-down (visão superior)

**Objetivo:** Desviar de touros em uma arena para chegar até Helena.

**Mecânicas:**

* [ ] Arena estilo Pokémon (visão de cima)
* [ ] Touros aparecem dos cantos e correm na direção do jogador
* [ ] Isaías pode andar em 4 direções (↑↓←→)
* [ ] Se for atingido, volta ao início
* [ ] Progressão até Helena no centro do mapa
* [ ] Ao chegar: cutscene + texto final:

  * *"Feliz Dia dos Namorados, Helena"*
  * *"Do BH até Lavras, dos doguinhos aos touros, tudo vale a pena por você."*

---

### 🎁 Cena Final

* [ ] Tela com plano de fundo animado
* [ ] Texto da declaração
* [ ] Botão com link externo opcional: “Veja o futuro...” (leva a um site, carta ou vídeo)
* [ ] Geração de QR Code com link do jogo

---

### 📱 Progressive Web App (opcional)

* [ ] Criar `manifest.json`
* [ ] Adicionar ícone personalizado
* [ ] Permitir instalação no celular

---

### 📦 Deploy

* [ ] Exportar build otimizada
* [ ] Subir para Netlify/Vercel
* [ ] Testar em desktop e mobile
* [ ] Criar domínio personalizado (ex: `pixelhelena.com`)
* [ ] Gerar QR Code

---

## ✅ Instruções para o Agente de IA

1. **Siga o checklist de forma sequencial**, validando cada etapa antes de passar para a próxima.
2. **Priorize a funcionalidade básica com placeholders**. A arte final será aplicada depois.
3. **Sempre modularize o código** com separação de cenas e assets.
4. Ao finalizar cada fase funcional, crie um commit com: `feat: fase X completa com placeholder`
5. Quando o jogo estiver completo, gere um build leve e hospedável.

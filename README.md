# Leão XIV — Habemus Papam

Site editorial sobre o Papa Leão XIV (Robert Francis Prevost), o primeiro pontífice americano da história da Igreja Católica. Projeto desenvolvido como peça de portfólio, com inspiração visual e técnica no estúdio belga [Dogstudio/DEPT®](https://dogstudio.co/).

## ✦ Demo

Para rodar localmente:

```bash
# Opção 1 — Live Server (VSCode)
# Clique direito no index.html → "Open with Live Server"

# Opção 2 — Python
python3 -m http.server 8000
# Acesse http://localhost:8000

# Opção 3 — Node
npx serve
```

## ✦ Stack

- **HTML5 semântico** — estrutura limpa, acessível
- **CSS3 moderno** — Custom Properties, `clamp()`, Grid, Flexbox
- **JavaScript vanilla** (ES6+) — sem framework, sem build step
- **[GSAP 3.12](https://gsap.com/)** + **ScrollTrigger** — animações
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scroll
- **[Split-Type](https://github.com/lukePeavey/SplitType)** — quebra de texto

Todas as libs via CDN — zero `npm install`.

## ✦ Estrutura

```
leo-xiv/
├── index.html
├── css/
│   ├── reset.css          # normalização cross-browser
│   ├── variables.css      # design tokens
│   └── main.css           # componentes
├── js/
│   ├── loader.js          # tela de carregamento
│   ├── cursor.js          # cursor customizado
│   ├── scroll.js          # Lenis smooth scroll
│   ├── animations.js      # GSAP ScrollTrigger
│   └── main.js            # orquestrador + canvas WebGL
└── assets/
    ├── images/
    └── fonts/
```

## ✦ Recursos implementados

- [x] Loader fullscreen com contador de progresso
- [x] Cursor customizado com lerp (dot + ring)
- [x] Smooth scroll com momentum (Lenis)
- [x] Animações de entrada coreografadas (timeline GSAP)
- [x] Split text com `data-split` (entrada palavra por palavra)
- [x] Parallax sutil no título da hero
- [x] Marquee CSS puro (infinito)
- [x] Contadores numéricos animados
- [x] Nav com fundo blur ao rolar
- [x] Canvas 2D com gradiente seguindo o mouse
- [x] Responsivo (mobile-first em breakpoints)
- [x] Acessibilidade — `prefers-reduced-motion`

## ✦ Conteúdo

Informações biográficas baseadas em fontes oficiais:

- [Wikipédia — Papa Leão XIV](https://pt.wikipedia.org/wiki/Papa_Le%C3%A3o_XIV)
- [Opus Dei — Biografia](https://opusdei.org/pt-br/article/biografia-do-papa-leao-xiv/)
- [Vatican News](https://www.vaticannews.va/)
- [Agência ECCLESIA](https://agencia.ecclesia.pt/)

## ✦ Inspiração

Site visual e estrutural inspirado em:

- [dogstudio.co](https://dogstudio.co/) — agência de referência
- Editorial design tradition (revistas católicas, *L'Osservatore Romano*)
- Tipografia papal — serifa elegante (Cormorant Garamond)

## ✦ Licença

Código MIT. Conteúdo biográfico de domínio público / fair use educacional.

---

Desenvolvido com ✦ por [Seu Nome] como peça de portfólio — 2025.

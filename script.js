// =========================================================
// ATACADÃO DAS FERRAGENS — SCRIPT.JS
// =========================================================

// ================================
// DADOS DAS LOJAS
// ================================

const lojas = [
  {
    id: "vilarosario",
    nome: "Loja Vila Rosário",
    img: "./icons/Logo/img.png",
    telefone: "5521978554136",
    insta: "@atacadao_vilarosario",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+Governador+Leonel+de+Moura+Brizola+Vila+Rosário+Duque+de+Caxias+RJ",
  },
  {
    id: "pantanal",
    nome: "Loja Pantanal",
    img: "./icons/Logo/pantanal.png",
    telefone: "5521978558730",
    insta: "@atacadao_pantanal",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Lauro+Sodré+Pantanal+Duque+de+Caxias+RJ",
  },
  {
    id: "lote15",
    nome: "Loja Lote XV",
    img: "./icons/Logo/Lote 15.png",
    telefone: "5521959012101",
    insta: "@atacadao_lote15",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+Governador+Leonel+de+Moura+Brizola+Apolo+XI+Belford+Roxo+RJ",
  },
  {
    id: "parqueamorim",
    nome: "Loja Parque Amorim",
    img: "./icons/Logo/amorim.png",
    telefone: "5521988731134",
    insta: "@atacadao_parqueamorim",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Estrada+Manoel+de+Sá+Parque+Amorim+Belford+Roxo+RJ",
  },
];

// ================================
// HERO SLIDESHOW
// ================================

let slideIndex = 0;
let slideTimer = null;

function iniciarSlideshow() {
  const track = document.getElementById("heroSlidesTrack");
  const dotsContainer = document.getElementById("heroDots");
  const storeNameEl = document.getElementById("heroStoreName");
  if (!track || lojas.length === 0) return;

  track.innerHTML = lojas
    .map(
      (loja, i) => `
        <div class="hero-slide" data-index="${i}"
             style="background-image: url('${loja.img}')">
            <div class="hero-slide-tint"></div>
        </div>
    `,
    )
    .join("");

  dotsContainer.innerHTML = lojas
    .map(
      (_, i) =>
        `<span class="hero-dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`,
    )
    .join("");

  document.querySelectorAll(".hero-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index);
      irParaSlide(idx);
    });
  });

  // mostra nome da primeira loja
  const storeNameBottom = document.getElementById("heroStoreNameBottom");
  storeNameEl.textContent = lojas[0].nome;
  if (storeNameBottom) storeNameBottom.textContent = lojas[0].nome;
  storeNameEl.classList.add("hero-name-change");

  slideTimer = setInterval(proximoSlide, 8000);
}

function irParaSlide(idx) {
  const track = document.getElementById("heroSlidesTrack");
  const dots = document.querySelectorAll(".hero-dot");
  const storeNameEl = document.getElementById("heroStoreName");
  if (!track) return;

  const total = track.children.length;
  if (idx < 0 || idx >= total) return;

  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d) => d.classList.remove("active"));
  dots[idx].classList.add("active");
  slideIndex = idx;
  const storeNameBottom = document.getElementById("heroStoreNameBottom");
  storeNameEl.textContent = lojas[idx].nome;
  if (storeNameBottom) storeNameBottom.textContent = lojas[idx].nome;
  storeNameEl.classList.remove("hero-name-change");
  void storeNameEl.offsetWidth;
  storeNameEl.classList.add("hero-name-change");
}

function proximoSlide() {
  const track = document.getElementById("heroSlidesTrack");
  if (!track) return;
  const total = track.children.length;
  irParaSlide((slideIndex + 1) % total);
}

// ================================
// SUB-NAV CATEGORIAS
// ================================

document.addEventListener("click", (e) => {
  const catLink = e.target.closest(".subnav-link[data-cat]");
  const homeLink = e.target.closest('.subnav-link[href="#quem-somos"]');
  const outrasLink = e.target.closest("#linkOutrasCategorias");

  document
    .querySelectorAll(".subnav-link")
    .forEach((l) => l.classList.remove("active"));

  if (catLink) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");

    const quemBtn = document.querySelector('.subnav-link[href="#inicio"]');
    if (quemBtn) {
      quemBtn.textContent = "Quem Somos";
      quemBtn.setAttribute("href", "#quem-somos");
    }

    const cat = catLink.dataset.cat;
    catLink.classList.add("active");

    const filtrados = produtos.filter((p) => p.cat === cat);
    renderizarProdutos(filtrados, cat);
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    fecharSubnavMobile();
  }

  if (outrasLink) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");
    outrasLink.classList.add("active");
    renderizarProdutos(produtos);
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    fecharSubnavMobile();
  }

  if (homeLink) {
    e.preventDefault();
    homeLink.classList.add("active");
    document.getElementById("site-content").classList.add("site-hidden");
    document.getElementById("quem-somos").classList.add("quem-somos-open");
    homeLink.textContent = "Início";
    homeLink.setAttribute("href", "#inicio");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(observarQS, 100);
    fecharSubnavMobile();
    return;
  }

  const backLink = e.target.closest('.subnav-link[href="#inicio"]');
  if (
    backLink &&
    document.getElementById("quem-somos").classList.contains("quem-somos-open")
  ) {
    e.preventDefault();
    backLink.classList.add("active");
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");
    backLink.textContent = "Quem Somos";
    backLink.setAttribute("href", "#quem-somos");
    renderizarProdutos(produtos);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fecharSubnavMobile();
  }
});

// ================================
// SUB-NAV MOBILE — HAMBURGUER
// ================================

const subnavToggle = document.getElementById("subnavToggle");
const subnavInner = document.getElementById("subnavInner");

if (subnavToggle && subnavInner) {
  subnavToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    subnavToggle.classList.toggle("active");
    subnavInner.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!subnavInner.contains(e.target) && !subnavToggle.contains(e.target)) {
      fecharSubnavMobile();
    }
  });
}

function fecharSubnavMobile() {
  if (subnavToggle) subnavToggle.classList.remove("active");
  if (subnavInner) subnavInner.classList.remove("open");
}

// ================================
// DADOS DOS PRODUTOS
// ================================

const produtos = [
  {
    id: 1,
    nome: "Coluna Pronta 8mm (5/16) 7x20 6 metros",
    cat: "Coluna Pronta",
    preco: 0,
    emoji: "🏗️",
    promo: false,
    img: "./Coluna Pronta/Coluna pronta 1.webp",
  },
  {
    id: 2,
    nome: "Coluna Pronta 8mm (5/16) 7x27 6 metros",
    cat: "Coluna Pronta",
    preco: 0,
    emoji: "🏗️",
    promo: false,
    img: "./Coluna Pronta/Coluna Pronta 2.webp",
  },
  {
    id: 3,
    nome: "Coluna 10mm (3/8) 7x20 6 metros",
    cat: "Coluna Pronta",
    preco: 0,
    emoji: "🏗️",
    promo: false,
    img: "./Coluna Pronta/Coluna Pronta 3.webp",
  },
  {
    id: 4,
    nome: "Coluna 10mm (3/8) 7x27 6 metros",
    cat: "Coluna Pronta",
    preco: 0,
    emoji: "🏗️",
    promo: false,
    img: "./Coluna Pronta/Coluna Pronta 4.webp",
  },
  {
    id: 5,
    nome: "Coluna Pronta 6,3mm (1/4) 7x20 6 metros",
    cat: "Coluna Pronta",
    preco: 0,
    emoji: "🏗️",
    promo: false,
    img: "./Coluna Pronta/Coluna Pronta 5.webp",
  },
  {
    id: 6,
    nome: "Vergalhão CA 60 5mm 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhao CA60 1.webp",
    tipo: "CA 60",
  },
  {
    id: 7,
    nome: "Vergalhão CA 60 4,2mm (3/16) 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhão CA60 2.webp",
    tipo: "CA 60",
  },
  {
    id: 8,
    nome: "Vergalhão CA 50 6,3mm (1/4) 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhão CA50 3.webp",
    tipo: "CA 50",
  },
  {
    id: 9,
    nome: "Vergalhão CA 50 8mm (5/16) 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhão CA50 4.webp",
    tipo: "CA 50",
  },
  {
    id: 10,
    nome: "Vergalhão CA 50 10mm (3/8) 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhão CA50 5.webp",
    tipo: "CA 50",
  },
  {
    id: 11,
    nome: "Vergalhão CA 50 12,5mm (1/2) 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhão CA50 7.webp",
    tipo: "CA 50",
  },
  {
    id: 12,
    nome: "Vergalhão CA 50 16mm (5/8) 12m",
    cat: "Vergalhão de aço",
    preco: 0,
    emoji: "🔩",
    promo: false,
    img: "./Vergalhão de Aço/Vergalhão CA 6.webp",
    tipo: "CA 50",
  },
  {
    id: 13,
    nome: "Arame Recozido 12 (2mm)",
    cat: "Arame",
    preco: 0,
    emoji: "🧶",
    promo: false,
    img: "./Arame/Arame Recozido 12.png",
  },
  {
    id: 14,
    nome: "Arame Recozido 18 (1,20mm)",
    cat: "Arame",
    preco: 0,
    emoji: "🧶",
    promo: false,
    img: "./Arame/Arame Recozido 18.png",
  },
];

// ================================
// ESTADO DO CARRINHO
// ================================

let carrinho = [];

// ================================
// UTILITÁRIOS
// ================================

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarToast(msg, tipo = "ok") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = "toast show " + tipo;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// ================================
// RENDERIZAR PRODUTOS
// ================================

function renderizarProdutos(lista, pesquisa = "") {
  const grid = document.getElementById("grid");
  const titulo = document.getElementById("pageTitle");
  const subtitulo = document.getElementById("pageSubtitle");

  if (!grid) return;

  if (titulo) {
    titulo.innerHTML = pesquisa
      ? `Resultados para <span>"${pesquisa}"</span>`
      : `Produtos em <span>Destaque</span>`;
  }
  if (subtitulo) {
    subtitulo.textContent = pesquisa
      ? `${lista.length} produto(s) encontrado(s)`
      : "Confira os produtos disponíveis";
  }

  if (lista.length === 0) {
    grid.innerHTML = `
            <div class="sem-resultado">
                <div class="sem-resultado-icon">🔍</div>
                <h3>Nenhum produto encontrado</h3>
                <p>Não encontramos "<strong>${pesquisa}</strong>" no nosso catálogo.<br>
                Tente outro termo ou entre em contato pelo WhatsApp!</p>
                <a href="https://wa.me/5521978554136?text=Olá!%20Procurei%20por%20${encodeURIComponent(pesquisa)}%20no%20site%20e%20não%20encontrei.%20Vocês%20têm?"
                   target="_blank" class="sem-resultado-btn">
                    💬 Perguntar no WhatsApp
                </a>
            </div>`;
    return;
  }

  grid.innerHTML = lista
    .map(
      (produto) => `
        <div class="produto-card"${produto.tipo ? ` data-tipo="${produto.tipo}"` : ""}>
            <div class="produto-top">
                <div class="produto-img">
                    ${
                      produto.img
                        ? `<div class="produto-img-wrap"><img src="${produto.img}" alt="${produto.nome}"></div>`
                        : `<span class="produto-emoji">${produto.emoji}</span>`
                    }
                    ${produto.tipo ? `<div class="produto-hover-tipo">${produto.tipo}</div>` : ""}
                </div>
                ${
                  produto.promo
                    ? `<span class="produto-badge promo">🔥 Promoção</span>`
                    : `<span class="produto-badge estoque">✓ Em estoque</span>`
                }
            </div>
            <div class="produto-body">
                <span class="produto-cat">${produto.cat}</span>
                <h3 class="produto-nome">${produto.nome}</h3>
                <button class="produto-btn" data-id="${produto.id}">
                    Fazer orçamento
                </button>
            </div>
        </div>
    `,
    )
    .join("");

  ativarBotoesProduto();
  observarProdutos(); // FIX: animar cards após renderizar
}

// ================================
// BOTÕES DOS PRODUTOS
// ================================

function ativarBotoesProduto() {
  document.querySelectorAll(".produto-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      adicionarAoCarrinho(id);

      btn.classList.add("adicionado");
      btn.textContent = "✓ Adicionado!";
      setTimeout(() => {
        btn.classList.remove("adicionado");
        btn.textContent = "Fazer orçamento";
      }, 2000);

      abrirCarrinho();
    });
  });

  document.querySelectorAll(".produto-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".produto-btn")) return;
      const tipo = card.dataset.tipo;
      if (!tipo) return;
      const filtrados = produtos.filter((p) => p.cat === "Vergalhão de aço");
      renderizarProdutos(filtrados, "Vergalhão de aço");
      document
        .getElementById("produtos")
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ================================
// CARRINHO — ADICIONAR
// ================================

function adicionarAoCarrinho(id) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  const existente = carrinho.find((i) => i.id === id);
  if (existente) {
    existente.qty += 1;
  } else {
    carrinho.push({ ...produto, qty: 1 });
  }

  atualizarContadorCarrinho();
  renderizarCarrinho();
  mostrarToast(`🛒 ${produto.nome} adicionado ao orçamento!`, "ok");
}

// ================================
// CARRINHO — ALTERAR QUANTIDADE
// ================================

function alterarQty(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removerDoCarrinho(id);
    return;
  }

  atualizarContadorCarrinho();
  renderizarCarrinho();
}

// ================================
// CARRINHO — REMOVER
// ================================

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((i) => i.id !== id);
  atualizarContadorCarrinho();
  renderizarCarrinho();
}

// ================================
// CARRINHO — LIMPAR
// ================================

function limparCarrinho() {
  carrinho = [];
  atualizarContadorCarrinho();
  renderizarCarrinho();
  mostrarToast("🗑 Orçamento limpo.", "info");
}

// ================================
// CARRINHO — CONTADOR
// ================================

function atualizarContadorCarrinho() {
  const total = carrinho.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById("carrinhoCount").textContent = total;
  document.getElementById("carrinhoCountPanel").textContent =
    `${total} ${total === 1 ? "item" : "itens"}`;
}

// ================================
// CARRINHO — RENDERIZAR PAINEL
// ================================

function renderizarCarrinho() {
  const container = document.getElementById("carrinhoItems");
  const footer = document.getElementById("carrinhoFooter");
  const totalEl = document.getElementById("carrinhoTotal");

  if (!container) return;

  if (carrinho.length === 0) {
    container.innerHTML = `
            <div class="carrinho-vazio">
                <div class="carrinho-vazio-icon">🛒</div>
                <p>Nenhum item adicionado ainda</p>
            </div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  container.innerHTML = carrinho
    .map(
      (item) => `
        <div class="orc-item">
            <div class="orc-item-emoji">${item.emoji}</div>
            <div class="orc-item-info">
                <div class="orc-item-nome">${item.nome}</div>
                <div class="orc-item-cat">${item.cat}</div>
            </div>
            <div class="orc-item-qty">
                <button class="orc-qty-btn" onclick="alterarQty(${item.id}, -1)" aria-label="Diminuir">−</button>
                <span>${item.qty}</span>
                <button class="orc-qty-btn" onclick="alterarQty(${item.id}, 1)" aria-label="Aumentar">+</button>
            </div>
            <button class="orc-item-remove" onclick="removerDoCarrinho(${item.id})" title="Remover">✕</button>
        </div>
    `,
    )
    .join("");

  if (totalEl) totalEl.style.display = "none";
  if (footer) footer.style.display = "block";
}

// ================================
// CARRINHO — FINALIZAR (WhatsApp)
// ================================

function finalizarOrcamento(telefone, nomeLoja) {
  if (carrinho.length === 0) {
    mostrarToast("Adicione itens ao orçamento primeiro.", "erro");
    return;
  }

  let msg = `Olá! Vim pelo site e gostaria de fazer um orçamento na ${nomeLoja}:%0A%0A`;
  msg += `*📋 Meu orçamento:*%0A`;

  carrinho.forEach((item) => {
    msg += `• ${item.emoji} ${item.nome} — Qtd: ${item.qty}%0A`;
  });

  msg += `%0AObrigado!`;

  window.open(`https://wa.me/${telefone}?text=${msg}`, "_blank");
}

// ================================
// PAINEL CARRINHO — ABRIR/FECHAR
// ================================

function abrirCarrinho() {
  document.getElementById("carrinhoPanel").classList.add("open");
  document.getElementById("carrinhoOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharCarrinho() {
  document.getElementById("carrinhoPanel").classList.remove("open");
  document.getElementById("carrinhoOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("btnCarrinho").addEventListener("click", abrirCarrinho);
document
  .getElementById("btnFecharCarrinho")
  .addEventListener("click", fecharCarrinho);
document
  .getElementById("carrinhoOverlay")
  .addEventListener("click", fecharCarrinho);

// Fechar com Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharCarrinho();
    document.getElementById("searchDropdown").classList.remove("open");
  }
});

// ================================
// BUSCA — DROPDOWN
// ================================

function renderizarDropdown(lista, pesquisa) {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return;

  if (!pesquisa || pesquisa.length < 2) {
    dropdown.classList.remove("open");
    dropdown.innerHTML = "";
    return;
  }

  if (lista.length === 0) {
    dropdown.innerHTML = `
            <div class="dd-empty">
                <div class="dd-empty-icon">🔍</div>
                <p>Nenhum produto encontrado para "<strong>${pesquisa}</strong>"</p>
            </div>`;
    dropdown.classList.add("open");
    return;
  }

  const isMobile = window.innerWidth < 768;
  const top8 = lista.slice(0, 8);

  if (isMobile) {
    const itens = top8
      .map(
        (produto) => `
          <div class="dd-item-mob" data-id="${produto.id}">
              <span class="dd-emoji-mob">${produto.emoji}</span>
              <span class="dd-name-mob">${produto.nome}</span>
          </div>
      `,
      )
      .join("");

    const verMaisHtml =
      lista.length > 8
        ? `<div class="dd-ver-mais-mob" data-pesquisa="${pesquisa}">Ver todos os ${lista.length} resultados ↓</div>`
        : "";

    dropdown.innerHTML = `
          <div class="dd-header-mob">Resultados para "${pesquisa}"</div>
          ${itens}
          ${verMaisHtml}
      `;

    dropdown.querySelectorAll(".dd-item-mob").forEach((item) => {
      item.addEventListener("click", () => {
        const id = parseInt(item.dataset.id);
        const produto = produtos.find((p) => p.id === id);
        if (!produto) return;
        searchInput.value = produto.nome;
        renderizarProdutos([produto], produto.nome);
        dropdown.classList.remove("open");
        document
          .getElementById("produtos")
          .scrollIntoView({ behavior: "smooth" });
      });
    });

    const verMaisEl = dropdown.querySelector(".dd-ver-mais-mob");
    if (verMaisEl) {
      verMaisEl.addEventListener("click", () => {
        const term = verMaisEl.dataset.pesquisa;
        renderizarProdutos(lista, term);
        dropdown.classList.remove("open");
        document
          .getElementById("produtos")
          .scrollIntoView({ behavior: "smooth" });
      });
    }
  } else {
    const itens = top8
      .map(
        (produto) => `
          <div class="dd-item" data-id="${produto.id}">
              <div class="dd-emoji">${produto.emoji}</div>
              <div class="dd-info">
                  <div class="dd-name">${produto.nome}</div>
                  <div class="dd-cat">${produto.cat}</div>
              </div>
              <button class="dd-add-btn" data-id="${produto.id}">+ Orçamento</button>
          </div>
      `,
      )
      .join("");

    const verMaisHtml =
      lista.length > 8
        ? `<div class="dd-ver-mais" data-pesquisa="${pesquisa}">Ver todos os ${lista.length} resultados ↓</div>`
        : "";

    dropdown.innerHTML = `
          <div class="dd-header">🔍 ${lista.length} resultado(s) para "${pesquisa}"</div>
          ${itens}
          ${verMaisHtml}
      `;

    dropdown.querySelectorAll(".dd-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("dd-add-btn")) return;
        const id = parseInt(item.dataset.id);
        const produto = produtos.find((p) => p.id === id);
        if (!produto) return;
        searchInput.value = produto.nome;
        renderizarProdutos([produto], produto.nome);
        dropdown.classList.remove("open");
        document
          .getElementById("produtos")
          .scrollIntoView({ behavior: "smooth" });
      });
    });

    dropdown.querySelectorAll(".dd-add-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        adicionarAoCarrinho(id);
        btn.textContent = "✓ Adicionado";
        btn.style.background = "#25D366";
        setTimeout(() => {
          btn.textContent = "+ Orçamento";
          btn.style.background = "";
        }, 2000);
      });
    });

    const verMaisEl = dropdown.querySelector(".dd-ver-mais");
    if (verMaisEl) {
      verMaisEl.addEventListener("click", () => {
        const term = verMaisEl.dataset.pesquisa;
        renderizarProdutos(lista, term);
        dropdown.classList.remove("open");
        document
          .getElementById("produtos")
          .scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  dropdown.classList.add("open");
}

// ================================
// BUSCA — INPUT
// ================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const valor = searchInput.value.trim().toLowerCase();

    const encontrados = produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(valor) ||
        p.cat.toLowerCase().includes(valor),
    );

    renderizarDropdown(encontrados, valor);

    if (valor.length >= 2) {
      renderizarProdutos(encontrados, valor);
    } else if (valor.length === 0) {
      renderizarProdutos(produtos);
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const valor = searchInput.value.trim().toLowerCase();
      const encontrados = produtos.filter(
        (p) =>
          p.nome.toLowerCase().includes(valor) ||
          p.cat.toLowerCase().includes(valor),
      );
      renderizarProdutos(encontrados, valor);
      document.getElementById("searchDropdown").classList.remove("open");
      document
        .getElementById("produtos")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ================================
// FECHAR DROPDOWN AO CLICAR FORA
// ================================

document.addEventListener("click", (e) => {
  const wrap = document.querySelector(".nav-search-wrap");
  const dropdown = document.getElementById("searchDropdown");
  if (!wrap || !dropdown) return;
  if (!wrap.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

// ================================
// NAVBAR — SCROLL EFFECT
// ================================

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (!nav) return;
  nav.classList.toggle("nav-scroll", window.scrollY > 40);
});

// ================================
// ANIMAÇÃO (IntersectionObserver)
// ================================

const observerAnim = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observerAnim.unobserve(entry.target); // FIX: parar de observar após animar
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".loja-card")
  .forEach((el) => observerAnim.observe(el));

// FIX: agora chamada dentro de renderizarProdutos()
function observarProdutos() {
  document
    .querySelectorAll(".produto-card:not(.show)")
    .forEach((el) => observerAnim.observe(el));
}

const observerQS = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("qs-visible");
        observerQS.unobserve(entry.target);
        if (entry.target.classList.contains("qs-numbers")) {
          animarContadores();
        }
      }
    });
  },
  { threshold: 0.15 },
);

function observarQS() {
  document
    .querySelectorAll(".qs-section:not(.qs-visible)")
    .forEach((el) => observerQS.observe(el));
}

// ================================
// CONTADORES ANIMADOS
// ================================

function animarContadores() {
  document.querySelectorAll(".qs-stat-num[data-target]").forEach((el) => {
    const target = parseInt(el.dataset.target);
    const duracao = 2000;
    const passos = 60;
    const incremento = target / passos;
    let atual = 0;
    let passo = 0;

    const timer = setInterval(() => {
      passo++;
      atual = Math.min(Math.round(incremento * passo), target);
      el.textContent = formatarNumero(atual, target);
      if (passo >= passos) {
        clearInterval(timer);
        el.textContent = formatarNumero(target, target);
      }
    }, duracao / passos);
  });
}

function formatarNumero(val, target) {
  if (target >= 1000) {
    return (val / 1000).toFixed(0) + "MIL";
  }
  if (target >= 10) return val + "+";
  return val.toString();
}

// ================================
// BOTÃO "VER LOJAS" — QUEM SOMOS → ORÇAMENTO
// ================================

document.addEventListener("click", (e) => {
  const verLojasBtn = e.target.closest('.qs-cta-btn[href="#orcamento"]');
  if (verLojasBtn) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");

    const quemBtn = document.querySelector('.subnav-link[href="#inicio"]');
    if (quemBtn) {
      quemBtn.textContent = "Quem Somos";
      quemBtn.setAttribute("href", "#quem-somos");
    }

    renderizarProdutos(produtos);
    setTimeout(() => {
      document
        .getElementById("orcamento")
        .scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
});

// ================================
// FOOTER LINKS — NAVEGAÇÃO
// ================================

document.addEventListener("click", (e) => {
  const footerQuemSomos = e.target.closest("#footerQuemSomos");
  if (footerQuemSomos) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.add("site-hidden");
    document.getElementById("quem-somos").classList.add("quem-somos-open");

    const quemBtn = document.querySelector('.subnav-link[href="#quem-somos"]');
    if (quemBtn) {
      quemBtn.textContent = "Início";
      quemBtn.setAttribute("href", "#inicio");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(observarQS, 100);
  }

  const footerProdutosLink = e.target.closest(
    ".footer-links-group a[data-cat]",
  );
  if (footerProdutosLink) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");

    const cat = footerProdutosLink.dataset.cat;
    if (cat) {
      const filtrados = produtos.filter((p) => p.cat === cat);
      renderizarProdutos(filtrados, cat);
    } else {
      renderizarProdutos(produtos);
    }

    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  }
});

// ================================
// INICIALIZAR
// ================================

iniciarSlideshow();
renderizarProdutos(produtos);
renderizarCarrinho();

// ================================
// SWIPE HINT — LOJAS MOBILE
// ================================

const lojasGrid = document.querySelector(".lojas-grid");
const swipeHint = document.getElementById("lojasSwipeHint");

if (lojasGrid && swipeHint) {
  lojasGrid.addEventListener(
    "scroll",
    function () {
      swipeHint.classList.add("hidden");
    },
    { passive: true },
  );

  let startX = 0;
  lojasGrid.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  lojasGrid.addEventListener(
    "touchend",
    function (e) {
      const endX = e.changedTouches[0].clientX;
      const diff = Math.abs(endX - startX);
      if (diff > 30) {
        swipeHint.classList.add("hidden");
      }
    },
    { passive: true },
  );
}

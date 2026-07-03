// =========================================================
// ATACADÃO DAS FERRAGENS — SCRIPT.JS (REFATORADO EM CLASSES)
// =========================================================
"use strict";

/* =========================================================
 * UTILS
 * ========================================================= */
class Utils {
  static escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  static formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  static formatarNumero(val, target) {
    if (target >= 1000) return (val / 1000).toFixed(0) + "MIL";
    if (target >= 10) return val + "+";
    return val.toString();
  }
}

/* =========================================================
 * REPOSITÓRIOS DE DADOS
 * ========================================================= */
class LojaRepository {
  constructor() {
    this.lojas = [
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
  }

  getAll() {
    return this.lojas;
  }

  getByTelefone(telefone) {
    return this.lojas.find((l) => l.telefone === telefone);
  }
}

class ProdutoRepository {
  constructor() {
    this.produtos = [
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
  }

  getAll() {
    return this.produtos;
  }

  getById(id) {
    return this.produtos.find((p) => p.id === id);
  }

  filterByCategoria(cat) {
    return this.produtos.filter((p) => p.cat === cat);
  }

  search(termo) {
    const alvo = termo.toLowerCase();
    return this.produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(alvo) ||
        p.cat.toLowerCase().includes(alvo),
    );
  }
}

/* =========================================================
 * TOAST
 * ========================================================= */
class ToastManager {
  constructor(elementId = "toast") {
    this.el = document.getElementById(elementId);
  }

  show(msg, tipo = "ok") {
    if (!this.el) return;
    this.el.textContent = msg;
    this.el.className = "toast show " + tipo;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.el.className = "toast";
    }, 3000);
  }
}

/* =========================================================
 * HERO SLIDESHOW
 * ========================================================= */
class HeroSlideshow {
  constructor(lojas, intervaloMs = 8000) {
    this.lojas = lojas;
    this.intervaloMs = intervaloMs;
    this.slideIndex = 0;
    this.timer = null;

    this.track = document.getElementById("heroSlidesTrack");
    this.dotsContainer = document.getElementById("heroDots");
    this.storeNameEl = document.getElementById("heroStoreName");
    this.storeNameBottomEl = document.getElementById("heroStoreNameBottom");
  }

  init() {
    if (!this.track || this.lojas.length === 0) return;

    this.track.innerHTML = this.lojas
      .map(
        (loja, i) => `
          <div class="hero-slide" data-index="${i}"
               style="background-image: url('${loja.img}')">
              <div class="hero-slide-tint"></div>
          </div>
      `,
      )
      .join("");

    if (this.dotsContainer) {
      this.dotsContainer.innerHTML = this.lojas
        .map(
          (_, i) =>
            `<span class="hero-dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`,
        )
        .join("");

      this.dotsContainer.querySelectorAll(".hero-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
          const idx = parseInt(dot.dataset.index, 10);
          this.goTo(idx);
        });
      });
    }

    this._setStoreName(this.lojas[0].nome);
    if (this.storeNameEl) this.storeNameEl.classList.add("hero-name-change");

    this.start();
  }

  _setStoreName(nome) {
    if (this.storeNameEl) this.storeNameEl.textContent = nome;
    if (this.storeNameBottomEl) this.storeNameBottomEl.textContent = nome;
  }

  goTo(idx) {
    if (!this.track) return;
    const total = this.track.children.length;
    if (idx < 0 || idx >= total) return;

    this.track.style.transform = `translateX(-${idx * 100}%)`;

    if (this.dotsContainer) {
      this.dotsContainer
        .querySelectorAll(".hero-dot")
        .forEach((d) => d.classList.remove("active"));
      const activeDot = this.dotsContainer.querySelector(
        `.hero-dot[data-index="${idx}"]`,
      );
      if (activeDot) activeDot.classList.add("active");
    }

    this.slideIndex = idx;
    this._setStoreName(this.lojas[idx].nome);

    if (this.storeNameEl) {
      this.storeNameEl.classList.remove("hero-name-change");
      void this.storeNameEl.offsetWidth; // força reflow para reiniciar animação
      this.storeNameEl.classList.add("hero-name-change");
    }
  }

  next() {
    if (!this.track) return;
    const total = this.track.children.length;
    this.goTo((this.slideIndex + 1) % total);
  }

  start() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), this.intervaloMs);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

/* =========================================================
 * CARRINHO / ORÇAMENTO
 * ========================================================= */
class Cart {
  constructor(produtoRepository, lojaRepository, toastManager) {
    this.produtoRepository = produtoRepository;
    this.lojaRepository = lojaRepository;
    this.toast = toastManager;
    this.items = [];

    this.panelEl = document.getElementById("carrinhoPanel");
    this.overlayEl = document.getElementById("carrinhoOverlay");
    this.itemsContainer = document.getElementById("carrinhoItems");
    this.footerEl = document.getElementById("carrinhoFooter");
    this.countEl = document.getElementById("carrinhoCount");
    this.countPanelEl = document.getElementById("carrinhoCountPanel");

    this._bindOpenClose();
    this._bindItemsDelegation();
  }

  _bindOpenClose() {
    const btnAbrir = document.getElementById("btnCarrinho");
    const btnFechar = document.getElementById("btnFecharCarrinho");

    if (btnAbrir) btnAbrir.addEventListener("click", () => this.open());
    if (btnFechar) btnFechar.addEventListener("click", () => this.close());
    if (this.overlayEl)
      this.overlayEl.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  // Delegação de eventos para itens/rodapé, que são recriados a cada render()
  _bindItemsDelegation() {
    if (this.itemsContainer) {
      this.itemsContainer.addEventListener("click", (e) => {
        const btnMenos = e.target.closest("[data-qty-decrease]");
        const btnMais = e.target.closest("[data-qty-increase]");
        const btnRemover = e.target.closest("[data-remove-id]");

        if (btnMenos) this.alterQty(parseInt(btnMenos.dataset.qtyDecrease, 10), -1);
        if (btnMais) this.alterQty(parseInt(btnMais.dataset.qtyIncrease, 10), 1);
        if (btnRemover) this.remove(parseInt(btnRemover.dataset.removeId, 10));
      });
    }

    if (this.footerEl) {
      this.footerEl.addEventListener("click", (e) => {
        const btnWa = e.target.closest("[data-tel]");
        const btnLimpar = e.target.closest("#btnLimparCarrinho");

        if (btnWa) this.finalizarOrcamento(btnWa.dataset.tel, btnWa.dataset.nome);
        if (btnLimpar) this.clear();
      });
    }
  }

  add(id) {
    const produto = this.produtoRepository.getById(id);
    if (!produto) return;

    const existente = this.items.find((i) => i.id === id);
    if (existente) {
      existente.qty += 1;
    } else {
      this.items.push({ ...produto, qty: 1 });
    }

    this.updateCounter();
    this.render();
    this.toast.show(`🛒 ${produto.nome} adicionado ao orçamento!`, "ok");
  }

  alterQty(id, delta) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.remove(id);
      return;
    }

    this.updateCounter();
    this.render();
  }

  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.updateCounter();
    this.render();
  }

  clear() {
    this.items = [];
    this.updateCounter();
    this.render();
    this.toast.show("🗑 Orçamento limpo.", "info");
  }

  updateCounter() {
    const total = this.items.reduce((acc, i) => acc + i.qty, 0);
    if (this.countEl) this.countEl.textContent = total;
    if (this.countPanelEl) {
      this.countPanelEl.textContent = `${total} ${total === 1 ? "item" : "itens"}`;
    }
  }

  render() {
    if (!this.itemsContainer) return;

    if (this.items.length === 0) {
      this.itemsContainer.innerHTML = `
          <div class="carrinho-vazio">
              <div class="carrinho-vazio-icon">🛒</div>
              <p>Nenhum item adicionado ainda</p>
          </div>`;
      if (this.footerEl) this.footerEl.style.display = "none";
      return;
    }

    this.itemsContainer.innerHTML = this.items
      .map((item) => {
        const nomeSafe = Utils.escapeHtml(item.nome);
        const catSafe = Utils.escapeHtml(item.cat);
        return `
          <div class="orc-item">
              <div class="orc-item-emoji">${item.emoji}</div>
              <div class="orc-item-info">
                  <div class="orc-item-nome">${nomeSafe}</div>
                  <div class="orc-item-cat">${catSafe}</div>
              </div>
              <div class="orc-item-qty">
                  <button class="orc-qty-btn" data-qty-decrease="${item.id}" aria-label="Diminuir" type="button">−</button>
                  <span>${item.qty}</span>
                  <button class="orc-qty-btn" data-qty-increase="${item.id}" aria-label="Aumentar" type="button">+</button>
              </div>
              <button class="orc-item-remove" data-remove-id="${item.id}" title="Remover" type="button">✕</button>
          </div>
      `;
      })
      .join("");

    if (this.footerEl) {
      this.footerEl.style.display = "block";
      this.footerEl.innerHTML = `
        <div class="carrinho-obs">Escolha a loja para enviar seu orçamento pelo WhatsApp</div>
        <div class="carrinho-wa-btns">
          ${this.lojaRepository
          .getAll()
          .map(
            (loja) => `
            <button class="carrinho-wa-btn" type="button" data-tel="${loja.telefone}" data-nome="${Utils.escapeHtml(loja.nome)}">
              💬 ${Utils.escapeHtml(loja.nome)}
            </button>
          `,
          )
          .join("")}
        </div>
        <button class="carrinho-limpar" type="button" id="btnLimparCarrinho">🗑 Limpar orçamento</button>
      `;
    }
  }

  open() {
    if (this.panelEl) this.panelEl.classList.add("open");
    if (this.overlayEl) this.overlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  close() {
    if (this.panelEl) this.panelEl.classList.remove("open");
    if (this.overlayEl) this.overlayEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  finalizarOrcamento(telefone, nomeLoja) {
    if (this.items.length === 0) {
      this.toast.show("Adicione itens ao orçamento primeiro.", "erro");
      return;
    }

    let msg = `Olá! Vim pelo site e gostaria de fazer um orçamento na ${nomeLoja}:%0A%0A`;
    msg += `*📋 Meu orçamento:*%0A`;

    this.items.forEach((item) => {
      msg += `• ${item.emoji} ${item.nome} — Qtd: ${item.qty}%0A`;
    });

    msg += `%0AObrigado!`;

    window.open(`https://wa.me/${telefone}?text=${msg}`, "_blank", "noopener");
  }
}

/* =========================================================
 * CATÁLOGO DE PRODUTOS (grid + observers de animação)
 * ========================================================= */
class ProductCatalog {
  constructor(produtoRepository, cart) {
    this.produtoRepository = produtoRepository;
    this.cart = cart;

    this.grid = document.getElementById("grid");
    this.titulo = document.getElementById("pageTitle");
    this.subtitulo = document.getElementById("pageSubtitle");
    this.produtosSection = document.getElementById("produtos");

    this.observerAnim = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            this.observerAnim.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    this._bindGridDelegation();
  }

  _bindGridDelegation() {
    if (!this.grid) return;

    this.grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".produto-btn");
      if (btn) {
        const id = parseInt(btn.dataset.id, 10);
        this.cart.add(id);

        btn.classList.add("adicionado");
        btn.textContent = "✓ Adicionado!";
        setTimeout(() => {
          btn.classList.remove("adicionado");
          btn.textContent = "Fazer orçamento";
        }, 2000);

        this.cart.open();
        return;
      }

      const card = e.target.closest(".produto-card");
      if (card && card.dataset.tipo) {
        this.render(this.produtoRepository.filterByCategoria("Vergalhão de aço"), "Vergalhão de aço");
        this.scrollToGrid();
      }
    });
  }

  scrollToGrid() {
    if (this.produtosSection) {
      this.produtosSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  render(lista, pesquisa = "") {
    if (!this.grid) return;

    if (this.titulo) {
      this.titulo.innerHTML = pesquisa
        ? `Resultados para <span>"${Utils.escapeHtml(pesquisa)}"</span>`
        : `Produtos em <span>Destaque</span>`;
    }
    if (this.subtitulo) {
      this.subtitulo.textContent = pesquisa
        ? `${lista.length} produto(s) encontrado(s)`
        : "Confira os produtos disponíveis";
    }

    if (lista.length === 0) {
      const pesquisaSafe = Utils.escapeHtml(pesquisa);
      this.grid.innerHTML = `
              <div class="sem-resultado">
                  <div class="sem-resultado-icon">🔍</div>
                  <h3>Nenhum produto encontrado</h3>
                  <p>Não encontramos "<strong>${pesquisaSafe}</strong>" no nosso catálogo.<br>
                  Tente outro termo ou entre em contato pelo WhatsApp!</p>
                  <a href="https://wa.me/5521978554136?text=Olá!%20Procurei%20por%20${encodeURIComponent(pesquisa)}%20no%20site%20e%20não%20encontrei.%20Vocês%20têm?"
                     target="_blank" rel="noopener" class="sem-resultado-btn">
                      💬 Perguntar no WhatsApp
                  </a>
              </div>`;
      return;
    }

    this.grid.innerHTML = lista
      .map((produto) => {
        const nomeSafe = Utils.escapeHtml(produto.nome);
        const tipoSafe = produto.tipo ? Utils.escapeHtml(produto.tipo) : "";
        return `
          <div class="produto-card"${produto.tipo ? ` data-tipo="${tipoSafe}"` : ""}>
              <div class="produto-top">
                  <div class="produto-img">
                      ${produto.img
            ? `<div class="produto-img-wrap"><img src="${produto.img}" alt="${nomeSafe}" loading="lazy"></div>`
            : `<span class="produto-emoji">${produto.emoji}</span>`
          }
                      ${produto.tipo ? `<div class="produto-hover-tipo">${tipoSafe}</div>` : ""}
                  </div>
                  ${produto.promo
            ? `<span class="produto-badge promo">🔥 Promoção</span>`
            : `<span class="produto-badge estoque">✓ Em estoque</span>`
          }
              </div>
              <div class="produto-body">
                  <span class="produto-cat">${Utils.escapeHtml(produto.cat)}</span>
                  <h3 class="produto-nome">${nomeSafe}</h3>
                  <button class="produto-btn" data-id="${produto.id}" type="button">
                      Fazer orçamento
                  </button>
              </div>
          </div>
      `;
      })
      .join("");

    this.observeCards();
  }

  observeCards() {
    if (!this.grid) return;
    this.grid
      .querySelectorAll(".produto-card:not(.show)")
      .forEach((el) => this.observerAnim.observe(el));
  }

  observeLojaCards() {
    document
      .querySelectorAll(".loja-card")
      .forEach((el) => this.observerAnim.observe(el));
  }
}

/* =========================================================
 * BUSCA (input + dropdown)
 * ========================================================= */
class SearchManager {
  constructor(produtoRepository, productCatalog, cart) {
    this.produtoRepository = produtoRepository;
    this.productCatalog = productCatalog;
    this.cart = cart;

    this.input = document.getElementById("searchInput");
    this.dropdown = document.getElementById("searchDropdown");
    this.searchWrap = document.querySelector(".nav-search-wrap");

    this._bindInput();
    this._bindDropdownDelegation();
    this._bindOutsideClick();
  }

  _bindInput() {
    if (!this.input) return;

    this.input.addEventListener("input", () => {
      const valor = this.input.value.trim().toLowerCase();
      const encontrados = this.produtoRepository.search(valor);

      this.renderDropdown(encontrados, valor);

      if (valor.length >= 2) {
        this.productCatalog.render(encontrados, valor);
      } else if (valor.length === 0) {
        this.productCatalog.render(this.produtoRepository.getAll());
      }
    });

    this.input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const valor = this.input.value.trim().toLowerCase();
      const encontrados = this.produtoRepository.search(valor);

      this.productCatalog.render(encontrados, valor);
      if (this.dropdown) this.dropdown.classList.remove("open");
      this.productCatalog.scrollToGrid();
    });
  }

  _bindDropdownDelegation() {
    if (!this.dropdown) return;

    this.dropdown.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".dd-add-btn");
      if (addBtn) {
        e.stopPropagation();
        const id = parseInt(addBtn.dataset.id, 10);
        this.cart.add(id);
        addBtn.textContent = "✓ Adicionado";
        addBtn.style.background = "#25D366";
        setTimeout(() => {
          addBtn.textContent = "+ Orçamento";
          addBtn.style.background = "";
        }, 2000);
        return;
      }

      const verMais = e.target.closest(".dd-ver-mais");
      if (verMais) {
        const pesquisa = verMais.dataset.pesquisa;
        const encontrados = this.produtoRepository.search(pesquisa);
        this.productCatalog.render(encontrados, pesquisa);
        this.dropdown.classList.remove("open");
        this.productCatalog.scrollToGrid();
        return;
      }

      const item = e.target.closest(".dd-item");
      if (item) {
        const id = parseInt(item.dataset.id, 10);
        const produto = this.produtoRepository.getById(id);
        if (!produto) return;
        if (this.input) this.input.value = produto.nome;
        this.productCatalog.render([produto], produto.nome);
        this.dropdown.classList.remove("open");
        this.productCatalog.scrollToGrid();
      }
    });
  }

  _bindOutsideClick() {
    document.addEventListener("click", (e) => {
      if (!this.searchWrap || !this.dropdown) return;
      if (!this.searchWrap.contains(e.target)) {
        this.dropdown.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.dropdown) {
        this.dropdown.classList.remove("open");
      }
    });
  }

  renderDropdown(lista, pesquisa) {
    if (!this.dropdown) return;

    if (!pesquisa || pesquisa.length < 2) {
      this.dropdown.classList.remove("open");
      this.dropdown.innerHTML = "";
      return;
    }

    if (lista.length === 0) {
      this.dropdown.innerHTML = `
              <div class="dd-empty">
                  <div class="dd-empty-icon">🔍</div>
                  <p>Nenhum produto encontrado para "<strong>${Utils.escapeHtml(pesquisa)}</strong>"</p>
              </div>`;
      this.dropdown.classList.add("open");
      return;
    }

    const top8 = lista.slice(0, 8);
    const pesquisaSafe = Utils.escapeHtml(pesquisa);

    const itens = top8
      .map(
        (produto) => `
            <div class="dd-item" data-id="${produto.id}">
                <div class="dd-emoji">${produto.emoji}</div>
                <div class="dd-info">
                    <div class="dd-name">${Utils.escapeHtml(produto.nome)}</div>
                    <div class="dd-cat">${Utils.escapeHtml(produto.cat)}</div>
                </div>
                <button class="dd-add-btn" data-id="${produto.id}" type="button">+ Orçamento</button>
            </div>
        `,
      )
      .join("");

    const verMaisHtml =
      lista.length > 8
        ? `<div class="dd-ver-mais" data-pesquisa="${pesquisaSafe}">Ver todos os ${lista.length} resultados ↓</div>`
        : "";

    this.dropdown.innerHTML = `
            <div class="dd-header">🔍 ${lista.length} resultado(s) para "${pesquisaSafe}"</div>
            ${itens}
            ${verMaisHtml}
        `;

    this.dropdown.classList.add("open");
  }
}

/* =========================================================
 * NAVEGAÇÃO (sub-nav, hamburguer mobile, footer, seção "quem somos")
 * ========================================================= */
class NavigationManager {
  constructor(produtoRepository, productCatalog) {
    this.produtoRepository = produtoRepository;
    this.productCatalog = productCatalog;

    this.quemSomosEl = document.getElementById("quem-somos");
    this.siteContentEl = document.getElementById("site-content");
    this.subnavToggle = document.getElementById("subnavToggle");
    this.subnavInner = document.getElementById("subnavInner");

    this._bindSubnavClicks();
    this._bindMobileHamburger();
    this._bindCtaVerLojas();
    this._bindFooterLinks();
    this._bindNavbarScroll();
  }

  fecharSubnavMobile() {
    if (this.subnavToggle) this.subnavToggle.classList.remove("active");
    if (this.subnavInner) this.subnavInner.classList.remove("open");
  }

  mostrarCatalogo() {
    if (this.quemSomosEl) this.quemSomosEl.classList.remove("quem-somos-open");
    if (this.siteContentEl) this.siteContentEl.classList.remove("site-hidden");
  }

  mostrarQuemSomos() {
    if (this.siteContentEl) this.siteContentEl.classList.add("site-hidden");
    if (this.quemSomosEl) this.quemSomosEl.classList.add("quem-somos-open");
  }

  _bindSubnavClicks() {
    document.addEventListener("click", (e) => {
      const catLink = e.target.closest(".subnav-link[data-cat]");
      const homeLink = e.target.closest('.subnav-link[href="#quem-somos"]');
      const outrasLink = e.target.closest("#linkOutrasCategorias");

      document
        .querySelectorAll(".subnav-link")
        .forEach((l) => l.classList.remove("active"));

      if (catLink) {
        e.preventDefault();
        this.mostrarCatalogo();

        const quemBtn = document.querySelector('.subnav-link[href="#inicio"]');
        if (quemBtn) {
          quemBtn.textContent = "Quem Somos";
          quemBtn.setAttribute("href", "#quem-somos");
        }

        const cat = catLink.dataset.cat;
        catLink.classList.add("active");

        this.productCatalog.render(this.produtoRepository.filterByCategoria(cat), cat);
        this.productCatalog.scrollToGrid();
        this.fecharSubnavMobile();
        return;
      }

      if (outrasLink) {
        e.preventDefault();
        this.mostrarCatalogo();
        outrasLink.classList.add("active");
        this.productCatalog.render(this.produtoRepository.getAll());
        this.productCatalog.scrollToGrid();
        this.fecharSubnavMobile();
        return;
      }

      if (homeLink) {
        e.preventDefault();
        homeLink.classList.add("active");
        this.mostrarQuemSomos();
        homeLink.textContent = "Início";
        homeLink.setAttribute("href", "#inicio");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => this.onShowQuemSomos && this.onShowQuemSomos(), 100);
        this.fecharSubnavMobile();
        return;
      }

      const backLink = e.target.closest('.subnav-link[href="#inicio"]');
      if (backLink && this.quemSomosEl && this.quemSomosEl.classList.contains("quem-somos-open")) {
        e.preventDefault();
        backLink.classList.add("active");
        this.mostrarCatalogo();
        backLink.textContent = "Quem Somos";
        backLink.setAttribute("href", "#quem-somos");
        this.productCatalog.render(this.produtoRepository.getAll());
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.fecharSubnavMobile();
      }
    });
  }

  _bindMobileHamburger() {
    if (!this.subnavToggle || !this.subnavInner) return;

    this.subnavToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.subnavToggle.classList.toggle("active");
      this.subnavInner.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (
        !this.subnavInner.contains(e.target) &&
        !this.subnavToggle.contains(e.target)
      ) {
        this.fecharSubnavMobile();
      }
    });
  }

  _bindCtaVerLojas() {
    document.addEventListener("click", (e) => {
      const verLojasBtn = e.target.closest('.qs-cta-btn[href="#orcamento"]');
      if (!verLojasBtn) return;

      e.preventDefault();
      this.mostrarCatalogo();

      const quemBtn = document.querySelector('.subnav-link[href="#inicio"]');
      if (quemBtn) {
        quemBtn.textContent = "Quem Somos";
        quemBtn.setAttribute("href", "#quem-somos");
      }

      this.productCatalog.render(this.produtoRepository.getAll());
      setTimeout(() => {
        const orcamento = document.getElementById("orcamento");
        if (orcamento) orcamento.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }

  _bindFooterLinks() {
    document.addEventListener("click", (e) => {
      const footerQuemSomos = e.target.closest("#footerQuemSomos");
      if (footerQuemSomos) {
        e.preventDefault();
        this.mostrarQuemSomos();

        const quemBtn = document.querySelector('.subnav-link[href="#quem-somos"]');
        if (quemBtn) {
          quemBtn.textContent = "Início";
          quemBtn.setAttribute("href", "#inicio");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => this.onShowQuemSomos && this.onShowQuemSomos(), 100);
        return;
      }

      const footerProdutosLink = e.target.closest(".footer-links-group a[data-cat]");
      if (footerProdutosLink) {
        e.preventDefault();
        this.mostrarCatalogo();

        const cat = footerProdutosLink.dataset.cat;
        const lista = cat
          ? this.produtoRepository.filterByCategoria(cat)
          : this.produtoRepository.getAll();

        this.productCatalog.render(lista, cat || "");
        this.productCatalog.scrollToGrid();
      }
    });
  }

  _bindNavbarScroll() {
    window.addEventListener("scroll", () => {
      const nav = document.querySelector("nav");
      if (!nav) return;
      nav.classList.toggle("nav-scroll", window.scrollY > 40);
    });
  }
}

/* =========================================================
 * ANIMAÇÕES DA SEÇÃO "QUEM SOMOS" (observers + contadores)
 * ========================================================= */
class QuemSomosAnimations {
  constructor() {
    this.observerQS = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("qs-visible");
            this.observerQS.unobserve(entry.target);
            if (entry.target.classList.contains("qs-numbers")) {
              this.animarContadores();
            }
          }
        });
      },
      { threshold: 0.15 },
    );
  }

  observar() {
    document
      .querySelectorAll(".qs-section:not(.qs-visible)")
      .forEach((el) => this.observerQS.observe(el));
  }

  animarContadores() {
    document.querySelectorAll(".qs-stat-num[data-target]").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const duracao = 2000;
      const passos = 60;
      const incremento = target / passos;
      let atual = 0;
      let passo = 0;

      const timer = setInterval(() => {
        passo++;
        atual = Math.min(Math.round(incremento * passo), target);
        el.textContent = Utils.formatarNumero(atual, target);
        if (passo >= passos) {
          clearInterval(timer);
          el.textContent = Utils.formatarNumero(target, target);
        }
      }, duracao / passos);
    });
  }
}

/* =========================================================
 * SWIPE HINT (lojas mobile)
 * ========================================================= */
class SwipeHint {
  constructor() {
    this.lojasGrid = document.querySelector(".lojas-grid");
    this.swipeHint = document.getElementById("lojasSwipeHint");
    this.startX = 0;
  }

  init() {
    if (!this.lojasGrid || !this.swipeHint) return;

    this.lojasGrid.addEventListener(
      "scroll",
      () => this.swipeHint.classList.add("hidden"),
      { passive: true },
    );

    this.lojasGrid.addEventListener(
      "touchstart",
      (e) => {
        this.startX = e.touches[0].clientX;
      },
      { passive: true },
    );

    this.lojasGrid.addEventListener(
      "touchend",
      (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = Math.abs(endX - this.startX);
        if (diff > 30) this.swipeHint.classList.add("hidden");
      },
      { passive: true },
    );
  }
}

/* =========================================================
 * APP — orquestra a inicialização de todos os módulos
 * ========================================================= */
class App {
  constructor() {
    this.lojaRepository = new LojaRepository();
    this.produtoRepository = new ProdutoRepository();
    this.toast = new ToastManager();

    this.hero = new HeroSlideshow(this.lojaRepository.getAll());
    this.cart = new Cart(this.produtoRepository, this.lojaRepository, this.toast);
    this.catalog = new ProductCatalog(this.produtoRepository, this.cart);
    this.search = new SearchManager(this.produtoRepository, this.catalog, this.cart);
    this.navigation = new NavigationManager(this.produtoRepository, this.catalog);
    this.quemSomosAnimations = new QuemSomosAnimations();
    this.swipeHint = new SwipeHint();

    // liga o observer da seção "quem somos" ao clique de navegação
    this.navigation.onShowQuemSomos = () => this.quemSomosAnimations.observar();
  }

  init() {
    this.hero.init();
    this.catalog.observeLojaCards();
    this.catalog.render(this.produtoRepository.getAll());
    this.cart.render();
    this.swipeHint.init();
  }
}

/* =========================================================
 * INICIALIZAÇÃO
 * ========================================================= */

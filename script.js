// =========================================================
// ATACADÃO DAS FERRAGENS — SCRIPT.JS (CORRIGIDO)
// =========================================================

// ================================
// DADOS DAS LOJAS
// ================================

const lojas = [
  {
    id: "vilarosario",
    nome: "Loja Vila Rosário",
    numero: 1,
    img: "./icons/Logo/vila rosario.png",
    telefone: "5521978554136",
    telefoneDisplay: "(21) 97855-4136",
    cidade: "Duque de Caxias • RJ",
    endereco: "Av. Governador Leonel de Moura Brizola lote 05 quadra 19 - Vila Rosário",
    horario: "Seg à Sex • 08h às 17h",
    insta: "@atacadao_vilarosario",
    instaUrl: "https://www.instagram.com/kennedy_atacadao/",
    mapUrl: "https://maps.app.goo.gl/bH5g82B458vtJwnLA",
    waMsg: "Olá! Vim pelo site e gostaria de fazer um orçamento na Loja Vila Rosário.",
  },
  {
    id: "pantanal",
    nome: "Loja Pantanal",
    numero: 2,
    img: "./icons/Logo/pantanal.png",
    telefone: "5521978558730",
    telefoneDisplay: "(21) 97855-8730",
    cidade: "Duque de Caxias • RJ",
    endereco: "Rua Lauro Sodré lote 15 quadra 49 - Pantanal",
    horario: "Seg à Sex • 08h às 17h",
    insta: "@atacadao_pantanal",
    instaUrl: "https://instagram.com/atacadao_pantanal",
    mapUrl: "https://www.google.com/maps/place/Atacad%C3%A3o+das+Ferragens+Pantanal/@-22.7450911,-43.3166819,3a,75y,350.7h,83.57t/data=!3m7!1e1!3m5!1sGhSMOiuL4ISdYNM0v7sbtw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D6.428828232655988%26panoid%3DGhSMOiuL4ISdYNM0v7sbtw%26yaw%3D350.6959582670346!7i16384!8i8192!4m15!1m8!3m7!1s0x99703d89e1e3f1:0x5a0251cb8ccc3af4!2sR.+Lauro+Sodr%C3%A9+-+Campos+Eliseos,+Duque+de+Caxias+-+RJ,+25265-008!3b1!8m2!3d-22.7454978!4d-43.3170937!16s%2Fg%2F1ymvt7x3_!3m5!1s0x997046672ac77d:0xf3e31fa88a34644a!8m2!3d-22.745034!4d-43.3167563!16s%2Fg%2F11b6hpk3kj?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
    waMsg: "Olá! Vim pelo site e gostaria de fazer um orçamento na Loja Pantanal.",
  },
  {
    id: "lote15",
    nome: "Loja Lote XV",
    numero: 3,
    img: "./icons/Logo/Lote 15.png",
    telefone: "5521959012101",
    telefoneDisplay: "(21) 95901-2101",
    cidade: "Belford Roxo • RJ",
    endereco: "Av. Governador Leonel de Moura Brizola - Apolo XI",
    horario: "Seg à Sex • 08h às 17h",
    insta: "@atacadao_lote15",
    instaUrl: "https://www.instagram.com/lotexv_atacadao/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Governador+Leonel+de+Moura+Brizola+Apolo+XI+Belford+Roxo+RJ",
    waMsg: "Olá! Vim pelo site e gostaria de fazer um orçamento na Loja Lote 15.",
  },
  {
    id: "parqueamorim",
    nome: "Loja Parque Amorim",
    numero: 4,
    img: "./icons/Logo/amorim.png",
    telefone: "5521988731134",
    telefoneDisplay: "(21) 98873-1134",
    cidade: "Belford Roxo • RJ",
    endereco: "Estrada Manoel de Sá lote 01 quadra A - Parque Amorim",
    horario: "Seg à Sex • 08h às 17h",
    insta: "@atacadao_parqueamorim",
    instaUrl: "https://www.instagram.com/amorim_atacadao/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Estrada+Manoel+de+Sá+Parque+Amorim+Belford+Roxo+RJ",
    waMsg: "Olá! Vim pelo site e gostaria de fazer um orçamento na Loja Parque Amorim.",
  },
];

// ================================
// UTILITÁRIO — Escapar HTML (fix XSS / quebra de template)
// ================================

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeCssUrl(str) {
  if (!str) return "";
  return String(str).replace(/['"()]/g, "\\$&").replace(/\s+/g, "%20");
}

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
             style="background-image: url('${escapeCssUrl(loja.img)}')">
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
      const idx = parseInt(dot.dataset.index, 10);
      irParaSlide(idx);
    });
  });

  // mostra nome da primeira loja
  const storeNameBottom = document.getElementById("heroStoreNameBottom");
  storeNameEl.textContent = lojas[0].nome;
  if (storeNameBottom) storeNameBottom.textContent = lojas[0].nome;
  storeNameEl.classList.add("hero-name-change");

  // FIX: evitar múltiplos timers acumulados se iniciarSlideshow for chamada mais de uma vez
  if (slideTimer) clearInterval(slideTimer);
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
  if (dots[idx]) dots[idx].classList.add("active");
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
// HANDLER ÚNICO DE CLIQUE NO DOCUMENT
// ================================

document.addEventListener("click", (e) => {

  // ─── 1. Subnav: fechar menu mobile ao clicar fora ───
  if (subnavToggle && subnavInner) {
    if (!subnavInner.contains(e.target) && !subnavToggle.contains(e.target)) {
      fecharSubnavMobile();
    }
  }

  // ─── 2. Fechar dropdown de busca ao clicar fora ───
  const wrap = document.querySelector(".nav-search-wrap");
  const dropdown = document.getElementById("searchDropdown");
  if (wrap && dropdown && !wrap.contains(e.target)) {
    dropdown.classList.remove("open");
  }

  // ─── 3. Subnav: categorias, "Outras Categorias" e "Quem Somos" ───
  const catLink = e.target.closest(".subnav-link[data-cat]");
  const homeLink = e.target.closest('.subnav-link[href="#quem-somos"]');
  const outrasLink = e.target.closest("#linkOutrasCategorias");
  const backLink = e.target.closest('.subnav-link[href="#inicio"]');

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

    catLink.classList.add("active");

    const cat = catLink.dataset.cat;

    if (cat === "Serralheria") {
      navStack.push("grid");
      renderizarTiposSerralheria();
      catLink.classList.add("active");
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
      fecharSubnavMobile();
      return;
    }

    navStack.push("grid");
    const filtrados = produtos.filter((p) => p.cat === cat);
    renderizarProdutos(filtrados, cat);
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    fecharSubnavMobile();
    return;
  }

  if (outrasLink) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");
    outrasLink.classList.add("active");
    abrirSeletorCategorias();
    fecharSubnavMobile();
    return;
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
    renderizarGradeCategorias();
    window.scrollTo({ top: 0, behavior: "smooth" });
    fecharSubnavMobile();
    return;
  }

  // ─── 4. CTA "Ver lojas" na página Quem Somos ───
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

    renderizarGradeCategorias();
    setTimeout(() => {
      document
        .getElementById("orcamento")
        .scrollIntoView({ behavior: "smooth" });
    }, 100);
    return;
  }

  // ─── 5. Footer: "Quem Somos" ───
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
    return;
  }

  // ─── 6. Footer: links de categorias ───
  const footerProdutosLink = e.target.closest(
    ".footer-links-group a[data-cat]",
  );
  if (footerProdutosLink) {
    e.preventDefault();
    document.getElementById("quem-somos").classList.remove("quem-somos-open");
    document.getElementById("site-content").classList.remove("site-hidden");

    const cat = footerProdutosLink.dataset.cat;
    if (cat) {
      renderizarProdutos(produtos.filter((p) => p.cat === cat), cat);
    } else {
      renderizarGradeCategorias();
    }

    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    return;
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
    img: "./Coluna Pronta/Coluna pronta 1.webp",
  },
  {
    id: 2,
    nome: "Coluna Pronta 8mm (5/16) 7x27 6 metros",
    cat: "Coluna Pronta",
    img: "./Coluna Pronta/Coluna Pronta 2.webp",
  },
  {
    id: 3,
    nome: "Coluna 10mm (3/8) 7x20 6 metros",
    cat: "Coluna Pronta",
    img: "./Coluna Pronta/Coluna Pronta 3.webp",
  },
  {
    id: 4,
    nome: "Coluna 10mm (3/8) 7x27 6 metros",
    cat: "Coluna Pronta",
    img: "./Coluna Pronta/Coluna Pronta 4.webp",
  },
  {
    id: 5,
    nome: "Coluna Pronta 6,3mm (1/4) 7x20 6 metros",
    cat: "Coluna Pronta",
    img: "./Coluna Pronta/Coluna Pronta 5.webp",
  },
  {
    id: 6,
    nome: "Vergalhão CA 60 5mm 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhao CA60 1.webp",
    tipo: "CA 60",
  },
  {
    id: 7,
    nome: "Vergalhão CA 60 4,2mm (3/16) 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhão CA60 2.webp",
    tipo: "CA 60",
  },
  {
    id: 8,
    nome: "Vergalhão CA 50 6,3mm (1/4) 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhão CA50 3.webp",
    tipo: "CA 50",
  },
  {
    id: 9,
    nome: "Vergalhão CA 50 8mm (5/16) 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhão CA50 4.webp",
    tipo: "CA 50",
  },
  {
    id: 10,
    nome: "Vergalhão CA 50 10mm (3/8) 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhão CA50 5.webp",
    tipo: "CA 50",
  },
  {
    id: 11,
    nome: "Vergalhão CA 50 12,5mm (1/2) 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhão CA50 7.webp",
    tipo: "CA 50",
  },
  {
    id: 12,
    nome: "Vergalhão CA 50 16mm (5/8) 12m",
    cat: "Vergalhão de aço",
    img: "./Vergalhão de Aço/Vergalhão CA 6.webp",
    tipo: "CA 50",
  },
  {
    id: 13,
    nome: "Arame Recozido 12 (2mm)",
    cat: "Arame",
    img: "./Arame/Arame Recozido 12.png",
  },
  {
    id: 14,
    nome: "Arame Recozido 18 (1,20mm)",
    cat: "Arame",
    img: "./Arame/Arame Recozido 18.png",
  },
  {
    id: 15,
    nome: "Radier Treliça 14 (6,3mm) Malha 60x60",
    cat: "Radier",
    img: "./radier/Radier - 14 6.3 mm 60x60.webp",
    tipo: "Treliça 14",
  },
  {
    id: 16,
    nome: "Radier Treliça 14 (6,3mm) Malha 80x80",
    cat: "Radier",
    img: "./radier/Radier - 14 6.3 mm 80x80.webp",
    tipo: "Treliça 14",
  },
  {
    id: 17,
    nome: "Radier Treliça 38 Malha 60x60",
    cat: "Radier",
    img: "./radier/Radier - 38 60x60.webp",
    tipo: "Treliça 38",
  },
  {
    id: 18,
    nome: "Radier Treliça 38 Malha 80x80",
    cat: "Radier",
    img: "./radier/Radier - 38 80x80.webp",
    tipo: "Treliça 38",
  },
  {
    id: 19,
    nome: "Radier Treliça 38 Malha 100x100",
    cat: "Radier",
    img: "./radier/Radier - 38 100x100.webp",
    tipo: "Treliça 38",
  },
  {
    id: 20,
    nome: "Radier 8mm (5/16) Malha 60x60",
    cat: "Radier",
    img: "./radier/Radier - 8mm (516) 60x60.webp",
    tipo: "8mm (5/16)",
  },
  {
    id: 21,
    nome: "Radier 8mm (5/16) Malha 80x80",
    cat: "Radier",
    img: "./radier/Radier - 8mm (516) 80x80.webp",
    tipo: "8mm (5/16)",
  },
  {
    id: 22,
    nome: "Radier 8mm (5/16) Malha 1,00 x 1,00",
    cat: "Radier",
    img: "./radier/Radier - 8mm (516) 1,00 x 1,00.webp",
    tipo: "8mm (5/16)",
  },
  {
    id: 23,
    nome: "Barra Chata 1 x 1/4",
    cat: "Serralheria",
    img: "./serralheria/Barra chata/Barra Chata 1 x 14.webp",
    tipo: "Barra Chata",
  },
  {
    id: 24,
    nome: "Barra Chata 1 x 3/16",
    cat: "Serralheria",
    img: "./serralheria/Barra chata/Barra Chata 1 x 316.webp",
    tipo: "Barra Chata",
  },
  {
    id: 25,
    nome: "Barra Chata 2 x 3/16",
    cat: "Serralheria",
    img: "./serralheria/Barra chata/Barra Chata 2 x 316.webp",
    tipo: "Barra Chata",
  },
  {
    id: 26,
    nome: "Barra Chata 3/4 x 3/16",
    cat: "Serralheria",
    img: "./serralheria/Barra chata/Barra Chata 34 x 316.webp",
    tipo: "Barra Chata",
  },
  {
    id: 27,
    nome: "Barra Quadrada 1/2",
    cat: "Serralheria",
    img: "./serralheria/Barra Quadrada/Barra Quadrada 1  2.webp",
    tipo: "Barra Quadrada",
  },
  {
    id: 28,
    nome: "Barra Redonda 12mm",
    cat: "Serralheria",
    img: "./serralheria/Barra Redonda/Barra Redonda 12mm.webp",
    tipo: "Barra Redonda",
  },
  {
    id: 29,
    nome: "Barra Redonda 3/8''",
    cat: "Serralheria",
    img: "./serralheria/Barra Redonda/Barra Redonda 3 8''.webp",
    tipo: "Barra Redonda",
  },
  {
    id: 30,
    nome: "Barra Redonda 5/8''",
    cat: "Serralheria",
    img: "./serralheria/Barra Redonda/Barra Redonda 5 8''.webp",
    tipo: "Barra Redonda",
  },
  {
    id: 31,
    nome: "Cantoneira 1 x 1/8",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 1 x 1 8.webp",
    tipo: "Cantoneira",
  },
  {
    id: 32,
    nome: "Cantoneira 1.1/2 x 1/8",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 1.1 2 x 1 8.webp",
    tipo: "Cantoneira",
  },
  {
    id: 33,
    nome: "Cantoneira 1.1/2 x 3/16",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 1.1 2 x 3 16.webp",
    tipo: "Cantoneira",
  },
  {
    id: 34,
    nome: "Cantoneira 1.1/4 x 1/8",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 1.1 4 x 1 8.webp",
    tipo: "Cantoneira",
  },
  {
    id: 35,
    nome: "Cantoneira 2 x 1/4",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 2 x 1 4.webp",
    tipo: "Cantoneira",
  },
  {
    id: 36,
    nome: "Cantoneira 2 x 1/8",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 2 x 1 8.webp",
    tipo: "Cantoneira",
  },
  {
    id: 37,
    nome: "Cantoneira 2 x 3/16",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 2 x 3 16.webp",
    tipo: "Cantoneira",
  },
  {
    id: 38,
    nome: "Cantoneira 3/4 x 1/8",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 3 4 x 1 8.webp",
    tipo: "Cantoneira",
  },
  {
    id: 39,
    nome: "Cantoneira 7/8 x 1/8",
    cat: "Serralheria",
    img: "./serralheria/cantoneira/Cantoneira 7 8 x 1 8.webp",
    tipo: "Cantoneira",
  },
  {
    id: 40,
    nome: "Eletrodo para solda 2,5mm - VONDER - 1kg",
    cat: "Serralheria",
    img: "./serralheria/eletrodos/Eletrodo para solda 2,5mm - VONDER - 1kg.webp",
    tipo: "Eletrodo",
  },
  {
    id: 41,
    nome: "Eletrodo para solda 3,25mm - VONDER - 1kg",
    cat: "Serralheria",
    img: "./serralheria/eletrodos/Eletrodo para solda 3,25mm - VONDER - 1kg.webp",
    tipo: "Eletrodo",
  },
  {
    id: 42,
    nome: "Eletrodo para solda 4,0mm - VONDER - 1kg",
    cat: "Serralheria",
    img: "./serralheria/eletrodos/Eletrodo para solda 4,0mm - VONDER - 1kg.webp",
    tipo: "Eletrodo",
  },
];

// ================================
// ESTADO DO CARRINHO
// ================================

let carrinho = [];

// ================================
// ESTADO DE NAVEGAÇÃO
// ================================

let navStack = [];

// ================================
// UTILITÁRIOS
// ================================

function mostrarToast(msg, tipo = "ok") {
  const toast = document.getElementById("toast");
  if (!toast) return;
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
      ? `Resultados para <span>"${escapeHtml(pesquisa)}"</span>`
      : `Produtos em <span>Destaque</span>`;
  }
  if (subtitulo) {
    subtitulo.textContent = pesquisa
      ? `${lista.length} produto(s) encontrado(s)`
      : "Confira os produtos disponíveis";
  }

  let backBtn = document.getElementById("backToCategories");
  if (pesquisa) {
    if (!backBtn) {
      backBtn = document.createElement("button");
      backBtn.id = "backToCategories";
      backBtn.className = "back-cat-btn";
      backBtn.innerHTML = '<span class="back-arrow">←</span> Voltar';
      backBtn.addEventListener("click", () => {
        const prev = navStack.pop();
        if (prev === "serralheria") renderizarTiposSerralheria();
        else renderizarGradeCategorias();
        document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
      });
      document.getElementById("produtos").insertBefore(backBtn, document.querySelector("#produtos .sec-header"));
    }
  } else if (backBtn) {
    backBtn.remove();
  }

  if (lista.length === 0) {
    const pesquisaSafe = escapeHtml(pesquisa);
    grid.innerHTML = `
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

  grid.innerHTML = lista
    .map((produto) => {
      const nomeSafe = escapeHtml(produto.nome);
      const tipoSafe = produto.tipo ? escapeHtml(produto.tipo) : "";
      return `
        <div class="produto-card" data-id="${produto.id}" data-cat="${escapeHtml(produto.cat)}"${produto.tipo ? ` data-tipo="${tipoSafe}"` : ""}>
            <div class="produto-top">
                <div class="produto-img">
                    <div class="produto-img-wrap"><img src="${produto.img || './icons/Logo/Logo.png'}" alt="${nomeSafe}" loading="lazy"></div>
                    ${produto.tipo ? `<div class="produto-hover-tipo">${tipoSafe}</div>` : ""}
                </div>
                <span class="produto-badge estoque">✓ Em estoque</span>
            </div>
            <div class="produto-body">
                <span class="produto-cat">${escapeHtml(produto.cat)}</span>
                <h3 class="produto-nome">${nomeSafe}</h3>
                <button class="produto-btn" data-id="${produto.id}" type="button">
                    Fazer orçamento
                </button>
            </div>
        </div>
    `;
    })
    .join("");

  ativarBotoesProduto();
  observarProdutos();
}

// ================================
// GRADE DE CATEGORIAS (visão inicial)
// ================================

function renderizarGradeCategorias() {
  const grid = document.getElementById("grid");
  const titulo = document.getElementById("pageTitle");
  const subtitulo = document.getElementById("pageSubtitle");
  if (!grid) return;

  if (titulo) titulo.innerHTML = 'Produtos em <span>Destaque</span>';
  if (subtitulo) subtitulo.textContent = "Escolha uma categoria para ver os produtos";

  const backBtn = document.getElementById("backToCategories");
  if (backBtn) backBtn.remove();
  navStack = ["grid"];

  const cats = [...new Set(produtos.map((p) => p.cat))];

  grid.innerHTML = cats
    .map((cat) => {
      const reps = produtos.filter((p) => p.cat === cat);
      const rep = reps.find((p) => p.img) || reps[0];
      const nomeSafe = escapeHtml(cat);
      const count = reps.length;
      return `
        <div class="cat-grid-card" data-cat="${nomeSafe}">
          <div class="cat-grid-img">
            <img src="${rep.img || './icons/Logo/Logo.png'}" alt="${nomeSafe}" loading="lazy">
          </div>
          <div class="cat-grid-body">
            <h3 class="cat-grid-name">${nomeSafe}</h3>
            <span class="cat-grid-count">${count} produto(s)</span>
          </div>
        </div>
      `;
    })
    .join("");

  grid.querySelectorAll(".cat-grid-card").forEach((card) => {
    card.addEventListener("click", () => {
      const cat = card.dataset.cat;
      if (cat === "Serralheria") {
        navStack.push("grid");
        renderizarTiposSerralheria();
        document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
        return;
      }
      navStack.push("grid");
      const filtrados = produtos.filter((p) => p.cat === cat);
      renderizarProdutos(filtrados, cat);
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderizarTiposSerralheria() {
  const grid = document.getElementById("grid");
  const titulo = document.getElementById("pageTitle");
  const subtitulo = document.getElementById("pageSubtitle");
  if (!grid) return;

  if (titulo) titulo.innerHTML = '<span>Serralheria</span>';
  if (subtitulo) subtitulo.textContent = "Escolha o tipo de perfil";

  let backBtn = document.getElementById("backToCategories");
  if (!backBtn) {
    backBtn = document.createElement("button");
    backBtn.id = "backToCategories";
    backBtn.className = "back-cat-btn";
    backBtn.innerHTML = '<span class="back-arrow">←</span> Voltar';
    backBtn.addEventListener("click", () => {
      navStack.pop();
      renderizarGradeCategorias();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("produtos").insertBefore(backBtn, document.querySelector("#produtos .sec-header"));
  }

  const tipos = [...new Set(produtos.filter((p) => p.cat === "Serralheria").map((p) => p.tipo))];

  grid.innerHTML = tipos
    .map((tipo) => {
      const rep = produtos.find((p) => p.cat === "Serralheria" && p.tipo === tipo && p.img);
      const img = rep ? rep.img : "";
      const count = produtos.filter((p) => p.cat === "Serralheria" && p.tipo === tipo).length;
      const nomeSafe = escapeHtml(tipo);
      return `
        <div class="cat-grid-card" data-tipo="${nomeSafe}">
          <div class="cat-grid-img">
            <img src="${img || './icons/Logo/Logo.png'}" alt="${nomeSafe}" loading="lazy">
          </div>
          <div class="cat-grid-body">
            <h3 class="cat-grid-name">${nomeSafe}</h3>
            <span class="cat-grid-count">${count} produto(s)</span>
          </div>
        </div>
      `;
    })
    .join("");

  grid.querySelectorAll(".cat-grid-card").forEach((card) => {
    card.addEventListener("click", () => {
      const tipo = card.dataset.tipo;
      if (!tipo) return;
      navStack.push("serralheria");
      const filtrados = produtos.filter((p) => p.cat === "Serralheria" && p.tipo === tipo);
      renderizarProdutos(filtrados, tipo);
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ================================
// BOTÕES DOS PRODUTOS
// ================================

function ativarBotoesProduto() {
  document.querySelectorAll(".produto-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
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
      const id = parseInt(card.dataset.id, 10);
      const produto = produtos.find((p) => p.id === id);
      if (produto) abrirDetalheProduto(produto);
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
  const countEl = document.getElementById("carrinhoCount");
  const countPanelEl = document.getElementById("carrinhoCountPanel");
  if (countEl) countEl.textContent = total;
  if (countPanelEl) {
    countPanelEl.textContent = `${total} ${total === 1 ? "item" : "itens"}`;
  }
}

// ================================
// CARRINHO — RENDERIZAR PAINEL
// ================================

function renderizarCarrinho() {
  const container = document.getElementById("carrinhoItems");
  const footer = document.getElementById("carrinhoFooter");

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
    .map((item) => {
      const nomeSafe = escapeHtml(item.nome);
      const catSafe = escapeHtml(item.cat);
      return `
        <div class="orc-item" data-id="${item.id}">
            <div class="orc-item-emoji"><img src="${item.img || './icons/Logo/Logo.png'}" alt="${nomeSafe}"></div>
            <div class="orc-item-info">
                <div class="orc-item-nome">${nomeSafe}</div>
                <div class="orc-item-cat">${catSafe}</div>
            </div>
            <div class="orc-item-qty">
                <button class="orc-qty-btn" data-action="decr" aria-label="Diminuir" type="button">−</button>
                <span>${item.qty}</span>
                <button class="orc-qty-btn" data-action="incr" aria-label="Aumentar" type="button">+</button>
            </div>
            <button class="orc-item-remove" data-action="remove" title="Remover" type="button">✕</button>
        </div>
    `;
    })
    .join("");

  // FIX: renderiza os botões de finalizar por loja + botão de limpar,
  // que antes existiam apenas no CSS mas nunca eram criados/ligados no JS.
  if (footer) {
    footer.style.display = "block";
    footer.innerHTML = `
      <div class="carrinho-obs">Escolha a loja para enviar seu orçamento pelo WhatsApp</div>
      <div class="carrinho-wa-btns">
        ${lojas
        .map(
          (loja) => `
          <button class="carrinho-wa-btn" type="button" data-tel="${loja.telefone}" data-nome="${escapeHtml(loja.nome)}">
            💬 ${escapeHtml(loja.nome)}
          </button>
        `,
        )
        .join("")}
      </div>
      <button class="carrinho-limpar" type="button" id="btnLimparCarrinho">🗑 Limpar orçamento</button>
    `;

    footer.querySelectorAll(".carrinho-wa-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        finalizarOrcamento(btn.dataset.tel, btn.dataset.nome);
      });
    });

    const btnLimpar = footer.querySelector("#btnLimparCarrinho");
    if (btnLimpar) {
      btnLimpar.addEventListener("click", limparCarrinho);
    }
  }
}

// Event delegation para botões do carrinho (qty + remove)
document.getElementById("carrinhoItems").addEventListener("click", (e) => {
  const itemEl = e.target.closest(".orc-item");
  if (!itemEl) return;
  const id = parseInt(itemEl.dataset.id, 10);
  if (!id) return;

  if (e.target.dataset.action === "decr") alterarQty(id, -1);
  else if (e.target.dataset.action === "incr") alterarQty(id, 1);
  else if (e.target.dataset.action === "remove") removerDoCarrinho(id);
});

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
    msg += `• ${item.nome} — Qtd: ${item.qty}%0A`;
  });

  msg += `%0AObrigado!`;

  window.open(`https://wa.me/${telefone}?text=${msg}`, "_blank", "noopener");
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

// FIX: guarda de existência antes de addEventListener (evita TypeError se o
// HTML ainda não tiver esses elementos, ex: durante testes de partes isoladas)
const btnCarrinhoEl = document.getElementById("btnCarrinho");
const btnFecharCarrinhoEl = document.getElementById("btnFecharCarrinho");
const carrinhoOverlayEl = document.getElementById("carrinhoOverlay");

if (btnCarrinhoEl) btnCarrinhoEl.addEventListener("click", abrirCarrinho);
if (btnFecharCarrinhoEl) btnFecharCarrinhoEl.addEventListener("click", fecharCarrinho);
if (carrinhoOverlayEl) carrinhoOverlayEl.addEventListener("click", fecharCarrinho);

// Fechar com Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharCarrinho();
    const dd = document.getElementById("searchDropdown");
    if (dd) dd.classList.remove("open");
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
                <p>Nenhum produto encontrado para "<strong>${escapeHtml(pesquisa)}</strong>"</p>
            </div>`;
    dropdown.classList.add("open");
    return;
  }

  const top8 = lista.slice(0, 8);
  const pesquisaSafe = escapeHtml(pesquisa);

  const itens = top8
    .map(
      (produto) => `
          <div class="dd-item" data-id="${produto.id}">
              <div class="dd-emoji">${
                produto.img
                  ? `<img src="${produto.img}" alt="${escapeHtml(produto.nome)}">`
                  : `<img src="./icons/Logo/Logo.png" alt="${escapeHtml(produto.nome)}">`
              }</div>
              <div class="dd-info">
                  <div class="dd-name">${escapeHtml(produto.nome)}</div>
                  <div class="dd-cat">${escapeHtml(produto.cat)}</div>
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

  dropdown.innerHTML = `
          <div class="dd-header">🔍 ${lista.length} resultado(s) para "${pesquisaSafe}"</div>
          ${itens}
          ${verMaisHtml}
      `;

  dropdown.querySelectorAll(".dd-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("dd-add-btn")) return;
      const id = parseInt(item.dataset.id, 10);
      const produto = produtos.find((p) => p.id === id);
      if (!produto) return;
      if (searchInput) searchInput.value = produto.nome;
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
      const id = parseInt(btn.dataset.id, 10);
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
      renderizarProdutos(lista, pesquisa);
      dropdown.classList.remove("open");
      document
        .getElementById("produtos")
        .scrollIntoView({ behavior: "smooth" });
    });
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
      renderizarGradeCategorias();
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
      const dd = document.getElementById("searchDropdown");
      if (dd) dd.classList.remove("open");
      document
        .getElementById("produtos")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ================================
// NAVBAR — SCROLL EFFECT
// ================================

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (!nav) return;
  nav.classList.toggle("nav-scroll", window.scrollY > 40);
}, { passive: true });

// ================================
// ANIMAÇÃO (IntersectionObserver)
// ================================

const observerAnim = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observerAnim.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".loja-card")
  .forEach((el) => observerAnim.observe(el));

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
    const target = parseInt(el.dataset.target, 10);
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
// SWIPE HINT — LOJAS MOBILE
// ================================

function iniciarSwipeHint() {
  const lojasGrid = document.querySelector(".lojas-grid");
  const swipeHint = document.getElementById("lojasSwipeHint");

  if (!lojasGrid || !swipeHint) return;

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

// ================================
// INICIALIZAR
// ================================

try {
  iniciarSlideshow();
  renderizarGradeCategorias();
  renderizarCarrinho();
  iniciarSwipeHint();
} catch (err) {
  console.error("Erro na inicialização:", err);
}

// ================================
// SELETOR DE CATEGORIAS ("Outras Categorias")
// ================================

function acharRepImagem(cat, tipo) {
  const p = produtos.find((x) => x.cat === cat && (!tipo || x.tipo === tipo) && x.img);
  return p ? p.img : "";
}

function abrirSeletorCategorias() {
  let overlay = document.getElementById("catPickerOverlay");
  if (overlay) { overlay.classList.add("cat-picker-open"); return; }

  overlay = document.createElement("div");
  overlay.id = "catPickerOverlay";
  overlay.className = "cat-picker-overlay";

  const cats = ["Arame", "Radier"];
  const cardsHtml = cats
    .map((cat) => {
      const img = acharRepImagem(cat);
      const count = produtos.filter((p) => p.cat === cat).length;
      return `
        <div class="cat-picker-card" data-cat="${escapeHtml(cat)}">
          <div class="cat-picker-icon"><img src="${img || './icons/Logo/Logo.png'}" alt="${escapeHtml(cat)}"></div>
          <div>
            <span class="cat-picker-name">${escapeHtml(cat)}</span>
            <span class="cat-picker-desc">${count} produto(s)</span>
          </div>
        </div>
      `;
    })
    .join("");

  overlay.innerHTML = `
    <div class="cat-picker-modal">
      <button class="cat-picker-close" id="catPickerClose" type="button" aria-label="Fechar">&times;</button>
      <h3 class="cat-picker-title">Escolha uma categoria</h3>
      <div class="cat-picker-grid">${cardsHtml}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => overlay.classList.add("cat-picker-open"));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) fecharSeletorCategorias();
  });
  document.getElementById("catPickerClose").addEventListener("click", fecharSeletorCategorias);

  overlay.querySelectorAll(".cat-picker-card").forEach((card) => {
    card.addEventListener("click", () => {
      const cat = card.dataset.cat;
      if (!cat) return;
      fecharSeletorCategorias();
      navStack.push("grid");
      const filtrados = produtos.filter((p) => p.cat === cat);
      renderizarProdutos(filtrados, cat);
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function fecharSeletorCategorias() {
  const overlay = document.getElementById("catPickerOverlay");
  if (!overlay) return;
  overlay.classList.remove("cat-picker-open");
  document.querySelectorAll(".subnav-link").forEach((l) => l.classList.remove("active"));
  overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
}

// ================================
// DETALHE DO PRODUTO
// ================================

function gerarDescricao(produto) {
  const descs = {
    "Coluna Pronta": "Coluna pronta em aço para construção civil.",
    "Vergalhão de aço": "Vergalhão de aço para estruturas de concreto armado.",
    "Arame": "Arame recozido para amarração de ferragens.",
    "Radier": "Tela soldada em aço para radier.",
    "Serralheria": "Perfil de aço para serralheria e estruturas metálicas.",
  };
  return descs[produto.cat] || "Produto em aço para construção civil.";
}

function abrirDetalheProduto(produto) {
  let overlay = document.getElementById("prodDetailOverlay");
  if (overlay) overlay.remove();

  overlay = document.createElement("div");
  overlay.id = "prodDetailOverlay";
  overlay.className = "prod-detail-overlay";

  const nomeSafe = escapeHtml(produto.nome);
  const descSafe = escapeHtml(gerarDescricao(produto));
  const catSafe = escapeHtml(produto.cat);

  overlay.innerHTML = `
    <div class="prod-detail-modal">
      <button class="prod-detail-back" id="prodDetailBack" type="button" aria-label="Voltar">
        ← Voltar
      </button>
      <div class="prod-detail-img-wrap">
        <img src="${produto.img || './icons/Logo/Logo.png'}" alt="${nomeSafe}">
      </div>
      <div class="prod-detail-body">
        <span class="prod-detail-cat">${catSafe}</span>
        <h2 class="prod-detail-name">${nomeSafe}</h2>
        <p class="prod-detail-desc">${descSafe}</p>
        <button class="prod-detail-btn" data-id="${produto.id}" type="button">
          Fazer orçamento
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("prod-detail-open"));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) fecharDetalheProduto();
  });
  document.getElementById("prodDetailBack").addEventListener("click", fecharDetalheProduto);

  overlay.querySelector(".prod-detail-btn").addEventListener("click", () => {
    const id = parseInt(produto.id, 10);
    adicionarAoCarrinho(id);
    fecharDetalheProduto();
    abrirCarrinho();
  });
}

function fecharDetalheProduto() {
  const overlay = document.getElementById("prodDetailOverlay");
  if (!overlay) return;
  overlay.classList.remove("prod-detail-open");
  overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
}
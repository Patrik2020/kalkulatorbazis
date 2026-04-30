// ===== SEGÉD FÜGGVÉNYEK =====

// Szám formázás
function format(num) {
  return new Intl.NumberFormat("hu-HU").format(Math.round(num));
}

// Vissza gomb
function goBack() {
  window.history.back();
}

// CTA megjelenítés
function showLinks() {
  const calcLinks = document.querySelector(".calc-links");
  if (calcLinks) {
    calcLinks.style.display = "flex";
  }
}

// =========================
// SZÁM INPUT FORMÁZÁS
// =========================
function formatInputNumber(input) {
  let isFormatting = false;

  input.addEventListener("input", () => {
    if (isFormatting) return;

    isFormatting = true;

    let value = input.value.replace(/\s/g, "");
    value = value.replace(/\D/g, "");

    if (value === "") {
      input.value = "";
      isFormatting = false;
      return;
    }

    input.value = new Intl.NumberFormat("hu-HU").format(Number(value));

    isFormatting = false;
  });
}

// =========================
// PARSE SZÁM
// =========================
function parseNumber(value) {
  return parseFloat(value.replace(/\s/g, ""));
}

// =========================
// HEADER és FOOTER betöltése
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const isCalculatorPage = window.location.pathname.includes("/kalkulatorok/");

  const base = isCalculatorPage ? "../" : "./";

  loadComponent("header", base + "components/header.html");
  loadComponent("footer", base + "components/footer.html");
});

function loadComponent(id, path) {
  fetch(path)
    .then((res) => {
      if (!res.ok) throw new Error("Hiba: " + path);
      return res.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      if (id === "header") {
        initMobileMenu();
      }
    })
    .catch((err) => console.error(err));
}

// =========================
// MOBIL NAVIGÁCIÓ
// =========================
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // 💥 kattintás kívül = bezárás
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
}

// =========================
// TÉMA KEZELÉS
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";

  // applyTheme(savedTheme);

  // header betöltés után kell
  setTimeout(() => {
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
      updateThemeIcon();
    }
  }, 100);
});
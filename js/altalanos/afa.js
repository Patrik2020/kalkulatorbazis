(function () {
  // =========================
  // ELEMEK
  // =========================
  const amountInput = document.getElementById("amount");
  const vatInput = document.getElementById("vat");
  const resultEl = document.getElementById("result-value");

  // Ha nem ezen az oldalon vagyunk → kilép
  if (!amountInput || !vatInput || !resultEl) return;

  formatInputNumber(amountInput);

  // =========================
  // MÓD LEKÉRÉS
  // =========================
  function getMode() {
    const selected = document.querySelector('input[name="mode"]:checked');
    return selected ? selected.value : "netto";
  }

  // =========================
  // ÁFA GOMBOK (globális kell!)
  // =========================
  window.setVAT = function (value) {
    vatInput.value = value;
    calculate();
  };

  // =========================
  // FŐ SZÁMOLÁS
  // =========================
  function calculate() {
    const amount = parseNumber(amountInput.value);
    const vat = parseFloat(vatInput.value);
    const mode = getMode();

    // VALIDÁCIÓ
    if (!amount || amount <= 0) {
      resultEl.innerHTML = "👉 Kérjük, adjon meg egy érvényes összeget.";
      return;
    }

    if (isNaN(vat) || vat < 0) {
      resultEl.innerHTML = "👉 Kérjük, adjon meg egy érvényes ÁFA kulcsot.";
      return;
    }

    let netto, brutto, vatAmount;

    if (mode === "netto") {
      netto = amount;
      brutto = netto * (1 + vat / 100);
      vatAmount = brutto - netto;

      resultEl.innerHTML = `
        Nettó: ${format(netto)} Ft<br>
        ÁFA (${vat}%): ${format(vatAmount)} Ft<br>
        <strong>Bruttó: ${format(brutto)} Ft</strong>
      `;
    } else {
      brutto = amount;
      netto = brutto / (1 + vat / 100);
      vatAmount = brutto - netto;

      resultEl.innerHTML = `
        Bruttó: ${format(brutto)} Ft<br>
        ÁFA (${vat}%): ${format(vatAmount)} Ft<br>
        <strong>Nettó: ${format(netto)} Ft</strong>
      `;
    }

    // CTA megjelenítés (ha van)
    if (typeof showLinks === "function") {
      showLinks();
    }
  }

  // =========================
  // EVENTEK
  // =========================
  amountInput.addEventListener("input", calculate);
  vatInput.addEventListener("input", calculate);

  document
    .querySelectorAll('input[name="mode"]')
    .forEach((el) => el.addEventListener("change", calculate));

  document.addEventListener("DOMContentLoaded", calculate);
})();

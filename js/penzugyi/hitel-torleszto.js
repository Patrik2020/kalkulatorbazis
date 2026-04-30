function format(num) {
  return new Intl.NumberFormat("hu-HU").format(Math.round(num));
}

function parseNumber(value) {
  return parseFloat(value.replace(/\s/g, "")) || 0;
}

function formatInput(input) {
  input.addEventListener("input", (e) => {
    let raw = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    if (!raw) return e.target.value = "";
    e.target.value = new Intl.NumberFormat("hu-HU").format(raw);
  });
}

const amount = document.getElementById("amount");
const rate = document.getElementById("rate");
const years = document.getElementById("years");

const resultMonthly = document.getElementById("result-monthly");
const resultTotal = document.getElementById("result-total");
const resultInterest = document.getElementById("result-interest");

function calcLoan() {
  const P = parseNumber(amount.value);
  const r = (parseFloat(rate.value) || 0) / 100 / 12;
  const n = (parseFloat(years.value) || 0) * 12;

  if (!P || !r || !n) {
    resultMonthly.textContent = "–";
    resultTotal.textContent = "";
    resultInterest.textContent = "";
    return;
  }

  const monthly = P * r / (1 - Math.pow(1 + r, -n));
  const total = monthly * n;
  const interest = total - P;

  resultMonthly.textContent = format(monthly) + " Ft";
  resultTotal.textContent = "Teljes visszafizetés: " + format(total) + " Ft";
  resultInterest.textContent = "Kamat: " + format(interest) + " Ft";
}

// input format
formatInput(amount);

// auto
[amount, rate, years].forEach(i => {
  i?.addEventListener("input", calcLoan);
});

calcLoan();
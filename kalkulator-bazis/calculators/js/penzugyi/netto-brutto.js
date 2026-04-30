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

const grossInput = document.getElementById("gross");
const resultNet = document.getElementById("result-net");
const resultDiff = document.getElementById("result-diff");

function calc() {
  const gross = parseNumber(grossInput.value);

  if (!gross) {
    resultNet.textContent = "–";
    resultDiff.textContent = "";
    return;
  }

  // CURRENT
  const netCurrent = gross * (1 - 0.15 - 0.185);

  // ALT
  const netAlt = gross * (1 - 0.09 - 0.185);

  const mode = document.querySelector("input[name='mode']:checked").value;

  const net = mode === "current" ? netCurrent : netAlt;

  resultNet.textContent = format(net) + " Ft";

  const diff = netAlt - netCurrent;

if (mode === "alt") {
  resultDiff.textContent =
    "Ennyivel több maradna nálad: +" + format(diff) + " Ft";
} else {
  resultDiff.textContent = "";
}
}

// input format
formatInput(grossInput);

// auto
grossInput.addEventListener("input", calc);

document.querySelectorAll("input[name='mode']")
  .forEach(r => r.addEventListener("change", calc));

calc();
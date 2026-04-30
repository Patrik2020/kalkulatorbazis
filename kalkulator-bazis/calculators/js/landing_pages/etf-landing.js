let chart;

function calculate() {
  const start = +document.getElementById("start").value || 0;
  const monthly = +document.getElementById("monthly").value || 0;
  const years = +document.getElementById("years").value || 0;
  const rate = (+document.getElementById("rate").value || 0) / 100 / 12;

  let total = start;
  let data = [];

  for (let i = 0; i < years * 12; i++) {
    total = total * (1 + rate) + monthly;
    data.push(total);
  }

  document.getElementById("final").textContent =
    "Végösszeg: " + total.toLocaleString();

  document.getElementById("profit").textContent =
    "Nyereség: " + (total - (start + monthly * years * 12)).toLocaleString();

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: data.map((_, i) => i),
      datasets: [{ data }]
    }
  });
}
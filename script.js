let chartTDS, chartPH, chartWater;

// ===== create spline =====
function createSpline(id, label, color) {
  const ctx = document.getElementById(id);

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: color,
        backgroundColor: color,
        tension: 0.4,
        fill: false,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { display: false },
        y: { beginAtZero: false }
      }
    }
  });
}

// ===== init =====
function initCharts() {
  chartTDS = createSpline('chartTDS', 'TDS (ppm)', 'cyan');
  chartPH = createSpline('chartPH', 'pH', 'lime');
  chartWater = createSpline('chartWater', 'Water Level (%)', 'orange');
}

// ===== update =====
function updateChart(chart, value) {
  chart.data.labels.push('');
  chart.data.datasets[0].data.push(value);

  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();
}

// ===== simulasi =====
function generateData() {
  const tds = 850 + Math.random() * 200;
  const ph = 5.8 + Math.random();
  const water = 60 + Math.random() * 30;

  const pumpAir = water < 65;
  const pumpNutrisi = tds < 900;

  document.getElementById('tds').innerHTML = tds.toFixed(0);
  document.getElementById('ph').innerHTML = ph.toFixed(2);
  document.getElementById('water').innerHTML = water.toFixed(0) + "%";

  document.getElementById('pumpAir').innerHTML = pumpAir ? "ON" : "OFF";
  document.getElementById('pumpNutrisi').innerHTML = pumpNutrisi ? "ON" : "OFF";

  updateChart(chartTDS, tds);
  updateChart(chartPH, ph);
  updateChart(chartWater, water);
}

setInterval(generateData, 2000);
window.onload = initCharts;

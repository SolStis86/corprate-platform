document.addEventListener("DOMContentLoaded", () => {
  fetch("../scorecards/list.json")
    .then(response => response.json())
    .then(companies => {
      const list = document.getElementById("scorecard-list");
      const selector = document.getElementById("company-selector");
      companies.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        selector.appendChild(opt);
      });
      loadCompany(companies[0]);
      selector.addEventListener("change", () => loadCompany(selector.value));
      function loadCompany(name) {
        fetch(`../scorecards/${name}.json`)
          .then(r => r.json())
          .then(data => {
            list.innerHTML = `
              <li>Net Profit: ${data.net_profit}</li>
              <li>Wage Share 2024: ${data.fri_2024}</li>
              <li>Δ since 2004: ${data.delta_fri}</li>
              <li>Ineq. Acceleration: ${data.delta2_fri_rating}</li>`;
            document.getElementById("verdict").textContent = data.verdict;
          });
      }
    });
});
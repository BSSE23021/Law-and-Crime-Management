// script.js
const loginForm = document.getElementById("login-form");
const appSection = document.getElementById("app-section");
const loginSection = document.getElementById("login-section");
const crimeForm = document.getElementById("crime-form");
const recordsTable = document.querySelector("#records-table tbody");
const totalCount = document.getElementById("total-count");
const todayCount = document.getElementById("today-count");
const chartCanvas = document.getElementById("crime-chart");
const searchBar = document.getElementById("search-bar");
const sortOptions = document.getElementById("sort-options");
const logoutBtn = document.getElementById("logout-btn");

let crimes = JSON.parse(localStorage.getItem("crimes")) || [];
const users = { admin: "password" }; // mock credentials

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (users[username] === password) {
    localStorage.setItem("loggedIn", "true");
    showApp();
  } else {
    alert("Invalid credentials");
  }
});
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  location.reload();
});

function showApp() {
  loginSection.style.display = "none";
  appSection.style.display = "block";
  renderTable();
  updateMetrics();
  updateChart();
}

if (localStorage.getItem("loggedIn") === "true") showApp();

crimeForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("criminal-name").value;
  const type = document.getElementById("crime-type").value;
  const date = document.getElementById("crime-date").value;
  const caseId = document.getElementById("case-id").value;
  const record = { name, type, date, caseId };
  crimes.push(record);
  localStorage.setItem("crimes", JSON.stringify(crimes));
  renderTable();
  updateMetrics();
  updateChart();
  crimeForm.reset();
});

function renderTable(data = crimes) {
  recordsTable.innerHTML = "";
  data.forEach((c, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.type}</td>
      <td>${c.date}</td>
      <td>${c.caseId}</td>
      <td>
        <button onclick="editRecord(${i})">Edit</button>
        <button onclick="deleteRecord(${i})">Delete</button>
      </td>`;
    recordsTable.appendChild(row);
  });
}

function deleteRecord(index) {
  if (confirm("Are you sure to delete this record?")) {
    crimes.splice(index, 1);
    localStorage.setItem("crimes", JSON.stringify(crimes));
    renderTable();
    updateMetrics();
    updateChart();
  }
}

function editRecord(index) {
  const record = crimes[index];
  document.getElementById("criminal-name").value = record.name;
  document.getElementById("crime-type").value = record.type;
  document.getElementById("crime-date").value = record.date;
  document.getElementById("case-id").value = record.caseId;
  crimes.splice(index, 1);
  localStorage.setItem("crimes", JSON.stringify(crimes));
  renderTable();
  updateMetrics();
  updateChart();
}

searchBar.addEventListener("input", () => {
  const val = searchBar.value.toLowerCase();
  const filtered = crimes.filter(c =>
    c.name.toLowerCase().includes(val) ||
    c.type.toLowerCase().includes(val) ||
    c.caseId.toString().includes(val)
  );
  renderTable(filtered);
});

sortOptions.addEventListener("change", () => {
  let sorted = [...crimes];
  switch (sortOptions.value) {
    case "name-asc": sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "name-desc": sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
    case "date-asc": sorted.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
    case "date-desc": sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
  }
  renderTable(sorted);
});

function updateMetrics() {
  totalCount.textContent = crimes.length;
  const today = new Date().toISOString().split("T")[0];
  todayCount.textContent = crimes.filter(c => c.date === today).length;
}

function updateChart() {
  const counts = {};
  crimes.forEach(c => counts[c.type] = (counts[c.type] || 0) + 1);
  const ctx = chartCanvas.getContext("2d");
  if (window.crimeChart) window.crimeChart.destroy();
  window.crimeChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Crime Distribution',
        data: Object.values(counts),
        backgroundColor: ['red', 'blue', 'green', 'orange', 'purple']
      }]
    }
  });
}

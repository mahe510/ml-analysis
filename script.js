const projects = [
  "customer_segmentation.json",
  "fake_news.json",
  "student-learning-dropoff.json",
  "titanic_survival_prediction.json",
  "twitter_sentiment.json"
];

const projectList = document.getElementById("project-list");
const tabButtons = document.querySelectorAll(".tab-btn");

// Create project cards
projects.forEach(file => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerText = file.replace(".json", "").replaceAll("_", " ");
  card.onclick = () => loadProject(file);
  projectList.appendChild(card);
});

function loadProject(file) {
  fetch(`projects/${file}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("title").innerText = data.title;
      document.getElementById("problem-text").innerText = data.problem;
      document.getElementById("dataset").innerText = data.dataset;
      document.getElementById("models").innerText = data.models.join(", ");
      document.getElementById("tools").innerText = data.tools.join(", ");
      document.getElementById("results-text").innerText = data.results;
      document.getElementById("github").href = data.github;

      const analysisList = document.getElementById("analysis-list");
      analysisList.innerHTML = "";
      data.analysis.forEach(a => {
        const li = document.createElement("li");
        li.innerText = a;
        analysisList.appendChild(li);
      });

      const gallery = document.getElementById("image-gallery");
      gallery.innerHTML = "";
      if (data.images) {
        data.images.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.className = "project-image";
          gallery.appendChild(img);
        });
      }

      activateTab("problem");
    });
}

// Tabs
function showTab(tabId) {
  activateTab(tabId);
}

function activateTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tabId).classList.remove("hidden");

  tabButtons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(
    `.tab-btn[onclick="showTab('${tabId}')"]`
  ).classList.add("active");
}

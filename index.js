import { fetchJSON, renderProjects, fetchGitHubData } from "./global.js";

// Step 2.1: newest projects are at the top of the JSON file,
// so the first three are the latest
const projects = await fetchJSON("./lib/projects.json");
const latestProjects = projects?.slice(0, 3) ?? [];

const projectsContainer = document.querySelector(".projects");
// h3, because these sit under the "Latest Projects" h2 heading
renderProjects(latestProjects, projectsContainer, "h3");

// Step 3: GitHub profile numbers
const githubData = await fetchGitHubData("thirdball");
const profileStats = document.querySelector("#profile-stats");

if (profileStats && githubData) {
  profileStats.innerHTML = `
    <dl>
      <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
      <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
      <dt>Followers:</dt><dd>${githubData.followers}</dd>
      <dt>Following:</dt><dd>${githubData.following}</dd>
    </dl>
  `;
} else if (profileStats) {
  profileStats.textContent = "GitHub stats couldn't be loaded right now.";
}

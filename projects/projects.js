import { fetchJSON, renderProjects } from "../global.js";

// The data file is one folder up from the projects page
const projects = await fetchJSON("../lib/projects.json");

const projectsContainer = document.querySelector(".projects");
renderProjects(projects, projectsContainer, "h2");

// Step 1.6: show how many projects there are in the page title
const projectsTitle = document.querySelector(".projects-title");
const count = projects?.length ?? 0;
projectsTitle.textContent = `${count} ${count === 1 ? "Project" : "Projects"}`;

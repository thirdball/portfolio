console.log("IT'S ALIVE!");

// Step 1: shortcut for querySelectorAll that returns a real array,
// so we can use array methods like .find() on the result
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/* ---------------------------------------------------------------
   Step 3: build the navigation menu automatically on every page
   --------------------------------------------------------------- */

let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/", title: "Contact" },
  { url: "resume/", title: "Resume" },
  { url: "https://github.com/thirdball", title: "GitHub" },
];

// On a local server the site lives at the root ("/"). On GitHub Pages it
// lives under the repository name, e.g. thirdball.github.io/portfolio/
const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/" // Local server
    : "/portfolio/"; // GitHub Pages repo name

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Internal links get BASE_PATH in front so they work from any page;
  // full URLs (starting with http) are left as they are
  url = !url.startsWith("http") ? BASE_PATH + url : url;

  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;

  // Step 2 + 3.2: highlight the link for the page we're on
  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname,
  );

  // External links (a different host) open in a new tab
  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.append(a);
}

/* ---------------------------------------------------------------
   Step 4: light / dark / automatic theme switcher
   --------------------------------------------------------------- */

document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`,
);

let select = document.querySelector(".color-scheme select");

// Show which theme "Automatic" will give, based on the OS setting
let osDark = matchMedia("(prefers-color-scheme: dark)").matches;
select.options[0].textContent = `Automatic (${osDark ? "Dark" : "Light"})`;

// One function used both when the user picks a theme and on page load
function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty("color-scheme", colorScheme);
  select.value = colorScheme;
}

// Step 4.5: restore the saved choice when the page loads
if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

// Step 4.4: change the theme and remember it when the user picks one
select.addEventListener("input", function (event) {
  console.log("color scheme changed to", event.target.value);
  setColorScheme(event.target.value);
  localStorage.colorScheme = event.target.value;
});

/* ---------------------------------------------------------------
   Step 5: contact form that builds a properly encoded mailto: link
   --------------------------------------------------------------- */

let form = document.querySelector("form");

form?.addEventListener("submit", function (event) {
  // Stop the browser's default submit, which encodes spaces as "+"
  event.preventDefault();

  let data = new FormData(form);
  let url = form.action + "?";
  let params = [];

  for (let [name, value] of data) {
    // encodeURIComponent turns spaces into %20, line breaks into %0A, etc.
    params.push(`${name}=${encodeURIComponent(value)}`);
  }

  url += params.join("&");
  location.href = url;
});

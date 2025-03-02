// Supported Wowhead languages
const LANGUAGES = ["es", "fr", "de", "it", "pt"];

// Function to get the stored language, default to 'es'
function getPreferredLanguage() {
  return localStorage.getItem("wowheadLang") || "es";
}

// Function to set the preferred language
function setPreferredLanguage(lang) {
  if (LANGUAGES.includes(lang)) {
    localStorage.setItem("wowheadLang", lang);
    modifyWowheadLinks(); // Update links immediately
  }
}

// Function to modify all Wowhead links
function modifyWowheadLinks() {
  const selectedLang = getPreferredLanguage();
  document.querySelectorAll('a[href*="www.wowhead.com/"]').forEach(link => {
    link.href = link.href.replace(/www\.wowhead\.com(\/\w+)?\//, `www.wowhead.com/${selectedLang}/`);
  });
}

// Function to create the language selector button
function createLanguageSelector() {
  if (document.getElementById("wowhead-lang-selector")) return; // Avoid duplicates

  const container = document.createElement("div");
  container.id = "wowhead-lang-selector";
  container.style.position = "fixed";
  container.style.bottom = "10px";
  container.style.right = "10px";
  container.style.padding = "8px";
  container.style.background = "#333";
  container.style.color = "#fff";
  container.style.borderRadius = "5px";
  container.style.fontSize = "14px";
  container.style.zIndex = "9999";

  // Add buttons for each language
  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.innerText = lang.toUpperCase();
    btn.style.margin = "0 5px";
    btn.style.cursor = "pointer";
    btn.style.border = "none";
    btn.style.background = lang === getPreferredLanguage() ? "#A020F0" : "#444";
    btn.style.color = "#fff";
    btn.style.padding = "5px";
    btn.style.borderRadius = "3px";

    btn.addEventListener("click", () => {
      setPreferredLanguage(lang);
      updateButtonStyles();
    });

    container.appendChild(btn);
  });

  document.body.appendChild(container);
}

// Function to update button styles after selection
function updateButtonStyles() {
  document.querySelectorAll("#wowhead-lang-selector button").forEach(btn => {
    btn.style.background = btn.innerText.toLowerCase() === getPreferredLanguage() ? "#A020F0" : "#444";
  });
}

// Observe dynamically added content
const observer = new MutationObserver(modifyWowheadLinks);
observer.observe(document.body, { childList: true, subtree: true });

// Initialize on page load
createLanguageSelector();
modifyWowheadLinks();

chrome.runtime.onInstalled.addListener(() => {
  chrome.scripting.registerContentScripts([
    {
      id: "wowhead_redirect",
      matches: ["*://www.archon.gg/*"],
      js: ["content.js"],
      runAt: "document_idle"
    }
  ]);
});

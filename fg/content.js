console.log('Content script loaded')

function init() {
  const pasteTarget = document.createElement("div");
  pasteTarget.id = "paste-target";
  pasteTarget.contentEditable = "true";
  document.body.appendChild(pasteTarget);
  pasteTarget.addEventListener("paste", (e) => {
    if (e.clipboardData.getData("text/plain") === "") {
      e.preventDefault();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

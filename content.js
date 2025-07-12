// content.js
document.addEventListener("DOMContentLoaded", () => {
  const pasteTarget = document.createElement("div");
  pasteTarget.id = "paste-target";
  pasteTarget.contentEditable = "true";
  pasteTarget.style.position = "fixed";
  pasteTarget.style.top = "10px";
  pasteTarget.style.left = "10px";
  pasteTarget.style.width = "300px";
  pasteTarget.style.height = "100px";
  pasteTarget.style.border = "1px solid #ccc";
  pasteTarget.style.padding = "10px";
  pasteTarget.style.backgroundColor = "#fff";
  pasteTarget.style.zIndex = "9999";
  document.body.appendChild(pasteTarget);

  pasteTarget.addEventListener("paste", (e) => {
    if (e.clipboardData.getData("text/plain") === "") {
      e.preventDefault();
    }
  });
});

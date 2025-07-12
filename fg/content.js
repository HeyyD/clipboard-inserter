console.log('Content script loaded')

let previousContent = ""

function checkClipboard() {
  const pasteTarget = document.querySelector("#paste-target")
  pasteTarget.innerText = ""
  pasteTarget.focus()
  document.execCommand("paste")
  const content = pasteTarget.innerText
  if (content.trim() !== previousContent.trim() && content != "") {
    chrome.runtime.sendMessage({ action: "clipboardContent", text: content })
    previousContent = content
  }
}

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

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "checkClipboard") {
      checkClipboard()
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

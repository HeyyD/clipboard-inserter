console.log('Offscreen loaded')

let previousContent = ""

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "checkClipboard") {
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
});

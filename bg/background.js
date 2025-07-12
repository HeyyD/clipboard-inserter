// background.js (used as service_worker in Manifest V3)

// Load default options
importScripts('/default-options.js');

// Monitor logic (you may need to refactor monitor.js if it uses DOM APIs)
importScripts('monitor.js');

// Create a contenteditable div dynamically
self.addEventListener('activate', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	if (tabs[0].url.startsWith("chrome://")) {
	  console.warn("Cannot inject into chrome:// pages");
	  return;
	}
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        const pasteTarget = document.createElement('div');
        pasteTarget.id = 'paste-target';
        pasteTarget.contentEditable = 'true';
        pasteTarget.style.position = 'fixed';
        pasteTarget.style.top = '10px';
        pasteTarget.style.left = '10px';
        pasteTarget.style.width = '300px';
        pasteTarget.style.height = '100px';
        pasteTarget.style.border = '1px solid #ccc';
        pasteTarget.style.padding = '10px';
        pasteTarget.style.backgroundColor = '#fff';
        pasteTarget.style.zIndex = '9999';
        document.body.appendChild(pasteTarget);
      }
    });
  });
});

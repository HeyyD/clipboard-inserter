console.log("I'm alive")

let previousContent = ""
let listeningTabs = []
let timer = null
let options = defaultOptions

chrome.storage.local.get(defaultOptions,
    o => options = o)

chrome.storage.onChanged.addListener((changes, area) => {
    if(area === "local") {
	const optionKeys = Object.keys(options)
	for(key of Object.keys(changes)) {
	    if(optionKeys.indexOf(key) >= 0) {
		options[key] = changes[key].newValue
	    }
	}
	updateTimer()
    }
})

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([t]) => toggleTab(t.id))
})

function toggleTab(id) {
    const index = listeningTabs.indexOf(id)
    if(index >= 0) {
	uninject(id)
	listeningTabs.splice(index, 1)
	updateTimer()
	chrome.action.setBadgeText({ text: "", tabId: id })
    } else {
	chrome.scripting.executeScript({
	  target: { tabId: id },
	  files: ["/fg/insert.js"]
	})
	listeningTabs.push(id)
	updateTimer()
	chrome.action.setBadgeBackgroundColor({ color: "green", tabId: id })
	chrome.action.setBadgeText({ text: "ON", tabId: id })
    }
}

function notifyForeground(id, text) {
    chrome.tabs.sendMessage(id, {
	action: "insert", text, options
    })
}

function uninject(id) {
    chrome.tabs.sendMessage(id, { action: "uninject" })
}

function checkClipboard() {
    const pasteTarget = document.querySelector("#paste-target")
    pasteTarget.innerText = ""
    pasteTarget.focus()
    document.execCommand("paste")
    const content = pasteTarget.innerText
    if(content.trim() !== previousContent.trim() && content != "") {
	listeningTabs.forEach(id => notifyForeground(id, content))
	previousContent = content
    }
}

function updateTimer() {
    function stop() {
	clearInterval(timer.id)
	timer = null
    }
    function start() {
	const id = setInterval(checkClipboard, options.monitorInterval)
	timer = { id, interval: options.monitorInterval }
    }
    if(listeningTabs.length > 0) {
	if(timer === null) {
	    start()
	} else if(timer.interval !== options.monitorInterval) {
	    stop()
	    start()
	}
    } else {
	stop()
    }
}

console.log('Service worker loaded')

// Load default options
importScripts('/default-options.js');

// Monitor logic (you may need to refactor monitor.js if it uses DOM APIs)
// importScripts('monitor.js');
// Function to apply RTL styles
function applyRTLStyles() {
  const elements = document.querySelectorAll('[aria-labelledby="chat-conversation"]');
  elements.forEach(element => {
    element.style.direction = 'rtl';
    element.style.textAlign = 'right';
  });
}

// Function to remove RTL styles
function removeRTLStyles() {
  const elements = document.querySelectorAll('[aria-labelledby="chat-conversation"]');
  elements.forEach(element => {
    element.style.direction = '';
    element.style.textAlign = '';
  });
}

// Check storage and apply styles
chrome.storage.sync.get(['rtlEnabled'], (result) => {
  const isEnabled = result.rtlEnabled !== false; // Default to true
  if (isEnabled) {
    applyRTLStyles();
  }
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.rtlEnabled) {
    if (changes.rtlEnabled.newValue) {
      applyRTLStyles();
    } else {
      removeRTLStyles();
    }
  }
});

// Observe DOM changes for dynamically added elements
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['rtlEnabled'], (result) => {
    const isEnabled = result.rtlEnabled !== false;
    if (isEnabled) {
      applyRTLStyles();
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle') {
    if (request.enabled) {
      applyRTLStyles();
    } else {
      removeRTLStyles();
    }
    sendResponse({ success: true });
  }
  return true;
});


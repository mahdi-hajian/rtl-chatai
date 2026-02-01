// Get current domain
const currentDomain = window.location.hostname;

// Domain-specific configuration
const domainConfig = {
  "chat.deepseek.com": {
    selector: "div.ds-markdown",
    originalDir: null, // These elements don't have dir attribute originally
  },
  "chatai.mohaymen.ir": {
    selector: '[dir="auto"]',
    originalDir: "auto",
  },
};

// Get config for current domain, or use default
function getConfig() {
  return domainConfig[currentDomain] || domainConfig["chatai.mohaymen.ir"];
}

// Function to apply RTL styles
function applyRTLStyles() {
  const config = getConfig();
  const elements = document.querySelectorAll(config.selector);
  console.log(
    `[RTL Extension] Found ${elements.length} elements on ${currentDomain}`
  );

  elements.forEach((element) => {
    // Skip if already processed
    if (element.getAttribute("data-rtl-extension") === "true") return;

    // Mark this element as changed by our extension
    element.setAttribute("data-rtl-extension", "true");
    element.setAttribute("dir", "rtl");
    element.style.direction = "rtl";
    element.style.textAlign = "right";
  });
}

// Function to remove RTL styles
function removeRTLStyles() {
  const config = getConfig();
  const elements = document.querySelectorAll('[data-rtl-extension="true"]');
  console.log(`[RTL Extension] Reverting ${elements.length} elements`);

  elements.forEach((element) => {
    if (config.originalDir) {
      element.setAttribute("dir", config.originalDir);
    } else {
      element.removeAttribute("dir");
    }
    element.removeAttribute("data-rtl-extension");
    element.style.direction = "";
    element.style.textAlign = "";
  });
}

// Check storage and apply styles
chrome.storage.sync.get(["rtlEnabled"], (result) => {
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
  chrome.storage.sync.get(["rtlEnabled"], (result) => {
    const isEnabled = result.rtlEnabled !== false;
    if (isEnabled) {
      applyRTLStyles();
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    if (request.enabled) {
      applyRTLStyles();
    } else {
      removeRTLStyles();
    }
    sendResponse({ success: true });
  }
  return true;
});

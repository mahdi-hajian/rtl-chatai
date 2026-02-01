// Get the toggle element
const toggle = document.getElementById('rtlToggle');
const status = document.getElementById('status');

// Load current state
chrome.storage.sync.get(['rtlEnabled'], (result) => {
  const isEnabled = result.rtlEnabled !== false; // Default to true
  toggle.checked = isEnabled;
  updateStatus(isEnabled);
});

// Handle toggle change
toggle.addEventListener('change', (e) => {
  const isEnabled = e.target.checked;
  chrome.storage.sync.set({ rtlEnabled: isEnabled }, () => {
    updateStatus(isEnabled);
    
    // Notify content script to update immediately
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle', enabled: isEnabled });
    });
  });
});

// Update status text
function updateStatus(isEnabled) {
  if (isEnabled) {
    status.textContent = '✓ RTL فعال است';
    status.style.color = '#4CAF50';
  } else {
    status.textContent = '✗ RTL غیرفعال است';
    status.style.color = '#f44336';
  }
}


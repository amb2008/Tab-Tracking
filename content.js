// Function to save tab information with the current time
function saveTabInfo(tab) {
  let currentTime = new Date().toLocaleString(); // Get the current time in a readable format
  const tabInfo = {
    url: tab.url || tab.pendingUrl,  // Handle pending URLs or regular URLs
    timeAccessed: currentTime        // Store the time the tab was accessed
  };

  // Save the tab info to Chrome storage
  chrome.storage.local.get({tabsOpened: []}, function (result) {
    const tabsOpened = result.tabsOpened;
    tabsOpened.push(tabInfo);

    chrome.storage.local.set({tabsOpened: tabsOpened}, function () {
      console.log('Tab info saved:', tabInfo);
    });
  });
}

chrome.tabs.onCreated.addListener(function (tab) {
  saveTabInfo(tab);
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      saveTabInfo(tab);
    }
  });
});

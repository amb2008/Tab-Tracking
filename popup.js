document.addEventListener('DOMContentLoaded', function () {
  const tabsList = document.getElementById('tabsList');

  // Fetch the stored tab data
  chrome.storage.local.get('tabsOpened', function (result) {
    const tabsOpened = result.tabsOpened || [];
    const timesList = [];
    const urlsList = [];
    tabsOpened.forEach(function (tabInfo) {
      timesList.push(tabInfo.timeAccessed);
      urlsList.push(tabInfo.url);
    });

    let listItem = document.createElement('li');
    let text = "[";
    for (let i = 0; i < timesList.length; i++) {
      text += "'" + timesList[i] + "', ";
    }
    text += "]"; 
    listItem.textContent = text;

    let listItem2 = document.createElement('li');
    text = "[";
    for (let i = 0; i < urlsList.length; i++) {
      text += "'" + urlsList[i] + "', ";
    }
    text += "]"; 
    listItem2.textContent = text;

    tabsList.appendChild(listItem);
    tabsList.appendChild(listItem2);

    // tabsOpened.forEach(function (tabInfo) {
    //   const listItem = document.createElement('li');
    //   listItem.textContent = `${tabInfo.timeAccessed} - ${tabInfo.url}`;
    //   tabsList.appendChild(listItem);
    // });
  });
});

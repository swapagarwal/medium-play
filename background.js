var audioUrls = {};

function hide(tabId) {
  chrome.pageAction.setTitle({
    title: "No audio available",
    tabId
  });
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'https://medium.com/' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
  var url = tab.url;
  var id = url.split("-").pop();
  if (undefined !== id && url.startsWith('https://medium.com/')) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://medium.com/p/" + id + "/notes", true);
    request.onload = function() {
      if (request.status === 200) {
        var resp = request.responseText;
        var match = resp.match(/\"audioVersionUrl\":\"([^"]+)\"/);
        if (null !== match && null !== match[1]) {
          var audioUrl = match[1];
          audioUrls[tabId] = audioUrl;
        } else hide(tabId)
      } else hide(tabId);
    };
    request.send();
  } else hide(tabId);
}
});

chrome.pageAction.onClicked.addListener(function(tab) {
  var url = audioUrls[tab.id];
  if (url) chrome.tabs.create({url});
});
